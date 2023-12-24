/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-24 23:38:27
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-24 23:43:52
 * @FilePath: \konva-editor-zzx\src\KonvaEditor\core\TextDrawer\TextDrawer.ts
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

export class TextDrawer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  public addText() {
    let text = new Konva.Text({
      x: this.editor.stage.width() / 2,
      y: 15,
      text: 'Simple Text',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
    })

    this.editor.layer.add(text)
    this.editor.layer.draw()
  }
}
