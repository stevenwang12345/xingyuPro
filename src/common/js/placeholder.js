export let isPlaceholer = function isPlaceholer() {
	var input = document.createElement("input");
	return "placeholder" in input;
};

export let placeholder = function placeholder(input) {
	var text = input.attr('placeholder'),
	defaultValue = input.defaultValue;
	if(!defaultValue){
		alert(text)
		input.val('11111')
	}
	input.focus(function(){
		if(input.val() == text){
			$(this).val("");
		}
	});
	input.blur(function(){
		if(input.val() == ""){
			$(this).val(text).addClass("phcolor");
		}
	});

	//输入的字符不为灰色
	input.keydown(function(){
		$(this).removeClass("phcolor");
	});
}
export let test = function test() {
	alert(1123)
}






