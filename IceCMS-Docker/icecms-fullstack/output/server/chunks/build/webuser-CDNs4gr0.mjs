import { J as useFetchPost, h as useDollarGet } from './server.mjs';

const getUserInfobyid = (id) => {
  return useDollarGet(`/Websuser/getUserInfobyid/${id}`);
};
const getCurrentUserInfo = () => {
  return useDollarGet("/Websuser/getCurrentUserInfo");
};
const ChangeUser = (form) => {
  return useFetchPost("/Websuser/ChangeUser", form);
};
const ChangePassword = (yuanPassWord, NewPassWord, userid) => {
  const token = localStorage.getItem("token") || "";
  return useFetchPost(`/Websuser/ChangePassword/${token}/${yuanPassWord}/${NewPassWord}/${userid}`);
};
const login = (username, password) => {
  return useFetchPost(`/Websuser/login?username=${username}&password=${password}`);
};
const getCurrentUserOrders = (page = 1, limit = 10) => {
  return useDollarGet(`/Websuser/getCurrentUserOrders?page=${page}&limit=${limit}`);
};

export { ChangeUser as C, getCurrentUserOrders as a, ChangePassword as b, getUserInfobyid as c, getCurrentUserInfo as g, login as l };
//# sourceMappingURL=webuser-CDNs4gr0.mjs.map
