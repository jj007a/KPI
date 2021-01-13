export default {
    name: 'navMenu',
    data:function() {
        return {
            routerNavslist:[],
            routerName: {},
            isCollapse:false,
            defaultActiveNow:''
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        add(routerName){
            this.routerName = routerName
            this.$router.push({path:routerName.url})
            this.$store.commit('setRouterName',routerName)            
        },
        getData(){
           
            setTimeout(()=>{
                
                this.routerNavslist = [
                    {
                        name:'基础管理',
                        icon:'el-icon-setting',
                        children:[
                            { name: 'dashboard', url: '/dashboard', title: '首页', icon:'el-icon-s-home'},
                            { name: '/department', url: '/department', title: '部门管理', icon:'el-icon-house'},
                            { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user'},
                        ]
                    },
                    {
                        name:'考核管理',
                        icon: 'el-icon-document-copy',
                        children:[
                            { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked'},
                            { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting'},
                            { name: '/KPiScore', url: '/KPiScore', title: '绩效考核评分', icon: 'el-icon-edit'},
                        ]
                    },
                ]
                let url = this.$route.path.replace("/detail","")
                console.log(url)
                let activeUrl = {}
                let indexUrl = { name: 'dashboard', url: '/dashboard', title: '首页' }
                this.routerNavslist.forEach(item => {
                    item.children.forEach(it => {
                        if (it.url == url) {
                            activeUrl.title = it.title;
                            activeUrl.url = it.url;
                            activeUrl.name = it.name

                        } else if (it.url == '/dashboard'){
                            activeUrl = indexUrl
                        }
                    })
                })
                this.defaultActiveNow = activeUrl.url
                this.$store.commit('setRouterName', activeUrl)
            },100)
            
        }
    },
    created(){
        this.getData()
    }

}