/*
 * @Author: your name
 * @Date: 2021-01-07 11:39:13
 * @LastEditTime: 2021-01-08 17:39:42
 * @LastEditors: Please set LastEditors
 * @Description: 代码生成器-ast转化code
 * @FilePath: \vue-next-pl\src\compiler\generate.js
 */
export function createCode(el) {
  return `return _c("${el.type}",${filterProps(el.props)},${generate(el)})`
}

function generate(el) {
  const children = el.children
  if (children.length) {
    return `[${children.map(c => init(c))}]`
  }
}

function init(node) {
  return node.type
    ? `_c("${node.type}",${filterProps(node.props)},${generate(node)})`
    : genNode(node)
}

// 解析文本中的变量
function genNode(node) {
  const reg = /\{\{(\w*?)\}\}/g; 
  //a表示正则匹配到的内容  b表示双大括号里的内容  c表示匹配到的内容出现的位置

  let str = node.replace(reg, function(a, b, c) {
    console.log(a, b, c);
    return `'+_s("${b}")+'`
  });
  // let index = str.lastIndexOf("'")
  // let arr = str.split('')

  // arr.splice(index,1)
  // arr = arr.join('')
  // console.log(arr, '-----')
  if (str !== node) {
    return `'${str}'`
  } else {
    return `"${node}"`
  }
}

function filterProps(props) {
  return JSON.stringify(props)
}
