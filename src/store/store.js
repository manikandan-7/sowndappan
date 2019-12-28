const { travels, pickUpAndDropPoints, userDetails, currentUserDetails } = require("../utils/data.json");
const store = require("store");

export const getDataFromLocalStorage = input => store.get(input);
export const setDataToLocalStorage = (input, payload) => store.set(input, payload);

if (!getDataFromLocalStorage("travels")) {
  setDataToLocalStorage("travels", travels);
  setDataToLocalStorage("pickUpAndDropPoints", pickUpAndDropPoints);
  setDataToLocalStorage("userDetails", userDetails);
  setDataToLocalStorage("currentUserDetails", currentUserDetails);
}
