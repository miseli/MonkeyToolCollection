/*
 * @Author: Cube
 * @Date:   2021-04-05 14:34:29
 * @Last Modified by:   Cube
 * @Last Modified time: 2021-04-05 14:36:46
 */

export default {
  uuid() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
  }
	
	getUuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
}