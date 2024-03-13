import { toAbsoluteDesign } from "./toPosition"
// 加载图片
export function addImageProcess(src) {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.crossOrigin = "Anonymous" // to avoid CORS if used with Canvas
		img.onload = () => resolve(img)
		img.onerror = (e) => reject(e)
		img.src = src
	})
}

// 处理老数据的文字名称
function mvFontName(data) {
	if (!data) {
		return
	}
	if (!data.children) {
		data.children = []
	}
	data.children.forEach((item) => {
		if (item.className === "Text") {
			let names = item.attrs.fontFamily?.split(",")
			names = names ? names : ["字由点字典黑 55J"]
			names = names.map((name) => name.replace(/\s+/g, "")).join(",")
			item.attrs.fontFamily = names
		}
		if (item.className === "Group") {
			mvFontName(item)
		}
	})
}

/**
 * @description: 对刀版的数据进行格式
 * @param {*} locationDesc 正反面的标注
 * @param {*} diecutConfig 刀版图信息
 * @param {*} designDetailDTO 刀版图详细信息
 * @param {*} designSurfaceAttributesDTO 刀版图各个面范围 内有 ：coverDTOList  holeDTOList
 * @param {*} designElementDTO  素材列表
 * @param {*} designCompositeElementDTOList 复合素材列表
 * @return {Object}  layout 格式化的刀版数据 newLayers 格式化的图层数据
 */
function getLayout({
	innerMapImg,
	outerMapImg,
	locationDesc,
	diecutName,
	diecutConfig,
	designDetailDTO,
	designSurfaceAttributesDTO,
	designDetailExtDTO,
	designCompositeElementDTOList,
}) {
	const { xmmCraftId, materialDesc, image2DId, image2DUrl } = designDetailDTO || {}
	const content = designDetailExtDTO?.content ? JSON.parse(designDetailExtDTO.content) : {}
	if (image2DUrl) {
		content.playgroundImg = { image2DUrl, image2DId }
	}

	mvFontName(content.playground)
	const layout = {
		id: diecutConfig.id, // 刀版图
		src: diecutConfig.pngOssUrl, // 刀版图SVG
		width: parseFloat(diecutConfig.svgWidth),
		height: parseFloat(diecutConfig.svgHeight),
		desc: locationDesc, // 刀版图正反面标识
		diecutName: diecutName, // 刀版名称
		innerMapImg, // 刀版内部
		outerMapImg, // 刀版外部
		designDetailDTO: {
			xmmCraftId, // 刀版图工艺
			materialDesc, // 刀版图材质
			image2DId, // 刀版设计后的图
			image2DUrl, // 刀版设计后的图
		},
		surfaceList: designSurfaceAttributesDTO, // 刀版图各个面的路径
		playground: {
			id: designDetailExtDTO?.id,
			content,
		}, // 图层信息
	}

	return { layout }
}
function formatCanvasMap(layout) {
	let background = {
		name: layout.name,
		width: layout.width,
		height: layout.height,
		texture: layout.outerMapImg,
	}
	if (layout?.surfaceList) {
		const coverList = layout?.surfaceList?.coverDTOList || []
		background.coverList = formatCover(coverList, "COVER")
		const holeList = layout?.surfaceList?.holeDTOList || []
		background.holeList = formatCover(holeList, "HOLE")
	}
	const content = layout.playground?.content
	if (content?.background) {
		background = {
			...background,
			...content.background,
			originData: content.background,
		}
	}
	const playground = {}
	let children = content?.playground ? content.playground?.children : []
	/**
	 * 处理老数据遗留的层级问题
	 */
	children = children.sort((n1, n2) => {
		return n1.attrs.zIndex - n2.attrs.zIndex
	})
	playground.children = children.map((item) => formatLayer(item, layout.id))

	return {
		id: layout.id,
		parentId: layout.parentId,
		face: layout.face,
		background,
		playground,
		playgroundId: layout.playground?.id,
		name: layout.name,
		desc: layout.desc,
		// playgroundImg: {
		//     image2DUrl: layout.designDetailDTO?.image2DUrl,
		//     image2DId: layout.designDetailDTO?.image2DId
		// },
		playgroundImg: content?.playgroundImg || {},
		coverPreviewMap: content?.coverPreviewMap || [],
		nodePreviewMap: content?.nodePreviewMap || [],
	}
}
/**
 * @description: 将数据格式为前端所需的数据格式
 * @param {*} modelIdDetail 闭合模型
 * @param {*} modelId2Detail 展开模型
 * @param {*} boxDetailDTOList 相关素材数据
 * @return {Object} models 模型列表,layouts 刀版列表
 */
export function formatDataToFE({ modelIdDetail, modelId2Detail, boxDetailDTOList }) {
	// 模型列表
	const models = {}
	modelIdDetail && (models.modelIdDetail = modelIdDetail)
	modelId2Detail && (models.modelId2Detail = modelId2Detail)

	// 部件列表
	const boxs = []

	// 刀版列表
	const layouts = []

	// // 图层列表
	const canvasMap = {}

	// 拆分部件
	boxDetailDTOList.forEach((item) => {
		const { id, boxPartDetailDesc: desc } = item
		const childrenId = []
		// 部件正面刀版
		if (item.obverseInfo) {
			// 组织刀版信息

			const { layout } = getLayout(item.obverseInfo)
			layout.parentId = id
			layout.parentName = desc
			layout.face = "obverse"
			layout.reverseInfo?.diecutConfig && (layout.reverseSideId = item.reverseInfo.diecutConfig.id)
			layout.name =
				boxDetailDTOList.length > 1 ? layout.diecutName : item.boxPartDetailDesc + "-" + item.obverseInfo.locationDesc
			childrenId.push(layout.id)
			layouts.push(layout)
			canvasMap[layout.id] = formatCanvasMap(layout)
		}
		// 部件反面刀版
		if (item.reverseInfo) {
			// 组织刀版信息
			const { layout } = getLayout(item.reverseInfo)
			layout.parentId = id
			layout.parentName = desc
			layout.face = "reverse"
			layout.reverseSideId = item.obverseInfo.diecutConfig.id
			layout.name =
				boxDetailDTOList.length > 1 ? layout.diecutName : item.boxPartDetailDesc + "-" + item.reverseInfo.locationDesc
			childrenId.push(layout.id)
			layouts.push(layout)
			canvasMap[layout.id] = formatCanvasMap(layout)
		}
		boxs.push({ id, desc, childrenId: childrenId })
	})
	return { models, layouts, boxs, canvasMap }
}

/**
 * @description: 将图层信息从后端传来的格式为画布需要的格式
 * @param {Object} layer 图层信息
 * @return {Object} 格式化之后的图层信息
 */
export function formatLayer(layer, parentPlayId) {
	layer.attrs.parentPlayId = parentPlayId
	layer.attrs.originData = { ...layer.attrs }
	delete layer.attrs.zIndex
	layer.attrs.name = "node"
	delete layer.attrs.surfaceId
	delete layer.attrs.surfaceX
	delete layer.attrs.surfaceY
	switch (layer.className) {
		case "Text":
			break
		case "Image":
			if (layer.attrs.image) {
				delete layer.attrs.image
			}
			break
		case "Group":
			layer.children = layer.children.map((item) => {
				return formatLayer(item, parentPlayId)
			})
			break
	}
	return layer
}
export function setImageInto(canvasMapItem, preLoadData) {
	const texture = preLoadData.imgData.backgroundTexture
	canvasMapItem.background.texture = texture
	const { children } = canvasMapItem.playground
	const imageList = preLoadData.imgData.children
	children.forEach((item) => {
		const image = imageList.find((a) => a.id === item.attrs.id)
		if (item.className === "Image" && image) {
			item.attrs.image = image.img
		} else if (item.className === "Group") {
			item.children.forEach((child) => {
				const image1 = imageList.find((c) => c.id === child.attrs.id)
				if (child.className === "Image" && image1) {
					child.attrs.image = image1.img
				}
			})
		}
		return item
	})
	return canvasMapItem
}

/**
 * @description: 将面信息从后端传来的格式 为面需要的格式
 * @param {Array} paths 面列表
 * @param {String} type COVER面， HOLE 孔
 * @return {Array} 格式化后的面数组
 *
 */

export function formatCover(paths, type = "COVER") {
	return paths
		.filter((item) => item.radius || item.path)
		.map((item) => {
			const className = item.radius ? "Circle" : "Path"
			const attrs = {
				id: item.surfaceId,
				x: parseFloat(item.left),
				y: parseFloat(item.top),
				surfaceName: item.surfaceName,

				type,
			}
			if (className === "Path") {
				attrs.x = 0
				attrs.y = 0
			}
			// if (item.fill) attrs.fill = item.fill;
			if (item.stroke) attrs.stroke = item.stroke
			if (item.radius) attrs.radius = parseFloat(item.radius)
			if (item.path) attrs.data = item.path

			return {
				className,
				left: parseFloat(item.left),
				top: parseFloat(item.top),
				width: parseFloat(item.width),
				height: parseFloat(item.height),
				attrs,
			}
		})
}
/**
 * @description: 将画布图层信息从画布拿来转后台需要的格式
 * @param {Object} node 图层节点
 * @param {Array} paths 面列表
 * @return {Object} 格式化后的图层信息
 */
export function formatLayerNode(node, paths) {
	switch (node.className) {
		case "Image":
			node = toAbsoluteDesign(node, paths)
			delete node.attrs.image
			break
		case "Text":
			node = toAbsoluteDesign(node, paths)
			break
		case "Group":
			node.children = node.children.map((child) => {
				child = toAbsoluteDesign(child, paths)
				if (child.className === "Image") {
					delete child.attrs.image
				}
				if (child.attrs.originData) {
					delete child.attrs.originData
				}

				if (child.attrs.oldZIndex) {
					delete child.attrs.oldZIndex
				}
				return child
			})
			node = toAbsoluteDesign(node, paths)
			break
	}
	delete node.attrs.originData
	if (node.attrs.oldZIndex) {
		delete node.attrs.oldZIndex
	}
	return node
}

function getLoadingData(data) {
	const imgs = []
	const fonts = []
	data.forEach((item) => {
		if (item.className === "Image") {
			imgs.push({
				id: item.attrs.id,
				url: item.attrs.url,
			})
		}
		if (item.className === "Group") {
			const { imgs: subImg, fonts: subFont } = getLoadingData(item.children)
			imgs.push(subImg)
			fonts.push(subFont)
		}
		if (item.className === "Text") {
			if (item.attrs.fontFamily) {
				fonts.push({
					name: item.attrs.fontFamily,
					id: item.attrs.fontFamilyId,
				})
			}
		}
	})
	return { imgs, fonts }
}

export function formatLoading(layout, layer) {
	const imgData = {
		layout: layout.src, // 刀版图
		playgroundImg: layer.playgroundImg.image2DUrl, // 刀版图设计
		backgroundTexture: layer.background.texture, // 刀版材质
		background: layer.background.fillImage,
	}
	imgData.nodePreviewMap = layer.nodePreviewMap
	imgData.coverPreviewMap = layer.coverPreviewMap
	let { imgs, fonts } = getLoadingData(layer.playground.children)
	imgs = imgs.flat(Infinity)
	fonts = fonts.flat(Infinity)
	imgData.children = imgs
	return { imgData, fonts }
}

export function setCanvasData(curCanvasMap) {
	console.log("🚀 ~ file: formatLayersData.js:370 ~ curCanvasMap:", curCanvasMap)

	let svgData = []

	let { coverList, fillColor, height, width } = curCanvasMap.background

	coverList.forEach((item) => {
		svgData.push(
			Object.assign(
				{
					...item.attrs,
				},
				{
					stroke: "black",
					strokeWidth: 2,
					fill: fillColor,
				}
			)
		)
	})

	return {
		padding: 0.5,
		svgData: svgData,
		playground: [],
		height: height,
		width: width,
	}
}
