/**
 * @format
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 14:16:03
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2024-01-15 15:55:32
 * @FilePath: /editor-main-zzx/src/KonvaEditor/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Konva from "konva"
import { SvgDrawer } from "./core/SvgDrawer/SvgDrawer"
import { ImgDrawer } from "./core/ImgDrawer/ImgDrawer"
import { TextDrawer } from "./core/TextDrawer/TextDrawer"
import { Transformer } from "./core/Transformer/Transformer"
import { RenderData } from "./core/RenderData/RenderData"

import { getContainScale, getCenterPosition } from "./utils/calculate"

import { InitOptions, ScaleOptions } from "./interface/InitOptions"

export default class Editor {
	public stage!: Konva.Stage
	public layer!: Konva.Layer

	public svgDraw: SvgDrawer
	public imgDrawer: ImgDrawer
	public textDrawer: TextDrawer
	public transformer: Transformer
	public renderData: RenderData

	public options: InitOptions

	constructor(options: InitOptions) {
		this.svgDraw = new SvgDrawer(this)
		this.imgDrawer = new ImgDrawer(this)
		this.textDrawer = new TextDrawer(this)
		this.transformer = new Transformer(this)
		this.renderData = new RenderData(this)

		this.options = options

		this.init()
	}

	private init() {
		// 创建舞台对象，它是所有图形对象的容器
		this.stage = new Konva.Stage({
			container: this.options.containerId, // 容器的 DOM 元素的 id
			width: this.options.width,
			height: this.options.height,
		})

		// 创建图层对象
		this.layer = new Konva.Layer()

		// 将图层添加到舞台
		this.stage.add(this.layer)

		this.initBackground(this.options.fill)
	}

	/**
	 * init 初始化画布背景
	 */
	public initBackground(fill: string = "#f3f3f3") {
		// 创建背景图层
		const backgroundLayer = new Konva.Layer()
		this.stage.add(backgroundLayer)

		const background = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.options.width,
			height: this.options.height,
			fill: fill,
			strokeWidth: 0,
			listening: false, // 设置为false使得矩形不可交互
		})

		// 将矩形置于最底层
		background.moveToBottom()

		// 将矩形添加到图层
		backgroundLayer.add(background)
	}

	// 获取canvas 节点
	public getCanvasNodeById(nodeId: string) {
		const node = this.stage.find((node: Konva.Node) => node.id() === nodeId)[0]
		return node
	}

	// 设置layer 缩放
	public setLayerScale(elW: number, elh: number, padding: number) {
		const canvasW = this.options.width
		const canvasH = this.options.height
		const optionW = elW + elW * padding
		const optionH = elh + elh * padding

		const { scale } = getContainScale(optionW, optionH, canvasW, canvasH)
		const { x: offsetX, y: offsetY } = getCenterPosition(optionW, optionH, canvasW, canvasH, scale)
		console.log("🚀 ~ file: index.ts:103 ~ Editor ~ offsetX:", offsetX)
		console.log("🚀 ~ file: index.ts:103 ~ Editor ~ offsetY:", offsetY)

		this.layer.scale({ x: scale, y: scale })
		this.layer.offsetX(-520)
		this.layer.offsetY(120)
		this.layer.batchDraw()
	}

	// 清除画布
	public clearCanvas(): void {
		this.layer.destroyChildren()
		this.layer.draw()
	}
}
