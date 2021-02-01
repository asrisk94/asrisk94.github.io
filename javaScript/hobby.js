
$(function() {

    var inner = document.querySelector(".inner");
    var $btn = $(document.querySelectorAll(".btn"));
    
    $btn.eq(0).css("background-color", "orange");
    
    
    
    $btn.each(function(i, elem) {
    
        var $elem = $(elem);
    
        $elem.on('click', function() {
            // inner.style.transform = "translate(-1024px)";
            var number = (-1024)*i;
            inner.style.transform = "translate(" + number + "px)";
    
            $btn.each(function(i, elem) {
                elem.style.backgroundColor = "gray";
            });
            $elem.css("background-color", "orange");
        });
    });

});
