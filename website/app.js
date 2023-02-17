
const btn = document.querySelector('#generate'); //select element with id generate

const apiKey = '9e0bbd57d1fe040c2933203159ebcdab&units=imperial';  //my apikey



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();


const fristrunning= ()=>{   // frist run after btn clicked
  const zipcode = document.getElementById('zip').value;   //get the zipcode from the user
  const fell = document.getElementById('feelings').value;  //get the fell from the user
  const link = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=`;  //bulid the api link by zipcode 

  const fetchapi = takedata(link);   //callback the  takedata function 
  fetchapi.then((data)=>{             // When the data is received, create an object with the required same info
    const thefdata={
       mytemp : data.main.temp,
      thefeeling: fell,
       thedate : newDate
    }
    
    postData('/add', thefdata)       // Post the data to the endpoint
  }).then(() => retrieveData())       // get the data from the endpoint

  
  }
  
  
  
  

  
  





// step1: function to get data from the openweathermap
const takedata = async (link) => {
  const url = `${link}${apiKey}`;     
  try {
    const res = await fetch(url);       // the sending of request don't complete until the response executed
    const date = await res.json();    //transformation the response to json
    return date;         //return the data
  } catch (error) {
    console.error("An error occurre:", error);  // print this sentence if  any error occurred
  }
};



// step2: send data to the local server

async function postData(url, thefdata) {      //async function posts the request to url
  try {
    const response = await fetch(url, {      // Make a POST request to the URL with thefdata 
      method: 'POST',                                        // use the http post method
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },  // Specify the Content-Type header as application/json
      body: JSON.stringify(thefdata),       
    });
    const result = await response.json();   //transformation the response to json format
    console.log(result);                    //print the result
  } catch (error) {
    console.log('Error:', error);        // print a error if  any error occurred
  }
}







// step3: get data from local server 
const retrieveData = async () =>{
  const request = await fetch('/get');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.mytemp)+ 'degrees';
  document.getElementById('content').innerHTML = allData.thefeeling;
  document.getElementById("date").innerHTML =allData.thedate;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
 }



btn.addEventListener('click',fristrunning); //the code will execute when the user click in button



