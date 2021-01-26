export default {
  name: 'page1',
  data() {
    return {
      moudle: [],
      person:{
        
      },
      tableData:{
        assessorId:"",
        endDate:"",
        startDate:"",
        kpiMouldId:"",
        kpiCategory:"",
        userIds:[]
      },
      propTitle:'绩效模板任务添加',
      assignmentList:[],
      categoryList:[],
      value: false,
      currentPage4: 1,
      dialogVisible: false,
      dialogEditVisible: false,
      formLabelAlign: {
        options: [],
      },
      formInline:{},
      editFromLabel: {
        name: '',
        region: '',
        type: '',
        date1: '',
        date2: '',
        cycle: '',
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
        objects: [],
      },
      isAdd:true,
      isEdit:false,
      pageable: {
        pageNumber: 1,
        pageSize: 10
      },
      totals: 40
    }

  },
  created() {
    this.getMouldDate();
    this.getKpiTemplate();
    this.getPorson()
    this.getAssignmentList()
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
 
    /* 
    *获取模板列表
    */
    getKpiTemplate(){
      this.$http.get('kpi/auth/mould/list').then(res=>{
          this.moudle=res.data.data.data.data
      })
    },
    /**
     * 获取人员
     */
    getPorson(){
      this.$http.get('kpi/auth/user/list').then(res=>{
        this.formLabelAlign.options=res.data.data.data;
      })
    },
    //获取模板日期类型
    getMouldDate(){
      this.$http.get('kpi/auth/category/list').then(res=>{
        this.categoryList=res.data.data
      })
    },
    //获取 设置列表
    getAssignmentList(){
     this.$http.get('kpi/auth/assignment/list',{pageNumber:1,pageSize:10}).then(res=>{
       this.assignmentList=res.data.data.data
       this.pageable = res.data.data.pageable
       console.log(res.data.data.total)
       this.totals = res.data.data.totalPages
     }) 
    },
    //新增弹框
    addProp(){
      this.dialogVisible = true;
      this.isAdd=true;
      this.isEdit=false
      this.propTitle = '绩效考核任务添加'
      this.tableData =  {
        endDate: "",
        startDate: "",
        kpiMouldId: "",
        kpiCategory: "",
        userIds: []
      }
    },
    //编辑弹框
    editProp() {
      this.dialogVisible = true;
      this.isAdd = false;
      this.isEdit = true
    },
    // 新增提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData.assessorId = this.$store.state.userId
          this.$http.post('kpi/auth/assignment/save',
          JSON.stringify(this.tableData) ).then(res => {
            this.$message({
              message: '模板配置完成',
              type: 'success'
            });
            this.dialogVisible = false
            this.getAssignmentList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }, 
    //查看详情
    viewDetail(row){
      this.dialogVisible = true
      this.isEdit=true;
      this.isAdd=false;
      this.propTitle='绩效考核任务编辑';
      this.$http.get('kpi/auth/assignment/detail',{id:row.id}).then(res=>{
        let data=res.data.data;
        console.log(this.tableData)
        this.tableData.endDate=data.endDate;
        this.tableData.startDate=data.startDate;
        this.tableData.kpiCategory=data.kpiCategory;
        this.tableData.kpiMouldId=data.kpiMouldId;
        this.tableData.id=data.id;
        this.tableData.userIds = data.users.map(item=>{
          return item.id
        })
       
      })
    },  
    // 下拉多选数据强制刷新
    dataUpdate(){
      this.$forceUpdate();
    },
    //编辑
    edit(){
      
      this.$http.post('kpi/auth/assignment/update', 
      JSON.stringify(this.tableData)).then(res => {
        this.$message({
          message: '模板编辑完成',
          type: 'success'
        });
          this.dialogVisible = false;
          this.getAssignmentList();
        })
    },
    del(row){
      
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('kpi/auth/assignment/delete', { id: row.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getAssignmentList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
  },

}