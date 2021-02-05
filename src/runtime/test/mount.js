/*
 * @Author: your name
 * @Date: 2021-01-27 09:55:11
 * @LastEditTime: 2021-01-27 10:33:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-next-pl\src\runtime\test\mount.js
 */
import { VNodeType, ChildTyps } from './createElement.js';
const mount = (vnode, container) => {
  const { flags } = vnode
  if (flags == VNodeType.HTML) {
    // 挂载普通标签
    mountElement(vnode, container)
  } else if (flags == VNodeType.TEXT) {
    // 挂载纯文本
    mountText(vnode, container)
  }
}

const mountText = (vnode, container) => {
  const el = document.createTextNode(vnode.children)
  vnode.el = el
  container.appendChild(el)
}

const mountElement = (vnode, container) => {
  const el = document.createElement(vnode.tag)
  vnode.el = el

  const childFlags = vnode.childFlags
  const children = vnode.children
  if (childFlags !== ChildTyps.EMPTY) {
    if (childFlags == ChildTyps.SINGLE) {
      mount(children, el)
    } else if (childFlags == ChildTyps.MULTIPLE) {
      for (let i = 0; i < children.length; i++) {
        mount(children[i], el)
      }
    }
  }
  container.appendChild(el)
}

export { mount }
