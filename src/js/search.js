'use strict'

//npx tailwindcss -i ./src/css/style.css -o ./src/css/country.css --watch
let lightMode =  document.querySelector('.light-mode') //or document.getElementsByClassName('light-mode')[0]
let darkMode = document.querySelector('.dark-mode') //or document.getElementsByClassName('dark-mode')[0]
let switchEl = document.querySelector('.switch') // or document.getElementsByClassName('switch')[0]
let htmlEl = document.documentElement  //or  document.getElementsByTagName('html')[0] - this get the first html tag only
const loadScreen = document.querySelector('#load-screen');
const countriesEl = document.querySelector('#countries');
let continentWrapper = document.getElementById('continent-wrapper')
let continent = document.getElementById('continent')
let countryArr = []
let filteredArr = []
let filterSearch = ""
let input = document.getElementById('input')
let form = document.getElementById('form')
const search = new URLSearchParams(window.location.search).get("query")





window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        lightMode.classList.remove('hidden')
        darkMode.classList.add('hidden')
        htmlEl.classList.add('dark')
    } 
}
switchEl.addEventListener('click', () => {
    if(darkMode.classList.contains('hidden')){
        darkMode.classList.remove('hidden')
        lightMode.classList.add('hidden')
        htmlEl.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
    else if(lightMode.classList.contains('hidden')){
        lightMode.classList.remove('hidden')
        darkMode.classList.add('hidden')
        htmlEl.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    }
    
})



const searchDislay = (e) => {
e.preventDefault()
let inputEl = input.value
// window.location.href = `search.html?query=${inputEl}` this also opens up a new page
window.open(`search.html?query=${inputEl}`,"_self");

}

form.addEventListener('submit', searchDislay)


continentWrapper.addEventListener('click', () => {
    continent.classList.toggle('hidden')
})

let continents = continent.childNodes
continents.forEach(item => {
    item.addEventListener('click', (event) => {
        continent.classList.add('hidden')
        filterSearch = event.target.textContent
        filteredArr = countryArr.filter((item) => item.continent === filterSearch)
        countryDetails(filteredArr)
        // console.log(filteredArr)
    })
});

const getCountries = () => {
    fetch(`https://restcountries.com/v3.1/name/${search}`)
    .then(response => response.json())
    .then(data => {
        countryArr = data.map((item) => {
            return {
                "name":item.name.common,
                "population":item.population,
                "continent":item.continents[0],
                "capital":item.capital || 'nil',
                "flag": item.flags.png,
                "code": item.cca3
            }
        }).sort(() => Math.random() - Math.random())
        console.log(countryArr)
        countryDetails(countryArr) 
    })
    .catch(err => {
        console.log(err)
        loadScreen.classList.add('hidden')
        let error =`<div><h1>Write a valid country name</h1></div>` 
        countriesEl.innerHTML = error
    }) 
     
}

getCountries()

const countryDetails = (array) => {
    let countries = ""
    array.forEach((item) => {
        countries += `<a href="country.html?code=${item.code}" class="w-4/5 sm:w-full mx-auto">
            <div class="w-full">
                <div class="flag w-full aspect-video">
                    <img src="${item.flag}" class="h-full object-cover w-full" alt="${item.name}">
                </div>
                <div class="country-details w-full p-4 pb-8 text-xs bg-lightFeatures dark:bg-darkFeatures drop-shadow-lg">
                    <p class="mb-2 font-bold text-sm">${item.name}</p>
                    <p class="mb-0.5 font-semibold">Population: <span class="opacity-[.67]">${item.population.toLocaleString()}</span></p>
                    <p class="mb-0.5 font-semibold">Continent: <span class="opacity-[.67]">${item.continent}</span></p>
                    <p class="font-semibold">Capital: <span class="opacity-[.67]">${item.capital}</span></p>
                </div>
            </div>
        </a>`
    countriesEl.innerHTML = countries
    })
    loadScreen.classList.add('hidden')
}
