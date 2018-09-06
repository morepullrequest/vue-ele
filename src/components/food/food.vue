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

          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @cart-add="emitCartAdd"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>

        <split v-show="food.info"></split>

        <div class="info" v-show="food.info">

          <h1 class="title">商品介绍</h1>
          <p class="text">
            {{food.info}}
          </p>
        </div>

        <split></split>

        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :ratings="food.ratings" :desc="ratingDesc" v-model="selectedRating"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="isShow(rating.rateType, rating.text)" v-for="(rating, index) in food.ratings" :key="index" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
                <p class="text">
                  <span class="thumb" :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol.vue";
import split from "components/split/split.vue";
import ratingselect from "components/ratingselect/ratingselect.vue";
import { formatDate } from "common/js/date";

// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
// eslint-disable-next-line
const ALL = 2;

export default {
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false,
      ratingDesc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      },
      selectedRating: {
        selectType: ALL,
        onlyContent: false
      }
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
    },
    isShow(type, text) {
      if (this.selectedRating.onlyContent && !text) {
        return false;
      }
      if (this.selectedRating.selectType === ALL) {
        return true;
      } else {
        return type === this.selectedRating.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.food {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 46px;
  z-index: 30;
  background-color: white;

  &.move-enter-active, &.move-leave-active {
    transition: all 0.2s linear;
  }

  &.move-enter, &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .food-content {
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
      position: relative;
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

        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }
      }
    }

    .info {
      padding: 18px;

      .title {
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .text {
        margin: 0 8px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77, 85, 93);
        line-height: 24px;
      }
    }

    .rating {
      padding-top: 18px;

      .title {
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .rating-wrapper {
        padding: 0 18px;

        .rating-item {
          position: relative;
          padding: 16px 0;
          border-1px(rgba(7, 17, 27, 0.1));

          &:last-child {
            border-none();
          }

          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            display: flex;
            align-items: center;

            .name {
              margin-right: 6px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }

            .avatar {
              border-radius: 50%;
            }
          }

          .time {
            font-size: 10px;
            line-height: 12px;
            color: rgb(147, 153, 159);
            margin-bottom: 6px;
          }

          .text {
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);

            .thumb {
              margin-right: 4px;

              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }

              &.icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
          }
        }

        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
}
</style>
