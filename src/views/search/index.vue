<template>
  <div>
    <!-- 商品分类三级列表 -->
    <typeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>
        <SearchSelector
          @trademarkInfo="selectTrademark"
          @propsInfo="selectProps"
        />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  data-index="1"
                  :class="{ active: isOne }"
                  @click="changeOrder('1')"
                >
                  <a
                    >综合
                    <i v-show="isOne" class="iconfont" :class="orderClass"></i>
                  </a>
                </li>
                <li
                  data-index="2"
                  :class="{ active: !isOne }"
                  @click="changeOrder('2')"
                >
                  <a
                    >价格
                    <i v-show="!isOne" class="iconfont" :class="orderClass"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="goDetail(good.id)">
                      <img v-lazy="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="setPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";

export default {
  name: "searchView",
  props: ["keyword", "k", "a", "b"],
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  beforeMount() {
    // Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },

  mounted() {
    this.getData();
  },

  computed: {
    ...mapState({
      total: (state) => state.search.searchList.total
    }),
    // 使用mapGetters，参数是一个数组，数组的元素对应getters中的函数名；不分模块
    ...mapGetters(["goodsList"]),
    orderClass() {
      return this.searchParams.order.indexOf("desc") !== -1
        ? "icon-xiangxia"
        : "icon-xiangshang";
    },
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
  },
  // 数据监听：监听组件实例身上的属性值变化
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route() {
      this.getData();
    },
  },

  methods: {
    getData() {
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.$store.dispatch("getSearchList", this.searchParams);
      // 每一次请求完毕，应该把相应的1、2、3级分类的id重新初始化
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    removeCategoryName() {
      // 设置成undefined，axios会默认丢弃该参数
      // 如果属性值为空的字符串，还是会把相应的字段带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 地址栏修改，进行路由跳转
      this.$router.push({
        name: "search",
        params: {
          keyword: this.searchParams.keyword,
        },
      });
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });

      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
    },
    selectTrademark(trademark) {
      let str = `${trademark.tmId}:${trademark.tmName}`;
      this.searchParams.trademark = str;
      // !this.searchParams.props.includes(str) && this.searchParams.props.push(str)
      this.getData();
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    selectProps(props) {
      !this.searchParams.props.includes(props) &&
        this.searchParams.props.push(props);
      this.getData();
    },
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    changeOrder(navIndex) {
      let orderParam = this.searchParams.order.split(":");
      if (orderParam[0] !== navIndex) {
        orderParam[0] = navIndex;
        orderParam[1] = "desc";
      } else {
        orderParam[1] = orderParam[1] === "desc" ? "asc" : "desc";
      }
      console.log(orderParam);
      this.searchParams.order = orderParam.join(":");
      this.getData();
    },
    setPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    },
    goDetail(goodId) {
      this.$router.push('/detail/' + goodId)
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              .iconfont {
                font-size: 10px;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>