<template>
    <div class="goods">
        <div class="menu-wrapper">
          <ul>
            <li v-for="(item, index) in goods" :key="index" class="menu-item">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper">

        </div>
    </div>
</template>

<script>
const ERROR_OK = 0;
export default {
  props: {
    seller: Object
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$axios.get("/api/goods").then(response => {
      let res = response.data;
      if (res.errno === ERROR_OK) {
        this.goods = res.data;
        console.log("get /api/goods");
        console.log(this.goods);
      }
    });
  }
};
</script>

<style lang="stylus">
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
      line-height: 14px;

      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeadt: no-repeat;

        &.decrease {
          bg-image('decrease_1');
        }

        &.discount {
          bg-image('discount_1');
        }

        &.guarantee {
          bg-image('guarantee_1');
        }

        &.invoice {
          bg-image('invoice_1');
        }

        &.special {
          bg-image('special_1');
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;
  }
}
</style>
