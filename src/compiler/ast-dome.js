/*
 * @Author: your name
 * @Date: 2021-01-07 11:36:33
 * @LastEditTime: 2021-01-08 13:51:21
 * @LastEditors: Please set LastEditors
 * @Description: dom转换ast
 * @FilePath: \vue-next-pl\src\compiler\ast-dome.js
 */
export const AST = {
    // dom转换ast
    domToVnode(dom) {
        // console.log({...[node]}, node.attributes, node.tagName, node.textContent, node.nodeType, node.childNodes)
        return {
            type: dom.tagName.toLocaleLowerCase(),
            props: this.filterProps(dom.attributes),
            children: this.nodeList(dom),
        }
    },
    nodeList(dom) {
        let obj = []
        Array.from(dom.childNodes).forEach(item => {
            if (item.nodeType === Node.TEXT_NODE) {
                obj.push(item.textContent)
            } else {
                obj.push({
                    type: item.tagName && item.tagName.toLocaleLowerCase() || null,
                    props: this.filterProps(item.attributes),
                    children: item.childNodes.length ? this.nodeList(item) : [item.textContent],
                })
            }
        })
        return obj;
    },
    filterProps(NamedNodeMap) {
        let props = {};
        if (NamedNodeMap) {
            for (let item of NamedNodeMap) {
                props[item.name] = item.value
            }
        }
        return props;
    },

    createElement(dom) {
        // 根据type类型来创建对应的元素
        let el = document.createElement(dom.type);

        // 再去遍历props属性对象，然后给创建的元素el设置属性
        for (let key in dom.props) {
            // 设置属性的方法
            el.setAttribute(key.replace('@', ''), dom.props[key]);
        }

        // 遍历子节点
        // // 如果子节点也是虚拟DOM，递归构建DOM节点
        // 不是就代表是文本节点，直接创建
        dom.children.forEach(child => {
            child = (child instanceof Element) || child.type ? this.createElement(child) : document.createTextNode(child);
            // 添加到对应元素内
            el.appendChild(child);
        });

        return el;
    },
    // 字符串转换成dom元素， div为默认根节点
    stringToDom(template) {
        return document.createRange().createContextualFragment(template).querySelector('div')
    }
};