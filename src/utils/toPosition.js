/*
    根据相对面坐标计算相对刀版的坐标
    surface：面的信息表
    designElementDTO: 素材列表
    compositeElementDTOList: 复合素材列表
*/

function getSurfase(surfaceId, surface) {
	return surface.find((item) => item.surfaceId === surfaceId)
}

/*
    根据相对刀版坐标计算相对于面的坐标,以及归属面
*/

// 获取元素相对面及相对面坐标
function getSurface(surface, eleLeft, eleTop) {
	for (let i = 1; i < surface.length; i++) {
		if (
			eleLeft >= surface[i].left &&
			eleTop >= surface[i].top &&
			eleLeft < surface[i].left + surface[i].width &&
			eleTop < surface[i].top + surface[i].height
		) {
			return {
				surfaceId: surface[i].attrs.id,
				surfaceX: eleLeft - surface[i].left,
				surfaceY: eleTop - surface[i].top,
			}
		}
	}
	// 如顶点坐标，没有在任意一个面中，则相对面，则相对刀版
	return {
		surfaceId: "cover-0",
		surfaceX: eleLeft,
		surfaceY: eleTop,
	}
}

// 单素材相对刀版坐标转换为相对面坐标
export function toAbsoluteDesign(node, surface) {
	const newSurface = getSurface(surface, node.attrs.left || node.attrs.x, node.attrs.top || node.attrs.y)
	// console.log(node, '---单素材相对刀版坐标转换为相对面坐标------');

	return {
		...node,
		attrs: {
			...node.attrs,
			...newSurface,
		},
	}
}

// 复合元素相对相对刀版坐标转换为相对面坐标
export function toAbsoluteComposite(surface, group) {
	group.children = group.children.forEach((item) => {
		return toAbsoluteDesign(surface, item)
	})
	return toAbsoluteDesign(surface, group)
}
