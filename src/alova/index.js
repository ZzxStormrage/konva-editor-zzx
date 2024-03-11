/**
 * @format
 * @Date: 2023-08-28 21:08:43
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-18 14:23:13
 * @FilePath: /ele-h5-pages/src/services/http/index.js
 */

import { createAlova } from "alova"
import GlobalFetch from "alova/GlobalFetch"
import VueHook from "alova/vue"
import { checkStatus } from "./checkStatus.js"

const BASE_URL = ""

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 * @link https://alova.js.org/zh-CN/
 */
const alovaInstance = createAlova({
	baseURL: BASE_URL,
	timeout: 50000,
	statesHook: VueHook,
	// 请求适配器，
	requestAdapter: GlobalFetch(),
	// 设置为null即可全局关闭全部请求缓存
	localCache: null,

	// 请求拦截器
	beforeRequest(method) {
		const baseURL = BASE_URL
		method.baseURL = baseURL

		// method.config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
		method.config.headers["Authorization"] = "Bearer " + "0780a622fffe4dd1aa2d06eaac4dbf9b"
		method.config.headers["Content-Type"] = "application/json;charset=utf-8"
		method.config.headers["Access-Control-Allow-Origin"] = "*"
		method.config.headers["Access-Control-Allow-Methods"] = "PUT, POST, GET, DELETE"
		method.config.headers["Access-Control-Allow-Private-Network"] = true
	},

	responsed: {
		/**
		 * 请求成功的拦截器
		 * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
		 * @param response
		 * @param method
		 */
		onSuccess: async (response, method) => {
			// if (response.status >= 400) {
			// 	throw new Error(response.statusText)
			// }

			const json = await response.json()

			// if ((json.code && json.code !== 0) || (json.flag === false && json.code !== 401)) {
			// 	// 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
			// 	checkStatus(response.status, json.msg || "糟糕出错了")
			// 	throw new Error(json.msg)
			// }
			return json.data
			// 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
		},

		/**
		 * 请求失败的拦截器，请求错误时将会进入该拦截器。
		 * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
		 * @param err
		 * @param method
		 */
		onError: (err, method) => {
			return Promise.reject({ err, method })
		},
	},
})

export const request = alovaInstance
