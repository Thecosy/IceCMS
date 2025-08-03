import { g as useFetchGet } from './server.mjs';

const getResourceClasslist = () => {
  return useFetchGet("/WebResourceClass/getResourceClasslist");
};
const getResourceClassNameByid = (classid) => {
  return useFetchGet(`/WebResourceClass/getResourceClassNameByid/${classid}`);
};

export { getResourceClassNameByid as a, getResourceClasslist as g };
//# sourceMappingURL=webresourceclass-DptsPlvX.mjs.map
