// src/contexts/AppProvider.jsx
import { useMemo, useReducer } from "react";
import { AppContext } from "./AppContextObject";
import { appReducer, initialState } from "./appReducer";

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
