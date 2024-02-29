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
	import Editor from "./app/KonvaEditor/index"

	let editor: Editor

	onMounted(() => {
		initCanvas()
	})

	// 初始化画布
	const initCanvas = () => {
		editor = new Editor("canvas-container", 800, 600)
		editor.initBackground()
	}
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
