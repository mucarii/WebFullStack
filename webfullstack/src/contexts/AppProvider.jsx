// src/contexts/AppProvider.jsx
import { useReducer } from "react";
import { AppContext } from "./appContextObject";
import { appReducer, initialState } from "./appReducer";

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
