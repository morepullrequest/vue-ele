<template>
    <div class="rating-select">
        <div class="rating-type">
            <span class="block positive" :class="{'active': value.selectType==2}" @click="changeType(2)">
                {{desc.all}}<span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{'active': value.selectType==0}" @click="changeType(0)">
                {{desc.positive}}<span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" :class="{'active': value.selectType==1}" @click="changeType(1)">
                {{desc.negative}}<span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch">
            <span class="icon-check_circle" :class="{'on':value.onlyContent}" @click="switchContent"></span>
            <span class="text">只看有内容的评价</span>
        </div>

    </div>
</template>

<script>
// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
// eslint-disable-next-line
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          selectType: ALL,
          onlyContent: false
        };
      }
    }
  },

  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    changeType(type) {
      this.value.selectType = type;
    },
    switchContent() {
      this.value.onlyContent = !this.value.onlyContent;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.rating-select {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        border-1px(rgba(7, 17, 27, 0.1));

        .block {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 1px;
            margin-right: 8px;
            font-size: 12px;
            line-height: 16px;
            color: rgb(77, 85, 93);

            &.active {
                color: white;
            }

            .count {
                font-size: 8px;
                margin-left: 2px;
            }

            &.positive {
                background-color: rgba(0, 160, 220, 0.2);

                &.active {
                    background-color: rgb(0, 160, 220);
                }
            }

            &.negative {
                background-color: rgba(77, 85, 93, 0.2);

                &.active {
                    background-color: rgb(77, 85, 93);
                }
            }

            &.active {
                font-size: 12px;
            }
        }
    }

    .switch {
        display: flex;
        align-items: center;
        padding: 12px 18px;
        border-1px(rgba(7, 17, 27, 0.1));
        line-height: 24px;
        color: rgb(147, 153, 159);
        font-size: 0px;

        .icon-check_circle {
            margin-right: 4px;
            font-size: 24px;

            &.on {
                color: #00c850;
            }
        }

        .text {
            font-size: 12px;
        }
    }
}
</style>
