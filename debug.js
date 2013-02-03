clog = function(content) {
	console.log(content);
}

document.addEventListener('DOMContentLoaded', function() {
	var _nav = [ 'MD5' ];

	var _md5 = document.getElementById('MD5');
	console.log(_md5);
	console.log(_md5);
	_md5.addEventListener('click', function() {
		console.log('yes');
		$("body").empty();
	})
});
