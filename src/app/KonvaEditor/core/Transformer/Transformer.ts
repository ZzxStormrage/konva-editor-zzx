/**
 * @format
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-27 17:22:33
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2024-01-08 14:57:00
 * @FilePath: /editor-main-zzx/src/KonvaEditor/core/Transformer/Transformer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Konva from "konva"
import Editor from "../../index"
import { Node } from "konva/lib/Node"
import { Rect } from "konva/lib/shapes/Rect"
import { Shape } from "konva/lib/Shape"
import { Group } from "konva/lib/Group"

export class Transformer {
	private editor: Editor

	constructor(editor: Editor) {
		this.editor = editor
	}

	public addTransformer(node: Rect): void {
		let tr = new Konva.Transformer({
			node: node,
			anchorStroke: "red",
			anchorFill: "yellow",
			anchorSize: 20,
			borderStroke: "green",
			rotationSnaps: [0, 90, 180, 270],
			borderDash: [3, 3],
		})

		node.getLayer()?.add(tr)
	}
}

export default Transformer
