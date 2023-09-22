<script setup>
import { ref } from 'vue';
import axios from 'axios'
const dialogVisible = ref(false)

const form = ref({
  name: '',
  city: '',
  id: ''
})

const open = (row) => {
  console.log(row);
  form.value.name = row.name
  form.value.city = row.city
  form.value.id = row.id
  dialogVisible.value = true
}

defineExpose({ //组件中明确要暴露出去的属性
  open
})

const emit = defineEmits(['on-update'])
const onUpdate = async () => {
  //手机表单数据，调用接口
  await axios.patch(`/edit/${form.value.id}`, {
    name: form.value.name,
    city: form.value.city
  })
  // 关闭弹窗
  dialogVisible.value = false
  // 更新数据
  emit('on-update')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="400px">
    <el-form label-width="50px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city" placeholder="请输入城市" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onUpdate">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-input {
  width: 290px;
}
</style>