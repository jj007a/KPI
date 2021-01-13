export default {
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
            dynamicValidateForm: {
                domains: [{
                    value: '',
                    num:''
                }],
                templateName: '',
                templateTotalNum: ''
            }
        }
    },
    methods: {
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
            });
        }
    }
}