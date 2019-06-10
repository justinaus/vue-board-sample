<template>
  <tr>
    <td>{{ rowData.id }}</td>
    <td>{{ rowData.userId }}</td>
    <td class='title'>
      <router-link :to="toPath">
        {{ rowData.title }}
      </router-link>
    </td>
  </tr>
</template>

<script>
import queryString from 'query-string'

export default {
  name: 'SampleRow',
  props: {
    rowData: {
      id: String,
      userId: String,
      title: String
    }
  },
  computed: {
    toPath() {
      const { id } = this.rowData;

      const stringified = queryString.stringify( this.$route.query );

      let path = `/post/${ id }`;
      if( stringified ) {
        path += `?${ stringified }`;
      }

      return path;
    }
  }
}
</script>

<style scoped>
</style>
