// 计算居中的位置
export function getCenterPosition(
  objectWidth: number,
  objectHeight: number,
  containerWidth: number,
  containerHeight: number,
): { x: number; y: number } {
  const x = (containerWidth - objectWidth) / 2
  const y = (containerHeight - objectHeight) / 2

  return { x, y }
}

// 计算object-fit: contain的大小和位置
export function getContainSizeAndPosition(
  objWidth: number,
  objHeight: number,
  containerWidth: number,
  containerHeight: number,
): { width: number; height: number } {
  const ratio = objWidth / objHeight
  const containerRatio = containerWidth / containerHeight

  if (ratio > containerRatio) {
    // 图片的宽度大于容器的宽度，按照宽度进行缩放
    const scale = containerWidth / objWidth
    const scaledHeight = objHeight * scale

    return {
      width: containerWidth,
      height: scaledHeight,
    }
  } else {
    // 图片的高度大于容器的高度，按照高度进行缩放
    const scale = containerHeight / objHeight
    const scaledWidth = objWidth * scale

    return {
      width: scaledWidth,
      height: containerHeight,
    }
  }
}
