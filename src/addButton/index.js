/*
 * @Author: Cube
 * @Last Modified time: 2021-04-06 00:57:37
 */

import $ from '$jquery'
import util from '@/util'

let DefaultStyle = {
  // "position": "fixed",
  "padding": "8px 24px",
  "box-sizing": "border-box",
  "font-weight": 700,
  "font-size": "20px",
  "color": "#fff",
  "border-radius": "4px",
  "background-color": "#4898d5",
  // "bottom": "50%",
  // "right": "10%",
  "z-index": 9999,
  "cursor": "pointer",
}

function CreateButton(/*opt*/ /*obj*/ ) {
  // let style = opt && (opt.style ? { ...DefaultStyle, opt.style } : DefaultStyle)
  let style = DefaultStyle
  let btn = $('<span>')
  btn.css(style)
  btn.text('按钮')
  return btn[0]
}

export default CreateButton