let state = {
  Travels: [
    { from: "Salem", id: 0.8153748816684404, name: "RedBus", noOfSeats: 5, to: "Chennai", seats: [0, 1, 0, 0, 0] },
    { from: "Chennai", id: 0.8153748286684421, name: "Yuri", noOfSeats: 5, to: "Salem", seats: [0, 0, 1, 0, 0] },
    { from: "Coimbatore", id: 0.8153458886684404, name: "Keerthi", noOfSeats: 5, to: "Salem", seats: [0, 0, 1, 1, 0] },
    { from: "Chennai", id: 0.8153748686684421, name: "Arthi", noOfSeats: 4, to: "Coimbatore", seats: [0, 0, 0, 0] },
    { from: "Salem", id: 0.8153748882684404, name: "Red", noOfSeats: 4, to: "Chennai", seats: [0, 0, 0, 0] },
    { from: "Chennai", id: 0.8153748886694421, name: "Vinayaga", noOfSeats: 5, to: "Salem", seats: [1, 0, 1, 0, 0] },
    { from: "Coimbatore", id: 0.8153758866684404, name: "Geethu", noOfSeats: 5, to: "Salem", seats: [0, 0, 0, 0, 1] },
    { from: "Chennai", id: 0.8153748886384421, name: "Bus", noOfSeats: 5, to: "Coimbatore", seats: [0, 1, 0, 1, 0] },
    { from: "Salem", id: 0.8153748986684404, name: "CoinBus", noOfSeats: 5, to: "Coimbatore", seats: [0, 0, 0, 0, 0] },
    { from: "Salem", id: 0.8153748886614404, name: "BusStore", noOfSeats: 5, to: "Coimbatore", seats: [0, 0, 0, 1, 0] }
  ],
  Salem: ["s-1", "s-2", "s-3", "s-4"],
  Coimbatore: ["c-1", "c-2", "c-3", "c-4"],
  Chennai: ["ch-1", "ch-2", "ch-3", "ch-4"],
  userSeats: []
};

// routes
indexRoute = () => window.location.replace("/index.html");
addTravelsRoute = () => window.location.replace("/addTravel.html");
bookRoute = () => {
  if (state.Travels.length) window.location.replace("/book.html");
};
bookingSuccessFull = () => {
  alert("Thanks for Booking ... ");
  indexRoute();
};
// helperFunctions
generatePlace = (input, tagName) => {
  let selectTag = `<select id=${tagName}>`;
  state[input].forEach(element => (selectTag += `<option>${element}</option>`));
  selectTag += "</select>";
  return selectTag;
};
generateTravelsName = input => {
  let selectTag = '<select id="Travels">';
  input.forEach(element => (selectTag += `<option value=${element.id}>${element.name}</option>`));
  selectTag += "</select>";
  return selectTag;
};
generateSeats = input => {
  let data = state.Travels.find(element => element.id == input);
  let seats = data.seats,
    createSeats = "";
  seats.forEach((element, index) => {
    if (index % 4 == 0 && index != 0) createSeats += "<br/>";
    if (element == 0) createSeats += `<input type="button" id =${index} onclick="selectSeat(${index})" value="${index}"/>`;
    else createSeats += `<input type="button"  onclick="selectSeat(${index})" value="${index}" disabled/>`;
  });
  return createSeats;
};

// functions

addTravels = () => {
  let name = document.getElementById("name").value,
    noOfSeats = document.getElementById("noOfSeats").value,
    from = document.getElementById("addTravelsFrom"),
    to = document.getElementById("addTravelsTo"),
    fromCity = from.options[from.selectedIndex].text,
    toCity = to.options[to.selectedIndex].text,
    seats = [];
  if (name == "") return alert("Name cant be empty");
  if (fromCity === toCity) return alert("From and To are Same");
  if (noOfSeats == "") return alert("No Of Seats cant be empty");
  if (fromCity === "None" || toCity === "None") return alert("Please choose user Location");
  for (var i = 1; i <= noOfSeats; i++) seats[i] = 0;
  state.Travels.push({ id: Math.random(), name: name, from: fromCity, to: toCity, noOfSeats: noOfSeats, seats: seats });
  alert("Success. Thanks for registering");
  indexRoute();
};

viewTravels = () => {
  let from = document.getElementById("bookFrom"),
    to = document.getElementById("bookTo"),
    details = document.getElementById("Details"),
    fromCity = from.options[from.selectedIndex].text,
    toCity = to.options[to.selectedIndex].text;
  if (fromCity === toCity) return alert("From and To are Same");
  if (fromCity === "None" || toCity === "None") return alert("Please choose user Location");
  let allTravels = state.Travels.filter(element => element.from == fromCity && element.to == toCity);
  if (allTravels.length == 0) return alert("Sorry No travels Available ");
  details.innerHTML =
    "<h5>Select Travels</h5>" +
    generateTravelsName(allTravels) +
    `<br/><br/><input type="button" value="View Seats" onclick="viewSeats()" />`;
};

viewSeats = () => {
  let Travels = document.getElementById("Travels"),
    Seats = document.getElementById("Seats"),
    from = document.getElementById("bookFrom"),
    to = document.getElementById("bookTo"),
    fromCity = from.options[from.selectedIndex].text,
    toCity = to.options[to.selectedIndex].text;
  TravelsId = Travels.options[Travels.selectedIndex].value;
  Seats.innerHTML =
    "<h5>Select Seats</h5><br/>" +
    generateSeats(TravelsId) +
    "<br /><br/>" +
    `<h5>Enter your details</h5><label>Name</label><br /><input type="text" name="userName" id="userName"/><br/><label>Age</label><br/><input type="age" id="userAge" name="userAge" />` +
    "<h5>Select From Place</h5>" +
    generatePlace(fromCity, "fromPlace") +
    "<h5>Select To Place</h5>" +
    generatePlace(toCity, "toPlace") +
    `<br/><br/> <button id="myBtn" onclick="book()">Book</button>`;
};

selectSeat = input => {
  let Travels = document.getElementById("Travels"),
    Seats = document.getElementById("Seats"),
    button = document.getElementById(`${input}`);
  TravelsId = Travels.options[Travels.selectedIndex].value;
  let index,
    data = state.Travels;
  for (index = 0; index < state.Travels.length; index++) if (data[index].id == TravelsId) break;
  state.Travels[index].seats[input] = state.Travels[index].seats[input] ? 0 : 1;
  if (state.Travels[index].seats[input]) {
    state.userSeats.push(input);
    button.className = "primary";
  } else {
    state.userSeats = state.userSeats.filter(i => i != input);
    button.classList.remove("primary");
  }
};

getTravels = async id => {
  return state.Travels.find(element => element.id == id);
};

book = () => {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var btn = document.getElementById("myBtn");
  let userName = document.getElementById("userName").value,
    age = document.getElementById("userAge").value,
    from = document.getElementById("bookFrom"),
    to = document.getElementById("bookTo"),
    fromCity = from.options[from.selectedIndex].text,
    toCity = to.options[to.selectedIndex].text,
    fromP = document.getElementById("fromPlace"),
    toP = document.getElementById("toPlace"),
    fromPlace = fromP.options[fromP.selectedIndex].text,
    toPlace = toP.options[toP.selectedIndex].text,
    Travels = document.getElementById("Travels"),
    TravelsName = Travels.options[Travels.selectedIndex].text,
    seats = "",
    Preview = "";
  if (state.userSeats.length == 0) return alert("Please select seat");
  for (var i = 0; i < state.userSeats.length; i++) seats += state.userSeats[i];
  Preview = `<table>
  <tr><td>Name</td><td>${userName}</td></tr>
  <tr><td>Age</td><td>${age}</td></tr>
  <tr><td>Travels</td><td>${TravelsName}</td></tr>
  <tr><td>From</td><td>${fromPlace},${fromCity}</td></tr>
  <tr><td>To</td><td>${toPlace},${toCity}</td></tr>
  <tr><td>Seat No</td><td>${seats}</td></tr>
  <tr><td>Total seats</td><td>${state.Travels.length}</td></tr>
  </table>
  <input type="button" value="Cancel" onclick="closeModal()"/>
  <input type="button" value="Confrim" onclick="bookingSuccessFull()"/>`;
  let data = ` <div class="modal-content"><span onclick="closeModal()" class="close">&times;</span>` + Preview + `</div>`;
  modal.innerHTML = data;
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModal = () => {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};
