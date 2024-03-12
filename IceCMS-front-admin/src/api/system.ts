import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    records: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    size?: number;
    /** 当前页数 */
    current?: number;
  };
};

/** 获取用户管理列表 */
export const getUserList = (currentPage, pageSize) => {
  return http.request<ResultTable>("get", "/User/getUserList/" + currentPage + "/" + pageSize);
};

/** 用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", "/list-all-role");
};

/** 用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", "/list-role-ids", { data });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<Result>("get", "/User/getAllRole", { data });
};

/** 获取部门管理列表 */
// export const getDeptList = (data?: object) => {
//   return http.request<Result>("post", "/dept", { data });
// };
