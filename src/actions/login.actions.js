const { getDataFromLocalStorage, setDataToLocalStorage } = require("../store/store");
const { validateLoginAndRegisterCreditionals } = require("../validate/login_register.validate");

export const login = (name, password, history) => {
  let { err, isValid } = validateLoginAndRegisterCreditionals(name, password);
  if (!isValid) return err;
  let userDetails = getDataFromLocalStorage("userDetails");
  let user = userDetails.find(element => element.name === name && element.password === password);
  if (!user) {
    alert("User Does not Exists");
    window.location.replace("/");
    return null;
  }
  setDataToLocalStorage("currentUserDetails", user);
  alert("You Are Logged in");
  window.location.replace("/");
  return null;
};

export const logout = () => {
  setDataToLocalStorage("currentUserDetails", {});
  alert("You Are Logged out");
  window.location.replace("/");
  return {};
};
