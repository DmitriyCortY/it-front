<template>
  <div
    class="b-constructor__point"
    @click.stop.prevent.self="select_point"
    :style="{
            left: `${parent_pos.x * radio}px`,
            top: `${parent_pos.y * radio}px`
        }"
    ></div>
</template>

<script>
export default {
    props: [
        "item", 
        "radio",
        'skeleton_points_data'
    ],
    methods: {
        select_point(e) {
            
            this.$emit("select_point", {
                selected_point: this.item,
                event: e
            });
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
            if(this.item.type === 'skeleton'){
                let parent_point = this.skeleton_points_data.filter(item => parseInt(item.id) === parseInt(this.item.point_id))[0]
                if(parent_point){
                    pos.x = parseFloat(parent_point.pos_x)
                    pos.y = parseFloat(parent_point.pos_y)
                }
            }else if(this.item.type === 'part'){
                let parent_point = this.all_parts_points.filter(item => parseInt(item.id) === parseInt(this.item.point_id))[0]
                if(parent_point){
                    pos.x = parseFloat(this.parent_point_pos(parent_point, 'part').x) + parseFloat(parent_point.pos_x)
                    pos.y = parseFloat(this.parent_point_pos(parent_point, 'part').y) + parseFloat(parent_point.pos_y)
                }
            }else if(this.item.type === 'product'){
                let parent_point = this.all_products_points.filter(item => parseInt(item.id) === parseInt(this.item.point_id))[0]
                if(parent_point){
                    pos.x = parseFloat(this.parent_point_pos(parent_point, 'product').x) + parseFloat(parent_point.pos_x)
                    pos.y = parseFloat(this.parent_point_pos(parent_point, 'product').y) + parseFloat(parent_point.pos_y)
                }
            }
            return pos
        },
    },
};
</script>

<style lang="scss">
.b-constructor__point {
  position: absolute;
  z-index: 5;
  transform: translate3d(-50%, -50%, 0);
  cursor: pointer;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f44336;
  opacity: 0;
  @media screen and (max-width: 1170px) {
    width: 9px;
    height: 9px;
  }
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 1 !important;
  }
  @media screen and (max-width: 960px) {
    opacity: 1 !important;
  }
}
</style>