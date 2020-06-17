<template>
    <div class="b-constructor">
        <div class="b-constructor__inner">
            <div class="b-title b-title_light b-title_fz-norm b-title_center b-title_fw-400 b-constructor__title">
                <span>
                    {{title}}
                </span>
            </div>
            <!--  -->
            <div class="b-constructor__desc">
                {{description}}
            </div>
            <!--  -->
            <div class="b-constructor__tabs">
                <div class="b-tabs">
                    <div class="b-tabs__inner">
                        <Categoryes 
                            v-if="categoryes.length>0" 
                            :categoryes="categoryes" 
                            @select_category="on_select_category"
                        ></Categoryes>
                        
                        <div class="b-tabs__main">
                            <div class="b-tabs__content active">
                                <Card
                                    v-for="(item, index) in filtered_bases_list" 
                                    :key="index"
                                    :item="item"
                                    @select_base="on_select_base"
                                ></Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Categoryes from '@/components/Step_1/Categoryes.vue'
import Card from '@/components/Step_1/Card.vue'
export default {
    components: {
        Categoryes,
        Card
    },
    data(){
        return {
            title: 'Weapon for tuning',
            description: 'Choose weapon that you want to customized',
            // 
            category_id: 'all'
        }
    },
    created(){},
    methods:{
        on_select_category(id){
            if(id === 'all'){
                this.category_id = id
            }else{
                this.category_id = parseInt(id)
            }
        },
        on_select_base(data){
            this.$store.dispatch('current_base_data', data)
        }
    },
    computed: {
        categoryes(){
            return this.$store.getters.categoryes
        },
        all_bases(){
            return this.$store.getters.all_bases
        },
        filtered_bases_list(){
            let list = []
            if(typeof this.category_id == 'string'){
                list.push(...this.all_bases)
            }else{
                list.push(...this.all_bases.filter(item=>parseInt(item.category)===parseInt(this.category_id)))
            }
            return list
        },
    }
}
</script>