let tempBLock = document.querySelector('#temp')
let cityBlock = document.querySelector('#city')
let searchInp = document.querySelector('.location-btn')
let weatherIcon = document.querySelector('.today-weather i')
let circle = document.querySelector(".circle")
let city = 'Kyiv'
let d = new Date();
let n = d.getDay();
let numberMonth = d.getDate();
let m = d.getMonth();
let numberYear = d.getFullYear();
function Name(){
    circle.classList.remove("active");
}


document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init()
        searchInp.value = ''
        circle.classList.add("active");
        setTimeout(function(){
            circle.classList.remove("active")
        }, 4000)
    }
})


function init() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4dc56e50d74d5f242b91a0c472b6f8e`)
    .then((resp) => {return resp.json()})
    .then((data) => {

        cityBlock.textContent = `${data.name}`

        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        let month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        
        let d = new Date();
        let n = d.getDay();
        let numberMonth = d.getDate();
        let m = d.getMonth();   
        let numberYear = d.getFullYear();


        document.querySelector('#temp').innerHTML = Math.round(data.main.temp - 273) + "°C"
        document.querySelector('#humidity').innerHTML = data.main.humidity + "%"
        document.querySelector('#wind').innerHTML = data.wind.speed + "km/h"
        document.querySelector('#feelsLike').innerHTML = Math.round(data.main.feels_like - 273) + "°C"
        document.querySelector('.today-weather p').innerHTML = data.weather[0].description
        // document.querySelector('.today-info-title').innerHTML = (days[n])+","
        // document.querySelector('.date').innerHTML = numberMonth + " " + (month[m]) + " " + numberYear
        
        console.log(data)

        let time = data.timezone / 3600
        console.log(time)

        
        if(time == -12){
            timeCod = "IDLW";
        } else if(time === -11){
            timeCod = "NUT";
        } else if(time === -10){
            timeCod = "HST";
        } else if(time === -9){
            timeCod = "AKST"
        } else if(time === -8){
            timeCod = "PST"
        } else if(time === -7){
            timeCod = "MST"
        } else if(time === -6){
            timeCod = "CST"
        } else if(time === -5){
            timeCod = "COT"
        } else if(time === -4){
            timeCod = "AST"
        } else if(time === -3){
            timeCod = "BRT";
        } else if(time === -2){
            timeCod = "GST";
        } else if(time === -1){
            timeCod = "AZOT"
        } else if(time === 0){
            timeCod = "GMT"
        } else if(time === 1){
            timeCod = "CET"
        } else if(time === 2){
            timeCod = "EET"
        } else if(time === 3){
            timeCod = "EAT"
        }  else if(time === 4){
            timeCod = "AMT"
        }  else if(time === 5){
            timeCod = "UZT";
        }  else if(time === 6){
            timeCod = "OMST"
        } else if(time === 7){
            timeCod = "KRAT"
        } else if(time === 8){
            timeCod = "AWST"
        } else if(time === 9){
            timeCod = "JST"
        } else if(time === 9,5){
            timeCod = "ACST"
        } else if(time === 10){
            timeCod = "AEST"
        } else if(time === 10,5){
            timeCod = "LHST"
        } else if(time === 11){
            timeCod = "SBT"
        } else if(time === 12){
            timeCod = "NZST"
        } else if(time === 12,75){
            timeCod = "CHAST"
        } else if(time === 13){
            timeCod = "TOT"
        } else if(time === 14){
            timeCod = "LINT"
        } else{
            console.log("Ті дауні")
        }

        console.log(timeCod)

        let g = d.toLocaleString('en-GB', { timeZone: `${timeCod}`}).slice(-8, -6);
        
        console.log(g)

        if(g >= 6 && g < 20){
            setTimeout(function(){
                circle.className = "circle sun"
               }, 800)
        } else{
            setTimeout(function(){
                circle.className = "circle moon"
            }, 800)
        }


        if(data.weather[0].main == "Clear"){
            weatherIcon.className = "fa-solid fa-sun size";
        } else if (data.weather[0].main == "Rain"){
            weatherIcon.className = "fa-solid fa-cloud-rain size";
        } else if (data.weather[0].main == "Mist"){
            weatherIcon.className = "fa-solid fa-cloud-mist size";
        } else if (data.weather[0].main == "Drizzle"){
            weatherIcon.className = "fa-solid fa-cloud-drizzle size";
        } else if (data.weather[0].main == "Clouds"){
            weatherIcon.className = "fa-solid fa-cloud size";
        }
    })
}
init()
