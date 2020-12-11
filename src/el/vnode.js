/*
 * @Author: your name
 * @Date: 2020-12-10 14:12:51
 * @LastEditTime: 2020-12-10 14:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0-Analysis-\src\el\vnode.js
 */
// 虚拟DOM元素类，用来描述DOM
function Element(type, props, children){
    this.type = type; //节点类型
    this.props = props; //属性
    this.children = children; //子节点
}

// 创建虚拟DOM
function createElement(type, props, children){
    return new Element(type, props, children);
}


function render(dom) {
    // 根据type类型来创建对应的元素
    let el = document.createElement(dom.type);
    
    // 再去遍历props属性对象，然后给创建的元素el设置属性
    for (let key in dom.props) {
        // 设置属性的方法
        el.setAttribute(key, dom.props[key]);
    }
    
    // 遍历子节点
    // // 如果子节点也是虚拟DOM，递归构建DOM节点
    // 不是就代表是文本节点，直接创建
    dom.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        // 添加到对应元素内
        el.appendChild(child);
    });
  
    return el;
  }


let V_DOM = createElement('ul',{class:'list'},[
    createElement('li', {class:'item'},['item1']),
    createElement('li', {class:'item'},['item2']),
    createElement('li', {class:'item'},['item3'])
  ])
let dom = render(V_DOM)
console.log(V_DOM, dom)
