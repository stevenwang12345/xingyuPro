var doAjax = function(url, params, obj) {
	var getAjaxObj = function() {  
	    var wa;  
	    window.status = '';  
	    if (window.ActiveXObject) {  
	        wa = new ActiveXObject("Microsoft.XMLHTTP");  
	    } else if (window.XMLHttpRequest) {  
	        wa = new XMLHttpRequest();  
	    }  
	    return wa;  
	};
	var wa = null; 
	 if (wa == null) {  
	    wa = getAjaxObj();  
	}  
	wa.open('POST', url, true)
	wa.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
	wa.onreadystatechange=() => {
		if(wa.readyState == 4){
			if(wa.status == 200){
				var json = JSON.parse(wa.responseText)
				obj.setState({
					result: json.body
				})
				console.log(888, obj.state.result)
			}
		}
	};
	wa.send(params);
}
export default doAjax




