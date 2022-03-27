<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(item, index) in categoryList"
                :key="item.id"
                :class="{ cur: index === curIndex }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="item.categoryName"
                    :data-category1Id="item.categoryId"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: curIndex === index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="item in item.categoryChild"
                      :key="item.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="item.categoryName"
                          :data-category2Id="item.categoryId"
                          >{{ item.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="item in item.categoryChild"
                          :key="item.categoryId"
                        >
                          <a
                            :data-categoryName="item.categoryName"
                            :data-category3Id="item.categoryId"
                            >{{ item.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",

  data() {
    return {
      curIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 通知vuex发送请求，获取数据，存储于仓库当中
    // 非正常情况（用户操作很快）,本身全部的一级分类都应该触发鼠标进入事件，但经过测试，只有部分h3触发了
    // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
    // this.$store.dispatch("categoryList");
    // 当组件挂载完毕，show属性变为false
    // 如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 16),
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.curIndex = index;
    }, 50),
    leaveShow() {
      this.curIndex = -1;
      // 鼠标移出隐藏全部分类
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      let node = event.target;
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      // 如果标签上有categoryName一定是a标签
      if (categoryname) {
        // 区分一级、二级、三级分类
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入显示全部分类
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
              cursor: default;
            }
          }
          // &:hover {
          //     background-color: #e1251b;
          //     h3 a {
          //       color: #fff;
          //     }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: #e1251b;
          h3 a {
            color: #fff;
          }
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态(进入)
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all .5s linear;
    }

    .sort-leave {
      height: 461px;
    }
    .sort-leave-to {
      height: 0;
    }
    // 定义动画时间、速率
    .sort-leave-active {
      transition: all .5s linear;
    }
  }
}
</style>