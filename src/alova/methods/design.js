/** @format */

import { request } from "@/services/http/index.js"

export const getDesignBaseData = (params) => {
	return request.Post("/api/editor/design/designEditorInitialize", { params })
}
