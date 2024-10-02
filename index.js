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
    try{
        const data=await fetch(`${url}`);
        const jsonDataValue=await (data.json());
    
   
        locationNotFound.style.display="none";
        weather_body.style.display="flex";
        console.log(jsonDataValue);
        const cityName=document.querySelector('.city');
        cityName.innerText=jsonDataValue.name;

        const formattedDateTime=new Date();
        const date=document.querySelector('.date');
        // date.innerHTML=`${formattedDateTime.toDateString()}`;

        const timezoneOffset=jsonDataValue.timezone;
        const cityTime=document.querySelector('.time');

        function updateCityDateTime(timezoneOffset){
            const localTime=new Date();
            const utcTime=localTime.getTime()+localTime.getTimezoneOffset()*60000;
            const cityTimeInMs = utcTime + (timezoneOffset * 1000); // Convert seconds to milliseconds
            const cityLocalTime = new Date(cityTimeInMs);
             // Display the formatted date and time
            cityTime.innerText = cityLocalTime.toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            });

        }
        updateCityDateTime(timezoneOffset);

        // // Optionally, keep updating the time every second
        //     setInterval(() => {
        //         updateCityDateTime(timezoneOffset);
        //     }, 1000);

      
        temperature.innerHTML=`${Math.round(jsonDataValue.main.temp-273.15)}°C`;
        description.innerHTML=`${jsonDataValue.weather[0].description}`;
        console.log();
        humidity.innerHTML=`${jsonDataValue.main.humidity}%`;
        wind_speed.innerHTML=`${jsonDataValue.wind.speed}Km/H`;

        switch(jsonDataValue.weather[0].main){
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
       console.log(jsonDataValue);
    }
    catch(error){
        locationNotFound.style.display="flex";
        weather_body.style.display="none";
        console.error("Unable to fetch api.");
        return;
    }
}
    
    

    

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});
