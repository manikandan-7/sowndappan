export const validateDate = input => {
  let current = new Date();
  if (current.getFullYear() < input.getFullYear()) return true;
  if (current.getFullYear() > input.getFullYear()) return false;
  if (current.getFullYear() === input.getFullYear()) {
    if (current.getMonth() < input.getMonth()) return true;
    if (current.getMonth() === input.getMonth())
      if (current.getDate() < input.getDate()) return true;
      else return false;
    else return false;
  }
};
