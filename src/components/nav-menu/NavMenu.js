export default {
    name: 'navMenu',
    data:function() {
        return {
            routerNavslist:[],
            routerName: {},
            isCollapse:false,
            defaultActiveNow:'dashboard'
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
                            { name: '/page1', url: '/page1', title: '部门管理', icon:'el-icon-house'},
                            { name: '/page2', url: '/page2', title: '人员管理', icon: 'el-icon-user'},
                        ]
                    },
                    {
                        name:'考核管理',
                        icon: 'el-icon-document-copy',
                        children:[
                            { name: '/page3', url: '/page3', title: '绩效考核模板', icon: 'el-icon-document-checked'},
                            { name: '/page4', url: '/page4', title: '绩效考核设置', icon: 'el-icon-setting'},
                            { name: '/page5', url: '/page5', title: '绩效考核评分', icon: 'el-icon-edit'},
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