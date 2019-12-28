const { getDataFromLocalStorage, setDataToLocalStorage } = require("../store/store");
const { validateLoginAndRegisterCreditionals } = require("../validate/login_register.validate");

export const register = (name, password, history) => {
  let { err, isValid } = validateLoginAndRegisterCreditionals(name, password);
  if (!isValid) return err;
  let userDetails = getDataFromLocalStorage("userDetails");
  userDetails.push({ id: Math.random(), name: name, password: password, travelDetails: [] });
  setDataToLocalStorage("userDetails", userDetails);
  alert("Thanks for registering. Registration success");
  window.location.replace("/");
  return null;
};
