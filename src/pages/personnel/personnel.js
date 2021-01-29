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
                   /*  manager: "",
                    name: "", */
                },
                /* id: "", */
                realName: "",
                position:"",
               /*  roles: [
                    {
                        id: "",
                        permissions: [
                            {
                                id: 0,
                                permCode: string,
                                permName: string,
                                requestPath: string,
                                rolePermissions: [
                                    {
                                        id: 0
                                    }
                                ]
                            }
                        ],
                        roleName: string
                    }
                ], */
                // serialNumber: string,
                username: ""
            },
            value: false,
            currentPage4: 1,
            dialogVisible: false,
            personList: [],
            editShow:false,
            addShow:true,
            propTitle:"添加人员",
            pageable:{
                pageNumber:1,
                pageSize:10,
                searchPropertyValue:"",
                searchProperty:'u.realName',
            },
            totals:40
        }

    },
    created() {
        this.getDepartment()
        this.personInfo()
    },
    methods: {
        handleEdit(index, row) {
            this.dialogVisible=true
            this.$http.get('kpi/auth/user/detail',{id:row.id}).then(res=>{
                this.tableData=res.data.data
                this.addShow = false;
                this.editShow = true;
                this.propTitle='编辑人员'
            })

        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除模板, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('kpi/auth/user/delete', { id: row.id }).then(res => {
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
            this.$http.get('kpi/auth/user/list', this.pageable).then(res => {
                this.personList = res.data.data.data
                // this.pageable = res.pageable
            })
        },
        // 分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageable.pageNumber=val
            this.$http.get('kpi/auth/user/list', this.pageable).then(res => {
                if(res.data.data){
                     this.personList = res.data.data.data
                }
               
                // this.pageable = res.pageable
            })
        },
        // 搜索
        search(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.pageable.searchProperty ="u.realName";
                    this.pageable.searchPropertyValue=this.pageable.searchPropertyValue
                    this.$http.get('kpi/auth/user/list', this.pageable).then(res => {
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
        personInfo(){
            this.$http.get('kpi/auth/user/list',this.pageable).then(res=>{
                if(res.data.status==200){
                    this.personList = res.data.data.data
                    this.pageable = res.data.data.pageable
                    this.totals = res.data.data.totalPages
                }else if(res.data.status==401){
                    this.$message({
                        type: "error",
                        message: `登录已过期,${res.data.msg}`
                    })
                    this.$store.dispatch('LoginOut')
                    this.$router.push('/login')
                }else{
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
        addPerson(){
            this.$http.post('kpi/auth/user/save',
            JSON.stringify(this.tableData) ).then((res)=>{
                if(res.status==200){
                    this.dialogVisible=false
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.tableData= {
                        department: {
                            id: "",
                        },
                            realName: "",
                            position: "",
                            username: ""
                    }
                    this.personInfo()
                }
            })
        },
        // 编辑
        editPerson(){
            this.$http.post('kpi/auth/user/update',
            JSON.stringify(this.tableData) ).then((res)=>{
                if(res.status==200){
                    this.dialogVisible=false;
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
                    this.tableData= {
                        department: {
                            id: "",
                        },
                            realName: "",
                            position: "",
                            username: ""
                    }
                    this.addShow=true;
                    this.editShow=false;
                    this.propTitle='添加人员'
                    this.personInfo()
                }
            })
        },

    },

}