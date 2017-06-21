$(document).ready(function(){
    $('.tabs a').each(function(index) {
        if(this.href.trim() == window.location)
            $(this).addClass("selected");
    });
});