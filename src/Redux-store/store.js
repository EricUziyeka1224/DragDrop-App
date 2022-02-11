import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Redux-reducer-action/reducer";

export default configureStore({
  reducer,
});
