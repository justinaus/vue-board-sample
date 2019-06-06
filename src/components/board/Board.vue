<template>
  <fragment>
    <Table :dataList='dataList'>
      <template slot-scope="{rowData}">
        <slot :rowData='rowData'></slot>
      </template>
    </Table>
    <Pagination :selectedPageNum='currentPageNum' @onClickPageNum='onClickPageNum' />
  </fragment>
</template>

<script>
import Table from './Table'
import Pagination from './Pagination'

export default {
  name: 'Board',
  components: {
    Table,
    Pagination
  },
  props: {
    dataList: Array
  },
  data() {
    return {
      currentPageNum: -1
    }
  },
  mounted() {
    this.changePageNum( 1 );
  },
  methods: {
    onClickPageNum( pageNum ) {
      this.changePageNum( pageNum );
    },
    changePageNum( pageNum ) {
      this.currentPageNum = pageNum;

      this.$emit( 'onChangedPageNum', this.currentPageNum );
    }
  }
}
</script>

<style scoped>

</style>
