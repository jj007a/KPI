export default {
    name: 'navMenu',
    data: function () {
        return {
            routerNavslist: [
                {
                    name: '基础管理',
                    icon: 'el-icon-setting',
                    permCode: "perms[index]",
                    children: [
                        { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home', permCode: "perms[index]" },
                        { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', permCode: "perms[department:list]" },
                        { name: '/personnel', url: '/personnel', title: '考核人员管理', icon: 'el-icon-user', permCode: "perms[user:add]" },
                    ]
                },
                {
                    name: '考核管理',
                    icon: 'el-icon-document-copy',
                    permCode: "perms[kpi]",
                    children: [
                        { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked', permCode: "perms[kpiMould:add]" },
                        { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting', permCode: "perms[kpiScore:list]" },
                        { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit', permCode: "perms[kpiScore:list]" },
                    ]
                },
                {
                    name: '权限管理',
                    icon: 'el-icon-document-copy',
                    permCode: "perms[auth]",
                    children: [
                        { name: '/roleManagement', url: '/roleManagement', title: '角色管理', icon: 'el-icon-document-checked', permCode: "perms[role:list]", },
                        { name: '/jurisdictionManagement', url: '/jurisdictionManagement', title: '权限设置', icon: 'el-icon-document-checked', permCode: "perms[auth]", },
                        { name: '/user', url: '/user', title: '用户管理', icon: 'el-icon-document-checked', permCode: "perms[user:list]" },
                        { name: '/userType', url: '/userType', title: '用户类型', icon: 'el-icon-document-checked', permCode: "perms[userCategory:list]" },
                    ]
                },
            ],
            newRouterNavsList: [

            ],
            routerName: {},
            isCollapse: false,
            defaultActiveNow: '',
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        add(routerName) {
            this.routerName = routerName
            this.$router.push({ path: routerName.url })
            this.$store.commit('setRouterName', routerName)
        },
        getInfo() {

            if (this.$store.getters.roles.length > 0) {
                const roles = this.$store.getters.roles
                this.routerNavslist.forEach((item, index) => {
                    var newObj = {}
                    roles[0].permissions.forEach(b => {

                        if (b.permCode == item.permCode) {
                            switch (b.permCode) {
                                case "perms[auth]":
                                    newObj = {
                                        name: '权限管理',
                                        icon: 'el-icon-document-copy',
                                        permCode: "perms[auth]",
                                        children: [
                                        ]
                                    };
                                    break;
                                case "perms[index]":
                                    newObj = {
                                        name: '基础管理',
                                        permCode: "perms[index]",
                                        icon: 'el-icon-setting',
                                        children: [

                                        ]
                                    };
                                    break;
                                case "perms[kpi]":
                                    newObj = {
                                        name: '考核管理',
                                        permCode: "perms[kpi]",
                                        icon: 'el-icon-document-copy',
                                        children: [

                                        ]
                                    };
                                    break;
                            }
                        }
                    })
                    item.children.forEach((it, i) => {
                        roles[0].permissions.forEach(a => {
                            
                            if (a.permCode == it.permCode) {
                                newObj.children.push(it)
                                this.newRouterNavsList.push(newObj)
                                this.newRouterNavsList=[...new Set(this.newRouterNavsList)]
                            }
                        })
                    })
                })

            }
            setTimeout(() => {

                let url = this.$route.path.split("?")[0].replace("/detail", "")
                let activeUrl = {}
                let indexUrl = { name: 'dashboard', url: '/dashboard', title: '首页' }
                this.routerNavslist.forEach(item => {
                    item.children.forEach(it => {
                        if (it.url == url) {
                            activeUrl.title = it.title;
                            activeUrl.url = it.url;
                            activeUrl.name = it.name
                        }
                    })
                })
                this.defaultActiveNow = activeUrl.url
                this.$store.commit('setRouterName', activeUrl)
            }, 500)


        },
        // getData(){
        //     setTimeout(()=>{
        //         if (this.$store.getters.userInfo!=0){
        //             this.routerNavslist = [
        //                 {
        //                     name: '基础管理',
        //                     icon: 'el-icon-setting',
        //                     children: [
        //                         { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
        //                         { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
        //                         { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user' },
        //                     ]
        //                 },
        //                 {
        //                     name: '考核管理',
        //                     icon: 'el-icon-document-copy',
        //                     children: [
        //                         { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
        //                         { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
        //                         { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit' },
        //                     ]
        //                 },
        //             ]
        //         }else{
        //             this.routerNavslist = [
        //                 {
        //                     name: '基础管理',
        //                     icon: 'el-icon-setting',
        //                     children: [
        //                         { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
        //                         // { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
        //                         { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user' },
        //                     ]
        //                 },
        //                 {
        //                     name: '考核管理',
        //                     icon: 'el-icon-document-copy',
        //                     children: [
        //                         { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
        //                         { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
        //                         { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit' },
        //                     ]
        //                 },
        //             ]
        //         }

        //         let url = this.$route.path.split("?")[0].replace("/detail","")
        //         let activeUrl = {}
        //         let indexUrl = { name: 'dashboard', url: '/dashboard', title: '首页' }
        //         this.routerNavslist.forEach(item => {
        //             item.children.forEach(it => {
        //                 if (it.url == url){
        //                     activeUrl.title = it.title;
        //                     activeUrl.url = it.url;
        //                     activeUrl.name = it.name
        //                 }
        //             })
        //         })
        //         this.defaultActiveNow = activeUrl.url
        //         this.$store.commit('setRouterName', activeUrl)
        //     },100)

        // }
    },
    created() {
        this.getInfo()
    }

}