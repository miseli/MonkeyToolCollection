
jQuery  ���̲���triggerģ���¼�����	
$(document).keydown(function(e){
	console.log(e.key,e.keyCode,'alt:' + e.altKey,'shift' + e.shiftKey,'ctrl' + e.ctrlKey);
});
$(document).unbind("keydown");

$("input").trigger("focus");

        //�����ᴥ��inputԪ�ذ󶨵�focus�¼������ᴥ��Ĭ�ϲ��������õ����㡣

$("input").triggerHandler("focus");

        //ֻ�������¼�����ִ�������Ĭ�ϲ���


����¼������ռ�

$("div").bind("click.plugin",function(){......});

�����󶨵��¼����ͺ�����������ռ䣬������ɾ���¼�ʱֻ��Ҫָ�������ռ伴�ɡ�

	$("div").unbind(".plugin");   //ɾ���ռ��ڵ��¼�

$("div").trigger("click!"); //�������Բ������������ռ��е�click����

��������������ռ��ҲҪ������

	$("div").trigger("click");