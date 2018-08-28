<template>
    <div class="goods">

        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}">
              <span class="text border-1px">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
              </span>
            </li>
          </ul>
        </div>

        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="(food, foodIndex) in item.foods" class="food-item border-1px" :key="foodIndex">
                  <div class="icon">
                    <img width="57px" height="57px" :src="food.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="sell-count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";

const ERROR_OK = 0;

export default {
  props: {
    seller: Object
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$axios.get("/api/goods").then(response => {
      let res = response.data;
      if (res.errno === ERROR_OK) {
        this.goods = res.data;
        console.log("get /api/goods");
        console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.menuScoll = new BScroll(this.$refs.menuWrapper, {});
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      });
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY);
        // console.log(this.listHeight);
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/index.styl';

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;

      &.current {
        position: relative; // 盖住上面的线
        margin-top: -1px;
        z-index: 10;
        background-color: white;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .text {
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        line-height: 14px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        border-1px(rgba(7, 17, 27, 0.1));
      }

      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeadt: no-repeat;

        &.decrease {
          bg-image('decrease_3');
        }

        &.discount {
          bg-image('discount_3');
        }

        &.guarantee {
          bg-image('guarantee_3');
        }

        &.invoice {
          bg-image('invoice_3');
        }

        &.special {
          bg-image('special_3');
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding: 0 14px;
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 26px;
      height: 26px;
      border-left: 2px solid #d9dde1;
      background-color: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0px;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 14px;
        }

        .desc, .extra {
          font-size: 10px;
          color: rgb(147 153 159);
        }

        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }

        .extra {
          line-height: 10px;

          .sell-count {
            margin-right: 12px;
          }
        }

        .price {
          line-height: 24px;

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
    }
  }
}
</style>
