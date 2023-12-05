<template>
  <div>
    <div id="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import Editor from './KonvaEditor/index'

onMounted(() => {
  // 假设你的 HTML 中有一个元素的 ID 是 'canvas-container'
  const editor = new Editor('canvas-container', 500, 400)
  editor.addRectangle()
})
</script>

<style scoped></style>
