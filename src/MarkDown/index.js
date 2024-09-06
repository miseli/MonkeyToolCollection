/*
 * @Author: Cube
 * @Last Modified time: 2021-04-06 00:52:41
 */

// import Highlight from '@/common/js/highlight.min.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import marked from '$common/js/marked.min.js'

hljs.initHighlightingOnLoad();

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    if (language != "flow") {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
      return hljs.highlight(validLanguage, code).value
    } else {
      return code;
    }
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

// // Override function
// const renderer = {
//   code(code, lang, n) {
//     var r = (lang || "").match(/\S*/)[0];
//     if (this.options.highlight) {
//       var i = this.options.highlight(code, r);
//       null != i && i !== code && (n = !0,
//         code = i)
//     }
//     if (/flow/.test(lang)) {
//       // try{
//       // if(mermaid.parse(code))
//       // code = mermaid.mermaidAPI.render('mermaid', code,function( code, bindfun){
//       //这里是为了绑定事件用的
//       // });
//       // }catch(e){}

//       setTimeout(function(m) {
//         try {
//           code = mermaid.init({ noteMargin: 10 }, "#graph");
//         } catch (e) {}
//       }, 50, mermaid)
//       return `<div id="graph" class="mermaid">${code}</div>`
//     }
//     return r ? `<pre><code class="${this.options.langPrefix}${lang} hljs">` + code + "</code></pre>\n" : "<pre><code>" + code + "</code></pre>"
//   },
//   table(header, body) {
//     return `
//     <table class="table table-striped table-bordered table-condensed">
//       <thread>
//         ${header}
//       </thread>
//       <tbody>
//         ${body}
//       </tbody>
//     </table>
//     `
//   },
// };
// marked.use({ renderer })

export default marked