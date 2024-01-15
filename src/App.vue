<!--
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 11:33:14
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2024-01-15 18:57:10
 * @FilePath: /editor-main-zzx/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="btns">
    <button @click="changeSvgBgColor">改变svg背景色</button>
    <button @click="addImg">添加图片</button>
    <button @click="addText">添加文字</button>
    <button @click="importJsonData">导入JSON</button>
  </div>
  <div>
    <div id="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import Editor from './KonvaEditor/index'
import { svgCoverList } from './mock/data.js'
import jsonData from './mock/json.js'

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

function importJsonData() {
  // console.log('🚀 ~ importJsonData ~ JSON.stringify(jsonData):', JSON.stringify(jsonData))

  let jsonObj = {
    attrs: {
      width: 578,
      height: 200,
    },
    className: 'Stage',
    children: [
      {
        attrs: {},
        className: 'Layer',
        children: [
          {
            attrs: {
              width: 'auto',
              height: 'auto',
              text: 'Text Shadow!',
              fontFamily: 'Calibri',
              fontSize: 95,
              x: 20,
              y: 20,
              stroke: 'red',
              strokeWidth: 2,
              shadowColor: 'black',
              shadowBlur: 2,
              shadowOffsetX: 10,
              shadowOffsetY: 10,
              shadowOpacity: 0.5,
            },
            className: 'Text',
          },
          {
            attrs: {
              stroke: 'green',
              strokeWidth: 10,
              lineJoin: 'round',
              lineCap: 'round',
              points: [
                {
                  x: 50,
                  y: 140,
                },
                {
                  x: 450,
                  y: 160,
                },
              ],
              shadowColor: 'black',
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowOffsetY: 5,
              shadowOpacity: 0.5,
            },
            className: 'Line',
          },
          {
            attrs: {
              x: 280,
              y: 100,
              width: 100,
              height: 50,
              fill: '#00D2FF',
              stroke: 'black',
              strokeWidth: 4,
              shadowColor: 'black',
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowOffsetY: 5,
              shadowOpacity: 0.5,
              rotation: 0.34,
              id: 'blueRectangle',
            },
            className: 'Rect',
          },
          {
            attrs: {
              x: 100,
              y: 41,
              width: 106,
              height: 118,
              id: 'yodaImage',
            },
            className: 'Image',
          },
        ],
      },
    ],
  }
  editor.renderData.importData(JSON.stringify(jsonData))
}

function addText() {
  editor.textDrawer.addText({ text: '请输入文字', fontSize: 30 })
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
