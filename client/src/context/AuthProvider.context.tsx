import React, { createContext, useContext, useState } from "react";

interface AuthContextInterface {
  access: string;
  setAccess: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [access, setAccess] = useState("");

  return (
    <AuthContext.Provider value={{ access, setAccess }}>
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
