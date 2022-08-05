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
           ${Object.keys(breedList).map(function (breed) {
            return `<option>${breed}</option>`
           }).join('')}

        </select>
   `;
}
//made loadByBreed function to populate text with breed information
async function loadByBreed(breed) {
   if(breed != "Choose a dog breed"){
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      const data = await response.json()
      console.log(data)
   }
}
