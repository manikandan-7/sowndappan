export const validateBookingDetails = (name, ph) => {
  let e = {};
  if (!name || name.length < 3 || name === "") e.name = "Name is not Proper";
  if (!ph || ph.length !== 10) e.ph = "Phone Number is Not Proper";
  return { e, isValid: Object.keys(e).length === 0 };
};
