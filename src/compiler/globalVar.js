/*
 * @Author: your name
 * @Date: 2021-01-07 11:51:18
 * @LastEditTime: 2021-01-08 15:28:03
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue-next-pl\src\compiler\globalVar.js
 */
function setContext(context) {
  if (Object.prototype.toString.call(context) !== '[object Object]') {
    throw 'context must'
  }
  window.context = context
}
// 组件上下文
// const context = {
//   data() {
//     return {
//       msg: 'context msg '
//     }
//   }
// }

// 生成dom
const _c = (type, props, children) => {
  let el = document.createElement(type)
  for (let key in props) {
    // 设置属性的方法
    el.setAttribute(key.replace('@', ''), props[key])
  }

  children.forEach(child => {
    if (child.nodeType) {
      el.appendChild(child)
    } else {
      el.appendChild(document.createTextNode(child))
    }
  })

  return el
}

// 变量替换
const _s = variable => {
  return window.context.data()[variable]
}

// 字符串tofunction
function codeToFn(code) {
  return new Function(code)()
}


export {
  setContext,
  codeToFn,
  _c,
  _s
}