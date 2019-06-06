<template>
  <tr>
    <td>{{ rowData.id }}</td>
    <td>{{ rowData.userId }}</td>
    <td class='title'>
      <!-- <router-link :to='"/items/" + rowData.id'> -->
        {{ rowData.title }}
      <!-- </router-link> -->
    </td>
    <td>{{ rowData.date }}</td>
  </tr>
</template>

<script>
export default {
  name: 'SampleRow',
  props: {
    rowData: {
      id: String,
      userId: String,
      title: String,
      date: String
    }
  }
}
</script>

<style scoped>
.title {
  width: 200px;
}
</style>
