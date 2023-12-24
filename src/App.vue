<!--
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 11:33:14
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-24 23:44:17
 * @FilePath: /editor-main-zzx/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="btns">
    <button @click="changeSvgBgColor">改变svg背景色</button>
    <button @click="addImg">添加图片</button>
    <button @click="addText">添加文字</button>
  </div>
  <div>
    <div id="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import Editor from './KonvaEditor/index'
import { svgCoverList } from './mock/data.js'
let editor: Editor

onMounted(() => {
  editor = new Editor('canvas-container', 800, 600)
  editor.initBackground()

  let svgCoverListTemp = svgCoverList.map((item) => {
    return {
      ...item,
      fill: '#ccc',
    }
  })

  editor.svgDraw.drawSvgPath(svgCoverListTemp)
})

function changeSvgBgColor() {
  let randomColor = getRandomColor()

  let svgCoverListTemp = svgCoverList.map((item) => {
    return item.attrs.id
  })

  editor.svgDraw.changeSvgBgColor(svgCoverListTemp, randomColor)
}

function addImg() {
  let options = {
    url: 'https://ec-sh.oss-cn-beijing.aliyuncs.com/complier/images/202304/baaf499d739d4f3a9f38957c8657dace.png',
  }
  editor.imgDrawer.drawImg(options)
}

function addText() {
  editor.textDrawer.addText()
}

// 生成随机颜色
function getRandomColor() {
  // 生成 RGB 值
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)

  // 将 RGB 值转换为十六进制
  let hexR = r.toString(16).padStart(2, '0')
  let hexG = g.toString(16).padStart(2, '0')
  let hexB = b.toString(16).padStart(2, '0')

  // 返回十六进制颜色值
  return '#' + hexR + hexG + hexB
}
</script>

<style lang="scss" scoped>
#canvas-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.btns {
  margin: 20px 120px 120px 120px;

  button {
    font-size: 12px;
  }
}
</style>
