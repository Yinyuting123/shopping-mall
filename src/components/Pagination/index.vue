<template>
  <!-- 分页器 -->
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>

    <button
      v-if="startNumAndEndNum.start !== 1"
      :class="{ active: pageNo === 1 }"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">...</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      :class="{ active: page === pageNo }"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">...</button>
    <button
      v-if="startNumAndEndNum.end !== totalPage"
      :class="{ active: pageNo === totalPage }"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>

    <!-- 下一页 -->
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button class="total">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {};
  },

  mounted() {},

  computed: {
    //   总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码的其实数字和结束数字
    startNumAndEndNum() {
      let start = 0,
        end = 5;
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }

        if (end > this.totalPage) {
          end = this.totalPage;
          start = end - this.continues + 1;
        }
      }
      return { start, end };
    },
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    margin: 0 5px;
    padding: 0 5px;
    border-radius: 2px;
    color: #606266;
    font-size: 13px;
    background-color: #f4f4f5;
    border: 0;
    vertical-align: top;
    cursor: pointer;

    &.active {
      color: #fff;
      background-color: #e1251b;
    }

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .total {
    margin-left: 30px;
  }
}
</style>