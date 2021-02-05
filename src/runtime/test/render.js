/*
 * @Author: your name
 * @Date: 2021-01-27 09:23:28
 * @LastEditTime: 2021-01-27 09:55:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-next-pl\src\runtime\test\render.js
 */
import { mount } from './mount.js';
const render = (vnode, container) => {
  const prevVNode = container.vnode
  if (prevVNode == null) {
    mount(vnode, container)
  } else {
    patch(prevVNode, vnode, container)
  }
  container.vnode = vnode
}


export {
    render
}