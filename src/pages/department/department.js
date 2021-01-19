export default {
    name: 'department',
    data() {
        return {
            departmentForm:{
                name: '',
                manager:''
            },
            tableData:[/* {
                createdDate:'',
                id:'',
                manager:'',
                name:''
            } */],
            editData:{
                createdDate: '',
                manager: '',
                name: '',
                id:''
            },
            dialogVisible: false,
        }
        
    },
    created() {
        this.getDepartment()
    },
    methods: {
        handleEdit(index, row) {
            this.dialogVisible=true  
            this.$http.get('kpi/auth/dep/detail',{id:row}).then(res=>{
                this.editData=res.data.data
            })
        },
        editDepartment(){
            var data={
                id:this.editData.id,
                manager: this.editData.manager,
                name: this.editData.name,
            }
            this.$http.post('kpi/auth/dep/update',data).then(res=>{
                this.dialogVisible = false;
                this.getDepartment()
            })
        },
        handleDelete(index, row) {
            this.$http.post('kpi/auth/dep/delete', { id: row}).then(res=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getDepartment() 
            })
        },
        getDepartment(){
            console.log(123)
            var params =JSON.stringify( { pageNumber: 1, pageSize: 10})
            this.$http.get(
                'kpi/auth/dep/list',
                params
            ).then(res=>{
                this.tableData=res.data.data
            }).catch(erro=>{
                this.$message({
                    message:erro.message,
                    type:'error'
                })
            })
           
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$http.
              let data = {
                  manager: this.departmentForm.manager,
                  name: this.departmentForm.name,
              }
              this.$http.post('kpi/auth/dep/save',data).then(res=>{
                 
                  this.$message({
                      message: '部门添加成功',
                      type: 'success'
                  });
                  this.getDepartment() 
                  this.$refs[formName].resetFields();
              }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        
    },
    computed:{
       
    }
}