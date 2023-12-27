/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-24 23:38:27
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-27 15:19:29
 * @FilePath: \konva-editor-zzx\src\KonvaEditor\core\TextDrawer\TextDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Konva from 'konva'
import Editor from '../../index'

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

  public addText(options: DrawTextOptions): void {
    let textOptions = Object.assign(
      {
        fontSize: 100,
        text: '请输入文字',
        draggable: true,
      },
      options,
    )

    let text = new Konva.Text(textOptions)

    let editorW = this.editor.width
    let editorH = this.editor.height
    // 获取文本的宽度和高度
    let textWidth = text.width()
    let textHeight = text.height()

    // 设置文本对象的位置，使其水平和垂直居中
    text.setAbsolutePosition({
      x: (editorW - textWidth) / 2,
      y: (editorH - textHeight) / 2,
    })

    this.editor.layer.add(text)
    this.editor.layer.batchDraw()
  }
}
