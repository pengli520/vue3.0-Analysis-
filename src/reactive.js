/*
 * @Author: your name
 * @Date: 2020-12-30 09:21:47
 * @LastEditTime: 2020-12-30 15:21:04
 * @LastEditors: Please set LastEditors
 * @Description: 响应式系统
 * @FilePath: \vue-next\reactive.js
 */
// 保存fn数组
const effectStack = []

// fn对应映射关系
const targetMap = new WeakMap()

const utils = {
  isObject(obj) {
    return typeof obj === 'object' && obj !== null ? true : false
  }
}

// 响应式数据处理
function reactive(target) {
  if (!utils.isObject(target)) {
    return target
  }

  return new Proxy(target, {
    get(target, key) {
      const res = Reflect.get(target, key)
      log('get', target, key)
      track(target, key)
      return utils.isObject(res) ? reactive(res) : res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      log('SET', target, key, value)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      delete Reflect.deleteProperty(target, key)
    }
  })
}

// 副作用函数
function effect(fn) {
  try {
    effectStack.push(fn)
    fn()
  } finally {
    effectStack.pop()
  }
}

// 依赖收集
function track(target, key) {
  const fn = effectStack[effectStack.length - 1]
  if (fn) {
    if (!targetMap.get(target)) {
      targetMap.set(target, new Map())
    }
    if (!targetMap.get(target).has(key)) {
      targetMap.get(target).set(key, new Set())
    }
    targetMap
      .get(target)
      .get(key)
      .add(fn)
  }
}

// 触发依赖
function trigger(target, key) {
  if (targetMap.get(target) && targetMap.get(target).get(key)) {
    targetMap
      .get(target)
      .get(key)
      .forEach(dep => dep())
  }
}
