import { createContext, useContext, useEffect, useState } from "react";
import { authApiSlice, useGetMeQuery } from "../libs/rtk/api/authApiSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  isError: false,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data: me, isLoading, isError } = useGetMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me]);

  const logout = () => {
    // Implement logout logic here, including clearing the user state
    setUser(null);

    // Reset cache
    dispatch(authApiSlice.util.invalidateTags(["User", "Auth"]));
  };

  const value = { user, isLoading, isError, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export { useAuth };
