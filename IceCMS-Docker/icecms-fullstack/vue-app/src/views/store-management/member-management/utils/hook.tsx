import "./reset.css";
import dayjs from "dayjs";
import roleForm from "../form/role.vue";
import editForm from "../form/index.vue";
import { zxcvbn } from "@zxcvbn-ts/core";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import croppingUpload from "../upload.vue";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import type { FormItemProps, RoleFormItemProps } from "../utils/types";
import { hideTextAtIndex, getKeyList, isAllEmpty } from "@pureadmin/utils";
import {
  getRoleIds,
  // getDeptList,
  getUserList,
  getAllRoleList,
  deleteUser,
  updateUser,
  updateUserStatus
} from "@/api/system";
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElProgress,
  ElMessageBox
} from "element-plus";
import {
  type Ref,
  h,
  ref,
  toRaw,
  watch,
  computed,
  reactive,
  onMounted
} from "vue";

export function useUser(tableRef: Ref, treeRef: Ref) {
  const form = reactive({
    // 左侧部门树的id
    deptId: "",
    username: "",
    phone: "",
    status: ""
  });
  const formRef = ref();
  const ruleFormRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  // 上传头像信息
  const avatarInfo = ref();
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const higherDeptOptions = ref();
  const treeData = ref([]);
  const treeLoading = ref(true);
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 5,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "用户编号",
      prop: "userId",
      width: 90
    },
    {
      label: "用户头像",
      prop: "profile",
      cellRenderer: ({ row }) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.profile}
          preview-src-list={Array.of(row.profile)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "用户名称",
      prop: "username",
      minWidth: 130
    },
    {
      label: "用户昵称",
      prop: "name",
      minWidth: 130
    },
    {
      label: "性别",
      prop: "gender",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.gender === 1 ? "danger" : ""}
          effect="plain"
        >
          {row.gender === 1 ? "女" : "男"}
        </el-tag>
      )
    },
    // {
    //   label: "部门",
    //   prop: "dept.name",
    //   minWidth: 90
    // },
    // {
    //   label: "手机号码",
    //   prop: "phone",
    //   minWidth: 90,
    //   formatter: ({ phone }) => hideTextAtIndex(phone, { start: 3, end: 6 })
    // },
    {
      label: "邮箱",
      prop: "email",
      minWidth: 90,
      // formatter: ({ email }) => hideTextAtIndex(email, { start: 3, end: 6 })
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      )
    },
    // {
    //   label: "创建时间",
    //   minWidth: 90,
    //   prop: "createTime",
    //   formatter: ({ createTime }) =>
    //     dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    // },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "最近登录",
      minWidth: 90,
      prop: "lastLogin",
      formatter: ({ lastLogin }) =>
        dayjs(lastLogin).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  // 重置的新密码
  const pwdForm = reactive({
    newPwd: ""
  });
  const pwdProgress = [
    { color: "#e74242", text: "非常弱" },
    { color: "#EFBD47", text: "弱" },
    { color: "#ffa500", text: "一般" },
    { color: "#1bbf1b", text: "强" },
    { color: "#008000", text: "非常强" }
  ];
  // 当前密码强度（0-4）
  const curScore = ref();
  const roleOptions = ref([]);

    function onChange({ row, index }) {
    // 打印完整的行数据，以便调试

    // 使用toRaw获取原始值，避免响应式代理问题
    const rawRow = toRaw(row);

    // 保存当前状态，以便在确认对话框中显示正确的文本
    const targetStatus= Number(rawRow.status);
    // 计算目标状态（与当前状态相反）
    const currentStatus = targetStatus === 0 ? 1 : 0;

    // 根据开关组件的值确定操作类型
    const actionType = currentStatus === 0 ? "启用" : "停用";

    ElMessageBox.confirm(
      `确认要<strong>${actionType}</strong><strong style='color:var(--el-color-primary)'>${row.username
      }</strong>用户吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );

                // 使用前面保存的目标状态
        console.log("当前状态类型:", typeof currentStatus, "值:", currentStatus);
        console.log("目标状态类型:", typeof targetStatus, "值:", targetStatus);

        // 更新UI状态为目标状态
        row.status = targetStatus;

        try {

          // 调用后端API更新用户状态（使用完整的用户对象）
          // 只发送必要的字段，避免发送多余的数据
          const userData = {
            userId: rawRow.userId,
            username: rawRow.username,
            name: rawRow.name,
            gender: typeof rawRow.gender === 'string' ? (rawRow.gender === '男' ? 0 : rawRow.gender === '女' ? 1 : 2) : rawRow.gender,
            email: rawRow.email,
            // 确保状态是数字类型
            status: targetStatus,
            profile: rawRow.profile,
            intro: rawRow.intro
          };

          // 打印请求数据，便于调试
          console.log("更新用户状态请求数据:", userData);

          const result = await updateUser(userData);
          console.log("API响应:", result);

          if (result.code === 200) {
            // 更新成功，状态已经在前面更新为targetStatus
            message("已成功修改用户状态", {
              type: "success"
            });
            // 刷新列表，确保显示最新数据
            setTimeout(() => {
              onSearch();
            }, 500);
          } else {
            // 更新失败，恢复原状态
            message(`修改状态失败: ${result.msg || '未知错误'}`, {
              type: "error"
            });
            row.status = currentStatus; // 恢复为保存的旧状态
          }
        } catch (error) {
          // 发生错误，恢复原状态
          message(`修改状态失败: ${error.message || '未知错误'}`, {
            type: "error"
          });
          row.status = currentStatus; // 恢复为保存的旧状态
        } finally {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
        }
      })
      .catch(() => {
        // 取消操作，恢复为原始状态
        row.status = currentStatus;
      });
  }

  function handleUpdate(row) {
    console.log(row);
    openDialog('修改', row);
  }

  async function handleDelete(row) {
    try {
      // 确保ID是数字类型
      let id = row.userId;
      if (typeof id === 'string') {
        id = parseInt(id);
      }

      const result = await deleteUser(id);
      if (result.code === 200) {
        message(`已成功删除用户编号为${row.userId}的这条数据`, { type: "success" });
        // 延迟刷新表格数据，避免频繁刷新
        setTimeout(() => {
          onSearch(); // 刷新表格数据
        }, 500);
      } else {
        message(`删除失败: ${result.msg || '未知错误'}`, { type: "error" });
      }
    } catch (error) {
      message(`删除失败: ${error.message || '未知错误'}`, { type: "error" });
    }
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    fetchSearch(pagination.currentPage, val)
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
    fetchSearch(val, pagination.pageSize)
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    message(`已删除用户编号为 ${getKeyList(curSelected, "id")} 的数据`, {
      type: "success"
    });
    tableRef.value.getTableRef().clearSelection();
  }

  async function onSearch() {
    loading.value = true;
    try {
      const searchParams = {
        username: form.username || undefined,
        email: form.phone || undefined, // 注意：表单中用phone字段存储email
        status: form.status || undefined
      };
      console.log("搜索参数:", searchParams);
      const { data } = await getUserList(pagination.currentPage, pagination.pageSize, searchParams);
      dataList.value = data.records;
      console.log("搜索结果:", data);
      pagination.total = data.total;
      pagination.pageSize = data.size;
      pagination.currentPage = data.current;
    } catch (error) {
      message(`获取用户列表失败: ${error.message || '未知错误'}`, { type: "error" });
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }

  // 分页改变时获取文章
  async function fetchSearch(pageNum = 1, limit = pagination.pageSize) {
    loading.value = true;
    try {
      const searchParams = {
        username: form.username || undefined,
        email: form.phone || undefined, // 注意：表单中用phone字段存储email
        status: form.status || undefined
      };
      const { data } = await getUserList(pageNum, limit, searchParams);
      dataList.value = data.records;
      pagination.total = data.total;
      pagination.pageSize = data.size;
      pagination.currentPage = data.current;
    } catch (error) {
      message(`获取用户列表失败: ${error.message || '未知错误'}`, { type: "error" });
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    form.deptId = "";
    treeRef.value.onTreeReset();
    onSearch();
  };

  function onTreeSelect({ id, selected }) {
    form.deptId = selected ? id : "";
    onSearch();
  }

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          userId: row?.userId ?? null,
          username: row?.username ?? "",
          password: "",
          name: row?.name ?? "",
          gender: row?.gender ?? "",
          email: row?.email ?? "",
          status: row?.status ?? "正常",
          profile: row?.profile ?? "",
          intro: row?.intro ?? "",
          deptId: row?.deptId ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: async (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        FormRef.validate(async valid => {
          if (valid) {
            try {
              if (title === "新增") {
                // 实际开发先调用新增接口，再进行下面操作
                message(`您${title}了用户名称为${curData.username}的这条数据`, {
                  type: "success"
                });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              } else {
                // 转换性别和状态为数字格式
                const userData = { ...curData };
                // 转换性别: 男=0, 女=1, 保密=2
                if (userData.gender === "男") userData.gender = 0;
                else if (userData.gender === "女") userData.gender = 1;
                else if (userData.gender === "保密") userData.gender = 2;

                // 转换状态: 正常=1, 禁用=0
                if (userData.status === "正常") userData.status = 1;
                else if (userData.status === "禁用") userData.status = 0;

                // 调用修改接口
                const result = await updateUser(userData);
                if (result.code === 200) {
                  message(`您${title}了用户名称为${curData.username}的这条数据`, {
                    type: "success"
                  });
                  done(); // 关闭弹框
                  // 使用单独的变量控制搜索，避免循环刷新
                  const timer = setTimeout(() => {
                    loading.value = true;
                    fetchSearch(pagination.currentPage, pagination.pageSize);
                    clearTimeout(timer);
                  }, 800);
                } else {
                  message(`修改失败: ${result.msg || '未知错误'}`, {
                    type: "error"
                  });
                }
              }
            } catch (error) {
              message(`操作失败: ${error.message || '未知错误'}`, {
                type: "error"
              });
            }
          }
        });
      }
    });
  }

  const cropRef = ref();
  /** 上传头像 */
  function handleUpload(row) {
    addDialog({
      title: "裁剪、上传头像",
      width: "40%",
      draggable: true,
      closeOnClickModal: false,
      contentRenderer: () =>
        h(croppingUpload, {
          ref: cropRef,
          imgSrc: row.avatar,
          onCropper: info => (avatarInfo.value = info)
        }),
      beforeSure: done => {
        console.log("裁剪后的图片信息：", avatarInfo.value);
        // 根据实际业务使用avatarInfo.value和row里的某些字段去调用上传头像接口即可
        done(); // 关闭弹框
        // 延迟刷新表格数据，避免频繁刷新
        setTimeout(() => {
          onSearch(); // 刷新表格数据
        }, 500);
      },
      closeCallBack: () => cropRef.value.hidePopover()
    });
  }

  watch(
    pwdForm,
    ({ newPwd }) =>
      (curScore.value = isAllEmpty(newPwd) ? -1 : zxcvbn(newPwd).score)
  );

  /** 重置密码 */
  function handleReset(row) {
    addDialog({
      title: `重置 ${row.username} 用户的密码`,
      width: "30%",
      draggable: true,
      closeOnClickModal: false,
      contentRenderer: () => (
        <>
          <ElForm ref={ruleFormRef} model={pwdForm}>
            <ElFormItem
              prop="newPwd"
              rules={[
                {
                  required: true,
                  message: "请输入新密码",
                  trigger: "blur"
                }
              ]}
            >
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.newPwd}
                placeholder="请输入新密码"
              />
            </ElFormItem>
          </ElForm>
          <div class="mt-4 flex">
            {pwdProgress.map(({ color, text }, idx) => (
              <div
                class="w-[19vw]"
                style={{ marginLeft: idx !== 0 ? "4px" : 0 }}
              >
                <ElProgress
                  striped
                  striped-flow
                  duration={curScore.value === idx ? 6 : 0}
                  percentage={curScore.value >= idx ? 100 : 0}
                  color={color}
                  stroke-width={10}
                  show-text={false}
                />
                <p
                  class="text-center"
                  style={{ color: curScore.value === idx ? color : "" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </>
      ),
      closeCallBack: () => (pwdForm.newPwd = ""),
      beforeSure: done => {
        ruleFormRef.value.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            message(`已成功重置 ${row.username} 用户的密码`, {
              type: "success"
            });
            console.log(pwdForm.newPwd);
            // 根据实际业务使用pwdForm.newPwd和row里的某些字段去调用重置用户密码接口即可
            done(); // 关闭弹框
            onSearch(); // 刷新表格数据
          }
        });
      }
    });
  }

  /** 分配角色 */
  async function handleRole(row) {
    // 选中的角色列表
    const ids = (await getRoleIds({ userId: row.id })).data ?? [];
    addDialog({
      title: `分配 ${row.username} 用户的角色`,
      props: {
        formInline: {
          username: row?.username ?? "",
          nickname: row?.nickname ?? "",
          roleOptions: roleOptions.value ?? [],
          ids
        }
      },
      width: "400px",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(roleForm),
      beforeSure: (done, { options }) => {
        const curData = options.props.formInline as RoleFormItemProps;
        console.log("curIds", curData.ids);
        // 根据实际业务使用curData.ids和row里的某些字段去调用修改角色接口即可
        done(); // 关闭弹框
      }
    });
  }

  onMounted(async () => {
    treeLoading.value = true;
    onSearch();

    // 归属部门
    // const { data } = await getDeptList();
    // higherDeptOptions.value = handleTree(data);
    // treeData.value = handleTree(data);
    // treeLoading.value = false;

    // 角色列表
    // roleOptions.value = (await getAllRoleList()).data;
  });

  return {
    form,
    loading,
    columns,
    dataList,
    treeData,
    treeLoading,
    selectedNum,
    pagination,
    buttonClass,
    onSearch,
    resetForm,
    onbatchDel,
    openDialog,
    onTreeSelect,
    handleUpdate,
    handleDelete,
    handleUpload,
    handleReset,
    handleRole,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
