import { createContext, useContext, useEffect, useState } from "react";
import { authApiSlice, useLazyGetMeQuery } from "../libs/rtk/api/authApiSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  isError: false,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [getMe, { isLoading, isError, isSuccess }] = useLazyGetMeQuery();
  const dispatch = useDispatch();

  const fetchMe = async () => {
    try {
      const user = await getMe().unwrap();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const logout = () => {
    setUser(null);

    // Reset cache
    dispatch(authApiSlice.util.invalidateTags(["User", "Auth"]));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isError, isSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export { useAuth };
