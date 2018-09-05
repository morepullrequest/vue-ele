<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="toggleList">
          <div class="logo" :class="{ highlight: totalCount > 0}">
            <i class="icon-shopping_cart" :class="{ highlight: totalCount > 0}"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{ highlight: totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click="pay">{{payDesc}}</div>
      </div>
    </div>

    <div class="ball-container">
      <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" v-on:enter="enter">
        <div v-for="(ball, index) in balls" v-show="ball.show" :key="index" :data-index="index" class="ball">

          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>

    <transition name="show">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header border-1px">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>

        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="(food, index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </transition>

    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>


</template>

<script>
import cartcontrol from "components/cartcontrol/cartcontrol.vue";
import BScroll from "better-scroll";

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [],
      listShow: false
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `￥还差${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    }
  },
  watch: {
    /* eslint-disable no-unused-vars */
    totalCount(newCount, oldCount) {
      if (newCount == 0) {
        this.listShow = false;
      }
    },
    listShow(newShow, oldShow) {
      if (newShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              taps: true,
              click: true,
              mouseWheel: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    }
  },
  methods: {
    drop(el) {
      // console.log(el);
      // console.log("shop cart drop ball");
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          return;
        }
      }
      var newBall = {
        show: true,
        el: el
      };
      this.balls.push(newBall);
    },
    beforeEnter(el) {
      let index = el.dataset.index;
      // console.log(`before:${index}`);
      let ball = this.balls[index];
      let rect = ball.el.getBoundingClientRect();
      let x = rect.left - 32;
      let y = -(window.innerHeight - rect.top - 22);
      // console.log(`x: ${x}, y: ${y}`);
      let inner = el.getElementsByClassName("inner-hook")[0];

      el.style.display = "";
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;

      inner.display = "";
      inner.style.transform = `translate3d(${x}px, 0, 0)`;
      inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;

      this.$nextTick(() => {
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.webkitTransform = "translate3d(0, 0, 0)";

        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.transform = "translate3d(0, 0, 0)";
        inner.style.webkitTransform = "translate3d(0, 0, 0)";

        el.addEventListener("transitionend", done);
      });
    },
    afterEnter(el) {
      let index = el.dataset.index;
      let ball = this.balls[index];
      // console.log(`after${index}`);

      ball.show = false;
      ball.el = null;
    },
    toggleList() {
      if (!this.totalCount) {
        this.listShow = false;
      } else {
        this.listShow = !this.listShow;
      }
    },
    hideList() {
      this.listShow = false;
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice}元`);
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 46px;

  .content {
    display: flex;
    background: #141d27;
    color: rgba(255, 255, 255, 0.4); // align-items: center;

    .content-left {
      flex: 1;
      font-size: 0;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -12px;
        margin-left: 15px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        vertical-align: middle;

        .logo {
          background-color: #2b343c;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;

          &.highlight {
            background-color: rgb(0, 160, 220);
          }

          .icon-shopping_cart {
            font-size: 24px;
            color: #80858a;
            line-height: 44px;

            &.highlight {
              color: white;
            }
          }
        }

        .num {
          position: absolute;
          top: 0px;
          right: 0px;
          width: 24px;
          height: 16px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 700;
          color: white;
          line-height: 16px;
          text-align: center;
          background-color: rgb(240, 20, 20);
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        line-height: 24px;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 12px;
        padding: 0 12px;
        vertical-align: middle;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);

        &.highlight {
          color: white;
        }
      }

      .desc {
        display: inline-block;
        margin-left: 12px;
        line-height: 46px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;
      text-align: center; // vertical-align middle

      .pay {
        font-size: 12px;
        font-weight: 700;
        line-height: 46px;
        height: 46px; // padding 0 8px;

        &.not-enough {
          background: rgb(43, 51, 59);
        }

        &.enough {
          background: #00b43c;
          color: white;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      width: 16px;
      height: 16px;
      border-radius: 50%;

      // background: blue;
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
      }

      &.drop-enter-active {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.14);

        .inner {
          transition: all 0.4s linear;
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);

    &.show-enter-active, &.show-leave-active {
      transition: all 0.5s;
    }

    &.show-enter, &.show-leave-to {
      transform: translate3d(0, 0, 0);
    }

    .list-header {
      display: flex;
      height: 40px;
      padding: 0 18px;
      background-color: #f3f5f7;
      line-height: 40px;
      justify-content: space-between;
      border-1px(rgba(7, 17, 27, 0.1));

      .title {
        display: inline-block;
        font-size: 14px;
        color: rgb(7, 17, 27);
        font-weight: 200;
      }

      .empty {
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      background: white;
      max-height: 220px;
      padding: 0 18px;
      overflow: hidden;

      .food {
        display: flex;
        align-items: center;
        height: 48px;
        line-height: 24px;
        border-1px(rgba(7, 17, 27, 0.1));

        &:last-child {
          border-none();
        }

        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          flex: 1;
        }

        .price {
          // display: inline-block;
          margin-left: 14px;
          margin-right: 12px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          // display: inline-block;
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);

    &.mask-enter-active, &.mask-leave-active {
      transition: all 0.5s;
    }

    &.mask-enter, &.mask-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
}
</style>
