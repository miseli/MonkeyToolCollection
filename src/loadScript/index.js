/*
* @Author: Cube
* @Date:   2024-09-08 14:05:09
* @Last Modified by:   Cube
* @Last Modified time: 2024-11-04 14:05:23
*/

/* 加载script脚本 */
function asyncLoadScript(url){
  return new Promise((resolve, reject)=>{
    let script = document.createElement('script')
    script.type = 'text/javascript'
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          resolve(script)
        }
      }
    }
    else {
      script.onload = () => resolve(script)
      script.onerror = () => reject(new Error(`Script load error for ${url}`));
    }

    script.src = url
    document.head.appendChild(script)
  })
}

let cdnlist = [
  'https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.14.4/sweetalert2.all.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.3.2/jsencrypt.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/14.1.3/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/11.1.0/jsrsasign-all-min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pinyin-pro/3.26.0/index.min.js',
]

asyncLoadScript.help = `
Promise.all([
  asyncloadScript('https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.3.2/jsencrypt.js'),
  asyncloadScript('https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.11.0/sweetalert2.all.js')
]).then(res=>{
 console.log('脚本加载完成', res)
})
`
asyncLoadScript.scriptlist = cdnlist

export default asyncLoadScript