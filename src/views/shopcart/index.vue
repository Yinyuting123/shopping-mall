<template>
  <!-- 购物车列表 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="updateCartChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', $event.target.value, cartInfo)"
            />
            <a class="plus" @click="changeSkuNum('plus', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ cartInfo.skuPrice * cartInfo.skuNum }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cartInfo.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @change="updateAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "shopCart",

  data() {
    return {
      flag: true,
    };
  },

  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算产品总数
    totalNum() {
      return this.cartInfoList.reduce((pre, cur) => pre + cur.skuNum, 0);
    },
    // 计算产品总价
    totalPrice() {
      return this.cartInfoList.reduce(
        (pre, cur) => pre + cur.skuPrice * cur.skuNum,
        0
      );
    },
    isAllCheck() {
      return !this.cartInfoList.some((item) => item.isChecked == 0);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getShopcartList");
    },
    // 表单元素修改产品个数
    changeSkuNum: throttle(async function (type, disNum, cartInfo) {
      if (type == "change") {
        // 匹配正数
        let regExp = /^[0-9]+\.?\d*$/;
        disNum =
          regExp.test(disNum) && disNum > 1
            ? parseInt(disNum) - cartInfo.skuNum
            : 0;
      } else if (type == "minus") {
        disNum = cartInfo.skuNum > 1 ? -1 : 0;
      }
      try {
        await this.$store.dispatch("addToCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("deleteCart", skuId)
        this.getData();
      } catch(error) {
        alert(error.message)
      }
    },
    async updateCartChecked(cartInfo, event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateCartChecked", {
          skuId: cartInfo.skuId,
          isChecked: isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    updateAllChecked(event) {
      this.$store
        .dispatch('updateAllChecked', +event.target.checked)
        .then(() => {
          this.getData()
        })
        .catch(err => alert(err.message))
    },
    async deleteAllChecked() {
      try {
        await this.$store.dispatch('deleteAllChecked')
        this.getData()
      } catch(error) {
        alert(error.message)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }

      .cart-th6 {
        text-align: center;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 23px;
            height: 35px;
            text-align: center;
            padding: 8px;
            padding: 8px;
            box-sizing: border-box;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 35px;
            float: left;
            text-align: center;
            font-size: 14px;
            box-sizing: border-box;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 23px;
            height: 35px;
            text-align: center;
            padding: 8px;
            box-sizing: border-box;
          }
        }

        .cart-list-con6 {
          width: 12%;
          text-align: left;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          text-align: center;

          a {
            color: #666;

            &:hover {
              color: #c81623;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        &:hover {
          text-decoration: none;
          color: #c81623;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>