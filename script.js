getValue = () => {
  let totalAmount = document.getElementById("totalAmount").value,
    noOfPeople = document.getElementById("noOfPeople").value,
    People = document.getElementById("People"),
    generatedHtml = '<div class="Card"><h2>Enter People Details</h2>';

  //   validate values
  document.getElementById("totalAmoutLabel").innerHTML = "Total Amount";
  document.getElementById("noOfPeopleLabel").innerHTML = "No Of People";
  if (!totalAmount) return (document.getElementById("totalAmoutLabel").innerHTML = "Total Amount is Wrong !!");
  if (!noOfPeople) return (document.getElementById("noOfPeopleLabel").innerHTML = "No Of People is Wrong !!");

  //generate Fields
  for (var i = 1; i <= noOfPeople; i++)
    generatedHtml +=
      '  <label for="TotalAmout">People' +
      i +
      '</label><br /><input type="text" name="People" id="People-' +
      i +
      '" /><br /><br />';
  generatedHtml += '<button value="Submit" onclick="getPeopleName()">Submit</button>';
  generatedHtml += "</div>";
  People.innerHTML = generatedHtml;

  return;
};
getPeopleName = () => {
  let totalAmount = document.getElementById("totalAmount").value,
    noOfPeople = document.getElementById("noOfPeople").value,
    peopleName = [],
    err = {};

  //get people values
  for (var i = 1; i <= noOfPeople; i++) {
    peopleName[i] = document.getElementById(`People-${i}`).value;
    // let label =
    // if(peopleName == "") err.
  }

  createTable(peopleName, totalAmount / noOfPeople, noOfPeople);
  return;
};
createTable = (peopleName, Share, noOfPeople) => {
  let PeopleTable = document.getElementById("PeopleTable"),
    heading = '<div class="Card"><h2>Records</h3>',
    table = "<table><tr><th>People_Name</th><th>Share</th></tr>";
  for (var i = 1; i <= noOfPeople; i++) table += "<tr><td>" + peopleName[i] + "</td><td>" + Share + "</td></tr>";
  table += "</table></div>";
  PeopleTable.innerHTML += heading + table;
};
