/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-22 11:40:59
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-22 17:28:01
 * @FilePath: /editor-main-zzx/src/KonvaEditor/core/ImgDrawer/ImgDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import Editor from '../../index'
import createImg from '../../utils/createImg'

export class ImgDrawer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  public drawImg(url: string) {
    return new Promise(async (resolve, reject) => {
      let imageObj = (await createImg(url)) as CanvasImageSource

      let imgNode = new Konva.Image({
        image: imageObj,
      })

      this.editor.layer.add(imgNode)
      this.editor.layer.batchDraw()
      resolve(imgNode)
    })
  }
}
