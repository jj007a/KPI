export default {
    data() {
        return {
            header: "绩效考核模板",
            tableData: {},
            value: false,
            currentPage4: 4,
            dynamicValidateForm: {
                department: {
                    id: ""
                },
                id: "",
                kpiMouldItems: [{
                    kpiName: '',
                    score: '',
                }],
                mouldName: '',
                totalScore: ''
            },
            KpiMouldList: [],
            dialogVisible: false,
            dialogViewProp: false,
            isSave: true,
            isView: false,
            isEdit: false
        }
    },
    // filters: {
    //     formatDate: (value)=> {
    //         if (!value) return ''
    //         return this.$moment(value).format("YYYY-MM-DD")
    //     }
    // },
    created() {
        this.getDepartment()
        this.getKpiMouldInfo()
    },
    methods: {
        removeDomain(item) {
            var index = this.dynamicValidateForm.kpiMouldItems.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.kpiMouldItems.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.kpiMouldItems.push({
                kpiName: '',
                score: '',
            });
        },
        // 模板列表下拉菜单
        editKpiMould(a) {
            if (a.value == 'edit') {
                this.$http.get('kpi/auth/mould/detail', { id: a.id }).then(res => {
                    this.dynamicValidateForm = res.data.data
                    this.header = '绩效考核编辑'
                    this.isSave = false;
                    this.isView = false;
                    this.isEdit = true;
                })
            } else if (a.value == 'view') {
                // this.dialogViewProp=true
                this.$http.get('kpi/auth/mould/detail', { id: a.id }).then(res => {
                    this.dynamicValidateForm = res.data.data
                    this.header = '绩效考核查看'
                    this.isSave = false
                    this.isView = true
                })
            } else {
                this.$confirm('此操作将永久删除模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('kpi/auth/mould/delete', { id: a }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getKpiMouldInfo()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

        },
        // 返回
        moudelBack() {
            this.dynamicValidateForm = {
                department: {
                    id: ""
                },
                id: "",
                kpiMouldItems: [{
                    kpiName: '',
                    score: ''
                }],
                mouldName: '',
                totalScore: ''
            }
            this.header = '绩效考核模板'
            this.isSave = true;
            this.isView = false;
            this.isEdit = false;
        },
        // 初始化模板
        getKpiMouldInfo() {
            this.$http.get('kpi/auth/mould/list').then(res => {
                console.log(res)
                this.KpiMouldList = res.data.data.data.data
            })
        },
        // 获取部门数据
        getDepartment() {
            this.$http.get(
                'kpi/auth/dep/all',
            ).then(res => {
                this.tableData = res.data.data
            }).catch(erro => {
                this.$message({
                    message: erro.message,
                    type: 'error'
                })
            })

        },
        // 新增
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('kpi/auth/mould/save',
                        JSON.stringify(this.dynamicValidateForm)).then(res => {
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '模板添加成功'
                                })
                                this.getKpiMouldInfo()
                                this.$refs[formName].resetFields();
                            }

                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //编辑
        editForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('kpi/auth/mould/update',
                        JSON.stringify(this.dynamicValidateForm)).then(res => {
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '模板编辑成功'
                                })
                                this.getKpiMouldInfo()
                                this.dynamicValidateForm = {
                                    department: {
                                        id: ""
                                    },
                                    id: "",
                                    kpiMouldItems: [{
                                        kpiName: '',
                                        score: ''
                                    }],
                                    mouldName: '',
                                    totalScore: ''
                                }
                                this.header = '绩效考核模板'
                                this.isSave = true;
                                this.isView = false;
                                this.isEdit = false;

                            }

                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}