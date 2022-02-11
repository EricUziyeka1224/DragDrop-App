import { ONCHANGEHANDLER } from "../Redux-reducer-action/actionType";

const onChangeHandler = (e) => {
  localStorage.setItem(e.target.name, e.target.value);
  return {
    type: ONCHANGEHANDLER,
    payload: e.target.value,
    name: e.target.name,
  };
};
export { onChangeHandler };
