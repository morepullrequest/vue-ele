<template>
  <div id="app">

    <v-header v-bind:seller="seller"></v-header>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>


    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import header from "./components/header/header.vue";
import axios from "axios";

Vue.prototype.$axios = axios;

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$axios
      .get("http://localhost:8123/api/seller")
      // .get("/api/seller")
      .then(response => {
        var res = response.data;
        if (res.errno === ERR_OK) {
          this.seller = res.data;
          console.log("get /api/seller");
          console.log(this.seller);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
  components: {
    "v-header": header
  }
};
</script>

<style lang="stylus">
@import './common/stylus/index.styl';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align center
  color: #2c3e50;

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      &>a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
