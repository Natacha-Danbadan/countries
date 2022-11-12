'use strict'
let lightMode =  document.querySelector('.light-mode') //or document.getElementsByClassName('light-mode')[0]
let darkMode = document.querySelector('.dark-mode') //or document.getElementsByClassName('dark-mode')[0]
let switchEl = document.querySelector('.switch') // or document.getElementsByClassName('switch')[0]
let htmlEl = document.documentElement  //or  document.getElementsByTagName('html')[0] - this get the first html tag only
const loadScreen = document.querySelector('#load-screen');
const countriesEl = document.querySelector('#countries');
let continentWrapper = document.getElementById('continent-wrapper')
let continent = document.getElementById('continent')
let countryArr = []
const search = new URLSearchParams(window.location.search).get("code")
let countryHolder =  document.getElementById('country-holder')

// let filteredArr = []
// let filterSearch = ""

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

const getCountries = () => {
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => {
        let borderBag = data.reduce((acc, cv)  => {
            acc[cv.cca3] = cv.name.common
            return acc
        } ,{}) //main is the code for each of the country and borderBag[main] is the country name in fu
        console.log(borderBag)
        const realBorderNames = (arr) => arr.map((main) => [main, borderBag[main]])
        countryArr = data.filter((element) => element.cca3 == search).map((item) => {
            return {
                "nativeName":Object.values(item.name.nativeName)[0].common,
                "name":item.name.common,
                "population":item.population.toLocaleString(),
                "region":item.region,
                "subRegion":item.subregion || 'nil',
                "capital": String(item.capital || 'nil'),
                "tld":item.tld[0],
                "currencies":Object.values(item.currencies)[0].name,
                "languages":Object.values(item.languages).join(', '),
                "borderCountries":realBorderNames(item.borders || []),
                "flag":item.flags.png
            }
        })
        console.log(countryArr)
        countryDetails(countryArr) 
    })  
}
getCountries()

const countryDetails = (array) => {
    let bordercountries = "", borderArray = array[0].borderCountries
    for(let i = 0; i < borderArray.length; i++ ){
        bordercountries += `<a href="country.html?code=${borderArray[i][0]}"><button class="rounded py-1 px-2 drop-shadow-lg bg-lightFeatures dark:bg-darkFeatures">${borderArray[i][1]}</button></a>` }
    let countries = `<div class="country-wrapper py-6 grid lg:grid-cols-2 gap-10 lg:gap-24">
    <div class="flag lg:aspect-[4.8/3] aspect-video w-full md:w-4/5 lg:w-full mx-auto">
        <img src="${array[0].flag}" class="object-cover h-full" alt="${array[0].name}">
    </div>
   <div class="country-details grid w-full md:w-4/5 lg:w-full mx-auto content-center">
    <p class="mb-6 font-bold text-3xl">${array[0].name}</p>
    <div class="grid md:grid-cols-2 gap-6 lg:gap-14 lg:mb-0 mb-8 ">
        <div class="text-xs lg:mb-10">
            <p class="mb-3 font-semibold ">Native Name: <span class="opacity-[.67]">${array[0].nativeName}</span></p>
            <p class="mb-3 font-semibold">Population: <span class="opacity-[.67]">${array[0].population}</span></p>
            <p class="mb-3 font-semibold">Region: <span class="opacity-[.67]">${array[0].region}</span></p>
            <p class="mb-3 font-semibold">Sub-Region: <span class="opacity-[.67]">${array[0].subRegion}</span></p>
            <p class="mb-3 font-semibold">Capital: <span class="opacity-[.67]">${array[0].capital}</span></p>
        </div>
        <div class="text-xs">
            <p class="mb-3 font-semibold">Top Level Domain: <span class="opacity-[.67]">${array[0].tld}</span></p>
            <p class="mb-3 font-semibold">Currencies: <span class="opacity-[.67]">${array[0].currencies}</span></p>
            <p class="font-semibold">Languages: <span class="opacity-[.67]">${array[0].languages}</span></p>
        </div>
    </div>  
    <div class="lg:flex">
        <div class="mr-3 shrink-0 grow-0 lg:mb-0 md:mb-4 mb-4"><p>Border Countries:</p></div>
        <div class="flex grow gap-1 flex-wrap">${bordercountries}</div>
    </div>    
   </div>
</div>`
    countryHolder.innerHTML = countries
    loadScreen.classList.add('hidden')
}

