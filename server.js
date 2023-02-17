// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;      //set constant varabile 

app.listen(port, () => {   //start server and lisenting on port 8000
    console.log(`Server listening on port ${port}.`);   //print this message when start 
});







const postdata = (request, response) =>{ //handle the incoming request data and store it in projectData
    projectData = request.body;          // Update the projectData object with the incoming request data
     response.send(projectData);         //Send a response with the updated projectData object
    console.log(projectData);              // Log the updated projectData object for debugging purposes
}
app.post('/add' ,postdata);               // Handle a POST request to the endpoint '/add'


function getInfo(req, res) {              //// Function to handle a GET request to the endpoint '/get'
  res.send(projectData);                 // Send the stored projectData object as the response
}
app.get('/get' ,getInfo)                // Handle a GET request to the endpoint '/get'







