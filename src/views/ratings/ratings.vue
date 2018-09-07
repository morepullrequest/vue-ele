<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :desc="ratingDesc" v-model="selectedRating"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings && ratings.length">
          <li v-show="isShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item">

            <div class="avatar-wrapper">
              <img class="avatar" :src="rating.avatar" width="28" height="28">
            </div>

            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">
                {{rating.text}}
              </p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon icon-thumb_up"></span>
                <span class="recommend-item" v-for="(item,index) in rating.recommend" :key="index">
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
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
import ratingselect from "components/ratingselect/ratingselect.vue";
import { formatDate } from "common/js/date";

// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
// eslint-disable-next-line
const ALL = 2;

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$axios
      .get("/api/ratings")
      .then(response => {
        var res = response.data;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
          console.log("get /api/ratings");
          console.log(this.ratings);

          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              taps: true,
              click: true,
              mouseWheel: true
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      ratings: [],
      ratingDesc: {
        all: "全部",
        positive: "满意",
        negative: "不满意"
      },
      selectedRating: {
        selectType: ALL,
        onlyContent: false
      }
    };
  },
  components: {
    star,
    split,
    ratingselect
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
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
  }
};
</script>

<style lang="stylus" scoped>
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0px;
  left: 0;
  width: 100%;
  overflow: hidden;

  .ratings-content {
    .overview {
      display: flex;
      padding: 18px 0;

      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        padding: 6px 0;

        @media only screen and (max-width: 321px) {
          flex: 0 0 120px;
          width: 120;
        }

        .score {
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
          margin-bottom: 6px;
        }

        .title {
          font-size: 12px;
          line-height: 12px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }

        .rank {
          font-size: 10px;
          line-height: 10px;
          color: rgba(7, 17, 27, 0.5);
        }
      }

      .overview-right {
        flex: 1;
        padding: 6px 24px;

        @media only screen and (max-width: 321px) {
          padding: 6px 0 6px 6px;
        }

        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0px;

          .title {
            display: inline-block;
            vertical-align: top;
            color: rgb(7, 17, 27);
            font-size: 12px;
            line-height: 18px;
          }

          .star {
            margin: 0 12px;
            display: inline-block;
            vertical-align: top;
          }

          .score {
            display: inline-block;
            vertical-align: top;
            color: rgb(255, 153, 159);
            font-size: 12px;
            line-height: 18px;
          }
        }

        .delivery-wrapper {
          font-size: 0px;

          .title {
            display: inline-block;
            color: rgb(7, 17, 27);
            font-size: 12px;
            line-height: 18px;
          }

          .delivery {
            display: inline-block;
            margin-left: 12px;
            color: rgb(147, 153, 159);
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        display: flex;
        padding: 18px 0;

        &:last-child {
          border-bottom: none;
        }

        .avatar-wrapper {
          display: inline-block;
          margin-right: 12px;
          flex: 0 0 28px;
          width: 28px;

          .avatar {
            border-radius: 50%;
          }
        }

        .content {
          // padding: 0 12px;
          width: 100%;
          position: relative;
          flex: 1;

          .name {
            margin-bottom: 4px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            line-height: 12px;
          }

          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0px;
            display: flex;

            .star {
              display: inline-block;
              margin-right: 6px;
            }

            .delivery {
              display: inline-block;
              font-size: 10px;
              color: rgb(147, 153, 159);
              font-weight: 200;
              line-height: 12px;
            }
          }

          .text {
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }

          .recommend {
            line-height: 16px;
            font-size: 0;

            .icon {
              display: inline-block;
              margin: 0 8px 4px 0;
              vertical-align: top;
              font-size: 12px;
              color: rgb(0, 160, 220);
            }

            .recommend-item {
              display: inline-block;
              margin: 0 8px 4px 0;
              padding: 0 6px;
              font-size: 9px;
              color: rgb(147, 153, 159);
              background-color: white;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 2px;
              box-sizing: border-box;
              max-width: 70px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 10px;
            line-height: 12px;
            font-weight: 200;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>
