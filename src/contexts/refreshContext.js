import { createContext, useState } from "react";

export const RefreshContext = createContext();

export default function RefreshProvider({ children }) {
  const [refresh, setRefresh] = useState(true);
  return <RefreshContext.Provider value={{ refresh, setRefresh }}>{children}</RefreshContext.Provider>;
}
