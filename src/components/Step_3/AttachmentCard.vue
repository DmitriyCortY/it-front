<template>
    <div class="b-attachment-card b-construcor-app__main-card">
        <div class="b-attachment-card__left">
            <div class="b-attachment-card__buttons">
                <div class="b-attachment-card__button b-attachment-card__button_plus" v-if="!selected_current_item" @click.stop.prevent="select_attachment">
                    <span class="pe-7s-plus"></span>
                </div>
                <div class="b-attachment-card__button b-attachment-card__button_minus" v-if="selected_current_item" @click.stop.prevent="delete_attachment">
                    <span class="pe-7s-less"></span>
                </div>
            </div>
            <img :src="item.image[side]" class="b-attachment-card__image">
            <div class="b-attachment-card__trigger"></div>
        </div>
        <div class="b-attachment-card__right">
            <div class="b-attachment-card__header">
                <div class="b-attachment-card__name">
                    {{item.attachment.name}} 
                </div>
            </div>
            <div class="b-attachment-card__footer">
                <div class="b-attachment-card__price">
                    {{item.price ? `${item.price}$` : `0$ (default)`}}
                </div>
                <div class="b-attachment-card__link" >
                    <div class="b-popup">
                        <div class="b-popup__trigger">
                            ?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'item', // (object)
        'side', // (string),
        'current_side_selected_attachments'
    ],
    data(){
        return {}
    },
    methods: {
        select_attachment(){
            this.$emit('select_attachment', this.item)
        },
        delete_attachment(){
            this.$emit('delete_attachment', this.item)
        }
    },
    computed: {
        selected_current_item(){
            let answ = false
            this.current_side_selected_attachments.forEach(item => {
                if(
                    parseInt(this.item.attachment.id) === parseInt(item.attachment.id) &&
                    parseInt(this.item.attachment.point_id) === parseInt(item.attachment.point_id) &&
                    parseInt(this.item.parent.point_id) === parseInt(item.parent.point_id)
                ){
                    answ = true
                }
            })
            return answ
        }
    },
}
</script>


<style lang="scss">
    .b-attachment-card{
        cursor: pointer;
        display: flex;
        flex-direction: row;
        min-height: 88px;
        &:hover{
            & .b-attachment-card__buttons{
                opacity: 1;
            }
        }
    }
    .b-attachment-card__left{
        width: 40%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        padding: 15px;
        position: relative;
    }
    .b-attachment-card__buttons{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        opacity: 0;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }
    .b-attachment-card__button{
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 60px;
        vertical-align: middle;
        &_plus{
            color: #2e7d32;
        }
        &_minus{
            color: #cc1d1d;
        }
    }
    .b-attachment-card__right{
        width: 60%;
        display: flex;
        flex-direction: column;
        background-color: #fafafa;
        padding: 15px;
    }
    .b-attachment-card__image{
        display: flex;
        margin: auto;
        max-width: 80%;
        max-height: 80px;
    }
    .b-attachment-card__trigger{}
    .b-attachment-card__header{
        margin-bottom: auto;
        margin-top: auto;
    }
    .b-attachment-card__name{
        font-size: 14px;
        line-height: 18px;
    }
    .b-attachment-card__footer{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-top: auto;
        margin-bottom: auto;
    }
    .b-attachment-card__price{
        font-size: 14px;
        line-height: 18px;
        font-weight: 700;
        margin-right: auto;
    }
    .b-attachment-card__link{
        cursor: pointer;
    }
</style>