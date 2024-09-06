/*
 * @Author: Cube
 * @Last Modified time: 2021-04-06 00:57:48
 */
import style from './style.scss'
import div from './zhidao.template.html'
import $ from '$jquery'
import _ from "lodash"
const langs = {
  as3: "ActionScript 3",
  bash: "Bash/Shell",
  cpp: "C/C++",
  css: "CSS",
  cf: "ColdFusion",
  "c#": "C#",
  delphi: "Delphi",
  diff: "Diff",
  erlang: "Erlang",
  groovy: "Groovy",
  html: "HTML",
  java: "Java",
  jfx: "JavaFX",
  js: "JavaScript",
  pl: "Perl",
  php: "PHP",
  plain: "Plain Text",
  ps: "PowerShell",
  python: "Python",
  ruby: "Ruby",
  scala: "Scala",
  sql: "SQL",
  vb: "Visual Basic",
  xml: "XML"
}

function createNode() {
  let newNode = $(div)
  _.each(langs, (v, k) => {
    let newli = $('<li>').text(v).prop('__zhidao__data', k)
    newNode.find('ul').append(newli)
  })
  return newNode
}

function handle(num, win) {
  let answer = undefined
  let answerbtn = undefined

  let timeid = setInterval(() => {
    if (answer == undefined) {
      if (('UE' in win.parent) && ('instants' in win.parent.UE))
        answer = win.parent.UE.instants[num];
    } else {
      if (answerbtn == undefined && ('container' in answer) && ('commands' in answer)) {
        let newNode = createNode()

        newNode.find(".warp li").click(function(e) {
          newNode.removeClass('show');
          let lang = $(this).prop('__zhidao__data')
          // let lang = $(this).text()
          answer.commands.insertcode.execCommand.call(answer, win, lang);
          e.stopPropagation()
        })

        if ('blockquote' in answer.commands) {
          answer.commands.blockquote.execCommand = (t, e) => {
            newNode.toggleClass('show')
          }
        }
        answerbtn = $(answer.container).find('div.edui-box.edui-button.edui-for-blockquote.edui-iknow')
        answerbtn.append(newNode)
        if (timeid) {
          clearInterval(timeid)
          timeid = 0
        }
      }
    }
  }, 500)
  setTimeout(function(timeid) {
    if (timeid) {
      clearInterval(timeid)
      timeid = 0
    }
  }, 1000 * 10, timeid)
}

export default win => {
  $('head').append($('<style>').html(style.toString()))
  handle('ueditorInstant0', win)
  handle('ueditorInstant1', win)
}