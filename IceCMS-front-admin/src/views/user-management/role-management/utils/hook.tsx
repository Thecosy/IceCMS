import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getRoleList, addRole, updateRole, deleteRole } from "@/api/system";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useRole() {
  const form = reactive({
    name: "",
    code: "",
    status: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色编号",
      prop: "id",
      minWidth: 100
    },
    {
      label: "角色名称",
      prop: "name",
      minWidth: 120
    },
    {
      label: "角色标识",
      prop: "code",
      minWidth: 150
    },
    {
      label: "状态",
      minWidth: 130,
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
    {
      label: "备注",
      prop: "remark",
      minWidth: 150
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>吗?`,
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

        try {
          // 更新角色状态
          const roleData = {
            id: row.id,
            status: row.status
          };
          await updateRole(roleData);

          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
            type: "success"
          });
        } catch (error) {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(`操作失败: ${error.message}`, {
            type: "error"
          });
          // 恢复原状态
          row.status = row.status === 0 ? 1 : 0;
        }
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  async function handleDelete(row) {
    try {
      // 确保ID是数字类型
      let id = row.id;
      if (typeof id === 'string') {
        id = parseInt(id);
      }
      await deleteRole(id);
      message(`已成功删除角色名称为${row.name}的这条数据`, { type: "success" });
      onSearch();
    } catch (error) {
      message(`删除失败: ${error.message}`, { type: "error" });
    }
  }

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    pagination.currentPage = 1; // 切换每页条数时，重置为第一页
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    try {
      // 创建一个新的表单数据对象，避免修改原始表单
      const searchForm = { ...toRaw(form) } as any;

      // 如果状态值存在且不为空，则转换为整数
      if (searchForm.status !== undefined && searchForm.status !== null && searchForm.status !== "") {
        searchForm.status = parseInt(searchForm.status);
      }

      console.log("搜索条件:", searchForm);
      const { data } = await getRoleList(searchForm);
      console.log("搜索结果:", data);
      dataList.value = data;

      // 更新分页信息
      if (Array.isArray(data)) {
        pagination.total = data.length;
      } else {
        pagination.total = 0;
      }
    } catch (error) {
      message(`获取角色列表失败: ${error.message}`, { type: "error" });
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          id: row?.id ?? null,
          name: row?.name ?? "",
          code: row?.code ?? "",
          remark: row?.remark ?? "",
          status: row?.status ?? 1
        }
      },
      width: "40%",
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
                // 调用新增接口
                // 添加角色时不发送ID字段
                const { id, ...addData } = curData;
                console.log("添加角色数据:", addData);
                try {
                  const result = await addRole(addData);
                  console.log("添加角色响应:", result);
                } catch (error) {
                  console.error("添加角色错误:", error);
                  message(`操作失败: ${error.message || '未知错误'}`, {
                    type: "error"
                  });
                  return; // 出错时不关闭对话框
                }
              } else {
                // 调用修改接口
                // 确保ID是数字类型
                if (typeof curData.id === 'string') {
                  curData.id = parseInt(curData.id);
                }
                console.log("修改角色数据:", curData);
                try {
                  const result = await updateRole(curData);
                  console.log("修改角色响应:", result);
                } catch (error) {
                  console.error("修改角色错误:", error);
                  message(`操作失败: ${error.message || '未知错误'}`, {
                    type: "error"
                  });
                  return; // 出错时不关闭对话框
                }
              }

              message(`您${title}了角色名称为${curData.name}的这条数据`, {
                type: "success"
              });
              done(); // 关闭弹框
              onSearch(); // 刷新表格数据
            } catch (error) {
              message(`操作失败: ${error.message}`, {
                type: "error"
              });
            }
          }
        });
      }
    });
  }

  /** 菜单权限 */
  function handleMenu() {
    message("等菜单管理页面开发后完善");
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
