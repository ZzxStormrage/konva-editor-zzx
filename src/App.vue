<!-- @format -->

<!--
 * @Author: zzx 45243627@qq.com
 * @Date: 2023-12-05 11:33:14
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2024-01-15 18:57:10
 * @FilePath: /editor-main-zzx/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="common-layout">
		<el-container>
			<el-header>Header</el-header>
			<el-main>
				<div id="canvas-container"></div>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
	import { useRequest } from "alova"
	import { getDesignBaseData } from "@/alova/methods/design.js"
	import { formatDataToFE, getKonvaData, getSvgData } from "@/utils/formatLayersData.js"
	import { TransformData } from "@/interface/TransformData"
	import Editor from "./app/KonvaEditor/index"

	let editor: Editor

	onMounted(() => {})

	// 初始化画布
	const initCanvas = () => {
		let options = {
			containerId: "canvas-container",
			width: 800,
			height: 800,
		}

		editor = new Editor(options)
	}

	// 绘制整个画布
	const drawCanvas = (canvasData: TransformData) => {
		// let canvasMap = getKonvaData(canvasData.canvasMap)
		// let svgData = getSvgData(canvasMap)
		// editor.svgDraw.drawSvgPath(svgData)
	}

	// 获取初始化数据
	const getDesignInitData = () => {
		let params = {
			designSourceEnum: "PC_DESIGNER",
			templateId: "1596083065835552770",
			userId: "64500649037825",
			designId: null,
		}
		const { onSuccess } = useRequest(getDesignBaseData(params))

		onSuccess((res) => {
			initCanvas()
			let transformData = formatDataToFE(res.data) as TransformData
			drawCanvas(transformData)
		})
	}

	getDesignInitData()
</script>

<style lang="scss" scoped>
	.common-layout {
		height: 100%;
	}

	#canvas-container {
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.btns {
		margin: 20px 120px 120px 120px;

		button {
			font-size: 12px;
		}
	}
</style>
@/interface/transformData
