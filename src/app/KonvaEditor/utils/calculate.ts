/**
 * @format
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-23 22:53:49
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-24 20:45:28
 * @FilePath: \konva-editor-zzx\src\KonvaEditor\utils\calculate.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 计算居中的位置
export function getCenterPosition(
	objectWidth: number,
	objectHeight: number,
	containerWidth: number,
	containerHeight: number
): { x: number; y: number } {
	const x = Math.max(0, (containerWidth - objectWidth) / 2)
	const y = Math.max(0, (containerHeight - objectHeight) / 2)

	return { x, y }
}

// 计算object-fit: contain的大小和位置
export function getContainScale(
	objWidth: number,
	objHeight: number,
	containerWidth: number,
	containerHeight: number
): { scale: number } {
	const ratio = objWidth / objHeight
	const containerRatio = containerWidth / containerHeight
	let scale = 1

	if (ratio > containerRatio) {
		// 图片的宽度大于容器的宽度，按照宽度进行缩放
		scale = containerWidth / objWidth
	} else {
		// 图片的高度大于容器的高度，按照高度进行缩放
		scale = containerHeight / objHeight
	}

	return {
		scale: scale,
	}
}
