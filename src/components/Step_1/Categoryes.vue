<template>
    <div class="b-tabs__header">
        <div class="b-tabs__trigger" @click="select_all_category()" :ref="`category-all`">
            All
        </div>
        <div class="b-tabs__trigger" v-for="item in categoryes" :key="item.id" @click="select_category(item.id)" :ref="`category-${item.id}`">
            {{item.name}}
        </div>
    </div>
</template>
<script>
export default {
    props:['categoryes'],
    data(){
        return {

        }
    },
    mounted(){
        this.select_all_category()
    },
    methods: {
        select_all_category(){
            this.toggler_css_class('all')
            this.$emit('select_category', 'all')
        },
        select_category(id){
            this.toggler_css_class(id)
            this.$emit('select_category', id)
        },
        toggler_css_class(params){
            for(let i in this.$refs){
                if(i.includes('category')){
                    if(this.$refs[i][0]){
                        this.$refs[i][0].classList.remove('active')
                    }else{
                        this.$refs[i].classList.remove('active')
                    }
                }
            }
            
            if(this.$refs[`category-${params}`][0]){
                this.$refs[`category-${params}`][0].classList.add('active')
            }else{
                this.$refs[`category-${params}`].classList.add('active')
            }
        },

    },
    computed:{}
}
</script>
<style lang="scss">
    .b-tabs__trigger{
        user-select: none;
    }
</style>