$(document).ready(function(){
    current_screen  = 1280;
    change_screen   = false;
    motion          = $(".txt_area");
    resize_arr      = {
        1280        : {max_width : 0, min_width: 1280},
        960         : {max_width : 1280, min_width: 960},
        767         : {max_width : 960, min_width: 0},
    };
    setTextData();
    sortTextData();
    textLineChange();
    textAnimation();

    $(window).resize(function(){
        sortTextData();
        if( change_screen ){
            textLineChange();
            textAnimation();
        }
    });
});

function setTextData(){
    motion.each(function(){
        $(this).attr("data-text", $.trim($(this).html()));
    });
}

function sortTextData(){
    var win_w       = $(window).width();
    var now_w       = "";
    $.each(resize_arr, function(k, val){
        if( val.max_width === 0 && val.min_width < win_w ){
            now_w   = k;
            return false;
        }else if( val.max_width !== 0 && val.min_width < win_w && win_w <= val.max_width ){
            now_w   = k;
            return false;
        }
    });

    if( current_screen == now_w ){
        change_screen   = false;
    }else{
        current_screen  = now_w;
        change_screen   = true;
    }
}

function textLineChange(){
    motion.each(function(){
        var org_text    = $(this).data("text");
        var target      = "w" + current_screen;
        var reg_exp     = new RegExp('<br\\s+class="[^"]*\\b' + target + '\\b[^"]*">', 'gi');
        var rep_text    = org_text.replace(reg_exp, '</p><p>');

        $(this).html(rep_text);
    });
}

function textAnimation(){
    new SplitType(motion, {types: "words, chars", tagName: "span"});
    motion.each(function(){
        for( var i = 0; i < $(this).find("p").length; i++ ){
            var time_line = gsap.timeline({paused: true});
            time_line.from($(this).find("p").eq(i).find(".char"), {
                opacity: 0.2, duration: 0.2, ease: "power1.out", delay: (0.2 * i), stagger: {amount: 0.8}, onUpdate: function() {

                }
            });
            createScrollTrigger($(this), time_line);
        }
    });
    gsap.set($(".txt_area p"), {opacity: 1});

}

function createScrollTrigger(e, time_line) {
    ScrollTrigger.create({
        trigger: e,
        start: "top bottom",
        onLeaveBack: () => {
            time_line.progress(0);
            time_line.pause();
        }
    });
    ScrollTrigger.create({
        trigger: e,
        start: "top 50%",
        onEnter: () => {
            time_line.play();
        },
    });
}