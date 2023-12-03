// reducers.js
const initialState = {
    username: '',
    password: '',
    token: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          username: action.payload.username,
          password: action.payload.password,
          token: action.payload.token,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default reducer;
  