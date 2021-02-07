export default {
    data() {
        return {
            tableForm:{
                assessorId:'',
                assignmentId:'',
                assignmentMouldName:"",
                assignmentItems: [
                    {
                       kpiS:1
                    }
                ],
            },
            userItems:[
                {factScore:""}
            ],
            rules: {
                factScore: [{ required: true, message: "分值不能为空", trigger: 'blur' }],
            },
        };
    },

    components: {},
    created() {
            this.getKpiScoreDetail()
        
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            /* console.log(rowIndex, columnIndex) */
            /* if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            } */
        },
        //获取考核评分详情
        getKpiScoreDetail() {
            console.log(this.$route.query.id)
            let assignmentId = { assignmentId:this.$route.query.id}
            this.$http.get('kpi/auth/score/scoring', assignmentId).then(res => {
                let data = res.data.data
                this.tableForm.assessorId = data.assessorId
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
                        if (res.data.status == 200) {
                            this.$message({
                                type:'success',
                                message:"考核成功"
                            })
                            this.$router.push('/KPIScore')
                        }else{
                            this.$message({
                                type:'error',
                                message:"用户实际得分不能为空"
                            })
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
