<template>
    <div class="b-constructor">
        <div class="b-constructor__inner">
            <div class="b-title b-title_light b-title_fz-norm b-title_center b-title_fw-400 b-constructor__title">
                <span>
                    {{title}}
                </span>
            </div>
            <!--  -->
            <div class="b-constructor__null-base" @click="select_default_base(base_by_id)">
                <div class="b-constructor__null-base-col-left">
                    <div class="b-constructor__null-base-image">
                        <div class="b-constructor__null-base-image-inner" :style="{backgroundImage: `url(http://totonis.site/corty/ivantactical.com/assets/img/cover-slider/11.png)`}">

                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="b-constructor__null-base-col-right">
                    <div class="b-constructor__null-base-title" v-if="base_by_id.name">
                        {{base_by_id.name}}
                    </div>
                    <div class="b-constructor__null-base-desc" v-if="base_by_id.description">
                        {{base_by_id.description}}
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="b-constructor__list">
                <Card 
                    v-for="(item, index) in filtered_kits_list" 
                    :key="index"
                    :item="item"
                    @select_kit="on_select_kit"
                ></Card>
            </div>
        </div>
    </div>
</template>
<script>
import Card from '@/components/Step_2/Card'
export default {
    components: {
        Card
    },
    watch: {},
    data(){
        return {
            title: 'Tunning base'
        }
    },
    mounted(){},
    methods: {
        on_select_kit(data){
            this.$store.dispatch('selected_kit', data)
        },
        select_default_base(data){
            this.$store.dispatch('selected_base', data)
        }
    },
    computed: {
        current_base_data(){
            return this.$store.getters.current_base_data
        },
        all_bases(){
            return this.$store.getters.all_bases
        },
        base_by_id(){
            let base = []
            if(this.current_base_data.base_id){
                base = this.all_bases.filter(item => parseInt(item.id) === parseInt(this.current_base_data.base_id))[0]
            }
            return base
        },
        all_kits(){
            return this.$store.getters.all_kits
        },
        filtered_kits_list(){
            let list = []
            if(this.current_base_data.skeleton_id){
                list = this.all_kits.filter(item => parseInt(item.skeleton_id) === parseInt(this.current_base_data.skeleton_id))
            }
            return list
        }
    }
}
</script>