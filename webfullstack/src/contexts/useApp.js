// src/contexts/useApp.js
import { useContext } from "react";
import { AppContext } from "./AppContextObject";

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
