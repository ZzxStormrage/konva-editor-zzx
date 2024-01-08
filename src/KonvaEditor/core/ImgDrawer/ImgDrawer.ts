/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-22 11:40:59
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2024-01-08 15:05:31
 * @FilePath: /editor-main-zzx/src/KonvaEditor/core/ImgDrawer/ImgDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import Editor from '../../index'
import createImg from '../../utils/createImg'
import { getContainScale, getCenterPosition } from '../../utils/calculate'

interface DrawImgOptions {
  url: string // 必填项
  [key: string]: any // 允许任意属性
}

export class ImgDrawer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  // 绘制图片
  public drawImg(options: DrawImgOptions, active: boolean = true): Promise<Konva.Image> {
    return new Promise<Konva.Image>(async (resolve, reject) => {
      try {
        let imageObj: CanvasImageSource = await createImg(options.url)
        const imageElement = imageObj as HTMLImageElement
        const { width: imgW, height: imgH } = imageElement

        let editorW = this.editor.width
        let editorH = this.editor.height

        let { scale } = getContainScale(imgW, imgH, editorW, editorH)
        let { x, y } = getCenterPosition(imgW * scale, imgH * scale, editorW, editorH)

        let optionsTemp = Object.assign(
          {
            draggable: true,
          },
          options,
        )

        let imgNode = new Konva.Image({
          ...optionsTemp,
          image: imageObj,
        })

        imgNode.scale({ x: scale, y: scale })
        imgNode.position({ x: x, y: y })

        this.editor.layer.add(imgNode)
        active && this.editor.transformer.addTransformer(imgNode)

        this.editor.layer.batchDraw()
        resolve(imgNode)
      } catch (error) {
        reject(error)
      }
    })
  }
}
