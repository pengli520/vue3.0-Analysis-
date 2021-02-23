/*
 * @Author: your name
 * @Date: 2021-02-23 13:23:43
 * @LastEditTime: 2021-02-23 13:24:22
 * @LastEditors: Please set LastEditors
 * @Description: 虚拟dom抽离出来 数字字母有唯一性，不可重复，对应着dom节点的key
 * @FilePath: \vue-next-pl\src\runtime\diff2.js
 */
function insertStr(soure, start, newStr) {
  return soure.slice(0, start) + newStr + soure.slice(start)
}
const sequence = (newStr, oldStr) => {
  let curIndex = 0
  const oldStrLen = oldStr.length
  let copyOldStr = oldStr
  for (let i = 0; i < newStr.length; i++) {
    const newS = newStr[i]
    let find = false
    for (let j = 0; j < oldStrLen; j++) {
      const oldS = copyOldStr[j]
      if (newS === oldS) {
        find = true
        if (curIndex > j) {
          // 移动操作，删除+插入
          let str = oldStr.replace(oldS, '')
          oldStr = insertStr(str, curIndex, oldS)
        } else {
          curIndex = j
        }
        break
      }
    }

    // 插曲新元素
    if (!find) {
      oldStr = insertStr(oldStr, i, newS)
      console.log(newS, '插入', i)
    }
  }
  copyOldStr = oldStr
  // 删除多余元素
  for (let d = 0; d < oldStr.length; d++) {
    const str = oldStr[d]
    if (newStr.indexOf(str) === -1) {
      copyOldStr = copyOldStr.replace(str, '')
    }
  }
  console.log(copyOldStr)
}
sequence('123456789', '369852147')
