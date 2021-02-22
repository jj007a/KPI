export default {
  name: 'page1',
  data() {
    return {
      moudle: [],
      person: {

      },
      tableData: {
        assessorId: "",
        endDate: "",
        startDate: "",
        kpiMouldId: "",
        kpiCategory: "",
        userIds: []
      },
      rules: {
        kpiMouldId: [
          { required: true, message: '请选择考核模板', trigger: 'change' }
        ],
        assessmentDate:[{
          required: true, message: '请选择年月'
        }],
        userIds: [
          { required: true, message: '请选择考核人员', trigger: 'change' }
        ]
      },
      propTitle: '绩效模板任务添加',
      assignmentList: [],
      categoryList: [],
      value: false,
      currentPage4: 1,
      dialogVisible: false,
      dialogEditVisible: false,
      formLabelAlign: {
        options: [],
      },
      formInline: {
        kpiMouldName: "",
        assessmentDate: ""
      },
      editFromLabel: {

        options: [],
        objects: [],
      },
      isAdd: true,
      isEdit: false,
      pageable: {
        pageNumber: 1,
        pageSize: 10
      },
      totals: 40,
      isKpiAdd: false,
      isKpiDel: false,
      isKpiEdit: false,
      disabled: false
    }

  },
  created() {
    this.getMouldDate();
    this.getKpiTemplate();
    this.getPorson()
    this.getAssignmentList()
    this.authority()
  },
  methods: {
    handleSizeChange(val) {
      this.pageable.pageSize = val
      let data = { ...this.pageable, ...this.formInline }
      this.$http.get('kpi/auth/assignment/list', data).then(res => {
        this.assignmentList = res.data.data.data
        this.assignmentList.map(item => {
          item.assessmentDate = this.$moment(item.assessmentDate).format('MM月')
          item.endDate = this.$moment(item.endDate).format('YYYY-MM-DD')
          item.startDate = this.$moment(item.startDate).format('YYYY-MM-DD')
          return item
        })
      })
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageable.pageNumber = val
      let data = { ...this.pageable, ...this.formInline }
      this.$http.get('kpi/auth/assignment/list', data).then(res => {
        this.assignmentList = res.data.data.data
        this.assignmentList.map(item => {
          item.assessmentDate = this.$moment(item.assessmentDate).format('MM月')
          item.endDate = this.$moment(item.endDate).format('YYYY-MM-DD')
          item.startDate = this.$moment(item.startDate).format('YYYY-MM-DD')
          return item
        })
      })
    },
    // 搜索
    search(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {}
          if (this.formInline.assessmentDate) {
            data = {
              kpiMouldName: this.formInline.kpiMouldName,
              assessmentDate: this.formInline.assessmentDate
            }
          } else {
            data = {
              kpiMouldName: this.formInline.kpiMouldName,
            }
          }

          data = { ...data, ...this.pageable }
          this.$http.get('kpi/auth/assignment/list', data).then(res => {
            if (res.data.data.data) {
              this.assignmentList = res.data.data.data
              this.assignmentList.map(item => {
                item.assessmentDate = this.$moment(item.assessmentDate).format('MM月')
                item.endDate = this.$moment(item.endDate).format('YYYY-MM-DD')
                item.startDate = this.$moment(item.startDate).format('YYYY-MM-DD')
                return item
              })
            } else {
              this.assignmentList = []
            }

          })
        }
      })
    },
    /* 
    *获取模板列表
    */
    getKpiTemplate() {
      this.$http.get('kpi/auth/mould/list').then(res => {
        this.moudle = res.data.data.data.data
      })
    },
    /**
     * 获取人员
     */
    getPorson() {
      this.$http.get('kpi/auth/personnel/list/department').then(res => {
        this.formLabelAlign.options = res.data.data;

      })
    },
    //获取模板日期类型
    getMouldDate() {
      this.$http.get('kpi/auth/category/list').then(res => {
        this.categoryList = res.data.data
      })
    },
    //获取 设置列表
    getAssignmentList() {
      this.$http.get('kpi/auth/assignment/list', { pageNumber: 1, pageSize: 10 }).then(res => {
        if (res.data.status == 200) {
          this.assignmentList = res.data.data.data
          this.assignmentList.map(item => {
            item.assessmentDate = this.$moment(item.assessmentDate).format('MM月')
            item.endDate = this.$moment(item.endDate).format('YYYY-MM-DD')
            item.startDate = this.$moment(item.startDate).format('YYYY-MM-DD')
            return item
          })
          this.pageable = res.data.data.pageable;
          this.totals = res.data.data.total;
        } else if (res.data.status == 401) {
          this.$message({
            type: "error",
            message: `登录已过期,${res.data.msg}`
          })
          this.$store.dispatch('LoginOut')
          this.$router.push('/login')
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`
          })
        }

      })
    },
    //新增弹框
    addProp() {
      this.dialogVisible = true;
      this.isAdd = true;
      this.isEdit = false
      this.propTitle = '绩效考核任务添加'
      this.tableData = {
        endDate: "",
        startDate: "",
        kpiMouldId: "",
        assessmentDate: "",
        userIds: [],
      }
    },
    //编辑弹框
    editProp() {
      this.dialogVisible = true;
      this.isAdd = false;
      this.isEdit = true
    },
    // 新增提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.disabled = true;
          this.tableData.assessorId = this.$store.state.userId
          this.$http.post('kpi/auth/assignment/save',
            JSON.stringify(this.tableData)).then(res => {
              this.disabled = false
              this.$message({
                message: '模板配置完成',
                type: 'success'
              });
              this.dialogVisible = false
              this.getAssignmentList()
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //查看详情
    viewDetail(row) {
      this.dialogVisible = true
      this.isEdit = true;
      this.isAdd = false;
      this.propTitle = '绩效考核任务编辑';
      this.$http.get('kpi/auth/assignment/detail', { id: row.id }).then(res => {
        let data = res.data.data;
        this.tableData.endDate = data.endDate;
        this.tableData.startDate = data.startDate;
        this.tableData.kpiCategory = data.kpiCategory;
        this.tableData.kpiMouldId = data.kpiMouldId;
        this.tableData.assessmentDate = data.assessmentDate;
        this.tableData.id = data.id;
        if (data.personnels) {
          this.tableData.userIds = data.personnels.map(item => {
            return item.id
          })
        }

      })
    },
    // 下拉多选数据强制刷新
    dataUpdate() {
      this.$forceUpdate();
    },
    //编辑
    edit() {
      this.disabled = true;
      this.$http.post('kpi/auth/assignment/update',
        JSON.stringify(this.tableData)).then(res => {
          this.disabled = false;
          this.$message({
            message: '模板编辑完成',
            type: 'success'
          });
          this.dialogVisible = false;
          this.getAssignmentList();
        })
    },
    del(row) {

      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('kpi/auth/assignment/delete', { id: row.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getAssignmentList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //权限管理

    authority() {
      if (this.$store.getters.roles.length > 0) {
        const roles = this.$store.getters.roles;
        roles[0].permissions.forEach(item => {
          switch (item.permCode) {
            case "perms[kpiAssignment:delete]":
              this.isKpiDel = true;
              break;
            case "perms[kpiAssignment:add]":
              this.isKpiAdd = true;
              break;
            case "perms[kpiAssignment:update]":
              this.isKpiEdit = true;
              break;

          }
        })
      }
    }
  },

}