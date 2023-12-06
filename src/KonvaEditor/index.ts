/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 14:16:03
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-06 16:35:52
 * @FilePath: /editor-main-zzx/src/KonvaEditor/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import { SvgDrawer } from './core/SvgDrawer/SvgDrawer'

export default class Editor {
  public stage: Konva.Stage
  public layer: Konva.Layer

  public svgDraw: SvgDrawer

  public containerId: string
  public width: number
  public height: number

  constructor(containerId: string, width: number, height: number) {
    this.containerId = containerId
    this.width = width
    this.height = height

    this.svgDraw = new SvgDrawer(this)

    // 创建舞台对象，它是所有图形对象的容器
    this.stage = new Konva.Stage({
      container: this.containerId, // 容器的 DOM 元素的 id
      width: this.width,
      height: this.height,
    })

    // 创建图层对象
    this.layer = new Konva.Layer()

    // 将图层添加到舞台
    this.stage.add(this.layer)
  }

  /**
   * init 初始化画布
   */
  public initBackground(fill: string = '#f3f3f3'): void {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fill: fill,
      strokeWidth: 0,
      listening: false, // 设置为false使得矩形不可交互
    })

    // 将矩形添加到图层
    this.layer.add(rect)

    // 绘制图层
    this.layer.draw()
  }

  // 一个方法来清除画布
  public clear(): void {
    this.layer.destroyChildren()
    this.layer.draw()
  }
}
