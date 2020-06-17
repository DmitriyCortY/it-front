<template>
    <div class="b-compatibility-card b-tabs__content-item"  :title="item.description" @click="select_kit(item)">
        <div class="b-compatibility-card__main">
            <div class="b-compatibility-card__image" >
                <img 
                    class="b-compatibility-card__image-img-block"
                    :src="'http://totonis.site/corty/ivantactical.com/assets/img/cover-slider/11.png'">
            </div>
        </div>
        <!--  -->
        <div class="b-compatibility-card__footer">
            <div class="b-compatibility-card__title">
                {{item.name}} - {{item.id}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data(){return{}},
    created(){},
    methods: {
        select_kit(data){
            this.$emit('select_kit', data)
        }
    },
    computed: {}
}
</script>