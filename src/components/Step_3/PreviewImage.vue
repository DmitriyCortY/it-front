<template>
    <div 
        class="b-constructor__preview-image-box"
        :style="{
            left: `${parseFloat(parent_pos.x * radio[side])}px`, 
            top: `${parseFloat(parent_pos.y * radio[side])}px`, 
            zIndex: item.z_index,
            opacity: opacity_style
        }"
    >
    
        <img 
            :style="{
                left: `-${parseFloat(current_pos.x) * radio[side]}px`, 
                top: `-${parseFloat(current_pos.y) * radio[side]}px`, 
                width: `${width[side] * radio[side]}px`,
                filter: dark_style
            }"
            draggable="false"
            :src="item.image[side]" 
            class="b-constructor__preview-image"
        >
    </div>
</template>

<script>
export default {
    props: [
        'item', 
        'side', 
        'radio', 
        'skeleton_points_data',
        'selected_point_id',
        'darken_parts'
    ],
    watch: {},
    data(){
        return {
            width:{
                front: null,
                back: null
            }
        }
    },
    created(){
        this.get_width(this.item.image.front, 'front')
        this.get_width(this.item.image.back, 'back')
    },
    methods: {
        async get_width(src, side){
            let img = new Image()
            let f = e => {
                this.width[side] = e.currentTarget.width
            }
            img.onload = await f
            img.src = src
        },
        parent_point_pos(item, type){
            let  q = []
            if(type === 'part'){
                q = this.all_parts_points.filter(elem=>parseInt(elem.part_id)===parseInt(item.part_id)&&item.side===elem.side&&elem.type!=item.type)[0]
            }else if(type === 'product'){
                q = this.all_products_points.filter(elem=>parseInt(elem.product_id)===parseInt(item.product_id)&&item.side===elem.side&&elem.type!=item.type)[0]
            }
            return {
                x: this.skeleton_points_data.filter(elem=>q.class.includes(elem.class[0])&&elem.side===q.side)[0].pos_x - q.pos_x ,
                y: this.skeleton_points_data.filter(elem=>q.class.includes(elem.class[0])&&elem.side===q.side)[0].pos_y - q.pos_y 
            }
        }
    },
    computed: {
        all_parts_points() {
            return this.$store.getters.all_parts_points;
        },

        all_products_points() {
            return this.$store.getters.all_products_points;
        },
        parent_pos(){
            let pos = {
                x: null,
                y: null
            }
            if(this.item.parent.type === 'skeleton'){
                let parent_point = this.skeleton_points_data.filter(item => parseInt(item.id) === parseInt(this.item.parent.point_id))[0]
                if(parent_point){
                    pos.x = parseFloat(parent_point.pos_x)
                    pos.y = parseFloat(parent_point.pos_y)
                }
            }else if(this.item.parent.type === 'part'){
                let parent_point = this.all_parts_points.filter(item => parseInt(item.id) === parseInt(this.item.parent.point_id))[0]
                if(parent_point){
                    pos.x = parseFloat(this.parent_point_pos(parent_point, 'part').x) + parseFloat(parent_point.pos_x)
                    pos.y = parseFloat(this.parent_point_pos(parent_point, 'part').y) + parseFloat(parent_point.pos_y)
                }
            }else if(this.item.parent.type === 'product'){
                let parent_point = this.all_products_points.filter(item => parseInt(item.id) === parseInt(this.item.parent.point_id))[0]
                if(parent_point){
                    pos.x = parseFloat(this.parent_point_pos(parent_point, 'product').x) + parseFloat(parent_point.pos_x)
                    pos.y = parseFloat(this.parent_point_pos(parent_point, 'product').y) + parseFloat(parent_point.pos_y)
                }
            }
            return pos
        },
        current_pos(){
            let current_point = {}
            if(this.item.attachment.type === 'part'){
                current_point = this.all_parts_points.filter(item => parseInt(item.id) === parseInt(this.item.attachment.point_id))[0]
            }else if(this.item.attachment.type === 'product'){
                current_point = this.all_products_points.filter(item => parseInt(item.id) === parseInt(this.item.attachment.point_id))[0]
            }
            return {
                x: current_point ? parseFloat(current_point.pos_x) : null,
                y: current_point ? parseFloat(current_point.pos_y) : null
            }
        },
        opacity_style(){
            let o = 1
            if(this.selected_point_id){
                o = parseInt(this.item.parent.point_id) === parseInt(this.selected_point_id) ? 1 : 0.35
            }else{
                o = 1
            }
            return o
        },
        dark_style(){
            let style = ''
            if(this.item.attachment.type === 'part' && this.darken_parts){
                style = 'brightness(0.35) blur(1px)'
            }
            return style
        }
    }
}
</script>

<style lang="scss">
    .b-constructor__preview-image-box{
        position: absolute;
        transition: all 0.4s ease;
    }
    .b-constructor__preview-image{
        position: absolute;
        max-width: unset;
    }
</style>