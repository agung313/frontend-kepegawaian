// selectors.js
export const getUsername = (state) => state.username;
export const getPassword = (state) => state.password;
export const getToken = (state) => localStorage.getItem("token")||state.token;
