// src/contexts/appReducer.js
export const initialState = {
  query: "",
  entity: "teams",
  loading: false,
  error: null,
  results: [],
};

export function appReducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_ENTITY":
      return { ...state, entity: action.payload, results: [] };
    case "FETCH_START":
      return { ...state, loading: true, error: null, results: [] };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, results: action.payload || [] };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
