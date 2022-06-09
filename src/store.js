import { createContext, useReducer } from "react";

const Store = createContext();
const initialState = {
  skills: [],
  unSkills: [],
  customers: [],
  requests: [],
  histories: [],
  start: 0,
  start2: 0,
  filterValue: "yes",
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
    case "UPDATE_FILTER":
      return {
        ...state,
        filterValue: action.payload,
        loading: false,
      };
    case "UPDATE_HISTORY":
      return {
        ...state,
        histories: action.payload,
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
    case "INCREASE_START2":
      return { ...state, start2: action.payload };
    case "REDUCE_START2":
      return { ...state, start2: action.payload };
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
