import document from "document";
import { HeartRateSensor } from "heart-rate";

let hrmData = document.getElementById("hrm-data");
let hrvData = document.getElementById("hrv-data");

let hrm = new HeartRateSensor();

hrm.start();

var heartrate_array = [];

function refreshData() {
  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };

  hrmData.text = JSON.stringify(data.hrm.heartRate);
  heartrate_array.push(data.hrm.heartRate);
  
  if (heartrate_array.length > 50) {
    heartrate_array = heartrate_array.slice(heartrate_array.length - 50, heartrate_array.length);
  } 
  
  if (heartrate_array.length > 5) {
    let hrvCalc = 0;
   
    let squares = [];
    for (var i = 0; i < heartrate_array.length - 1; i++) {
      squares.push(Math.pow(heartrate_array[i] - heartrate_array[i+1], 2));
    }
    var sum = squares.reduce(function(a, b) { return a + b; });
    var avg = sum / squares.length;

    hrvCalc = Math.round(Math.sqrt(avg) * 100) / 100;
    
    hrvData.text = JSON.stringify(hrvCalc);
  } else {
    hrvData.text = "Calculating...";
  }
}

refreshData();
setInterval(refreshData, 1000);
