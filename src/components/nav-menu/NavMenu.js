export default {
    name: 'navMenu',
    data: function () {
        return {
            routerNavslist: [
                {
                    name: '基础管理',
                    icon: 'el-icon-setting',
                    children: [
                        { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home', permCode: "perms[a:delete]"},
                        { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', permCode: "perms[a:delete]" },
                        { name: '/personnel', url: '/personnel', title: '考核人员管理', icon: 'el-icon-user', permCode: "perms[a:delete]"},
                    ]
                },
                {
                    name: '考核管理',
                    icon: 'el-icon-document-copy',
                    children: [
                        { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked', },
                        { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting',},
                        { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit', permCode: "perms[user:delete]" },
                    ]
                },
                {
                    name: '权限管理',
                    icon: 'el-icon-document-copy',
                    children: [
                        { name: '/roleManagement', url: '/roleManagement', title: '角色管理', icon: 'el-icon-document-checked'},
                        { name: '/jurisdictionManagement', url: '/jurisdictionManagement', title: '权限设置', icon: 'el-icon-document-checked'},
                        { name: '/user', url: '/user', title: '用户管理', icon: 'el-icon-document-checked'},
                    ]
                },
            ],
            newRouterNavsList: [
                {
                    name: '基础管理',
                    icon: 'el-icon-setting',
                    children: [
                      
                    ]
                },
                {
                    name: '考核管理',
                    icon: 'el-icon-document-copy',
                    children: [
                       
                    ]
                },
                {
                    name: '权限管理',
                    icon: 'el-icon-document-copy',
                    children: [
                        
                    ]
                },
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
            /*  this.$store.dispatch('GetUserInfo', this.$store.getters.userId).then(()=>{
                 console.log('ok')
             }) */
            if (this.$store.getters.roles.length > 0) {
                const roles = this.$store.getters.roles
                this.routerNavslist.forEach((item,index)=>{
                   console.log(item,'3菜单')
                   item.children.forEach((it,i)=>{
                       console.log(it,"1项里面对象")
                       roles[0].permissions.forEach(a=>{
                           console.log(a.permCode,"quanxiandaima")
                           if(a.permCode==it.permCode){
                               this.newRouterNavsList[index].children.push(it)
                           }
                       })
                   })
                })

                console.log(this.routerNavslist, 'new');
            } else {
                this.routerNavslist = [
                    {
                        name: '基础管理',
                        icon: 'el-icon-setting',
                        children: [
                            { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
                            // { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
                            { name: '/personnel', url: '/personnel', title: '考核人员管理', icon: 'el-icon-user', permCode: "perms[department:list]" },
                        ]
                    },
                    {
                        name: '考核管理',
                        icon: 'el-icon-document-copy',
                        children: [
                            { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
                            { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
                            { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit',  },
                        ]
                    },
                ]
            }
            /*  if (sessionStorage.getItem('roles')){
                 this.role = JSON.parse(sessionStorage.getItem('roles'))
                 if (this.role.length != 0) {
                     this.routerNavslist = [
                         {
                             name: '基础管理',
                             icon: 'el-icon-setting',
                             children: [
                                 { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
                                 { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
                                 { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user' },
                             ]
                         },
                         {
                             name: '考核管理',
                             icon: 'el-icon-document-copy',
                             children: [
                                 { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
                                 { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
                                 { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit' },
                             ]
                         },
                     ]
                 } else {
                     this.routerNavslist = [
                         {
                             name: '基础管理',
                             icon: 'el-icon-setting',
                             children: [
                                 { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
                                 // { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
                                 { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user' },
                             ]
                         },
                         {
                             name: '考核管理',
                             icon: 'el-icon-document-copy',
                             children: [
                                 { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
                                 { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
                                 { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit' },
                             ]
                         },
                     ]
                 }
             }else{
                 this.$http.get('kpi/auth/user/detail', { id: this.$store.getters.userId }).then(res => {
                     console.log(res,11122)
                     // this.$store.commit('SET_DEPID', res.data.data.department.id)
                     if(res.data.data){
                         sessionStorage.setItem("roles", JSON.stringify(res.data.data.roles))
                         this.role = res.data.data.roles
                     }else{
                         sessionStorage.setItem("roles", JSON.stringify([]))
                         this.role = []
                     }
                     
                     if (this.role.length != 0) {
                         this.routerNavslist = [
                             {
                                 name: '基础管理',
                                 icon: 'el-icon-setting',
                                 children: [
                                     { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
                                     { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
                                     { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user' },
                                 ]
                             },
                             {
                                 name: '考核管理',
                                 icon: 'el-icon-document-copy',
                                 children: [
                                     { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
                                     { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
                                     { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit' },
                                 ]
                             },
                         ]
                     } else {
                         this.routerNavslist = [
                             {
                                 name: '基础管理',
                                 icon: 'el-icon-setting',
                                 children: [
                                     { name: 'dashboard', url: '/dashboard', title: '首页', icon: 'el-icon-s-home' },
                                     // { name: '/department', url: '/department', title: '部门管理', icon: 'el-icon-house', role: 'super' },
                                     { name: '/personnel', url: '/personnel', title: '人员管理', icon: 'el-icon-user' },
                                 ]
                             },
                             {
                                 name: '考核管理',
                                 icon: 'el-icon-document-copy',
                                 children: [
                                     { name: '/KPITemplate', url: '/KPITemplate', title: '绩效考核模板', icon: 'el-icon-document-checked' },
                                     { name: '/KPISetting', url: '/KPISetting', title: '绩效考核设置', icon: 'el-icon-setting' },
                                     { name: '/KPIScore', url: '/KPIScore', title: '绩效考核评分', icon: 'el-icon-edit' },
                                 ]
                             },
                         ]
                     }
                 })
             } */
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