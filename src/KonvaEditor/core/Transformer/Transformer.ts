import Konva from 'konva'

class ImageTransformer extends Konva.Transformer {
  constructor(config?: Konva.TransformerConfig) {
    super(config)
  }

  _createAnchor(name: string): Konva.Circle {
    const anchor = super._createAnchor(name)

    if (name === 'rotater') {
      const imageObj = new Image()
      imageObj.src = 'your-image-url' // 你的图片URL

      imageObj.onload = () => {
        // 使用类型断言确保anchor被视为Konva.Shape
        const shapeAnchor = anchor as Konva.Shape
        shapeAnchor.fillPatternImage(imageObj)
        shapeAnchor.fillPatternOffset({ x: imageObj.width / 2, y: imageObj.height / 2 })
        shapeAnchor.fillPatternScale({ x: 0.5, y: 0.5 }) // 根据需要调整图片大小
        // 由于图片加载是异步的，需要调用draw()来更新canvas
        shapeAnchor.getLayer()?.draw()
      }
    }

    return anchor
  }
}

export default ImageTransformer
