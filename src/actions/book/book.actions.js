import { getDataFromLocalStorage, setDataToLocalStorage } from "../../store/store";

export const filterBusAction = (from, to) => {
  let travels = getDataFromLocalStorage("travels");
  let filteredBus = travels.filter(bus => bus.from === from && bus.to === to);
  return filteredBus;
};

export const travelDetails = () => {
  let user = getDataFromLocalStorage("currentUserDetails");
  let { travelDetails } = user;
  return travelDetails;
};

export const findBusUsingId = id => {
  let travels = getDataFromLocalStorage("travels");
  let bus = travels.find(bus => bus.id === id);
  return bus;
};

export const cancelTicketFormTravelDetails = (id, ticket) => {
  //current details
  let currentUser = getDataFromLocalStorage("currentUserDetails"),
    index,
    dateIndex;
  let newTravelDetails = currentUser.travelDetails.filter(i => i.id !== id);
  currentUser.travelDetails = newTravelDetails;
  setDataToLocalStorage("currentUserDetails", currentUser);
  // //push to userDetails
  let user = getDataFromLocalStorage("userDetails");
  for (index = 0; index < user.length; index++) if (currentUser.id === user[index].id) break;
  newTravelDetails = user[index].travelDetails.filter(i => i.id !== id);
  user[index].travelDetails = newTravelDetails;
  setDataToLocalStorage("userDetails", user);
  //update travels
  let travels = getDataFromLocalStorage("travels");
  for (index = 0; index < travels.length; index++) if (travels[index].id === ticket.travelsId) break;
  let dates = travels[index].dates;
  for (dateIndex = 0; dateIndex < dates.length; dateIndex++) if (dates[dateIndex].date === ticket.date) break;
  for (var j = 0; j < ticket.seats.length; j++) dates[dateIndex].seats[ticket.seats[j]] = 0;
  travels[index].dates = dates;
  setDataToLocalStorage("travels", travels);
  return newTravelDetails;
};

export const storeUserDetails = (state, allUserDetails) => {
  let { name0, name1, name2, ph0, ph1, ph2 } = state;
  let { selectedBus, selectedBusSeats, selectedSeats, date } = allUserDetails;
  let { travelsName, from, to, id } = selectedBus,
    index,
    dateIndex;
  let nameVal = [name0, name1, name2],
    phVal = [ph0, ph1, ph2];
  let newBooking = {
    id: Math.random(),
    travelsName,
    date,
    from,
    to,
    travelsId: id,
    seats: selectedSeats,
    passengersInfo: []
  };
  for (var i = 0; i < selectedSeats.length; i++)
    newBooking.passengersInfo[i] = {
      name: nameVal[i],
      ph: phVal[i]
    };
  //push to currentUser
  let currentUser = getDataFromLocalStorage("currentUserDetails");
  currentUser.travelDetails.push(newBooking);
  setDataToLocalStorage("currentUserDetails", currentUser);
  //push to userDetails
  let user = getDataFromLocalStorage("userDetails");
  for (index = 0; index < user.length; index++) if (currentUser.id === user[index].id) break;
  user[index].travelDetails.push(newBooking);
  setDataToLocalStorage("userDetails", user);
  //push to travels
  let travels = getDataFromLocalStorage("travels");
  for (index = 0; index < travels.length; index++) if (travels[index].id === id) break;
  let dates = travels[index].dates;
  for (dateIndex = 0; dateIndex < dates.length; dateIndex++) if (dates[dateIndex].date === date) break;
  for (i = 0; i < selectedBusSeats.length; i++) if (selectedBusSeats[i]) selectedBusSeats[i] = -1;
  if (dates[dateIndex]) {
    travels[index].dates[dateIndex].seats = selectedBusSeats;
  } else {
    travels[index].dates.push({
      date: date,
      seats: selectedBusSeats
    });
  }
  setDataToLocalStorage("travels", travels);
  return currentUser.travelDetails;
};
