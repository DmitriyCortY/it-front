<template>
    <div class="b-constructor__preview" @click="drop_select_point" :style="style_padding">
        <div class="b-constructor__preview-inner" :style="{transform: `scale(${scale}) translate3d(${translate})`}">
            <img
                :src="skeleton_data[`image_${side}`]"
                draggable="false"
                class="b-constructor__preview-main-image"
                :style="{opacity: opacity}"
            />

            <PreviewImage
                v-for="item in current_side_selected_attachments"
                :key="`card-${item.side}-image-${item.attachment.type}-${item.attachment.id}`"
                :item="item"
                :side="side"
                :radio="radio"
                :skeleton_points_data="skeleton_points_data"
                :selected_point_id="selected_point_id"
                :darken_parts="darken_parts"
            ></PreviewImage>

            <Point 
                v-for="item in current_side_selected_attachments_classes"
                :key="item.id"
                :item="item"
                :radio="radio[side]"
                :skeleton_points_data="skeleton_points_data"
                @select_point="on_select_point"
            ></Point>
        </div>
    </div>
</template>
<script>
import Point from './Point'
import PreviewImage from './PreviewImage'
export default {
    components: {
        Point,
        PreviewImage
    },
    props: [
        'skeleton_data', 
        'side', 
        'step', 
        'skeleton_points_data', 
        'selected_attachments',
        'selected_attachments_classes',
        'darken_parts'
    ],
    watch: {
        side: {
            deep: true,
            immediate: true,
            handler(){
                this.drop_select_point()
            }
        },
        step: {
            deep: true,
            immediate: true,
            handler(n, o){
                if(n < o){
                    if(n === 1){
                        this.selected_point_id = null
                        this.opacity = 1
                        this.scale = 1
                        this.translate = '0, 0, 0'
                    }
                }
            }
        }
    },
    data(){
        return {
            radio:{
                front: null,
                back: null
            },
            selected_point_id: null,
            opacity: 1,
            scale: 1,
            translate:  '0, 0, 0'
        }
    },
    created(){
        let interval = setInterval(()=>{
            this.get_radio(this.skeleton_data.image_front, 'front')
            this.get_radio(this.skeleton_data.image_back, 'back')
            if(this.radio.front != null && this.radio.back != null){
                clearInterval(interval)
            }
        },100)
        window.addEventListener('resize', ()=> {
            this.get_radio(this.skeleton_data.image_front, 'front')
            this.get_radio(this.skeleton_data.image_back, 'back')
            setTimeout(() => {
                this.get_radio(this.skeleton_data.image_front, 'front')
                this.get_radio(this.skeleton_data.image_back, 'back')
                setTimeout(() => {
                    this.get_radio(this.skeleton_data.image_front, 'front')
                    this.get_radio(this.skeleton_data.image_back, 'back')
                }, 333)
            }, 333)
        })
    },
    methods: {
        async get_radio(src, side){
            let img = new Image()
            let f = e => {
                let image_block = document.querySelector('.b-constructor__preview-main-image')
                let width = image_block.width
                this.radio[side] = width / e.currentTarget.width
            }
            img.onload = await f
            img.src = src
        },
        on_select_point({selected_point, event}){
            this.selected_point_id = parseInt(selected_point.point_id)
            this.$emit('select_point', selected_point)
            this.opacity = 0.35
            this.scale = 1.25


            let parent = document.querySelector('.b-constructor__preview-inner')
            let center = {
                x: parent.clientWidth / 2,
                y: parent.clientHeight / 2
            }
            let offset = {
                x: center.x - parseInt(event.currentTarget.style.left),
                y: center.y - parseInt(event.currentTarget.style.top)
            }
            if(this.side === 'front'){
                this.translate = `${offset.x - (window.innerWidth / 100 * 7.5)}px, ${offset.y}px, 0`
            }else if(this.side === 'back'){
                this.translate = `${offset.x + (window.innerWidth / 100 * 7.5)}px, ${offset.y}px, 0`
            }
        },
        drop_select_point(){
            this.selected_point_id = null
            this.$emit('drop_classes_list')
            this.opacity = 1
            this.scale = 1
            this.translate = '0, 0, 0'
        },
    },
    computed: {
        style_padding(){
            return this.side === 'front' ? {paddingLeft: '15vw'} : this.side === 'back' ? {paddingRight: '15vw'} : ''
        },
        current_side_points(){
            return this.skeleton_points_data.filter(item => item.side === this.side)
        },
        current_side_selected_attachments(){
            return this.selected_attachments.filter(item => item.side === this.side)
        },
        current_side_selected_attachments_classes(){
            return this.selected_attachments_classes.filter(item => item.side === this.side)
        }
    }
}
</script>

<style lang="scss">
    .b-constructor__preview{
        margin-bottom: 50px;
        position: relative;
        padding-top: 90px;
        padding-bottom: 150px;
        @media screen and (max-width: 1440px) {
            padding-top: 9%;
            padding-bottom: 15%;
        }
        &:hover{
            & .b-constructor__preview-attachment-point{
                opacity: 0.6;
            }
            & .b-constructor__point{
                opacity: 0.6;
            }
        }
    }
    .b-constructor__preview-inner{
        transition: all 0.3s ease-out;
        position: relative;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        @media screen and (max-width: 1440px){
            max-width: 50vw;
        }
    }
    .b-constructor__preview-main-image{
        z-index: 1;
        transition: all 0.4s ease;
    }
    .b-constructor__preview-attachment{
        position: absolute;
        top: 0;
        left: 0;
    }
    .b-constructor__preview-attachment-point{
        position: absolute;
        z-index: 2;
        transform: translate3d(-50%, -50%, 0);
        cursor: pointer;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #f44336;
        opacity: 0;
        @media screen and (max-width: 1170px){
            width: 9px;
            height: 9px;
        }
        transition: opacity 0.3s ease-in-out;
        &:hover{
            opacity: 1 !important;
        }
        @media screen and (max-width: 960px){
            opacity: 1 !important;
        }
    }
    .b-constructor__preview-attachment-image{
        position: absolute;
        display: block;
        z-index: 1;
        max-width: unset;
    }
</style>