clog = function(content) {
	console.log(content);
}

jQuery.fn.initToolFrame = function(_class) {

}

var _nav = [ 'MD5' ];

$.each(_nav, function(_k, _v) {
	var _id = '#' + _v;
	$(_id).click(function() {
		alert('test');
	});
	clog(_v);
})

_nav.map(function(_class) {
	console.log(_class);
	var _id = '#' + _class;
	// console.log(_id);
	jQuery(_id).initToolFrame(_class);
	// console.log(_class);
})