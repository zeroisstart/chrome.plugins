/**
 * 
 */
console.log(document.readyState);
function ready(func) {
	console.log(123);
	if (document.readyState == 'loading') {
		setTimeout(function() {
			ready(func)
		}, 50);
	} else {
		func()
	}

}

ready(function() {
	var _obj = document.getElementsByName("md5String")[0];
	_obj.focus();
})
