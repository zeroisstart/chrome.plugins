clog = function(content){
    console.log(content);
}

var tool = {};

tool.frames = {
    'MD5': function(){
        console.log('test');
    },
    'LENGTH': function(){
    
    },
    'FOREACH': function(){
    
    },
    'COOKIE': function(){
    
    },
    'Piaohua': function(){
    
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var _home = document.getElementById('home');
    
    _home.addEventListener('click', function(){
        $("#main-content").show();
        $(".tool-frame").hide();
    });
    
    var _nav = ['MD5', 'LENGTH', 'FOREACH', 'COOKIE'];
    
    _nav.map(function(txt){
        var _dom = document.getElementById(txt);
		console.log(_dom);
        if (_dom) {
            _dom.addEventListener('click', function(){
                $("#main-content").hide();
				var _funcName = 'tool.frames.' + txt;
				var _func = eval(_funcName);
                $('.' + txt).show(100, _func);
            })
        }
    })
    
    var _md5 = document.getElementById('MD5');
    _md5.addEventListener('click', function(){
        $("#main-content").hide();
        $('.MD5').show();
    })
    
});
