/** @format */

import { request } from "../index.js"

export const getDesignBaseData = (params) => {
	return request.Post("/api/editor/design/designEditorInitialize", params)
}
