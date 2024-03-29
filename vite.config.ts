/**
 * @format
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-05 11:33:14
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-05 18:03:31
 * @FilePath: /editor-main-zzx/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": resolve("src"),
		},
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ["vue"],
			dts: "src/auto-import.d.ts",
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/, // .md
			],
			resolvers: [ElementPlusResolver()],
			// 解决eslint报错问题
			eslintrc: {
				// 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
				enabled: true,
				filepath: "./.eslintrc-auto-import.json", // 生成的文件路径
				globalsPropValue: true,
			},
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		// 配置vite在运行的时候自动检测eslint规范
		eslintPlugin({
			include: ["src/**/*.ts", "src/**/*.js", "src/**/*.vue", "src/*.ts", "src/*.js", "src/*.vue"],
		}),
	],

	server: {
		// 是否开启 https
		https: false,
		// 端口号
		port: 5137,
		// 监听所有地址
		host: "0.0.0.0",
		// 服务启动时是否自动打开浏览器
		open: true,
		// 允许跨域
		cors: true,
		proxy: {
			"/api": {
				target: "https://pceditor.ele007.com", //  线上
				changeOrigin: true, // 是否允许跨域
				secure: true, // 如果是https接口，需要配置这个参数
			},
		},
	},
})
