export default {
    data() {
        return {
            assignmentItems:[

            ],
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
            let id={id:this.$route.query.id}

            this.assignmentItems=[

            ]
            this.$http.get('kpi/auth/score/scoring', id).then(res => {
                console.log(res)
                let data = res.data.data
                this.assignmentItems = data.assignmentItems
                console.log(this.assignmentItems,"122233")
               this.userItems= data.assignmentItems.map(item=>{
                    return item.userItems
                })
                console.log(this.userItems)
            })
        },  
    },
  
}
