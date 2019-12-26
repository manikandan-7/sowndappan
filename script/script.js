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
  let data = getFromLocalStorage();
  data.userDetails = state.userDetails;
  storeToLocalStorage(data);
  alert("Thanks for Booking ... ");
  indexRoute();
};

// helperFunctions
geenrateSeatHelp = className => {
  let img = createImgElement("../Img/s.svg", "30px", "30px"),
    button = createButtonElement("", "", `seat-buttons seat-btn-hover ${className}`, "");
  button.appendChild(img);
  return button;
};

generateSeats = input => {
  let state = getFromLocalStorage(),
    data = state.Travels.find(element => element.id == input),
    seats = data.seats,
    createSeats = "";
  let div = createDivElement("", "");

  seats.forEach((element, index) => {
    let button, img;
    if (index % 4 == 0 && index != 0) div.appendChild(createBreakElement());
    if (element != null && element == 0) {
      img = createImgElement("../Img/s.svg", "30px", "30px");
      button = createButtonElement(null, `selectSeat(${index})`, "seat-buttons seat-btn-hover unSelect", index);
      button.appendChild(img);
      div.appendChild(button);
    } else if (element != null) {
      img = createImgElement("../Img/s.svg", "30px", "30px");
      button = createButtonElement(null, `selectSeat(${index})`, "seat-buttons seat-btn-hover booked", index);
      button.appendChild(img);
      div.appendChild(button);
    }
  });
  return div;
};

closeModal = () => {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

createTextElement = input => document.createTextNode(input);
createLabelEement = input => {
  let label = document.createElement("LABEL");
  return label.appendChild(createTextElement(input));
};
createImgElement = (src, height, width) => {
  let img = document.createElement("IMG");
  img.setAttribute("src", src);
  img.setAttribute("height", height);
  img.setAttribute("width", width);
  return img;
};
createBreakElement = () => document.createElement("BR");
createButtonElement = (value, onclick, className, id) => {
  var button = document.createElement("BUTTON");
  button.setAttribute("onclick", onclick);
  button.setAttribute("class", className);
  button.setAttribute("id", id);
  var t = document.createTextNode(value);
  if (value) button.appendChild(t);
  return button;
};
createSelectElementWithName = (input, tagName) => {
  var selectList = document.createElement("select");
  selectList.id = tagName;
  for (var i = 0; i < input.length; i++) {
    var option = document.createElement("option");
    option.value = input[i].id;
    option.text = input[i].name;
    selectList.appendChild(option);
  }
  return selectList;
};
createSelectElement = (input, tagName) => {
  var selectList = document.createElement("select"),
    data = pickUpAndDropPoints[input];
  selectList.id = tagName;
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.text = data[i];
    selectList.appendChild(option);
  }
  return selectList;
};
createDivElement = (className, id) => {
  let div = document.createElement("DIV");
  div.setAttribute("class", className);
  div.setAttribute("id", id);
  return div;
};
createInputElement = (type, name, id) => {
  var input = document.createElement("INPUT");
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.setAttribute("id", id);
  return input;
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

  // create a View Travels FormData
  if (details) details.remove();
  let cardForm = document.body.childNodes[1].childNodes[3],
    detailsDiv = createDivElement("", "Details"),
    btnViewSeats = createButtonElement("View Seats", "viewSeats()", "btn-hover color-3"),
    btnCancel = createButtonElement("Cancel", "indexRoute()", "btn-hover color-2"),
    btnDiv = createDivElement("center", "center"),
    label = createLabelEement("Select Travels"),
    select = createSelectElementWithName(allTravels, "Travels");
  btnDiv.appendChild(btnViewSeats);
  btnDiv.appendChild(btnCancel);
  detailsDiv.appendChild(label);
  detailsDiv.appendChild(select);
  detailsDiv.appendChild(btnDiv);
  cardForm.appendChild(detailsDiv);
  //setting to localStorage
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
  if (Seats) Seats.remove();
  let cardForm = document.body.childNodes[1].childNodes[3],
    seatsDiv = createDivElement("", "Seats");
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(createLabelEement("Select Seats"));
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(geenrateSeatHelp("booked"));
  seatsDiv.appendChild(createLabelEement("Booked"));
  seatsDiv.appendChild(geenrateSeatHelp("select"));
  seatsDiv.appendChild(createLabelEement("Selected"));
  seatsDiv.appendChild(geenrateSeatHelp("unSelect"));
  seatsDiv.appendChild(createLabelEement("Not Booked"));
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(generateSeats(travelsId));
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(createLabelEement("Enter your Details"));
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(createBreakElement());
  seatsDiv.appendChild(createLabelEement("Name"));
  seatsDiv.appendChild(createInputElement("text", "userName", "userName"));
  seatsDiv.appendChild(createLabelEement("Age"));
  seatsDiv.appendChild(createInputElement("number", "userAge", "userAge"));
  seatsDiv.appendChild(createLabelEement("Select From Place"));
  seatsDiv.appendChild(createSelectElement(fromCity, "fromPlace"));
  seatsDiv.appendChild(createLabelEement("Select To Place"));
  seatsDiv.appendChild(createSelectElement(toCity, "toPlace"));
  seatsDiv.appendChild(createButtonElement("Book", "book()", "btn-hover color-3"));
  cardForm.appendChild(seatsDiv);
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
  Preview = ` <div class="modal-content">
  <h3>Seat Info</h3>
   <table>
  <tr><td>Name</td><td>${userName}</td></tr>
  <tr><td>Age</td><td>${age}</td></tr>
  <tr><td>Travels</td><td>${travelsName}</td></tr>
  <tr><td>From</td><td>${fromPlace},${fromCity}</td></tr>
  <tr><td>To</td><td>${toPlace},${toCity}</td></tr>
  <tr><td>Seat No</td><td>${seats}</td></tr>
  <tr><td>Total seats</td><td>${userSeats.length}</td></tr>
  </table>
  <div style="text-align:center">
  <button class="btn-hover color-2"  onclick="closeModal()">Close</button>
  <button class="btn-hover color-3" onclick="bookingSuccessFull()">Confrim</button>
  <div>
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
