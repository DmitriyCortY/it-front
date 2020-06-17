<template>
    <div class="b-compatibility-card b-tabs__content-item" @click="select_base" :title="item.description">
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
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data(){return {}},
    created(){},
    methods: {
        select_base(){
            this.$emit('select_base', 
                {
                    base_id: parseInt(this.item.id),
                    skeleton_id: parseInt(this.item.skeleton_id)
                }
            )
        }
    },
    computed: {
    }
}
</script>
<style lang="scss">
.b-compatibility-card{
    -webkit-animation: tabAnimContent .4s ease;
    animation: tabAnimContent .4s ease;
}
.b-compatibility-card__image-img-block{
    display: block;
    margin: auto;
}
.b-compatibility-card__image{
    // padding: 8% 15% 8% 25%;
    padding: 4% 0 4% 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.b-image-container__image{
        position: absolute;
        display: block;
    }
</style>