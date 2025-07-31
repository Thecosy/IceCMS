import { http } from "@/utils/http";

type Result = {
  success: boolean;
  code?: number;
  msg?: string;
  data?: any;
};

type ResultTable = {
  success: boolean;
  code?: number;
  msg?: string;
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
export const getUserList = (currentPage, pageSize, params = {}) => {
  return http.request<ResultTable>("get", `/User/getUserList/${currentPage}/${pageSize}`, { params });
};

/** 删除用户 */
export const deleteUser = (id: number) => {
  return http.request<Result>("delete", `/User/deleteUser/${id}`);
};

/** 更新用户信息 */
export const updateUser = (data: object) => {
  return http.request<Result>("put", "/User/updateUser", { data });
};

/** 更新用户状态 */
export const updateUserStatus = (userId: number, status: number) => {
  return http.request<Result>("put", "/User/updateUserStatus", { data: { userId, status } });
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
  return http.request<Result>("get", "/User/getAllRole", { params: data });
};

/** 修改角色信息 */
export const updateRole = (data: object) => {
  return http.request<Result>("put", "/UserRole/updateRole", { data });
};

/** 新增角色 */
export const addRole = (data: object) => {
  return http.request<Result>("post", "/UserRole/addRole", { data });
};

/** 删除角色 */
export const deleteRole = (id: number) => {
  return http.request<Result>("delete", `/UserRole/deleteRole/${id}`);
};

/** 获取部门管理列表 */
// export const getDeptList = (data?: object) => {
//   return http.request<Result>("post", "/dept", { data });
// };

/** 获取所有用户（不分页） */
export const getAllUsers = () => {
  return http.request<Result>("get", "/User/getAllUsers");
};
