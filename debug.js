clog = function(content){
    console.log(content);
}

document.addEventListener('DOMContentLoaded', function(){


    var _home = document.getElementById('home');
    
    _home.addEventListener('click', function(){
        $("#main-content").show();
        $(".tool-frame").hide();
    });
    
    var _nav = ['MD5', 'LENGTH', 'FOREACH','COOKIE'];
    _nav.map(function(txt){
        var _dom = document.getElementById(txt);
        _dom.addEventListener('click', function(){
            $("#main-content").hide();
            $('.' + txt).show();
        })
    })
    
    
    var _md5 = document.getElementById('MD5');
    _md5.addEventListener('click', function(){
        $("#main-content").hide();
        $('.MD5').show();
    })
});
