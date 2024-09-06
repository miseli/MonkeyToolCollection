/*
 * @Author: Cube
 * @Last Modified time: 2020-05-16 13:42:53
 * copyToClipboard
 */

export default str => {
  if (str == undefined) {
    console.log(`
  // 用法:
  // copyToClipboard('Lorem ipsum');
  // 'Lorem ipsum' copied to clipboard
    `)
  }
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};