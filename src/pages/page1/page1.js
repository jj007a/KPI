export default {
    name: 'page1',
    data() {
        return {
            dynamicValidateForm:{
                domains: [{
                    value: ''
                }],
            }
        }
        
    },
    methods: {
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
            });
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
       
        
    },
    computed:{
       
    }
}