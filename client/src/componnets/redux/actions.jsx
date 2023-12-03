// actions.js
export const login = (username, password, token) => ({
    type: 'LOGIN',
    payload: { username, password, token },
});
  
  export const logout = () => ({
    type: 'LOGOUT',
});