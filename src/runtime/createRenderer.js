/*
 * @Author: your name
 * @Date: 2021-01-07 11:53:27
 * @LastEditTime: 2021-01-11 10:59:42
 * @LastEditors: Please set LastEditors
 * @Description: 自定义渲染器
 * @FilePath: \vue-next-pl\src\runtime\createRenderer.js
 */

import { reactive, effect } from '../reactivity/reactive.js'
import { backAstAndCode, codeToFn } from '../compiler/index.js';

const  createAppAPI = render => {
  return function createApp(rootComponent, props) {
    const { template, render: curRender, data } = rootComponent
    const app = {
      // rootContainer：挂载容器
      mount(rootContainer) {
        let vnode
        app.proxy = reactive(data())

        effect(() => {
          if (curRender) {
            vnode = curRender.call(app.proxy)
          } else {
            // dom->vnode 在vue内部做了大量工作，此处简化
           const { ast, code } = backAstAndCode(rootComponent)
           vnode = ast
           console.log(code, codeToFn(code))
           
          }
          console.log(vnode, 'vnode') 
          render(vnode, rootContainer) 
        })
        return app.proxy
      }
    }
    return app
  }
}

// 自定义渲染器
export const createRenderer = options => {
  const {
    createElement,
    createText,
    setElementText,
    patchProp,
    insert,
    querySelector
  } = options
  const render = (vnode, rootContainer) => {
    // 更新节点，还是初始化
    const xxx = () => {
      if (rootContainer._vnode) {
        // update
        // patch
      } else {
        // init
        // patch()
      }
    }
    const parent = querySelector(rootContainer)
    parent.innerHTML = ''
    const recursive = vnode => {
      let el = createElement(vnode.type)
      for (let key in vnode.props) {
        // 设置属性的方法
        patchProp(el, key, null, vnode.props[key])
      }
      vnode.children.forEach(child => {
        child = child.type ? recursive(child) : createText(child)
        // 添加到对应元素内
        el.appendChild(child)
      })
      return el
    }

    insert(recursive(vnode), parent)
  }
  return {
    render,
    createApp: createAppAPI(render)
  }
}
