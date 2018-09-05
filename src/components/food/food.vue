<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>

        </div>

        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food" @cart-add="emitCartAdd"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol.vue";
export default {
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true,
            mouseWheel: true,
            taps: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      this.$set(this.food, "count", 1);
      this.emitCartAdd(event.target);
    },
    emitCartAdd(target) {
      this.$emit("cart-add", target);
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="stylus" scoped>
.food {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 46px;
  z-index: 30;
  background-color: #f3f5f7;

  &.move-enter-active, &.move-leave-active {
    transition: all 0.2s linear;
  }

  &.move-enter, &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .food-content {
    background-color: white;

    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%; // width 100%

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .back {
        position: absolute;
        top: 10px;
        left: 0;

        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: white;
        }
      }
    }

    .content {
      padding: 18px;

      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }

      .detail {
        margin-top: 8px;
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);

        .sell-count {
          margin-right: 12px;
        }
      }

      .price {
        line-height: 24px;
        margin-top: 18px;

        .now {
          font-size: 14px;
          color: rgb(240, 20, 20);
          font-weight: 700;
          margin-right: 8px;
        }

        .old {
          font-size: 10px;
          color: rgb(147, 153, 159);
          font-weight: normal;
          text-decoration: line-through;
        }
      }
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 18px;
      bottom: 18px;
    }

    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      width: 74px;
      font-size: 10px;
      border-radius: 12px;
      color: white;
      background-color: rgb(0, 160, 220);

      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.2s;
      }
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
      }
    }
  }
}
</style>
