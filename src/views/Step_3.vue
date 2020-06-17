<template>
    <div class="b-constructor">
        <div class="b-loader-app" data-preloader v-if="selected_attachments.length === 0">
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
            <div class="b-loader-app__circle"></div>
        </div>


        <div class="b-constructor__inner"  v-if="selected_attachments.length != 0">
            <div class="b-title b-title_light b-title_fz-norm b-title_center b-title_fw-400 b-constructor__title">
                <span>{{kit_or_base_data.name}}</span>
            </div>
            
            <Constructor
                :side="side"
                :step="step"
                :skeleton_data="current_skeleton_data"
                :skeleton_points_data="current_skeleton_points"
                :selected_attachments="selected_attachments"
                :selected_attachments_classes="selected_attachments_classes"
                @select_point="on_select_point"
                @drop_classes_list="on_drop_classes_list"
                :darken_parts="darken_parts"
            ></Constructor>

            <AttachmentsCardsList
                :step="step"
                :side="side"
                :selected_attachments="selected_attachments"
                :suitable_attachments_classes="suitable_attachments_classes"
                :suitable_attachments="suitable_attachments"
                :selected_point="selected_point"
                :price="price"
                :weight="weight"
                @select_class="on_select_class"
                @select_attachment="on_select_attachment"
                @delete_attachment="on_delete_attachment"  
                @step_minus="on_step_minus"
                @flip_side="flip_side"
                @darken_parts="on_darken_parts"
                @add_to_card="add_to_card"
            ></AttachmentsCardsList>
        </div>
    </div>
</template>

<script>
import AttachmentsCardsList from '@/components/Step_3/AttachmentsCardsList'
import Constructor from '@/components/Step_3/Constructor'
export default {
    components: {
        AttachmentsCardsList,
        Constructor
    },
    data() {
        return {
            side: 'front',
            selected_attachments: [],
            step: 1,
            selected_point: [],
            suitable_attachments: {},
            current_class: null,
            darken_parts: false
        };
    },
    created() {
        let interval = setInterval(()=>{
            if(this.kit_or_base_data.skeleton_id){
                // load skeleton points
                this.$store.dispatch(
                    'skeleton_points', 
                    parseInt(this.kit_or_base_data.skeleton_id)
                )
                // load kit or base attachments
                if(this.kit_or_base_data.type === 'kit'){
                    this.$store.dispatch(
                        'kit_data',
                        parseInt(this.kit_or_base_data.id)
                    )
                }else if(this.kit_or_base_data.type === 'base'){
                    this.$store.dispatch(
                        'base_data',
                        parseInt(this.kit_or_base_data.id)
                    )
                }
                
                clearInterval(interval)
            }
        }, 100)
        // 
        this.update_suitable_attachments()
    },
    watch: {
        base_data:{
            deep: true,
            handler(){
                if(this.kit_or_base_data.type === 'base'){
                    setTimeout(()=>{
                        this.selected_attachments_push_default()
                    },1000)
                }
            }
        },
        kit_data:{
            deep: true,
            handler(){
                if(this.kit_or_base_data.type === 'kit'){
                    setTimeout(()=>{
                        this.selected_attachments_push_default()
                    },1000)
                }
            }
        },
    },
    destroyed(){
        this.$store.dispatch('drop_kit_data')
        this.$store.dispatch('drop_base_data')
    },
    mounted() {},
    methods: {
        on_step_minus(){
            if(this.step === 3){
                this.step = 2
                return
            }else if(this.step === 2){
                this.step = 1
                return
            }else{
                return
            }
        },
        flip_side(){
            if(this.side === 'front'){
                this.side = 'back'
            }else if(this.side === 'back'){
                this.side = 'front'
            }else{
                console.error(`There was an error in choosing a side!!! Current side: ${this.side}`)
            }
        },
        selected_attachments_push_default(){
            let list = []
            if(this.kit_or_base_data.type === 'kit'){
                for(let i = 0; i < this.kit_data.length; i++){
                    let current_product = this.all_products.filter(item => parseInt(item.id) === parseInt(this.kit_data[i].product_id))[0]
                    let current_point = this.all_products_points.filter(item => parseInt(item.id) === parseInt(this.kit_data[i].product_point_id))[0]
                    let data = {
                        z_index: this.kit_data[i].parent_skeleton_point_id ? 1 : this.kit_data[i].parent_product_point_id ? 2 : 1,
                        parent: {
                            type: this.kit_data[i].parent_skeleton_point_id ? 'skeleton' : this.kit_data[i].parent_product_point_id ? 'product' : '',
                            point_id: this.kit_data[i].parent_skeleton_point_id || this.kit_data[i].parent_product_point_id
                        },
                        attachment: {
                            type: 'product',
                            id: this.kit_data[i].product_id,
                            point_id: this.kit_data[i].product_point_id,
                            name: current_product.name,
                            class: current_point.class
                        },
                        image: {
                            front: current_product.image_front,
                            back: current_product.image_back
                        },
                        price: current_product.price,
                        side: current_point.side,
                        show: true
                    }
                    list.push(data)
                }
            }else if (this.kit_or_base_data.type === 'base'){
                for(let i = 0; i < this.base_data.length; i++){
                    let current_part = this.all_parts.filter(item => parseInt(item.id) === parseInt(this.base_data[i].part_id))[0]
                    let current_point = this.all_parts_points.filter(item => parseInt(item.id) === parseInt(this.base_data[i].part_point_id))[0]
                    let data = {
                        z_index: this.base_data[i].skeleton_point_id ? 1 : this.base_data[i].parent_part_point_id ? 2 : 1,
                        parent: {
                            type: this.base_data[i].skeleton_point_id ? 'skeleton' : this.base_data[i].parent_part_point_id ? 'part' : '',
                            point_id: this.base_data[i].skeleton_point_id || this.base_data[i].parent_part_point_id
                        },
                        attachment: {
                            type: 'part',
                            id: this.base_data[i].part_id,
                            point_id: this.base_data[i].part_point_id,
                            name: current_part.name,
                            class: current_point.class
                        },
                        image: {
                            front: current_part.image_front,
                            back: current_part.image_back
                        },
                        side: current_point.side,
                        show: true
                    }
                    list.push(data)
                }
            }
            list.forEach(f_item => {
                if(f_item.parent.type === 'skeleton'){
                    f_item.parent.class = this.current_skeleton_points.filter(item => parseInt(item.id) === parseInt(f_item.parent.point_id))[0].class
                }else if(f_item.parent.type === 'part'){
                    f_item.parent.class = this.all_parts_points.filter(item => parseInt(item.id) === parseInt(f_item.parent.point_id))[0].class
                }else if(f_item.parent.type === 'product'){
                    f_item.parent.class = this.all_products_points.filter(item => parseInt(item.id) === parseInt(f_item.parent.point_id))[0].class
                }
            })
            this.selected_attachments = list
        },
        on_select_point(selected_point){
            this.selected_point = selected_point
            this.step = 2
        },
        on_drop_classes_list(){
            this.step = 1
        },
        update_suitable_attachments(){
            let list = {}
            let minus_type_product = this.all_products_points.filter(item => item.type === 'Minus')
            for(let i = 0; i < minus_type_product.length; i++){
                let current_product = this.all_products.filter(item => parseInt(item.id) === parseInt(minus_type_product[i].product_id))[0]
                let data = {
                    attachment: {
                        type: 'product',
                        id: current_product.id,
                        point_id: minus_type_product[i].id,
                        name: current_product.name,
                        class: minus_type_product[i].class
                    },
                    image: {
                        front: current_product.image_front,
                        back: current_product.image_back
                    },
                    price: current_product.price,
                    side: minus_type_product[i].side,
                    show: true
                }
                if(!list[minus_type_product[i].class[0]]){
                    list[minus_type_product[i].class[0]] = []
                }
                list[minus_type_product[i].class[0]].push(data)
            }
            // return list
            this.suitable_attachments = list
        },
        on_select_class(c){
            this.current_class = c
            this.step = 3
        },
        on_select_attachment(item){
            let other_side_attachment = this.suitable_attachments[this.current_class].filter(f_item => parseInt(f_item.attachment.id) === parseInt(item.attachment.id) && item.side != f_item.side)[0]
            if(other_side_attachment){
                if(item.parent.type === 'skeleton'){
                    if(this.side === 'front'){
                        other_side_attachment.parent = {
                            type: 'skeleton',
                            class: this.selected_point.class,
                            point_id: parseInt(this.current_skeleton_points.filter(f_item => parseInt(f_item.related_id) === parseInt(this.selected_point.point_id))[0].id)
                        }
                    }else if(this.side === 'back'){
                        other_side_attachment.parent = {
                            type: 'skeleton',
                            class: this.selected_point.class,
                            point_id: parseInt(this.current_skeleton_points.filter(f_item => parseInt(f_item.id) === parseInt(this.selected_point.point_id))[0].related_id)
                        }
                    }
                }else if(item.parent.type === 'product'){
                    if(this.side === 'front'){
                        other_side_attachment.parent = {
                            type: 'product',
                            class: this.selected_point.class,
                            point_id: parseInt(this.all_products_points.filter(f_item => parseInt(f_item.related_id) === parseInt(this.selected_point.point_id))[0].id)
                        }
                    }else if(this.side === 'back'){
                        other_side_attachment.parent = {
                            type: 'product',
                            class: this.selected_point.class,
                            point_id: parseInt(this.all_products_points.filter(f_item => parseInt(f_item.id) === parseInt(this.selected_point.point_id))[0].related_id)
                        }
                    }
                }else if(item.parent.type === 'part'){
                    if(this.side === 'front'){
                        other_side_attachment.parent = {
                            type: 'part',
                            class: this.selected_point.class,
                            point_id: parseInt(this.all_parts_points.filter(f_item => parseInt(f_item.related_id) === parseInt(this.selected_point.point_id))[0].id)
                        }
                    }else if(this.side === 'back'){
                        other_side_attachment.parent = {
                            type: 'part',
                            class: this.selected_point.class,
                            point_id: parseInt(this.all_parts_points.filter(f_item => parseInt(f_item.id) === parseInt(this.selected_point.point_id))[0].related_id)
                        }
                    }
                }
                this.update_selected_attachments(item)
                this.update_selected_attachments(other_side_attachment)
            }
        },
        on_delete_attachment(item){
            let list = this.selected_attachments.filter(f_item => parseInt(f_item.attachment.id) === parseInt(item.attachment.id))
            list.forEach(l_item => {
                this.delete_attachment(l_item)
            })
        },
        update_selected_attachments(item){
            this.delete_attachment(item)
            this.selected_attachments.push(item)
        },
        delete_attachment(item){
            
            let check = (c_item) => {
                if(
                    item.parent.type === c_item.parent.type &&
                    parseInt(item.parent.point_id) === parseInt(c_item.parent.point_id) &&
                    item.side === c_item.side
                ){
                    return true
                }else{
                    return false
                }
            }
            for(let i = 0; i < this.selected_attachments.length; i++){
                if(check(this.selected_attachments[i])){
                    this.selected_attachments.splice(i, 1)
                }
            }
            this.delete_child()
        },
        delete_child(){
            for(let i = 0; i < this.selected_attachments.length; i++){
                if(this.selected_attachments[i].parent.type != 'skeleton'){
                    if(!this.selected_attachments_classes.map(m_item => m_item.type === this.selected_attachments[i].parent.type && parseInt(m_item.point_id) === parseInt(this.selected_attachments[i].parent.point_id)).includes(true)){
                        this.delete_attachment(this.selected_attachments[i])
                    }
                }
            }
        },
        on_darken_parts(bool){
            this.darken_parts = bool
        },
        add_to_card(){
            let products = this.selected_attachments.filter(item => item.attachment.type === 'product')
            let ids = []
            for(let i = 0; i < products.length; i++){
                if(!ids.includes(parseInt(products[i].attachment.id))){
                    ids.push(parseInt(products[i].attachment.id))
                }
            }
            this.$store.dispatch('add_to_card', ids)
        }
    },
    computed: {
        classes(){
            return this.$store.getters.classes
        },
        all_skeletons(){
            return this.$store.getters.all_skeletons
        },
        all_parts(){
            return this.$store.getters.all_parts
        },
        all_products(){
            return this.$store.getters.all_products
        },
        all_parts_points(){
            return this.$store.getters.all_parts_points
        },
        all_products_points(){
            return this.$store.getters.all_products_points
        },
        kit_or_base_data(){
            return this.$store.getters.kit_or_base_data
        },
        current_skeleton_points(){
            return this.$store.getters.skeleton_points
        },
        current_skeleton_data(){
            return this.all_skeletons.filter(item => parseInt(item.id) === parseInt(this.kit_or_base_data.skeleton_id))[0]
        },
        base_data(){
            return this.$store.getters.base_data
        },
        kit_data(){
            return this.$store.getters.kit_data
        },
        selected_attachments_classes(){
            let classes_list = []
            this.current_skeleton_points.filter(item => item.type === 'Plus').forEach(item => {
                classes_list.push({
                    type: 'skeleton',
                    point_id: parseInt(item.id),
                    side: item.side,
                    class: item.class
                })
            })
            this.selected_attachments.forEach(item => {
                if(item.attachment.type === 'part'){
                    let suitable_point = this.all_parts_points.filter(f_item => parseInt(f_item.part_id) === parseInt(item.attachment.id) && f_item.type === 'Plus' && f_item.side === item.side)[0]
                    if(suitable_point){
                        classes_list.push({
                            type: 'part',
                            point_id: parseInt(suitable_point.id),
                            side: suitable_point.side,
                            class: suitable_point.class
                        })
                    }
                }else if(item.attachment.type === 'product'){
                    let suitable_point = this.all_products_points.filter(f_item => parseInt(f_item.product_id) === parseInt(item.attachment.id) && f_item.type === 'Plus' && f_item.side === item.side)[0]
                    if(suitable_point){
                        classes_list.push({
                            type: 'product',
                            point_id: parseInt(suitable_point.id),
                            side: suitable_point.side,
                            class: suitable_point.class
                        })
                    }
                }
            })
            
            return classes_list
        },
        suitable_attachments_classes(){
            let list = []
            if(Object.keys(this.selected_point).length > 0){
                for(let i = 0;i < this.selected_point.class.length; i++){
                    let current_product_point = this.all_products_points.filter(item => item.type === 'Minus' && item.class.includes(this.selected_point.class[i]))[0]
                    let curent_product = this.all_products.filter(item => parseInt(item.id) === parseInt(current_product_point.product_id))[0]
                    list.push({
                        name: this.classes.filter(item => parseInt(item.id) === parseInt(this.selected_point.class[i]))[0].name,
                        image: {
                            front: curent_product.image_front,
                            back: curent_product.image_back
                        },
                        class: parseInt(this.selected_point.class[i])
                    })
                }
            }
            return list
        },
        price(){
            let price = 0
            if(this.selected_attachments.length > 0){
                let products = this.selected_attachments.filter(item => item.attachment.type === 'product')
                let ids = []
                for(let i = 0; i < products.length; i++){
                    if(!ids.includes(parseInt(products[i].attachment.id))){
                        ids.push(parseInt(products[i].attachment.id))
                    }
                }
                this.all_products.forEach(item => {
                    if(ids.includes(parseInt(item.id))){
                        price += item.price
                    }
                })
            }
            return price
        },
        weight(){
            let weight = 0
            if(this.selected_attachments.length > 0){
                let products = this.selected_attachments.filter(item => item.attachment.type === 'product')
                let ids = []
                for(let i = 0; i < products.length; i++){
                    if(!ids.includes(parseInt(products[i].attachment.id))){
                        ids.push(parseInt(products[i].attachment.id))
                    }
                }
                this.all_products.forEach(item => {
                    if(ids.includes(parseInt(item.id))){
                        weight += item.weight
                    }
                })
            }
            return weight
        }
    }
};

</script>

<style lang="scss">
    $gray: #777777;
$black: #070707;
$green: #7ed386;
$red: #f32e46;
$aqua: #3fb6a8;
$white: #ffffff;
$onyx: #373449;
$orange: #ee7723;
$size: 400px;
$duration: 10s;
$ease: ease-in-out;

.b-loader-app {
  width: $size;
  height: $size;
  margin: 50px auto ;
  position: relative;
  @media screen and (max-width: 560px) {
      transform: scale(0.6);
  }
  .b-loader-app__circle {
    border-radius: 100% 100% 0 0;
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: bottom center;
  }
  @for $i from 1 through 22 {
    .b-loader-app__circle:nth-child(#{$i}) {
      $size: 0;
      $opac: (20-$i)/10;
      @if ($i > 1) {
        $size: 31px * ($i - 1);
        border: 13px solid rgba(rgba($red, 0.4), $opac);
      } @else {
        $size: 25px;
        background: $red;
      }
      border-bottom: none;
      border-radius: $size $size 0 0;
      width: $size;
      height: $size / 2;
      z-index: 16 - $i;
      animation: circle-#{$i} $duration infinite $ease;
    }
    @keyframes circle-#{$i} {
      0% {
        transform: translateX(-50%) rotate(0deg);
      }
      100% {
        transform: translateX(-50%) rotate(-($i * 360deg));
      }
    }
  }
}
</style>