export default {
    name: 'page1',
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            tableData: {
                endDate: "",
                startDate: "",
                kpiMouldId: "",
                kpiCategory: "",
                userIds: []
            },
            assignmentList: [],
            currentPage4:1,
            values: false,
            dialogVisible: false,
            score:'',
            pageable: {
                pageNumber: 1,
                pageSize: 10
            },
            totals: 40
        }

    },
    created() {
        this.getAssignmentList();
    },
    methods: {
        handleSizeChange(val) {
            this.pageable.pageSize = val
            this.$http.get('kpi/auth/assignment/list', this.pageable).then(res => {
                this.assignmentList = res.data.data.data
            })
        },
        // 分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageable.pageNumber = val
            this.$http.get('kpi/auth/assignment/list', this.pageable).then(res => {
                this.assignmentList = res.data.data.data
            })
        },

        //获取 设置列表
        getAssignmentList() {
            this.$http.get('kpi/auth/assignment/list', { pageNumber: 1, pageSize: 10 }).then(res => {
                this.assignmentList = res.data.data.data
                this.pageable = res.data.data.pageable
                this.totals = res.data.data.totalPages
            })
        },
        

    },

}