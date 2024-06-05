import { ReactNode, createContext, useContext, useState } from "react";
import mdlUser from "../core/models/User";
import mdlUserLoginRequest from "../core/servicemodels/user/UserLoginRequest";
import UserService from "../core/services/AuthService";
import { toast } from "react-toastify";
import CookieManager from "../core/helpers/CookieManager";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: mdlUser | null;
  login: (userLoginReq: mdlUserLoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<mdlUser | null>(JSON.parse(localStorage.getItem("user")!));

  const login = async (userLoginReq: mdlUserLoginRequest) => {
    const response = await UserService.Login(userLoginReq);
    if (response.success && response.body?.access_Token && response.body?.refresh_Token && response.body.user) {
      setUser(response.body.user);
      toast.success(response.message);
      localStorage.setItem("user", JSON.stringify(response.body.user))
      CookieManager.setCookie("access_Token", response.body.access_Token);
      CookieManager.setCookie("refresh_Token", response.body.refresh_Token);
    } else {
      toast.warning(response.message);
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
    CookieManager.removeCookie("access_Token");
    CookieManager.removeCookie("refresh_Token");
    setUser(null);
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;