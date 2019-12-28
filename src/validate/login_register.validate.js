export const validateLoginAndRegisterCreditionals = (name, password) => {
  let err = {};
  if (!name || name.length < 3 || name === "") err.name = "Name is not Proper";
  if (!password || password.length < 8 || password === "") err.password = "Password is not Proper";
  return { err, isValid: Object.keys(err).length === 0 };
};
