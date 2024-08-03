export const updateName = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === "admin") {
        reject("You cannot use this name.");
      }
      resolve(name);
    }, 2000);
  });
};
