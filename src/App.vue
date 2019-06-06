<template>
  <div id="app">
    <Board :dataList='list' @onChangedPageIndex='onChangedPageIndex'>
      <tr slot="tr">
        <th>id</th>
        <th>userId</th>
        <th>title</th>
        <th>date</th>
      </tr>
      <template slot="row" slot-scope="{rowData}">
        <SampleRow :rowData="rowData"></SampleRow>
      </template>
    </Board>
  </div>
</template>

<script>
import Board from './components/board/Board'
import SampleRow from './components/SampleRow'
import { mapState } from 'vuex'
import { GET_SAMPLE_LIST_ACTION } from '@/store/action-types'

export default {
  name: 'app',
  components: {
    Board,
    SampleRow
  },
  data() {
    return {
      rowCount: 5
    }
  },
  computed: {
    ...mapState({
      list: state => state.sampleList.dataList,
    })
  },
  methods: {
    onChangedPageIndex( nPageIndex ) {
      const startIndex = this.rowCount * nPageIndex;
      
      const urlRest = `posts?_start=${ startIndex }&_limit=${ this.rowCount }`;

      this.$store.dispatch( GET_SAMPLE_LIST_ACTION, urlRest );
    }
  }
}
</script>

<style>

</style>
