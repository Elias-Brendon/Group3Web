//from firebase  database 
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref ,push,onValue,remove,update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://test-63f82-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
//DATABASE values 
const app = initializeApp(appSettings);
const database = getDatabase(app);
const LedData = ref(database, "LEDSTAT");

//event listener
const callBtn = document.getElementById("CallToDish");
const dismissBtn = document.getElementById("DismissRobot");
const inputField = document.getElementById("input-field");

//tables 
const tables = ["TABLE1", "TABLE2", "TABLE3", "TABLE4", "TABLE5","TABLE6","TABLE7","TABLE8","TABLE9","TABLE10","TABLE11","TABLE12","TABLE13","TABLE14"];

//RETRIEVING DATA From URL example URL http://example.com?name=Elias&id=12345
// Get the current URL's query parameters
const urlParams = new URLSearchParams(window.location.search);

// Retrieve values by their parameter names
const name = urlParams.get('name');
const id = urlParams.get('id');
if (name && id) {
  inputField.value = `${name}, ${id}`;
} else {
  inputField.innerText = "No name or ID found in the URL!";
} 
// Log or use the values
console.log(`Name: ${name}, ID: ${id}`);

//function to capture input field value , From QR 
function getTheTable(){
  let table_number = parseInt(id);
  if( table_number >= 0 && table_number <= 14 /* Number of tables expected*/){
    return table_number;
  }else{
    //Error message Use an HTML element , Clear the input field , 
    alert("Invalid Table. Please try again!,");
    getTheTable();
  }
}

//To deactivate the call button once pressed 
function disabledCallBtn() {
  callBtn.textContent = " Waiting";
  callBtn.style.backgroundColor = "#DCE1EB";
  callBtn.style.border = "1px solid #D69F3A"
  callBtn.disabled = true;
}


//Function to handle user call request 
callBtn.addEventListener("click",function(){
   //Call function to check the database if Table has a request
   let num = getTheTable();
   let requestCollect = 1; //Testing only
   let table_code = tables[num - 1];
   update(ref(database),{ [table_code] :  requestCollect });
   console.log(tables[num]);
   //inputField.innerHTML = "";
   disabledCallBtn();

})
//function to handle dismiss request 
  dismissBtn.addEventListener("click",function(){
  //update the Table data base setting the table to zero
  let num = getTheTable();
  let requestCollect = 0;//Testing value
  let table_code = tables[num-1];
  update(ref(database),{ [table_code] :  requestCollect });
  //inputField.innerHTML = "";//test
  console.log(tables[num-1]);
  callBtn.disabled = false;
  //farewell page 
  window.open("farewell.html");
   
})


/*onbtn.addEventListener("click",function(){
    let table_number = inputField.value;
    let requestCollect = 1; //one to collect
    let num = parseInt(table_number);
    let table_code = tables[num];
    update(ref(database),{ [table_code] :  requestCollect });
    console.log(tables[num]);
    inputField.innerHTML = "";
})
offbtn.addEventListener("click",function(){
    const table_number = inputField.value;
    let num = parseInt(table_number);
    let requestCollect = 0;  //To dismiss the robot
    let table_code = tables[num];
    update(ref(database),{ [table_code] :  requestCollect });
    inputField.Value= "";
    console.log(inputField.value);
})

//Table number Captured on Request

//string Table_request = "Served";



// DATABASE AND ESP 32 ARE CONNECTED 

/* function to handle  table request , when the user sends data with table number and request , data is send to a table accessed by webpage only , 
the webpage get the requests, sort them and send them to esp on at a time, the esp 32 will send the update once the table has been served then the webpage will send another request , if the table reqdatabase has elements
*/

