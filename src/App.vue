<script setup>
import Edit from './components/Edit.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const tableList = ref([])
const getList = async () => {
  const res = await axios.get('/list')
  tableList.value = res.data
}
onMounted(() => getList())

const handleDelete = async (id) => {
  console.log(id, 'id')
  await axios.delete(`/del/${id}`)
  getList()
}

// 编辑数据
// 思路：打开弹框 -> 回填数据 -> 更新数据

//1.打开弹框（获取子组件实例，调用方法或者修改属性）
//2.回调函数（调用详情接口 / 当前行的静态数据）
const editRef = ref(null)
const handleEdit = (row) => {
  editRef.value.open(row)
}



</script>

<template>
  <el-table :data="tableList" style="width: 100%">
    <el-table-column prop="id" label="ID" width="200" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="email" label="邮箱" width="280" />
    <el-table-column prop="city" label="城市" width="180" />
    <el-table-column label="操作" width="180">
      <template #default="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Edit ref="editRef" @on-update="getList" />
</template>

<style scoped>
</style>
