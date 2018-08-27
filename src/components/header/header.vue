<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" v-bind:src="seller.avatar"/>
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]">{{classMap[seller.supports[0].type]}}</span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/index.styl"

    .header
        color: #fff
        background-color: #777777
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            font-size: 0
            .avatar
                display: inline-block
                border-radius 2px
            .content
                display: inline-block
                margin-left: 16px
                .title
                    margin: 2px 0 8px 0
                    .brand
                        display: inline-block
                        vertical-align: top
                        width: 30px
                        height: 18px
                        bg-image("brand")
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        font-size: 16px
                        font-weight: bold
                        line-height: 18px
                        margin-left: 6px
                .description
                    font-size: 12px
                    line-height: 12px
                    margin-bottom: 10px
                .support
                    .icon
                        display: inline-block
                        width: 12px
                        height: 12px
                        margin-right: 4px
                        vertical-align top
                        background-size: 12px 12px
                        background-repeadt: no-repeat
                        &.decrease
                            bg-image('decrease_1')
            
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')

                    .text
                        font-size 10px  
                        line-height 12px
            .support-count
                position absolute
                right 12px
                bottom 14px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background-color rgba(0, 0, 0, 0.2)
                text-align center
                .count
                    font-size 10px
                .icon-keyboard_arrow_right
                    line-height 24px
                    margin-left 2px
                    font-size 10px

        .bulletin-wrapper
            height 28px
            line-height 28px
            padding 0 22 0 12
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            .bulletin-title
                display inline-block
                width 22px
                height 12px
                bg-image("bulletin")

</style>
