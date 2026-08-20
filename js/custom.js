$( document ).ready(function(){
    headerInit();

    // AOS.init({
	// 		once: false,
	// 	});
	// 	$(window).on('load', function () {
    //         AOS.refresh();
    //     });

    $(".menu_box,.close_btn").click(function(){
        header_Open();
    });
    $(".menu_list > li > a").click(function(){
        $('html, body').animate({scrollTop: $(this.hash).offset.top}, 400);
    });
    /*$(".btn_ticket,.pop_close").click(function(){
        pop_Open();
    });*/
    $(".pop .pop_close .btn").click(function(){
        $('body').removeClass('overflow_h');
        $(this).parents('.pop').fadeOut(1000,function(){
            // alert(PopName);
            $('.'+PopName).scrollTop(0);
            $('.pop .pop_inner').scrollTop(0);
            $('.pop .p_motion').attr("data-animated", false);
           // $('.'+PopName +'.p_motion').attr("data-animated", false);
        });
    });

    //pop scroll
    $('.pop').scroll(function(){
        PopScrollMotion();
    });

    $(".header .btn_ticket").click(function(){
        var posY = $(".footer .ticket").offset().top - 50;

        $(".wrapper").animate({"opacity":0}, 800, function(){
            $("html, body").scrollTop(posY);
            $(".wrapper").animate({"opacity":1}, 800);
        });

        return false;
    });

    $(".header .btn_info_exhibition").click(function(){
        var posY = $(".footer .exhibition").offset().top - 50;

        $(".wrapper").animate({"opacity":0}, 800, function(){
            header_Open();
            $("html, body").scrollTop(posY);
            $(".wrapper").animate({"opacity":1}, 800);
        });

        return false;
    });

    $(".header .btn_info_ticket").click(function(){
        var posY = $(".footer .ticket").offset().top - 50;

        $(".wrapper").animate({"opacity":0}, 800, function(){
            header_Open();
            $("html, body").scrollTop(posY);
            $(".wrapper").animate({"opacity":1}, 800);
        });

        return false;
    });

    setTimeout(function(){
        bg_Topsec();
        headerInit();
        scrollMotion();
        txtMotion();
    },200);

    /*$('.cont_list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        arrows: false,
        dots: false,
        infinite: true,
        //variableWidth: true,
        responsive: [
            {
                breakpoint: 767,
                settings: 'unslick'
            }
        ]
    });*/
});

$(window).resize(function() {
    bg_Topsec();
    headerInit();
    scrollMotion();
    //PopScrollMotion()
    var width = $(document).width();
    if (width < 767) {
        // slick_Resize();
    }
});
$(window).scroll(function(){
    bg_Topsec();
    headerInit();
    scrollMotion();
    
});
function txtMotion(){
    if( $(".txt_motion .txt_area").length > 0 ){
        $(".txt_motion .txt_area").each(function(){
            $(this).after('<div class="txt_area act_txt s_motion">' + $(this).html() + '</div>');
            $(this).parent().find(".act_txt p").each(function(){
                var txt_br      = $(this).html().split('<br>');
                var txt_span    = "";
                for( var i = 0; i < txt_br.length; i++ ){
                    txt_span += "<span>" + $.trim(txt_br[i]) + "</span>";
                }
                $(this).html(txt_span);
            });
        });
    }
}


function header_Open() {
    if($("#header").hasClass("open") === true) {
        $("#header").removeClass('open');
        $('body').removeClass('hidden');
        // $(".section").removeAttr("data-header");
        // $("#header").css("overflow", "hidden").removeAttr("data-header");
        /*$("#header .menu_wrap").css("transform", "scale(1)");*/
        setTimeout(function(){
            $("#header .menu_wrap .close_btn").removeAttr("data-animated");
            // $("#header .menu_wrap .menu_inner").removeAttr("data-animated");
            // $("#header").attr("data-header", false);
            // $("#header .menu_wrap").hide(1000);
            gsap.fromTo('#header .menu_wrap',{opacity:1,display:'block'},{opacity:0,duration:0.8,onComplete: function () {
                    $("#header").css("overflow", "hidden").removeAttr("data-header");
                    $("#header .menu_wrap").css('display','none');
            }})

        }, 10);

    } else {
        $("#header").addClass('open');
        $('body').addClass('hidden');
        //  $("#header .menu_wrap").show();
        $("#header .menu_wrap .close_btn").attr("data-animated", true);
        gsap.fromTo('#header .menu_wrap',{opacity:0,display:'block'},{opacity:1,duration:0.8})
        setTimeout(function(){
            $("#header").css("overflow", "").attr("data-header", true);
            // $(".section").attr("data-header", true);
            // setTimeout(function(){
            //     $("#header .menu_wrap .menu_inner").attr("data-animated", true);
            // }, 1200);
        },10);
    }
};

/*function pop_Open() {
    if($(".pop").hasClass("open") === true) {
        $(".pop").removeClass('open');
        $('body').removeClass('hidden');
    } else {
        $(".pop").addClass('open');
        $('body').addClass('hidden');
    }
};*/

function bg_Topsec(){
    var screenHeight = window.innerHeight;
    var scrollTop =  $(window).scrollTop();
    var scrollBtm = scrollTop + screenHeight;
    var scrollLimit = screenHeight * 2;
    var opacity = (1 - (scrollTop / screenHeight)) >= 0 ? (1 - (scrollTop / screenHeight)) : 0;

    $(".key_frame .bg").css({"opacity":opacity});

    if(scrollLimit <= scrollBtm){
        $(".key_frame .fixed_dot").css({"position":"absolute","transform":"translate(0, " + screenHeight + "px)"});
    }else{
        $(".key_frame .fixed_dot").css({"position":"fixed","transform":"translate(0, 0)"});
    }
}

/*function bg_About(){
    var screenWidth = $(window).innerWidth();
    var screenHeight = window.innerHeight;
    var scrollTop =  $(window).scrollTop();
    var scrollLimit = scrollTop + screenHeight;

    var bgPos = $(".about .cont_img").offset().top;
    var bgHeight = $(".about .cont_img").height();
    var bgLimit = bgPos + (bgHeight - (bgHeight / 3));
    var bgMarginTop = $(".about .cont_img").position().top;

    var bgPosY = (scrollLimit - bgLimit) * 0.75;

    if(bgLimit <= scrollLimit){
        var bgPosY2 = $(".about").height() - 330 - bgHeight;

        if(bgPosY > bgPosY2){
            bgPosY = bgPosY2;
        }

        $(".about .cont_img").css({"transform":"translate(0, " + bgPosY + "px)"});
    }else{
        $(".about .cont_img").css({"transform":"translate(0, 0)"});
    }
}*/

var pageData = [];
function headerInit(){
    var screenHeight = window.innerHeight;
    var winWidth = $(window).width();
    var scrollTop =  $(window).scrollTop();
    var scrollBtm = scrollTop + screenHeight;
    var scrollLimit = screenHeight * 2 ;
    var posY = scrollTop + (screenHeight - (screenHeight / 2));

    var pageObj = [
        ["#top", [[".about","", "Cartier, Crystallization of Time"]]],
        ["#prologue", [[".prologue_section1","Prologue", "Cartier, Crystallization of Time"]]],
        ["#chapter1", [[".ch1_section1","Chapter 1", "Cartier, Crystallization of Time"]]],
        ["#chapter2", [[".ch2_section1","Chapter 2", "Cartier, Crystallization of Time"]]],
        ["#chapter3", [[".ch3_section1","Chapter 3", "Cartier, Crystallization of Time"]]],
        ["#symbol", [[".ch4_section1","Panthère", "Cartier, Crystallization of Time"]]],
        ["#archive", [[".ch5_section1","The Archives", "Cartier, Crystallization of Time"]]],
        // ["#news", [[".news","News", "Cartier, Crystallization of Time"]]],
        // ["#program", [[".program","Program", "Cartier, Crystallization of Time"]]],
    ];

    var sectionIdx = 0;
    var sectionIdx2 = 0;

    if($(".header .menu_txt span").length == 0){
        var lang = ($("html").attr("lang") == "ko") ? "kr" : "en";

        $.each(pageObj, function(i){
            if($(pageObj[i][0]).length == 1){
                $.each(pageObj[i][1], function(j){
                    pageData.push(pageObj[i][1][j]);
                });

                $.each(pageData, function(j){
                    $(".header .menu_txt").append('<span>' + pageData[j][1] + '</span>');
                    $(".header .menu_title").append('<a href="/'  + lang + '/">' + pageData[j][2] + '</a>');
                });
            }
        });
    }

    $.each(pageData, function(i){
        if($(pageData[i][0]).offset()){
            if($(pageData[i][0]).offset().top <= posY){
                sectionIdx = i;
            }
            if($(pageData[i][0]).offset().top <= scrollTop){
                sectionIdx2 = i;
            }
        }
    });

    $(".header .menu_txt span").removeClass("active");
    $(".header .btn_nav_lang").removeClass("active").show();

    if(scrollLimit <= scrollBtm){
        $(".header .menu_txt span").eq(sectionIdx).addClass("active");
        // $(".header .btn_nav_lang").fadeOut(400);
    }else{
        // $(".header .btn_nav_lang").fadeIn(400);
    }

    if(sectionIdx == 0 || sectionIdx == 1){
        $(".header .menu_title a").removeClass("active");
        if(scrollLimit <= scrollBtm){
            $(".header .menu_title a").eq(sectionIdx).addClass("active");
        }
    }else{
        $(".header .menu_title a").eq(1).addClass("active");
    }

        //main mobile btn_more motion
    if($('#top').length > 0){
        var btElem = [".prologue", ".chapter1", ".chapter2", ".chapter3"];
        var btPosTop =parseInt((764 * winWidth / 390).toFixed(3))
        var btPosBtm = parseInt((35 * winWidth / 390).toFixed(3));
        var btFloatBtm = parseInt((20 * winWidth / 390).toFixed(3));
        var btHeight = parseInt((48 * winWidth / 390).toFixed(3)) + 2;

        $.each(btElem, function(i){
            var btPosStart = $(btElem[i]).offset().top + btPosTop + btHeight + btFloatBtm;
            var btPosEnd = $(btElem[i]).offset().top + $(btElem[i]).height() + btFloatBtm - btPosBtm;
            var btFixedPos = $(btElem[i]).height() - btHeight - btPosBtm;

            if(scrollBtm > btPosStart){
                if(scrollBtm < btPosEnd){
                    $(btElem[i] + " .btn_more").addClass("fixed bt_motion");
                    $(btElem[i] + " .btn_more").css("top", "");
                }else{
                    $(btElem[i] + " .btn_more").removeClass("fixed");
                    $(btElem[i] + " .btn_more").css("top", btFixedPos);
                }
            }else{
                $(btElem[i] + " .btn_more").removeClass("fixed").removeClass("bt_motion");
                $(btElem[i] + " .btn_more").css("top", "");
            }
        });

    }else{
        //alert('sub');
    }
}

function scrollMotion(){
    var posY = $(window).scrollTop() + (window.innerHeight - (window.innerHeight / 4));
    var tiSub = $(".s_motion");
    var tiSub2 = $("section .txt_motion");

    $.each(tiSub, function(i){
        if(tiSub.eq(i).offset()){
            if($(window).scrollTop() == 0){
                $('.sub_top_section .s_motion').attr("data-animated", true);
            }else if(tiSub.eq(i).offset().top <= posY){

                if(tiSub.eq(i).hasClass("tx_body")){
                    if(tiSub.eq(i).attr("data-animated") != "true"){
                        tiSub.eq(i).attr("data-animated", true);
                    }
                    if(tiSub.eq(i).attr("data-animated-def") != "true"){
                        tiSub.eq(i).attr("data-animated-def", true);
                    }
                }else{
                    if(tiSub.eq(i).attr("data-animated") != "true"){
                        tiSub.eq(i).attr("data-animated", true);
                    }
                    
                }

            }else if(tiSub.eq(i).hasClass('subscribe')  && $(tiSub.eq(i)).offset().top <= $(window).scrollTop() + window.innerHeight){
                if($(tiSub.eq(i)).attr("data-animated") != "true"){
                    $(tiSub.eq(i)).attr("data-animated", true);
                }
            }else{
                if(tiSub.eq(i).attr("data-animated") == "true"){
                    tiSub.eq(i).attr("data-animated", false);
                }
                
            }
        }
    });
    $.each(tiSub2, function(i){
        if(tiSub2.eq(i).offset()){
            if($(window).scrollTop() == 0){
                setTimeout(function(){
                $('.sub_top_section .txt_motion').attr("data-animated", true);
                }, 800);

            }else if(tiSub2.eq(i).offset().top <= posY){

                if(tiSub2.eq(i).hasClass("tx_body")){
                    if(tiSub2.eq(i).attr("data-animated") != "true"){
                        tiSub2.eq(i).attr("data-animated", true);
                    }
                    if(tiSub2.eq(i).attr("data-animated-def") != "true"){
                        tiSub2.eq(i).attr("data-animated-def", true);
                    }
                }else{
                    if(tiSub2.eq(i).attr("data-animated") != "true"){
                        tiSub2.eq(i).attr("data-animated", true);
                    }
                    
                }

            }else if(tiSub2.eq(i).hasClass('subscribe')  && $(tiSub2.eq(i)).offset().top <= $(window).scrollTop() + window.innerHeight){
                if($(tiSub2.eq(i)).attr("data-animated") != "true"){
                    $(tiSub2.eq(i)).attr("data-animated", true);
                }
            }else{
                if(tiSub2.eq(i).attr("data-animated") == "true"){
                    tiSub2.eq(i).attr("data-animated", false);
                }
                
            }
        }
    });
   
}

//pop scroll
function PopScrollMotion(){
    var popHeight = $('.'+PopName + ' .pop_inner').height();
    var scrollY = $('.'+PopName).scrollTop();
    var posY = $('.'+PopName).scrollTop() + $('.'+PopName).offset().top + (window.innerHeight - (window.innerHeight / 4));
    var tiSub = $('.'+PopName + ' .p_motion');
    // console.log($('.'+PopName).scrollTop());
    /*console.log(PopName);
    console.log($('.'+PopName).offset().top);
    console.log(scrollY);
    console.log(posY);*/

    $.each(tiSub, function(i){
        /*console.log("tisub"+ i +"top:" + (tiSub.eq(i).offset().top + scrollY) );*/
        // console.log("tisub"+ i +"top:" + (tiSub.eq(i).offset().top + $('.'+PopName).scrollTop()));
        $('.'+PopName +' .pop_tit').attr("data-animated", true);
        $('.'+PopName +' .pop_img_wrap').attr("data-animated", true);
        $('.'+PopName +' .txt_wrap').attr("data-animated", true);
        /*$('.'+PopName +' .txt_motion').attr("data-animated", true);*/
        
        if ($(window).width() > 768) {
            $('.'+PopName +' .txt_motion').attr("data-animated", true);    
        }
        
        if(tiSub.eq(i).offset()){
            if($('.'+PopName).scrollTop() == 0){
                // alert();
                $('.'+PopName +' .pop_tit').attr("data-animated", true);
                $('.'+PopName +' .pop_img_wrap').attr("data-animated", true);
            }else if( (tiSub.eq(i).offset().top  + scrollY) <= posY ){

                if(tiSub.eq(i).attr("data-animated") != "true"){
                    tiSub.eq(i).attr("data-animated", true);
                }

            }else{
                // if(tiSub.eq(i).attr("data-animated") == "true"){
                //     tiSub.eq(i).attr("data-animated", false);
                // }

            }
        }
    });
}

function popOpen(pop_name) {
    $('body').addClass('overflow_h');
    $('.' + pop_name).fadeIn(1000, function(){
        $('.' + pop_name).scrollTop(0);
        PopScrollMotion();
    });
    PopName = pop_name;

}

function modalOpen(e){
    $("body").css("overflow", "hidden");
    $("#" + e + ".modal").css("overflow", "hidden").show();
    $("#" + e + ".modal .cont").css("transform", "");

    setTimeout(function(){
        $("#top").attr("data-modal", true);
        $("#" + e + ".modal").css("overflow", "").attr("data-modal", true);
        $("#" + e + ".modal .cont").scrollTop(0);
    },10);
}

function modalClose(e){
    $("body").css("overflow", "");
    $("#top").removeAttr("data-modal");
    $("#" + e + ".modal").css("overflow", "hidden").removeAttr("data-modal");
    $("#" + e + ".modal .cont").css("transform", "scale(1)");

    setTimeout(function(){
        $("#" + e + ".modal").css("overflow", "").hide();
    }, 600);
}

























