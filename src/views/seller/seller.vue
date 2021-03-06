<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text rating-count">({{seller.ratingCount}})</span>
          <span class="text sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul class="info-list">
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import star from "components/star/star";
import split from "components/split/split.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      favorite: false
    };
  },
  computed: {
    favoriteText() {
      if (this.favorite) {
        return "已收藏";
      } else {
        return "收藏";
      }
    }
  },
  mounted() {
    this._initSellerScroll();
    this._initPicsScroll();
  },
  watch: {
    /* eslint-disable no-unused-vars */
    seller(newValue, oldValue) {
      this._initSellerScroll();
      this._initPicsScroll();
    }
  },
  methods: {
    _initSellerScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          taps: true,
          click: true,
          mouseWheel: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPicsScroll() {
      console.log(this.seller);
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + "px";
        this.$nextTick(() => {
          if (!this.picsScroll) {
            this.picsScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: "vertical",
              mouseWheel: true
            });
          } else {
            this.picsScroll.refresh();
          }
        });
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
    }
  },
  components: {
    star,
    split
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0px;
  left: 0;
  width: 100%;
  overflow: hidden;

  .seller-content {
    background-color: white;

    .overview {
      padding: 18px;
      position: relative;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }

      .desc {
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        line-height: 18px;
        display: flex;

        .star {
          display: inline-block;
          margin-right: 8px;
        }

        .text {
          font-size: 10px;
          color: rgb(77, 85, 93);
          margin-right: 12px;
        }
      }

      .remark {
        display: flex;
        padding-top: 18px;
        text-align: center;

        .block {
          flex: 1;
          border-right: 1px solid rgba(7, 17, 27, 0.1);

          &:last-child {
            border-right: none;
          }

          h2 {
            margin-bottom: 4px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }

          .content {
            font-size: 10px;
            line-height: 24px;
            color: rgb(7, 17, 27);

            .stress {
              font-size: 24px;
              font-weight: 200;
            }
          }
        }
      }

      .favorite {
        position: absolute;
        top: 18px;
        right: 18px;
        text-align: center;

        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;

          &.active {
            color: rgb(240, 20, 20);
          }
        }

        .text {
          display: block;
          width: 30px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }

    .bulletin {
      padding: 18px 18px 0 18px;

      .title {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .content-wrapper {
        padding: 0 12px 16px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .content {
          font-size: 12px;
          font-weight: 200;
          color: rgb(240, 20, 20);
          line-height: 24px;
        }
      }

      .supports {
        .support-item {
          display: flex;
          padding: 16px 12px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          &:last-child {
            border: none;
          }

          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;

            &.decrease {
              bg-image('decrease_4');
            }

            &.discount {
              bg-image('discount_4');
            }

            &.guarantee {
              bg-image('guarantee_4');
            }

            &.invoice {
              bg-image('invoice_4');
            }

            &.special {
              bg-image('special_4');
            }
          }

          .text {
            font-size: 12px;
            font-weight: 200;
            line-height: 16px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }

    .pics {
      padding: 18px 0 18px 18px;

      .title {
        margin-bottom: 12px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .pic-wrapper {
        width: 100%;
        font-size: 0;

        .pic-list {
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;

          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;

            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }

    .info {
      padding: 18px 18px 0 18px;

      .title {
        margin-bottom: 12px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .info-list {
        .info-item {
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          padding: 16px 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          font-weight: 200;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
