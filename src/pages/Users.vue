<template>
  <div>
    <PageList apiName="/users">
      <tr slot="tr">
        <th>id</th>
        <th>name</th>
        <th>username</th>
        <th>email</th>
      </tr>
      <template slot="row" slot-scope="{rowData}">
        <!-- <SampleRow :rowData="rowData"></SampleRow> -->
        <tr>
          <td>{{ rowData.id }}</td>
          <td>{{ rowData.name }}</td>
          <td>{{ rowData.username }}</td>
          <td>{{ rowData.email }}</td>
        </tr>
      </template>
    </PageList>
  </div>
</template>

<script>
import PageList from '@/components/PageList'

export default {
  name: 'Posts',
  components: {
    PageList
  }
}
</script>

<style scoped>

</style>
