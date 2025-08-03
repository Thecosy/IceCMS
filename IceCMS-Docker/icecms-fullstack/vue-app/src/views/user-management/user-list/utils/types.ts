interface FormItemProps {
  userId?: number | null;
  username: string;
  password: string;
  name: string;
  gender: string | number;
  email: string;
  status: string | number;
  profile: string;
  intro: string;
  deptId?: string;
}
interface FormProps {
  formInline: FormItemProps;
}

interface RoleFormItemProps {
  username: string;
  nickname: string;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  ids: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps };
