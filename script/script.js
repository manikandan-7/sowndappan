let state = {
  Travels: [],
  userDetails: { userSeats: [] }
};

let pickUpAndDropPoints = {
  Salem: ["Salem-1", "Salem-2", "Salem-3", "Salem-4"],
  Coimbatore: ["Coimbatore-1", "Coimbatore-2", "Coimbatore-3", "Coimbatore-4"],
  Chennai: ["Chennai-1", "Chennai-2", "Chennai-3", "Chennai-4"]
};

// access Local storage
storeToLocalStorage = state => window.localStorage.setItem("state", JSON.stringify(state));
getFromLocalStorage = () => JSON.parse(window.localStorage.getItem("state"));
if (!getFromLocalStorage()) {
  window.localStorage.setItem("state", JSON.stringify(state));
}

// routes to redirect to the next page
indexRoute = () => window.location.replace("/html/index.html");
addTravelsRoute = () => window.location.replace("/html/addTravel.html");
bookRoute = () => {
  if (getFromLocalStorage().Travels.length != 0) window.location.replace("/html/book.html");
  else alert("No Bus To Book");
};
bookingSuccessFull = () => {
  alert("Thanks for Booking ... ");
  indexRoute();
};

// helperFunctions
generatePlace = (input, tagName) => {
  let state = getFromLocalStorage();
  let selectTag = `<select id=${tagName}>`;
  pickUpAndDropPoints[input].forEach(element => (selectTag += `<option>${element}</option>`));
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
  let state = getFromLocalStorage(),
    data = state.Travels.find(element => element.id == input),
    seats = data.seats,
    createSeats = "";
  seats.forEach((element, index) => {
    if (index % 4 == 0 && index != 0) createSeats += "<br/>";
    if (element != null && element == 0)
      createSeats += `<button class="seat-buttons seat-btn-hover unSelect" id =${index} onclick="selectSeat(${index})" value="${index}" ><img  height="30px" width="30px" src="../Img/s.svg" /></button>`;
    else if (element != null)
      createSeats += `<button class="seat-buttons seat-btn-hover booked" id =${index} onclick="selectSeat(${index})" value="${index}"><img src="../Img/s.svg" height="30px" width="30px"/></button>`;
  });
  return createSeats;
};

closeModal = () => {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

//Main Functions
addTravels = () => {
  let name = document.getElementById("name").value,
    noOfSeats = document.getElementById("noOfSeats").value,
    from = document.getElementById("addTravelsFrom"),
    to = document.getElementById("addTravelsTo"),
    fromCity = from.options[from.selectedIndex].text,
    toCity = to.options[to.selectedIndex].text,
    state = getFromLocalStorage(),
    seats = [];
  if (name == "") return alert("Name cant be empty");
  if (fromCity === toCity) return alert("From and To are Same");
  if (noOfSeats == "") return alert("No Of Seats cant be empty");
  if (fromCity === "None" || toCity === "None") return alert("Please choose user Location");
  for (var i = 1; i <= noOfSeats; i++) seats[i] = 0;
  state.Travels.push({ id: Math.random(), name: name, from: fromCity, to: toCity, noOfSeats: noOfSeats, seats: seats });
  storeToLocalStorage(state);
  alert("Success. Thanks for registering");
  indexRoute();
};

viewTravels = () => {
  let from = document.getElementById("bookFrom"),
    to = document.getElementById("bookTo"),
    details = document.getElementById("Details"),
    fromCity = from.options[from.selectedIndex].text,
    toCity = to.options[to.selectedIndex].text,
    state = getFromLocalStorage();
  if (fromCity === toCity) return alert("From and To are Same");
  if (fromCity === "None" || toCity === "None") return alert("Please choose user Location");
  let allTravels = state.Travels.filter(element => element.from == fromCity && element.to == toCity);
  if (allTravels.length == 0) return alert("Sorry No travels Available ");
  details.innerHTML =
    "<label>Select Travels</label>" +
    generateTravelsName(allTravels) +
    `<div class="center"><button class="btn-hover color-3" onclick="viewSeats()">Check Seats</button></div>`;
  state.userDetails.fromCity = fromCity;
  state.userDetails.toCity = toCity;
  storeToLocalStorage(state);
};

viewSeats = () => {
  let Travels = document.getElementById("Travels"),
    Seats = document.getElementById("Seats"),
    state = getFromLocalStorage(),
    { fromCity, toCity } = state.userDetails,
    travelsId = Travels.options[Travels.selectedIndex].value,
    travelsName = Travels.options[Travels.selectedIndex].text;
  Seats.innerHTML =
    "<h5>Select Seats</h5><br/>" +
    generateSeats(travelsId) +
    "<br /><br/>" +
    `<h5>Enter your details</h5><label>Name</label><br /><input type="text" name="userName" id="userName"/><br/><label>Age</label><br/><input type="number" id="userAge" name="userAge" />` +
    "<h5>Select From Place</h5>" +
    generatePlace(fromCity, "fromPlace") +
    "<h5>Select To Place</h5>" +
    generatePlace(toCity, "toPlace") +
    `<br/><br/> <button class="btn-hover color-3" id="myBtn" onclick="book()">Book</button>`;
  state.userDetails.travelsId = travelsId;
  state.userDetails.travelsName = travelsName;
  storeToLocalStorage(state);
};

selectSeat = input => {
  let state = getFromLocalStorage(),
    { travelsId } = state.userDetails,
    button = document.getElementById(`${input}`),
    index;
  for (index = 0; index < state.Travels.length; index++) if (state.Travels[index].id == travelsId) break;
  state.Travels[index].seats[input] = state.Travels[index].seats[input] ? 0 : 1;
  if (state.Travels[index].seats[input]) {
    state.userDetails.userSeats.push(input);
    button.classList.remove("unSelect");
    button.classList.add("select");
  } else {
    state.userDetails.userSeats = state.userDetails.userSeats.filter(i => i != input);
    button.classList.remove("select");
    button.classList.add("unSelect");
  }
  storeToLocalStorage(state);
};

generateModelData = () => {
  let state = getFromLocalStorage(),
    { fromCity, toCity, travelsName, userName, age, userSeats, fromPlace, toPlace } = state.userDetails,
    seats = "",
    Preview = "";
  for (var i = 0; i < userSeats.length; i++) seats += userSeats[i] + " ";
  Preview = ` <div class="modal-content"><span onclick="closeModal()" class="close">&times;</span>
   <table>
  <tr><td>Name</td><td>${userName}</td></tr>
  <tr><td>Age</td><td>${age}</td></tr>
  <tr><td>Travels</td><td>${travelsName}</td></tr>
  <tr><td>From</td><td>${fromPlace},${fromCity}</td></tr>
  <tr><td>To</td><td>${toPlace},${toCity}</td></tr>
  <tr><td>Seat No</td><td>${seats}</td></tr>
  <tr><td>Total seats</td><td>${userSeats.length}</td></tr>
  </table>
  <input type="button" value="Cancel" onclick="closeModal()"/>
  <input type="button" value="Confrim" onclick="bookingSuccessFull()"/>
  </div>`;
  return Preview;
};

book = () => {
  let modal = document.getElementById("myModal"),
    fromP = document.getElementById("fromPlace"),
    fromPlace = fromP.options[fromP.selectedIndex].text,
    toP = document.getElementById("toPlace"),
    toPlace = toP.options[toP.selectedIndex].text,
    state = getFromLocalStorage();
  state.userDetails.userName = document.getElementById("userName").value;
  state.userDetails.age = document.getElementById("userAge").value;
  state.userDetails.fromPlace = fromPlace;
  state.userDetails.toPlace = toPlace;
  storeToLocalStorage(state);
  state = getFromLocalStorage();
  let { userName, age, userSeats } = state.userDetails;
  if (userName == "") return alert("Please Enter Name");
  if (age == "" || age < 16) return alert("Please Enter Age and Age should Be greater than 15");
  if (userSeats.length == 0) return alert("Please select seat");
  modal.innerHTML = generateModelData();
  modal.style.display = "block";
};
