import { _c, _s } from './compiler/globalVar.js';
import { renderer } from './runtime/createRendererDome.js'
window._c = _c
window._s = _s

// 创建实列
const app = {
//   template: '<div>6666</div>',
  template: '<div>525asdef设法色粉{{p}}我是h1标签{{msg}}<p>我是p<img src="https://mrkj-kjj-test.oss-cn-hangzhou.aliyuncs.com//UploadFiles/images/1608879770966151.jpg"/><div style="width:200px;height:300px;background:red"></div> </p>5555<h1>你好</h1></div>',
  data() {
    return {
      msg: '测试一波',
      p: '我是p标签'
    }
  },
//   render() {
//       return {
//           type: 'div',
//           props: {},
//           children: [
//               this.msg,
//               {
//                   type: 'p',
//                   props: {},
//                   children: [this.p]
//               },
//           ]
//       }
//   }
}
const vm = renderer.createApp(app).mount('#app')

