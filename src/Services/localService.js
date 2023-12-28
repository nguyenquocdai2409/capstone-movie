export let localService = {
  set: (user) => {
    return localStorage.setItem("USER", JSON.stringify(user));
  },
  get: () => {
    return JSON.parse(localStorage.getItem("USER"));
  },
  remove: () => {
    localStorage.removeItem("USER");
    window.location.reload();
  },
};
