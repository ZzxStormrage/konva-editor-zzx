/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 14:16:03
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-05 19:09:39
 * @FilePath: /editor-main-zzx/src/KonvaEditor/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'

export default class Editor {
  private stage: Konva.Stage
  private layer: Konva.Layer

  constructor(containerId: string, width: number, height: number) {
    // 创建舞台对象，它是所有图形对象的容器
    this.stage = new Konva.Stage({
      container: containerId, // 容器的 DOM 元素的 id
      width: width,
      height: height,
    })

    // 创建图层对象
    this.layer = new Konva.Layer()

    // 将图层添加到舞台
    this.stage.add(this.layer)
  }

  // 一个方法来添加一个矩形到画布
  public addRectangle() {
    const rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
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
