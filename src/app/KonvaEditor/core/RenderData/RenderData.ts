/**
 * @format
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-27 17:22:33
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2024-01-15 16:02:57
 * @FilePath: /editor-main-zzx/src/KonvaEditor/core/Transformer/Transformer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Konva from "konva"
import Editor from "../../index"

export class RenderData {
	private editor: Editor

	constructor(editor: Editor) {
		this.editor = editor
	}

	public importData(jsonString: string): void {
		this.editor = Konva.Node.create(jsonString, this.editor.containerId)
	}
}

export default RenderData
