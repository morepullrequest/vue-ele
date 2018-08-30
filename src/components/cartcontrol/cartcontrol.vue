<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
                <i class="inner icon-remove_circle_outline"></i>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>

        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    food: Object
  },
  methods: {
    addCart(event) {
      console.log("click");
      if (!this.food.count) {
        //this.food.count = 1;
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("cart-add", event.target);
    },
    decreaseCart() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 0);
      } else if (this.food.count > 0) {
        this.food.count--;
      } else {
        this.food.count = 0;
      }
    }
  }
};
</script>

<style lang="stylus">
.cartcontrol {
    font-size: 0;
    display: flex;
    align-items: center;

    .cart-decrease, .cart-add {
        display: inline-block;
        // padding: 6px;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
    }

    .cart-decrease {
        &.move-enter-active, &.move-leave-active {
            transition: all 0.5s linear;
        }

        &.move-enter-to, &.move-leave {
            opacity: 1;
            transform: translate3D(0, 0, 0) rotate(0);
        }

        &.move-enter, &.move-leave-to {
            opacity: 0;
            transform: translate3D(24px, 0, 0) rotate(180deg);
        }
    }

    .cart-count {
        display: inline-block;
        font-size: 10px;
        color: rgb(147, 154, 159);
        width: 24px;
        line-height: 24px;
        text-align: center;
    }

    .cart-add {
        // padding-right 0
    }
}
</style>
