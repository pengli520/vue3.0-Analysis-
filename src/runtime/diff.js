/*
 * @Author: your name
 * @Date: 2021-01-23 16:29:00
 * @LastEditTime: 2021-02-05 17:52:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-next-pl\src\runtime\diff.js
 */
import { createElement } from './test/createElement.js'
import { render } from './test/render.js'
const vnode = createElement('p', { key: 'd', class: 'pl' }, [
  createElement('h1', null, '66'),
  '99999'
])
render(vnode, document.getElementById('app'))
console.log(vnode, 'diff')

const initDb = (s1 = 'sagggy', s2 = 'gas') => {
  let arr = []
  let len1 = s1.length
  let len2 = s2.length
  for (let i = 0; i <= len1; i++) {
    arr[i] = new Array()
    for (let j = 0; j <= len2; j++) {
      if (i === 0) {
        arr[i][j] = j
      } else if (j === 0) {
        arr[i][j] = i
      } else {
        // 是否相同
        if (s1[i - 1] === s2[j - 1]) {
          arr[i][j] = arr[i - 1][j - 1]
        } else {
          let type = Math.min(arr[i - 1][j - 1], arr[i][j - 1], arr[i - 1][j])
          arr[i][j] = type + 1
        }
      }
    }
  }
  return {
    arr,
    s1,
    s2
  }
}

// 最小值
const minNum = (...arg) => {
  return Math.min(...arg)
}

// 回溯最佳路径
const backPath = (arr, s1, s2) => {
    console.log(arr)
    const path = []
    let i = arr.length - 1
    let j = arr[0].length - 1
    while (i > 0 || j > 0) {
        let del = arr[i-1][j] == undefined ? Infinity : arr[i-1][j]
        let replace = arr[i-1][j-1] == undefined ? Infinity : arr[i-1][j-1]
        let insert = arr[i][j-1] == undefined ? Infinity : arr[i][j-1]
        const min = minNum(del,replace,insert)
        const curVal = arr[i][j]
        console.log(s1[i-1],s2[j-1],[del,replace,insert], '当前值:', curVal)
        debugger
        if (curVal === replace && replace === min) {
            i--
            j--
            path.push({
                operation: '相同'
            })
        }  else {
            switch (min) {
                case replace:
                    path.push({
                        operation: '替换',
                        from: s1[i-1],
                        to: s2[j-1],
                    })
                    i--
                    j--
                    break;
                case insert:
                    path.push({
                        operation: '插入',
                        insert: s2[j-1],
                    })
                    j--
                    break;             
                case del:
                    path.push({
                        operation: '删除',
                        del: s1[i-1],
                    })
                    i--
                    break;
            }
        }

    }

    return path.reverse();
}
export {
    initDb,
    backPath,
}