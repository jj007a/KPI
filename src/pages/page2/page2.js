export default {
    name: 'page1',
    data() {
        return {
            formInline: {
                user: '',
                region: '',
                
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
                type: '',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                bumen: ''
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