import { createContext, useContext, useReducer } from "react";

const initialState = {
  confirmModal: false,
  addModal: false,
  editModal: false,
  selectProduct: "",
  editProduct: {},
  userLogin: "",
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CONFIRM":
      return { ...state, confirmModal: !state.confirmModal };
    case "CHANGE_ADD":
      return { ...state, addModal: !state.addModal };
    case "CHANGE_EDIT":
      return { ...state, editModal: !state.editModal };
    case "SELECT_PRODUCT":
      return { ...state, selectProduct: action.payload };
    case "EDIT_PRODUCT":
      return { ...state, editProduct: action.payload };
    case "USER_LOGIN":
      return { ...state, userLogin: action.payload, isAuthenticated: true };
    case "EXIT":
      return { ...state, userLogin: "", isAuthenticated: false };
    default:
      throw new Error("Invalid Action!");
  }
};

const appContext = createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
}

const useApp = () => {
  const { state, dispatch } = useContext(appContext);
  return { state, dispatch };
};

export default AppProvider;
export { useApp };
