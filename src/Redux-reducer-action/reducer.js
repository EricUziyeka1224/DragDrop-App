import { ONCHANGEHANDLER } from "./actionType";

const initialState = {
  productSelection:
    localStorage.getItem("productSelection") ?? "CENTER NECKLACES",
  checkOutImage: localStorage.getItem("checkOutImage") ?? "",
  checkOutPrice: localStorage.getItem("checkOutPrice") ?? "",
  shopifyDropedItems: [],
  necklaceType: "v-chain",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ONCHANGEHANDLER:
      return {
        ...state,
        [action.name]: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
