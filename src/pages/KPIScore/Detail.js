export default {
    data() {
        return {
            tableForm:{
                assignmentId:'',
                assignmentMouldName:"",
                assignmentItems: [
                    {}
                ],
            },
            userItems:[],
            rules: {
                num: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
            },
        };
    },

    components: {},
    created() {
            this.getKpiScoreDetail()
        
    },
    methods: {
        //获取考核评分详情
        getKpiScoreDetail() {
            console.log(this.$route.query.id)
            let assignmentId = { assignmentId:this.$route.query.id}
            this.$http.get('kpi/auth/score/scoring', assignmentId).then(res => {
                let data = res.data.data
                this.tableForm.assignmentId = data.assignmentId
                this.tableForm.assignmentMouldName = data.assignmentMouldName
                this.tableForm.assignmentItems = data.assignmentItems
            })
        },  
        submitForm(formName){

            this.$confirm('确定考核提交吗？提交之后不能修改。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('kpi/auth/score/save',
                    JSON.stringify(this.tableForm)).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type:'success',
                                message:"考核成功"
                            })
                            this.$router.push('/KPIScore')
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
           
        }
    },
  
}
