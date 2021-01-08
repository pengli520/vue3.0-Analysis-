/*
 * @Author: your name
 * @Date: 2021-01-08 13:54:37
 * @LastEditTime: 2021-01-08 15:33:00
 * @LastEditors: Please set LastEditors
 * @Description: 导出ast，和code字符串。接收组件上下文绑定关系
 * @FilePath: \vue-next-pl\src\compiler\index.js
 */

import { AST } from '../compiler/ast-dome.js';
import { createCode } from '../compiler/generate.js';
import { setContext, codeToFn } from './globalVar.js';

/**
 * 返回ast，code字符串
 * @param {*,*} template context
 */
function backAstAndCode(context) {
    const { template } = context
    if (typeof template !== 'string') {
        throw 'no string backAstAndCode'
    }
    setContext(context)
    
    const ast = AST.domToVnode(AST.stringToDom(template))

    return {
        ast,
        code: createCode(ast)
    }
}

export {
    backAstAndCode,
    codeToFn
}