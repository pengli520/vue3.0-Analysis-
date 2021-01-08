/*
 * @Author: your name
 * @Date: 2021-01-07 11:55:58
 * @LastEditTime: 2021-01-08 13:53:09
 * @LastEditors: Please set LastEditors
 * @Description: 与浏览器相关
 * @FilePath: \vue-next-pl\src\runtime\createRendererDome.js
 */
import { createRenderer } from "./createRenderer.js";
// dom相关的api操作
export const renderer = createRenderer({
  createElement(tag) {
    return tag
      ? document.createElement(tag)
      : document.createTextNode(tag || '')
  },
  createText(text) {
    return document.createTextNode(text)
  },
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  patchProp(el, key, prevValue, nextValue) {
    el[key] = nextValue
  },
  querySelector(sel) {
    return document.querySelector(sel)
  }
})
