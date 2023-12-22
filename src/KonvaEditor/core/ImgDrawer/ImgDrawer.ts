/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-22 11:40:59
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-22 20:21:08
 * @FilePath: /editor-main-zzx/src/KonvaEditor/core/ImgDrawer/ImgDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import Editor from '../../index'
import createImg from '../../utils/createImg'

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
  public drawImg(options: DrawImgOptions): Promise<Konva.Image> {
    return new Promise<Konva.Image>(async (resolve, reject) => {
      try {
        let imageObj: CanvasImageSource = await createImg(options.url)

        let imgNode = new Konva.Image({
          ...options,
          image: imageObj,
        })

        this.editor.layer.add(imgNode)
        this.editor.layer.batchDraw()
        resolve(imgNode)
      } catch (error) {
        reject(error)
      }
    })
  }
}
