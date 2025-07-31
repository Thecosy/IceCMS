import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  username: [{ required: true, message: "用户名称为必填项", trigger: "blur" }],
  password: [
    {
      required: (form) => form.userId === null, // 新增时必填，修改时可选
      message: "新增用户时密码为必填项",
      trigger: "blur"
    }
  ],
  name: [{ required: true, message: "姓名为必填项", trigger: "blur" }],
  email: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback();
        } else if (!isEmail(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});
