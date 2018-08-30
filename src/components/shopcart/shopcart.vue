<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{ highlight: totalCount > 0}">
                        <i class="icon-shopping_cart" :class="{ highlight: totalCount > 0}"></i>
                    </div>
                    <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{ highlight: totalPrice > 0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>

        </div>
        <div class="ball-container">
            <transition-group name="drop">
                <div v-for="(ball, index) in balls" v-show="ball.show" :key="index" class="ball">
                </div>>
            </transition-group>
        </div>
    </div>
</template>

<script>
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
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
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
  methods: {
    drop(el) {
      console.log(el);
    }
  }
};
</script>

<style lang="stylus">
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
            bottom: 32px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            z-index: 200;

            &.drop-enter-active {
                transition: all 0.4s;
            }
        }
    }
}
</style>
