/*
 * @Author: zzx 452436275@qq.com
 * @Date: 2023-12-22 17:22:41
 * @LastEditors: zzx 452436275@qq.com
 * @LastEditTime: 2023-12-22 17:23:05
 * @FilePath: /editor-main-zzx/src/KonvaEditor/utils/createImg.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function createImg(url: string) {
  return new Promise((resolve, reject) => {
    let imageObj = new Image()
    imageObj.src = url
    imageObj.crossOrigin = 'anonymous'
    imageObj.onload = () => {
      resolve(imageObj)
    }
    imageObj.onerror = (err) => {
      reject(err)
    }
  })
}
