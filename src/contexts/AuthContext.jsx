import { createContext, useContext } from "react";
import { authApiSlice, useGetMeQuery } from "../libs/rtk/api/authApiSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  isError: false,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const { data: user, isLoading, isError } = useGetMeQuery();
  const dispatch = useDispatch();

  const logout = () => {
    // Implement logout logic here, including clearing the user state
    // make api req to clear cookie

    // Reset cache
    dispatch(authApiSlice.util.invalidateTags(["User", "Auth"]));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export { useAuth };
