import { createContext, useReducer } from "react";

const Store = createContext();
const initialState = {
  skills: [],
  unSkills: [],
  customers: [],
  requests: [],
  start: 0,
  loading: false,
  wesabiUser: localStorage.getItem("wesabiUser")
    ? JSON.parse(localStorage.getItem("wesabiUser"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_FETCHING":
      return { ...state, loading: action.payload };
    case "END_FETCHING":
      return { ...state, loading: action.payload };
    case "GET_SKILL":
      return {
        ...state,
        skills: [...state.skills, ...action.payload],
        loading: false,
      };
    case "GET_UNSKILL":
      return {
        ...state,
        unSkills: [...state.unSkills, ...action.payload],
        loading: false,
      };
    case "GET_CUSTOMER":
      return {
        ...state,
        customers: action.payload,
      };
    case "GET_REQUEST":
      return {
        ...state,
        requests: action.payload,
        loading: false,
      };
    case "SAVE_USER":
      return {
        ...state,
        wesabiUser: action.payload,
      };
    case "INCREASE_START":
      return { ...state, start: action.payload };
    case "REDUCE_START":
      return { ...state, start: action.payload };
    default:
      return state;
  }
}
function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export { Store, StoreProvider };
