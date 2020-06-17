<template>
    <div class="b-construcor-app">
        <div class="b-construcor-app__inner">
            <div class="b-construcor-app__header">
                <div class="b-construcor-app__header-row">
                    <div class="b-construcor-app__title">
                        {{texts.title}}
                    </div>
                    <div class="b-construcor-app__checkboxes">
                        <div class="b-radiobutton b-radiobutton_rect">
                            <input name="name" type="checkbox" id="c1res" class="b-radiobutton__input" />
                            <label for="c1res" class="b-radiobutton__label">
                                <div class="b-radiobutton__circle"></div>
                                {{texts.show_with_adapters}}
                            </label>
                            <div class="b-popup b-radiobutton__popup">
                                <div class="b-popup__trigger">?</div>
                                <div class="b-popup__content">
                                    {{texts.popup_1}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="b-construcor-app__checkboxes">
                        <div class="b-radiobutton b-radiobutton_rect">
                            <input name="name2" type="checkbox" id="c1res2" v-model="darkened_parts" @change="darken_parts" class="b-radiobutton__input" />
                            <label for="c1res2" class="b-radiobutton__label">
                                <div class="b-radiobutton__circle"></div>
                                {{texts.darken_standart_parts}}
                            </label>
                            <div class="b-popup b-radiobutton__popup">
                                <div class="b-popup__trigger">?</div>
                                <div class="b-popup__content">
                                    {{texts.popup_2}}
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div class="b-construcor-app__nav">
                        <button class="b-button b-button_black b-button_m0 b-construcor-app__button" @click="step_minus" v-if="step!=1">
                            BACK
                            <span class="pe-7s-left-arrow"></span>
                        </button>

                        <input 
                            v-if="step === 3"
                            type="text" 
                            class="b-construcor-app__filter"
                            placeholder="Find by name..."
                            v-model="attachment_filter"
                            @input="m_attachment_filter"
                        >

                        <button class="b-button b-button_black b-construcor-app__button" @click="flip_side">
                            FLIP GUN 
                            <span class="pe-7s-repeat"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="b-construcor-app__main">
                <div class="b-construcor-app__main-row" v-if="step === 1 ">
                    <SelectedAttachmentCard 
                        v-for="(item, index) in current_side_selected_attachments"
                        :key="`step-1-${index}`"
                        :item="item"
                        :side="side"
                    ></SelectedAttachmentCard>
                </div>
                <div class="b-construcor-app__main-row" v-if="step === 2">
                    <ClassCard 
                        v-for="(item, index) in suitable_attachments_classes"
                        :key="`step-2-${index}`"
                        :item="item"
                        :side="side"
                        @select_class="on_select_class"
                    ></ClassCard>
                </div>
                <div class="b-construcor-app__main-row" v-if="step === 3">
                    <AttachmentCard 
                        v-for="(item, index) in current_side_suitable_attachments"
                        :key="`step-3-${index}`"
                        :item="item"
                        :side="side"
                        :current_side_selected_attachments="current_side_selected_attachments"
                        @select_attachment="on_select_attachment"
                        @delete_attachment="on_delete_attachment"                        
                    ></AttachmentCard>
                    <h4 style="color: #e33939" v-if="current_side_suitable_attachments.length === 0">
                        Sorry, no matching accessories found.
                    </h4>
                </div>
            </div>
            <div class="b-construcor-app__footer">
                <div class="b-construcor-app__footer-row">
                    <div class="b-construcor-app__footer-data-text">
                        {{texts.total_price}} <strong>{{price}}$</strong>
                    </div>
                    <div class="b-construcor-app__footer-data-text">
                        {{texts.weight}} <strong>{{weight}}g</strong>
                    </div>
                    <div class="b-construcor-app__footer-share">
                        <i class="pe-7s-share" style="color: #e33939"></i>
                        <span>{{texts.share}}</span>
                    </div>
                    <button class="b-button b-button_border b-construcor-app__button">
                        {{texts.button.save}}
                    </button>
                    <button class="b-button b-construcor-app__button" @click="add_to_card">
                        {{texts.button.add}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AttachmentCard from './AttachmentCard'
import SelectedAttachmentCard from './SelectedAttachmentCard'
import ClassCard from './ClassCard'
export default {
    props: [
        'selected_attachments',
        'side',
        'step',
        'suitable_attachments_classes',
        'suitable_attachments',
        'selected_point',
        'price',
        'weight'
    ],
    components: {
        AttachmentCard,
        SelectedAttachmentCard,
        ClassCard
    },
    watch: {
        step:{
            deep: true,
            handler(){
                this.attachment_filter = ''
            }
        }
    },
    data(){
        return {
            texts: {
                title: 'Choose point',
                show_with_adapters: 'Show with adapters',
                popup_1: 'When the “With adapters” checkbox is activated, the entire tuning will be shown in the list of accessories, which can be installed at this point using adapter adapters. Adapters will install automatically. You can choose other adapters to your taste by clicking on the corresponding point on the weapon or accessory.',
                darken_standart_parts: 'Darken the standard parts',
                popup_2: 'The native parts of the weapon will be hidden so that it is more convenient for you to customize your weapon.',
                total_price: 'Total price:',
                weight: 'Weight:',
                share: 'Share',
                button: {
                    save: 'Save to later',
                    add: 'Add to card'
                }
            },
            class: null,
            current_side_suitable_attachments: [],
            attachment_filter: '',
            darkened_parts: false
        }
    },
    methods: {
        on_select_class(c){
            this.class = c
            
            this.$emit('select_class', c)

            this.m_current_side_suitable_attachments(c)
        },
        m_current_side_suitable_attachments(c){
            let list = this.suitable_attachments[c].filter(item => item.side === this.side)
            list.forEach(item => {
                item.parent = {
                    type: this.selected_point.type,
                    point_id: parseInt(this.selected_point.point_id),
                    class: this.selected_point.class
                }
            })
            this.current_side_suitable_attachments = list
        },
        m_attachment_filter(){
            let list = this.suitable_attachments[this.class].filter(item => item.side === this.side && item.attachment.name.toLowerCase().includes(this.attachment_filter.toLowerCase()))
            list.forEach(item => {
                item.parent = {
                    type: this.selected_point.type,
                    point_id: parseInt(this.selected_point.point_id),
                    class: this.selected_point.class
                }
            })
            this.current_side_suitable_attachments = list
        },
        on_select_attachment(item){
            this.$emit('select_attachment', item)
        },
        on_delete_attachment(item){
            this.$emit('delete_attachment', item)
        },
        step_minus(){
            this.$emit('step_minus')
        },
        flip_side(){
            this.$emit('flip_side')
        },
        darken_parts(){
            this.$emit('darken_parts', this.darkened_parts)
        },
        add_to_card(){
            this.$emit('add_to_card')
        }
    },
    computed: {
        current_side_selected_attachments(){
            return this.selected_attachments.filter(item => item.side === this.side)
        },
    },

}
</script>


<style lang="scss" scope>
    .b-radiobutton{
        display: inline-flex;
    }
    .b-popup__content{
        max-width: 100vw;
        z-index: 10;
    }
    .b-button_border{
        background-color: transparent;
        position: relative;
        color: #000;
        font-weight: 500;
        &:hover{
            background-color: rgba(255, 255, 255, 0.6);
            &:after{
                border-radius: 3px;
            }
        }
        &:after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid #000;
            transition: all 0.3s ease-in-out;
        }
    }
    .b-button_black{
        padding: 15px 30px;
        background-color: #000;
        position: relative;
        color: #fff;
        &:hover{
            background-color: #fff;
            color: #000;
            &:after{
                border-radius: 3px;
            }
        }
         &:after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid #000;
            transition: all 0.3s ease-in-out;
        }
    }
    // 
    .b-construcor-app{}
    .b-construcor-app__inner{}
    .b-construcor-app__header{
        margin-bottom: 35px;
    }
    .b-construcor-app__header-row{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        flex-wrap: wrap;
    }
    .b-construcor-app__title{
        font-size: 36px;
        line-height: 42px;
        margin-right: 25px;
        @media screen and (max-width: 1440px){
            font-size: 32px;
            line-height: 40px;
        }
        @media screen and (max-width: 1170px){
            font-size: 28px;
            line-height: 36px;
        }
        @media screen and (max-width: 960px){
            font-size: 26px;
            line-height: 32px;
            margin-right: 15px;
        }
        @media screen and (max-width: 780px){
            font-size: 22px;
            line-height: 30px;
        }
        @media screen and (max-width: 560px){
            font-size: 20px;
            line-height: 28px;
        }
    }
    .b-construcor-app__checkboxes{
        margin-right: 35px;
        @media screen and (max-width: 960px){
            margin-right: 15px;
        }
        & .b-radiobutton{
            margin: 0;
        }
    }
    .b-construcor-app__main{
        // width: calc(100% - 30px);
        // padding-right: 30px;
        margin-bottom: 35px;
    }
    .b-construcor-app__main-row{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(100% + 30px);
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
        // 
        width: calc(100%); 
        flex-wrap: nowrap;
    } 
    .b-construcor-app__main-card{
        width: calc((100% / 4) - 30px);
        min-width: calc((100% / 4) - 30px);
        margin: 15px;
        @media screen and (max-width: 1170px){
            width: calc((100% / 3) - 30px);
            min-width: calc((100% / 3) - 30px);
        }
        @media screen and (max-width: 960px){
            width: calc((100% / 2) - 30px);
            min-width: calc((100% / 2) - 30px);
        }
        @media screen and (max-width: 560px){
            width: calc((100% / 1) - 30px);
            min-width: calc((100% / 1) - 30px);
        }
    }
    .b-construcor-app__footer{}
    .b-construcor-app__footer-row{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
    .b-construcor-app__footer-data-text{
        font-size: 16px;
        line-height: 20px;
        margin-right: 15px;
        @media screen and (max-width: 780px){
            font-size: 14px;
            line-height: 18px;
        }
    }
    .b-construcor-app__footer-share{
        margin-left: auto;
        margin-right: 15px;
        font-size: 16px;
        line-height: 20px;
        @media screen and (max-width: 780px){
            font-size: 14px;
            line-height: 18px;
        }
        & span{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .b-construcor-app__button{
        &:not(:last-child){
            margin-right: 15px;
        }
        @media screen and (max-width: 780px){
            width: 100%;
            margin-left: 0 !important;
            margin-right: 0 !important;
            margin-top: 15px;
        }
    }
    .b-construcor-app__button_mla{
        margin-left: auto;
    }
    .b-popup__trigger{
        text-decoration: none !important;
    }
    .b-construcor-app__nav{
        display: flex;
        flex-direction: row;
        // align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin-left: auto;
    }
    .b-construcor-app__filter{
        background-color: #fff;
        padding: 12px;
        width: 240px;
        &::placeholder{
            color: rgba(0, 0, 0, 0.6)
        }
    }
    .b-button_m0{
        margin-left: 0 !important;
        margin-right: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }
</style>