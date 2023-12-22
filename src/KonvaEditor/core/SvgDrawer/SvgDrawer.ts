/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-06 15:46:56
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-22 11:41:10
 * @FilePath: /editor-main-zzx/src/KonvaEditor/core/SvgDrawer/SvgDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import Editor from '../../index'
import { SvgPathData } from '../../interface/Draw'

interface Bounds {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export class SvgDrawer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  // 绘制SVG
  public drawSvgPath(svgPaths: SvgPathData[]): void {
    const bounds = this.calculateSvgBounds(svgPaths)
    const { scale, offsetX, offsetY } = this.getSvgScaleOffset(this.editor.width, this.editor.height, bounds)

    svgPaths.forEach((pathData) => {
      const path = new Konva.Path({
        ...pathData,
        x: (pathData.x || 0) * scale + offsetX,
        y: (pathData.y || 0) * scale + offsetY,
        scaleX: scale,
        scaleY: scale,
      })
      this.editor.layer.add(path)
    })

    this.editor.layer.draw()
  }

  public changeSvgBgColor(pathIds: string[], color: string): void {
    pathIds.forEach((id) => {
      const node = this.editor.getCanvasNodeById(id)
      if (node) {
        node.setAttr('fill', color)
        this.editor.layer.batchDraw()
      }
    })
  }

  // 计算svg 坐标
  private calculateSvgBounds(svgPaths: SvgPathData[]): Bounds {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    svgPaths.forEach((pathData) => {
      const path = new Konva.Path(pathData)
      const box = path.getClientRect()
      minX = Math.min(minX, box.x)
      maxX = Math.max(maxX, box.x + box.width)
      minY = Math.min(minY, box.y)
      maxY = Math.max(maxY, box.y + box.height)
    })

    return { minX, maxX, minY, maxY }
  }

  // 计算svg 位于画布的比例
  private getSvgScaleOffset(canvasWidth: number, canvasHeight: number, bounds: Bounds) {
    let { minX, maxX, minY, maxY } = bounds
    const svgWidth = maxX - minX
    const svgHeight = maxY - minY

    const scaleX = canvasWidth / svgWidth
    const scaleY = canvasHeight / svgHeight
    const scale = Math.min(scaleX, scaleY)

    const offsetX = (canvasWidth - svgWidth * scale) / 2 - minX * scale
    const offsetY = (canvasHeight - svgHeight * scale) / 2 - minY * scale

    return {
      offsetX,
      offsetY,
      scale,
    }
  }
}
