/*
* @Author: Cube
* @Date:   2021-05-09 23:17:18
* @Last Modified by:   Cube
* @Last Modified time: 2024-10-17 13:55:28
*/


function download_blob(blob, fileName) {
  // const blob = new Blob([content]);
  // Current blob size limit is around 500MB for browsers

  const URL = URL || webkitURL
  const aElement = document.createElement("a")
  const downloadUrl = URL.createObjectURL(blob)

  aElement.href = downloadUrl
  aElement.download = fileName
  aElement.target = '_blank'
  aElement.click()
  URL.revokeObjectURL(downloadUrl)
  aElement.remove()
}

function forceDownload(blob, filename) {
  let a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  a.click();
}

// Current blob size limit is around 500MB for browsers
function downloadResource(url, filename, opt = {}) {
  if (!filename)
    filename = url.split('\\').pop().split('/').pop();
  let default_opt = {
    // headers: new Headers({
      // 'Origin': location.origin
      // 'Content-Security-Policy': 'upgrade-insecure-requests'
    // }),
    // mode: 'no-cors',
    // redirect: 'follow'
  },
  newopt = Object.assign(default_opt, opt)
  fetch(url, newopt).then(response => response.blob()).then(blob => {
    if (typeof callback == 'function')
    {
      callback(blob);
    }else{
      let blobUrl = URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    }
  }).catch(e => console.error(e));
}

downloadResource.help = `
forceDownload(blob, filename)
download_blob(blob, fileName)
function downloadResource(url, filename, opt)
opt参考https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
`

module.exports = {downloadResource,forceDownload,download_blob}