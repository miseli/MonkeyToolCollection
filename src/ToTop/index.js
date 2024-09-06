/*
 * @Author: Cube
 * @Last Modified time: 2021-05-09 23:24:01
 */
// import sss from './style.scss'
import icon from './icon.html'
import $ from '$jquery'

let WrapStyle = {
  "position": "fixed",
  "justify-content": "space-between",
  "display": "flex",
  "align-items": "center",
  "flex-flow": "column",
  "bottom": "50px",
  "right": "10px",
  // "color": "#ffffff",
  // "font-size": "20px",
  // "text-align": "center",
  // "font-weight": "bold",
  "border-radius": "10%",
  "background": "rgba(63, 63, 63, 0.23)",
  "height": "110px",
  // "width": "50px",
  "overflow": "hidden",
  "z-index": "99999",
  // "transform": "rotate(180deg)",
  "cursor": "pointer"
}

function ToTop() {
  let divWrap = $("<div>").css(WrapStyle)
  divWrap.data('speed', 400)

  divWrap.click(function(event) {
    event.stopPropagation() //阻止事件冒泡
    event.preventDefault() //阻止默认事件,但没阻止冒泡
  })

  let bottom = $(icon).css({ "transform": "rotate(180deg)" }).click(function(event) {
    $("html,body").animate({
      scrollTop: document.body.scrollHeight + "px"
    }, divWrap.data('speed'))
  })

  let top = $(icon).click(function(event) {
    $("html,body").animate({
      scrollTop: "0px"
    }, divWrap.data('speed'))
  })

  bottom.attr('onselectstart', "return false")
  top.attr('onselectstart', "return false")

  divWrap.append(top, bottom)

  return divWrap
}

export default ToTop



// //取窗口可视范围的高度
// function getClientHeight() {
//   var clientHeight = 0;
//   if (document.body.clientHeight && document.documentElement.clientHeight) {
//     var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
//   } else {
//     var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
//   }
//   return clientHeight;
// }
// //取窗口滚动条高度 $(document).scrollTop()
// function getScrollTop() {
//   var scrollTop = 0;
//   if (document.documentElement && document.documentElement.scrollTop) {
//     scrollTop = document.documentElement.scrollTop;
//   } else if (document.body) {
//     scrollTop = document.body.scrollTop;
//   }
//   return scrollTop;
// }
// //取文档内容实际高度 $(document).height()
// function getScrollHeight() {
//   return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
// }

// function onscroll() {
//   var height = getClientHeight();
//   var theight = getScrollTop();
//   var rheight = getScrollHeight();
//   var bheight = rheight - theight - height;
//   console.log(`
// 浏览器可见区域高度为：${height}
// 文档内容实际高度为：${rheight}
// 滚动条距离顶部的高度为：${theight}
// 滚动条距离底部的高度为：${bheight}
// 浏览器的高度： ${$$(window).height()}`)
// }
