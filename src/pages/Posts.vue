<template>
  <div>
    <PageList>
      <tr slot="tr">
        <th>id</th>
        <th>userId</th>
        <th>title</th>
      </tr>
      <template slot="row" slot-scope="{rowData}">
        <SampleRow :rowData="rowData"></SampleRow>
      </template>
    </PageList>
  </div>
</template>

<script>
import PageList from '@/components/PageList'
import SampleRow from '@/components/SampleRow'

export default {
  name: 'Posts',
  components: {
    PageList,
    SampleRow
  }
}
</script>

<style scoped>

</style>
