function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        console.log(parseInt(i)+1);
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        console.log(parseInt(i)+1);
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft").value;
  console.log(sqft);
  var bhk = getBHKValue();
  console.log(bhk);
  var bathrooms = getBathValue();
  console.log(bathrooms);
  var location = document.getElementById("uiLocations").value;
  console.log(location);
  var estPrice = document.getElementById("uiEstimatedPrice");
  // console.log(estPrice);

  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  $.post(url, {
      location: location,
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bathrooms
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
