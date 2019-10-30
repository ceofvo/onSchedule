const responseContainer = document.querySelector('.main-background');
const setDate = document.querySelector('.date');
const setTime = document.querySelector('.time');
const setGreeting = document.querySelector('.greeting');
const weatherImage = document.querySelector('#weather-image');
const weatherDesc = document.querySelector('.weather-desc');
const weatherTemp = document.querySelector('.weather-temp');


const params = {
  access_key: '9d77df11c7e0b5c5d94895b5913b234f',
  query: 'Lagos'
} 

const images = [
  'images/cloudy.svg', 
  'images/thunder.svg', 
  'images/3.jpg'
];

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}


function processData(data) {
  console.log(data);
  weatherDesc.textContent = data.current.weather_descriptions[0];
  weatherTemp.textContent = data.current.temperature;
  weatherImage.src = images[1];
 }


 function fetchJSON(){
  fetch(`https://source.unsplash.com/collection/3389897/1920x1200`) 
    .then((response)=> {   

      responseContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url("${response.url}")`;

      console.log(response.url);   
    })
}
/*function fetchJSON() {
    fetch(`https://source.unsplash.com/collection/3389897/1920x1200`)
    .then(validateResponse)
    .then( response => response.json() )
    .then(data=>console.log(data))
    .catch();
}*/

fetchJSON();
//https://source.unsplash.com/collection/3389897/480x480


//Get current weather 
function fetchWeather() {
  fetch(`http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`)
  .then(validateResponse)
  .then(response => response.json())
  .then(processData)
  .catch(logError);
}

fetchWeather();



function currentDate() {
  const now = new Date();
  const hours = now.getHours();
  let timeOfDay

  //Deterrmine what hour of day and apply appropriate greeting
  if(hours < 12) {
    timeOfDay = "morning" ;
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon" ;
  } else {
    timeOfDay = "night" ;
  }

  const optionsDate = {
    year: 'numeric', month: 'long', weekday: 'long', day: 'numeric'
  };
  const optionsTime = {
    hour: 'numeric', minute: 'numeric',
    hour12: true
  };
  const datePart = new Intl.DateTimeFormat('en-US', optionsDate).format(now);
  const timePart = new Intl.DateTimeFormat('en-US', optionsTime).format(now);
  setDate.textContent = datePart;
  setTime.textContent = timePart;
  setGreeting.textContent = timeOfDay;
}

setInterval(currentDate, 1000);

currentDate();



/*
const numItemsToGenerate = 2; //how many gallery items you want on the screen
const numImagesAvailable = 242; //how many total images are in the collection you are pulling from
const imageWidth = 480; //your desired image width in pixels
const imageHeight = 480; //desired image height in pixels
const collectionID = 3389897; //1163637; //the collection ID from the original url
const $galleryContainer = document.querySelector('.gallery-container');

function renderGalleryItem(randomNumber){
  fetch(`https://source.unsplash.com/collection/3389897/1920x1200/?sig=1`) 
    .then((response)=> {   
      console.log(response);   
      let galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `
        <img class="gallery-image" src="${response.url}" alt="gallery image"/>
      `
      $galleryContainer.appendChild(galleryItem);
    })
}

for(let i=0;i<numItemsToGenerate;i++){
  let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
  renderGalleryItem(randomImageIndex);
}
*/


