import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthanicated: true };
    case "logout":
      return { ...state, user: null, isAuthanicated: false };

    default:
      throw new Error("there is an error here");
  }
}

const initialState = { user: null, isAuthanicated: false };

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthanicated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //func for login
  function login(email, password) {
    //we should compare email and password with a fack user
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  //func with logout
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthanicated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { UseAuth, AuthProvider };
