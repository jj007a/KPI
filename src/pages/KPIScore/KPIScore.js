export default {
    name: 'page1',
    data() {
        return {
            formInline: {
                kpiMouldName: "",
                assessmentDate: ""
            },
            tableData: {
                endDate: "",
                startDate: "",
                kpiMouldId: "",
                kpiCategory: "",
                userIds: []
            },
            assignmentList: [],
            currentPage4: 1,
            values: false,
            dialogVisible: false,
            score: '',
            pageable: {
                pageNumber: 1,
                pageSize: 10
            },
            totals: 40,
            isScore: false,
        }

    },
    created() {
        this.getAssignmentList();
        this.authority()
    },
    methods: {
        handleSizeChange(val) {
            this.pageable.pageSize = val
            let data = { ...this.pageable, ...this.formInline }
            this.$http.get('kpi/auth/assignment/list', this.pageable).then(res => {
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
            this.pageable.pageNumber = val
            let data = { ...this.pageable, ...this.formInline }
            this.$http.get('kpi/auth/assignment/list', this.pageable).then(res => {
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
                    this.pageable = res.data.data.pageable
                    this.totals = res.data.data.totalPages
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
        authority() {
            if (this.$store.getters.roles.length > 0) {
                const roles = this.$store.getters.roles;
                console.log(roles)
                roles[0].permissions.forEach(item => {
                    switch (item.permCode) {
                        case "perms[kpiScore:update]":
                            this.isScore = true;
                            break;
                       

                    }
                })
            }
        }

    },

}