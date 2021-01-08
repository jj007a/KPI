export default {
    name: 'page1',
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            tableData: [
                {
                    date: '网络',
                    name: '王小虎',
                    address: '前端',
                    proson: '职员',
                    // action:'修改'
                },
                {
                    date: '网络',
                    name: '王小虎',
                    address: '前端',
                    proson: '职员',
                    // action:'修改'
                },
                {
                    date: '网络',
                    name: '王小虎',
                    address: '前端',
                    proson: '职员',
                    // action:'修改'
                },

            ],
            value: false,
            currentPage4: 4,
            dialogVisible: false,
            score:''
        }

    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        open() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }    

    },

}