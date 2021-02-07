export default {
    name: 'page1',
    data() {
        return {
            formInline: {


            },
            departmentData: [],
            tableData: {
                department: {
                    id: "",
                },
                /* id: "", */
                realName: "",
                position: "",
                username: ""
            },
            value: false,
            currentPage4: 1,
            dialogVisible: false,
            personList: [],
            editShow: false,
            addShow: true,
            propTitle: "添加人员",
            pageable: {
                pageNumber: 1,
                pageSize: 10,
                searchPropertyValue: "",
                searchProperty: 'tp.realName',
            },
            totals: 40,
            isDel: false,
            isAdd: false,
            isEdit: false,
            disabled: false
        }

    },
    created() {
        this.getDepartment()
        this.personInfo()
        this.authority()
    },
    methods: {
        //查看编辑
        handleEdit(index, row) {
            this.dialogVisible = true
            this.$http.get('kpi/auth/personnel/detail', { id: row.id }).then(res => {
                this.tableData = res.data.data
                this.addShow = false;
                this.editShow = true;
                this.propTitle = '编辑人员'
            })

        },
        //新增弹框
        handleAdd() {
            this.dialogVisible = true
            this.addShow = true;
            this.editShow = false;
            this.tableData = {
                department: {
                    id: "",
                },
                realName: "",
                position: "",
                username: ""
            }

        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除模板, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('kpi/auth/personnel/delete', { id: row.id }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.personInfo()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 显示一页数量
        handleSizeChange(val) {
            this.pageable.pageSize = val
            this.$http.get('kpi/auth/personnel/list', this.pageable).then(res => {
                this.personList = res.data.data.data
            })
        },
        // 分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageable.pageNumber = val
            this.$http.get('kpi/auth/personnel/list', this.pageable).then(res => {
                if (res.data.data) {
                    this.personList = res.data.data.data
                }
            })
        },
        // 搜索
        search(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.pageable.searchProperty = "tp.realName";
                    this.pageable.searchPropertyValue = this.pageable.searchPropertyValue
                    this.$http.get('kpi/auth/personnel/list', this.pageable).then(res => {
                        if (res.data.data.data) {
                            this.personList = res.data.data.data
                        } else {
                            this.personList = []
                        }

                    })
                }
            })
        },
        //初始化人员数据
        personInfo() {
            this.$http.get('kpi/auth/personnel/list', this.pageable).then(res => {
                if (res.data.status == 200) {
                    this.personList = res.data.data.data
                    this.pageable = res.data.data.pageable
                    this.totals = res.data.data.total
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
        // 获取部门数据
        getDepartment() {
            this.$http.get(
                'kpi/auth/dep/all',
            ).then(res => {
                this.departmentData = res.data.data
            }).catch(erro => {
                this.$message({
                    message: erro.message,
                    type: 'error'
                })
            })
        },
        // 添加
        addPerson() {
            this.disabled = true;
            this.$http.post('kpi/auth/personnel/save',
                JSON.stringify(this.tableData)).then((res) => {
                    if (res.data.status == 200) {
                        this.dialogVisible = false;
                        this.disabled = false;
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.tableData = {
                            department: {
                                id: "",
                            },
                            realName: "",
                            position: "",
                            username: ""
                        }
                        this.personInfo()
                    }else{
                        this.disabled = false;
                        this.$message({
                            type: 'error',
                            message: `${res.data.msg}${res.data.data}`
                        });
                    }
                })
        },
        // 编辑
        editPerson() {
            this.disabled = true;
            this.$http.post('kpi/auth/personnel/update',
                JSON.stringify(this.tableData)).then((res) => {
                    if (res.data.status == 200) {
                        this.disabled = false;
                        this.dialogVisible = false;
                        this.$message({
                            type: 'success',
                            message: '编辑成功!'
                        });
                        this.tableData = {
                            department: {
                                id: "",
                            },
                            realName: "",
                            position: "",
                            username: ""
                        }
                        this.addShow = true;
                        this.editShow = false;
                        this.propTitle = '添加人员'
                        this.personInfo()
                    }else{
                        this.disabled = false;
                        this.$message({
                            type: 'error',
                            message: `${res.data.msg}${res.data.data}`
                        });
                    }
                })
        },
        //权限
        authority() {
            if (this.$store.getters.roles.length > 0) {
                const roles = this.$store.getters.roles;
                roles[0].permissions.forEach(item => {
                    switch (item.permCode) {
                        case "perms[user:delete]":
                            this.isDel = true;
                            break;
                        case "perms[user:add]":
                            this.isAdd = true;
                            break;
                        case "perms[user:update]":
                            this.isEdit = true;
                            break;

                    }
                })
            }
        }

    },

}