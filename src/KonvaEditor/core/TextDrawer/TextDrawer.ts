/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-24 23:38:27
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-26 19:37:09
 * @FilePath: \konva-editor-zzx\src\KonvaEditor\core\TextDrawer\TextDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import Editor from '../../index'
import createImg from '../../utils/createImg'
import { getContainScale, getCenterPosition } from '../../utils/calculate'

interface CustomTextOptions {
  text: string // 必填项
  [key: string]: any // 允许任意属性
}
// 使用交叉类型将Konva的TextConfig与自定义属性合并
type DrawTextOptions = Konva.TextConfig & CustomTextOptions

export class TextDrawer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  public addText(options: DrawTextOptions) {
    let text = new Konva.Text(options)

    this.editor.layer.add(text)
    this.editor.layer.draw()
  }
}
