<template>
  <div>
    <Board 
      :dataList='list' 
      :currentPageIndex='currentPageIndex'
      :maxRowCount='MAX_ROW_COUNT'
      :maxPaginationCount='MAX_PAGINATION_COUNT'
      :totalItemCount='totalCount'
      @onChangePage='onChangePage'>
      <tr slot="tr">
        <th>id</th>
        <th>userId</th>
        <th>title</th>
      </tr>
      <template slot="row" slot-scope="{rowData}">
        <SampleRow :rowData="rowData"></SampleRow>
      </template>
    </Board>
  </div>
</template>

<script>
import Board from '@/components/board/Board'
import SampleRow from '@/components/SampleRow'
import SampleService from '@/services/SampleService'

export default {
  name: 'Posts',
  components: {
    Board,
    SampleRow
  },
  data() {
    return {
      MAX_ROW_COUNT: 5,
      MAX_PAGINATION_COUNT: 10,
      list: [],
      totalCount: -1,
      currentPageIndex: 0
    }
  },
  computed: {
    startItemIndex() {
      const result = this.currentPageIndex * this.MAX_ROW_COUNT;
      return result;
    }

  },
  mounted() {
    const currentPage = this.$route.query.page;

    if( currentPage ) {
      const nCurrentPage = parseInt( currentPage );

      if( nCurrentPage ) {
        this.currentPageIndex = currentPage - 1;
      }
    }

    this.getData();
  },
  methods: {
    getData: async function () {
      const urlRest = `/posts?_start=${ this.startItemIndex }&_limit=${ this.MAX_ROW_COUNT }`;

      const result = await SampleService.shared.getData( urlRest );

      this.list = result.list;
      this.totalCount = parseInt( result.totalCount );
    },
    onChangePage( nPageIndex ) {
      const params = {
        page: nPageIndex + 1
      }

      let query = Object.assign({}, this.$route.query, params)
      this.$router.replace({ query: query })

      this.currentPageIndex = nPageIndex;

      this.getData();
    }
  }
}
</script>

<style scoped>

</style>
