import { createContext, useContext, useState } from "react";
import { LocalStorageKey } from "../models";

const AuthContext = createContext({});
interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [access, setAccess] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem(LocalStorageKey.TOKENS) as string) || false
  );
  return (
    <AuthContext.Provider value={{ access, setAccess, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext must be used wihtin a AuthContextProvider");
  return context;
};
