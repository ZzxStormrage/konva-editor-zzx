/**
 * @format
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-06 14:38:27
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-06 16:18:38
 * @FilePath: /editor-main-zzx/src/KonvaEditor/interface.ts/Draw.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export interface SvgPathData {
	className: string
	left: number
	top: number
	width: number
	height: number
	attrs: {
		id: string
		x: number
		y: number
		surfaceName: string
		type: string
		data: string
		stroke: string
		fill: string
		name: string
		listening: boolean
		[key: string]: any // 为自定义字段预留
	}
	[key: string]: any // 为自定义字段预留
}
