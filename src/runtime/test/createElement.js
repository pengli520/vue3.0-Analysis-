/*
 * @Author: your name
 * @Date: 2021-01-25 13:41:44
 * @LastEditTime: 2021-01-27 10:33:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-next-pl\src\runtime\test\createElement.js
 */

const VNodeType = {
  // 组件待扩展
  HTML: 'HTML',
  TEXT: 'TEXT'
}

const ChildTyps = {
  EMPTY: 'EMPTY',
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE'
}

const createElement = (tag, data = null, children = null) => {
  // 确定 flags
  let flags
  if (typeof tag === 'string') {
    flags = VNodeType.HTML
  } else if (typeof tag === 'function') {
    // 组件 未完待续
    flags = VNodeType.COMPONENT
  } else {
    flags = VNodeType.TEXT
  }
  // 确定 childFlags
  let childFlags = null
  if (Array.isArray(children)) {
    const { length } = children
    if (length === 0) {
      // 没有 children
      childFlags = ChildTyps.EMPTY
    } else {
      // 多个子节点，且子节点使用key
      childFlags = ChildTyps.MULTIPLE
    }
  } else if (children == null) {
    // 没有子节点
    childFlags = ChildTyps.EMPTY
  } else {
    // 其他情况都作为文本节点处理，即单个子节点，会调用 createTextVNode 创建纯文本类型的 VNode
    childFlags = ChildTyps.SINGLE
    children = createTextVNode(children + '')
  }

  // 返回 VNode 对象
  return {
    flags,
    tag,
    data,
    key: data && data.key,
    children,
    childFlags,
    el: null
  }
}

const createTextVNode = text => {
  return {
    // flags 是 VNodeType.TEXT
    flags: VNodeType.TEXT,
    tag: null,
    data: null,
    // 纯文本类型的 VNode，其 children 属性存储的是与之相符的文本内容
    children: text,
    // 文本节点没有子节点
    childFlags: ChildTyps.EMPTY
  }
}

export { createElement, VNodeType, ChildTyps}
