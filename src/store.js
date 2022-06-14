import { createContext, useReducer } from "react";

const Store = createContext();
const initialState = {
  skills: [],
  unSkills: [],
  customers: [],
  requests: [],
  histories: [],
  myHistories: [],
  start: 0,
  start2: 0,
  start3: 0,
  start4: 0,
  filterValue: "yes",
  filteredHistories: [],
  marketers: [],
  filterFeedback: "",
  filterName: null,
  filterDate: "",
  fetchHistory: false,
  loading: false,
  wesabiUser: localStorage.getItem("wesabiUser")
    ? JSON.parse(localStorage.getItem("wesabiUser"))
    : null,
  isAdmin: localStorage.getItem("isAdmin") || false,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_FETCHING":
      return { ...state, loading: action.payload };
    case "END_FETCHING":
      return { ...state, loading: action.payload };
    case "RESET_FILTER":
      return {
        ...state,
        filterValue: "",
        filterFeedback: action.payload.feedback,
        filterName: action.payload.marketer,
        filterDate: action.payload.date,
      };
    case "UPDATE_MARKETER":
      return {
        ...state,
        marketers: action.payload,
      };

    case "UPDATE_ADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "UPDATE_FILTERED_HISTORIES":
      return {
        ...state,
        filteredHistories: action.payload,
      };
    case "UPDATE_FILTER":
      return {
        ...state,
        filterValue: action.payload,
        filterFeedback: "",
        filterName: null,
        filterDate: "",
        loading: false,
      };
    case "UPDATE_HISTORY":
      return {
        ...state,
        histories: action.payload,
      };
    case "UPDATE_MY_HISTORY":
      return {
        ...state,
        myHistories: action.payload,
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
    case "INCREASE_START3":
      return { ...state, start3: action.payload };
    case "REDUCE_START3":
      return { ...state, start3: action.payload };
    case "INCREASE_START4":
      return { ...state, start4: action.payload };
    case "REDUCE_START4":
      return { ...state, start4: action.payload };
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
