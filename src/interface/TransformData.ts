export interface TransformData {
	models: object
	layouts: Array<any>
	boxs: Array<any>
	canvasMap: object
}

export interface Attrs$1Type {
	id: string
	x: number
	y: number
	surfaceName: string
	type: string
	data: string
}

export interface CoverList$2Type {
	className: string
	left: number
	top: number
	width: number
	height: number
	attrs: Attrs$1Type
}

export interface OriginData$3Type {
	fillColor: string
	fillImage: null
}

export interface Background$4Type {
	name: string
	width: number
	height: number
	texture: string
	coverList: Array<CoverList$2Type>
	holeList: Array<unknown>
	fillColor: string
	fillImage: null
	originData: OriginData$3Type
}

export interface OriginData$5Type {
	x: number
	y: number
	id: string
	top: number
	url: string
	left: number
	name: string
	skewX: number
	skewY: number
	width: number
	height: number
	scaleX: number
	scaleY: number
	zIndex: number
	offsetX: number
	offsetY: number
	rotation: number
	surfaceX: number
	surfaceY: number
	draggable: boolean
	surfaceId: string
	materialId: string
	isAutoColor: string
	dragDistance: number
	materialDesc: string
	parentPlayId: string
	elementPosition: string
}

export interface Attrs$6Type {
	x: number
	y: number
	id: string
	top: number
	url: string
	left: number
	name: string
	skewX: number
	skewY: number
	width: number
	height: number
	scaleX: number
	scaleY: number
	offsetX: number
	offsetY: number
	rotation: number
	draggable: boolean
	materialId: string
	isAutoColor: string
	dragDistance: number
	materialDesc: string
	parentPlayId: string
	elementPosition: string
	originData: OriginData$5Type
}

export interface Children$7Type {
	attrs: Attrs$6Type
	className: string
}

export interface Playground$8Type {
	children: Array<Children$7Type>
}

export interface PlaygroundImg$9Type {
	image2DUrl: string
	image2DId: string
}

export interface CoverPreviewMap$10Type {
	coverId: string
	imageUrl: string
	coverName: string
}

export interface NodePreviewMap$11Type {
	craftId: string
	imageUrl: string
	craftName: string
}

export interface CoverType {
	id: string
	parentId: string
	face: string
	background: Background$4Type
	playground: Playground$8Type
	playgroundId: string
	name: string
	desc: string
	playgroundImg: PlaygroundImg$9Type
	coverPreviewMap: Array<CoverPreviewMap$10Type>
	nodePreviewMap: Array<NodePreviewMap$11Type>
}

export interface ResultType {
	[key: string]: CoverType
}
