const inputBox=document.querySelector('.input-box');
const searchBtn=document.querySelector('#searchBtn');
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind-speed');
const locationNotFound=document.querySelector('.location-not-found');
const weather_body=document.querySelector('.weather-body');


async function checkWeather(city)
{
    const api_key="6e33251577b33dc0a798f782b10f90ec";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const data=await fetch(`${url}`).then((response)=>response.json())
    if(data.cod==='404'){
        locationNotFound.style.display="flex";
        weather_body.style.display="none";
        console.log("Unable to fetch.");
        return;
    }   
        locationNotFound.style.display="none";
        weather_body.style.display="flex";
        console.log(data);
        const cityName=document.querySelector('.city');
        cityName.innerText=data.name;
        const formattedDateTime=new Date();
        const date=document.querySelector('.date');
        date.innerHTML=`${formattedDateTime.toLocaleString()}`;
      
        temperature.innerHTML=`${Math.round(data.main.temp-273.15)}°C`;
        description.innerHTML=`${data.weather[0].description}`;
        console.log();
        humidity.innerHTML=`${data.main.humidity}%`;
        wind_speed.innerHTML=`${data.wind.speed}Km/H`;

        switch(data.weather[0].main){
            case 'Clouds':
                weather_img.src="/assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src="/assets/clear.png";
                break;
            case 'Haze':
                weather_img.src="/assets/rain.png";
                break;
            case 'Mist':
                weather_img.src="/assets/mist.png";
                break;
            case 'Snow':
                weather_img.src="/assets/snow.png";
                break;
        }
       console.log(data);
    }
    
    

    

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});
