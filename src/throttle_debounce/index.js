/*
* @Author: Cube
* @Date:   2024-10-18 10:51:12
* @Last Modified by:   Cube
* @Last Modified time: 2024-10-18 11:06:19
*/
/*
 * 限流
 * 节流的基本原理是，限制事件的触发频率，在一定时间内只执行一次回调函数。如果在这个时间内再次触发了事件，将被忽略。
 */
function throttle(fn, delay) {
  // 维护上次执行的时间
  let last = 0;

  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    // 根据当前时间和上次执行时间的差值判断是否频繁
    if (now - last >= delay) {
      last = now;
      fn.apply(context, args);
    }
  };
}

throttle.help = `
  // 节流的基本原理是，限制事件的触发频率，在一定时间内只执行一次回调函数。如果在这个时间内再次触发了事件，将被忽略。
  btn.click(throttle(clickEvent, 1000))
`

/*
 * 防抖
 * 防抖的基本原理是，在事件触发后延迟一段时间再执行回调函数。如果在延迟的时间内再次触发了事件，则重新计时延迟。只有当事件停止触发一段时间后才会执行回调函数
 */
function debounce(fn, delay) {
  // 记录定时器返回的ID
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;
    // 当有事件触发时清除上一个定时任务
    if (timer) {
      clearTimeout(timer);
    }
    // 重新发起一个定时任务
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
debounce.help = `
  // 防抖的基本原理是，在事件触发后延迟一段时间再执行回调函数。如果在延迟的时间内再次触发了事件，则重新计时延迟。只有当事件停止触发一段时间后才会执行回调函数
  btn.click(throttle(clickEvent, 1000))
`
module.exports = {debounce,throttle}