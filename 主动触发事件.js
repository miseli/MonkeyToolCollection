
jQuery  键盘操作trigger模拟事件操作	
$(document).keydown(function(e){
	console.log(e.key,e.keyCode,'alt:' + e.altKey,'shift' + e.shiftKey,'ctrl' + e.ctrlKey);
});
$(document).unbind("keydown");

$("input").trigger("focus");

        //不仅会触发input元素绑定的focus事件，还会触发默认操作——得到焦点。

$("input").triggerHandler("focus");

        //只触发绑定事件，不执行浏览器默认操作


添加事件命名空间

$("div").bind("click.plugin",function(){......});

在所绑定的事件类型后面添加命名空间，这样在删除事件时只需要指定命名空间即可。

	$("div").unbind(".plugin");   //删除空间内的事件

$("div").trigger("click!"); //触发所以不包含在命名空间中的click方法

如果包含在命名空间的也要触发：

	$("div").trigger("click");