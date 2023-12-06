<!--
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 11:33:14
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-06 18:04:54
 * @FilePath: /editor-main-zzx/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div id="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import Editor from './KonvaEditor/index'
import { svgCoverList } from './mock/data.js'
console.log('🚀 ~ file: App.vue:18 ~ svgCoverList:', svgCoverList)

onMounted(() => {
  // 假设你的 HTML 中有一个元素的 ID 是 'canvas-container'
  const editor = new Editor('canvas-container', 800, 600)

  editor.initBackground()
  editor.svgDraw.drawSvgPaths(svgCoverList)
})
</script>

<style scoped></style>
