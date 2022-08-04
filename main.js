async function start() {
   const response = await fetch("https://dog.ceo/api/breeds/list/all") 
   const data = await response.json()
   //Message contains the list of dog names
   createBreedList(data.message)
}
start()
//Recieves the data from the message/ can name the parameter anything
//creates html drop down from data
function createBreedList(breedList) {
   //Made a template literal to get breedlist info
   document.getElementById("breed").innerHTML = `
   <select>
            <option>Choose a breed</option>
           

        </select>
   `
    
}