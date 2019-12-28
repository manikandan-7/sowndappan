export const validateDate = input => {
  let current = new Date();
  if (current.getFullYear() < input.getFullYear()) return true;
  if (current.getFullYear() > input.getFullYear()) return false;
  if (current.getMonth() < input.getMonth()) return true;
  if (current.getMonth() > input.getMonth()) return false;
  if (current.getDate() < current.getDate()) return true;
  if (current.getDate() > current.getDate()) return false;
};
