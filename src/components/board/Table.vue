<template>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>userId</th>
        <th>title</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      <fragment v-for="item in dataList" :key='item.id'>
        <slot :rowData='item'></slot>
      </fragment>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    dataList: Array
  }
}
</script>

<style scoped>
td {
  border-bottom: 1px solid green;
  height: 20px;
}
</style>
