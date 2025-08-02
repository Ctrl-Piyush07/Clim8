const city = document.getElementById('city');
const button1 = document.querySelector('.search');
const button2 = document.querySelector('.btn-2');
const area = document.querySelector('.h3-one');
const temperature = document.querySelector('.para-two');
const time = document.querySelector('.h4-one');
const humidity = document.querySelector('.span-1');
const wind = document.querySelector('.span-2');
const air = document.querySelector('.span-3');


async function getDataManually(value) {
    const result1 = await fetch(`https://api.weatherapi.com/v1/current.json?key=d03aedf7eae94ef793d161309250407&q=${value}&aqi=yes`);
    return await result1.json();
}

button1.addEventListener('click', async () => {
    const value = city.value;
    const result = await getDataManually(value);
    console.log(result);
    area.innerText = `${result.location.name},${result.location.region},${result.location.country}`;
    temperature.innerText = `Outside Temperature is:${result.current.temp_c}\u00B0C (${result.current.condition.text})`;
    time.innerText = `Local time:${result.location.localtime}`;
    humidity.innerText = `${result.current.humidity}`;
    wind.innerText = `${result.current.wind_kph}`;
    air.innerText = `${result.current.air_quality.pm2_5}`;
})

async function getDataDirectly(latitude,longitude){
  const result2 = await fetch(`https://api.weatherapi.com/v1/current.json?key=d03aedf7eae94ef793d161309250407&q=${latitude},${longitude}&aqi=yes`);
  return await result2.json();
}

async function gotLocation(position) {
    console.log(position);
    const result=await getDataDirectly(position.coords.latitude,position.coords.longitude);
    console.log(result);
    area.innerText = `${result.location.name},${result.location.region},${result.location.country}`;
    temperature.innerText = `Outside Temperature is:${result.current.temp_c}\u00B0C (${result.current.condition.text})`;
    time.innerText = `Local time:${result.location.localtime}`;
    humidity.innerText = `${result.current.humidity}`;
    wind.innerText = `${result.current.wind_kph}`;
    air.innerText = `${result.current.air_quality.pm2_5}`;
}

function failedToGet(){
    alert('Failed to get location!');
}

button2.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(gotLocation,failedToGet);
    if(city.value!==''){
        city.value='';
    }
})