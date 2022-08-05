let timer
let deleteFirstPhotoDelay


async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  //Message contains the list of dog names
  createBreedList(data.message);
}
start();
//Recieves the data from the message/ can name the parameter anything
//creates html drop down from data
function createBreedList(breedList) {
  //Made a template literal to get breedlist info
  //the Object key will return an array called map
  //made an anonymous function
  //join to delete the spaces
  document.getElementById("breed").innerHTML = `
   <select onchange="loadByBreed(this.value)">
            <option>Choose a breed</option>
           ${Object.keys(breedList)
             .map(function (breed) {
               return `<option>${breed}</option>`;
             })
             .join("")}

        </select>
   `;
}
//made loadByBreed function to populate text with breed information
async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    console.log(data);
    createSlideShow(data.message);
  }
}
//create slideshow function to get pictures from data.message
function createSlideShow(images) {
  let currentPosition = 0;
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  //make images dynamic in template literal
  if (images.length > 1) {
   document.getElementById("slideshow").innerHTML = ` 
  <div class="slide" style="background-image: url('${images[0]}')"></div> 
  <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
   document.getElementById("slideshow").innerHTML = ` 
  <div class="slide" style="background-image: url('${images[0]}')"></div> 
  <div class="slide"></div>
    `
  }
  
  

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `  <div class="slide" style="background-image: url('${images[currentPosition]}')"></div> `
      );
     deleteFirstPhotoDelay =  setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
