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
                
            ],
            value: false,
            currentPage4: 4,
            dialogVisible: false,
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            }
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
        }


    },

}