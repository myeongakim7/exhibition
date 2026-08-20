$( document ).ready(function() {
    // AOS.init({
	// 		once: false,
	// 	});
	// 	$(window).on('load', function () {
    //         AOS.refresh();
    //     });
    gsap.set('#header .step_motion',{opacity:0,'x':'10%'})
    var clickAble = 'true';
    var menu_tl = gsap.timeline();
    
    $(".menu_box").click(function(){
        if(clickAble == 'true'){
            clickAble = 'false';
            $('#header').addClass('on');
            $('body').addClass('hidden');
            menu_tl.to('#header .menu_wrap',{display:'block',opacity:1, duration:0.1})
                .fromTo('#header .step_motion',{opacity:0, 'x':'10%'},{opacity:1, 'x':0, stagger:0.2, delay: '-0.6', onComplete(){
                        clickAble = 'true';
                    }});
        }
    });
    
    $(".close_btn").click(function(){
        if(clickAble == 'true'){
            clickAble = 'false';
            menu_tl.to('#header .menu_wrap',{opacity:0,duration:0.8, onComplete(){
                        $('#header .menu_wrap').css('display','none');
                        $('#header').removeClass('on');
                        $('body').removeClass('hidden');
                        clickAble = 'true';
                console.log('end');
                console.log(clickAble);
                    }})
        }
    });
    
/*    $(".menu_list > li > a").click(function(){
        header_Open();
        $('html, body').animate({scrollTop: $(this.hash).offset.top}, 400);
    });*/
    
    // menu 오픈 
/*    $('#header .menu_box').click(function(){
        if(clickAble == 'true'){
            clickAble = 'false';
            $('#header').addClass('on');
            $('body').addClass('hidden');
            menu_tl.to('#header .side_menu',{opacity:1, duration:0.1})
                .to('#header .side_menu',{height:"100%", duration:0.4})
                .fromTo('#header .step_motion',{opacity:0, 'x':'10%'},{opacity:1, 'x':0, stagger:0.2, delay: '-0.6', onComplete(){
                        clickAble = 'true';
                    }});
        }
    });

    // menu close
    $('#header .side_menu .btn_close' ).click(function(){
        if(clickAble == 'true'){
            clickAble = 'false';
            menu_tl.to('#header .side_menu',{opacity:0,duration:0.8, onComplete(){
                        clickAble = 'true';
                        $('#header').removeClass('on');
                        $('body').removeClass('hidden');
                        $('#header .side_menu').css('height','0');
                    }})
        }
    });*/
    
    
    /*$(".btn_ticket,.pop_close").click(function(){
        pop_Open();
    });*/
    $(".pop .pop_close .btn").click(function(){
        $('body').removeClass('overflow_h');
         $(this).parents('.pop').fadeOut(1000);
    });

    $(".header .btn_ticket").click(function(){
        var posY = $(".footer .ticket").offset().top - 50;
        $("html, body").animate({"scrollTop":posY}, 400);
        return false;
    });
        
    setTimeout(function(){
        bg_Topsec();
        headerInit();
        scrollMotion();
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
    

//    function header_Open() {
//        if($("#header").hasClass("open") === true) {
//            $("#header").removeClass('open'); 
//            $('body').removeClass('hidden');
//            $(".section").removeAttr("data-header");
//            $("#header").css("overflow", "hidden").removeAttr("data-header");
//            /*$("#header .menu_wrap").css("transform", "scale(1)");*/
//            setTimeout(function(){
//                $("#header .menu_wrap .close_btn").removeAttr("data-animated");
//                $("#header .menu_wrap .menu_inner").removeAttr("data-animated");
//                $("#header .menu_wrap").hide();
//
//            }, 600);
//            
//        } else {
//            $("#header").addClass('open');
//            $('body').addClass('hidden');
//            $("#header .menu_wrap").show();
//            setTimeout(function(){
//                $("#header").css("overflow", "").attr("data-header", true);
//                $(".section").attr("data-header", true);
//                setTimeout(function(){
//                    $("#header .menu_wrap .close_btn").attr("data-animated", true);
//                    $("#header .menu_wrap .menu_inner").attr("data-animated", true);
//                }, 1400);
//            },10);
//        }
//        
//    };

    /*function pop_Open() {
        if($(".pop").hasClass("open") === true) {
            $(".pop").removeClass('open'); 
            $('body').removeClass('hidden');
        } else {
            $(".pop").addClass('open'); 
            $('body').addClass('hidden');
        }
    };*/
    
    

    $(window).resize(function() {
        bg_Topsec();
        /*bg_About();*/
        headerInit();
        scrollMotion();
        /*scrollMotion();*/
        var width = $(document).width();
        if (width < 767) {
            // slick_Resize();
            
        }
    });
    $(window).scroll(function(){
        bg_Topsec();
        headerInit();
        /*bg_About();*/
        scrollMotion();
        /*scrollMotion();*/
    });

    function bg_Topsec(){
        var screenHeight = $(window).innerHeight();
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
        var screenHeight = $(window).innerHeight();
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
    

    function headerInit(){
            var screenHeight = $(window).innerHeight();
            var winWidth = $(window).width();
            var scrollTop =  $(window).scrollTop();
            var scrollBtm = scrollTop + screenHeight;
            var scrollLimit = screenHeight * 2 ;
            var posY = scrollTop + (screenHeight - (screenHeight / 2));

            var pageObj = [
                [".kv", "", ""],
                [".about","About", "Cartier, Crystallization of Time"],
                [".prologue","Prologue", ""],
                [".chapter1","Chapter 1", ""],
                [".chapter2","Chapter 2", ""],
                [".chapter3","Chapter 3", ""],
                [".symbol","Panthère", ""],
                [".archive","The Archives", ""],
                [".topic","", ""],
                [".footer", "", ""],
            ];

            var sectionIdx = 0;
            var sectionIdx2 = 0;

            if($(".header .menu_txt span").length == 0){
                $.each(pageObj, function(i){
                    $(".header .menu_txt").append('<span>' + pageObj[i][1] + '</span>');
                    $(".header .menu_title").append('<span>' + pageObj[i][2] + '</span>');
                });
            }

            $.each(pageObj, function(i){
                if($(pageObj[i][0]).offset()){
                    if($(pageObj[i][0]).offset().top <= posY){
                        sectionIdx = i;
                    }
                    if($(pageObj[i][0]).offset().top <= scrollTop){
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
                $(".header .menu_title span").removeClass("active");
                if(scrollLimit <= scrollBtm){
                    $(".header .menu_title span").eq(sectionIdx).addClass("active");
                }
            }else{
                $(".header .menu_title span").eq(1).addClass("active");
            }

             //main mobile btn_more motion
            if($('#top').length > 0){
                if(sectionIdx2 == 2 || sectionIdx2 == 3 || sectionIdx2 == 4 || sectionIdx2 == 5){
                    var secName = pageObj[sectionIdx2][0];
                    var secHeight = $(secName).height();
                    var secScBottom = $(secName).offset().top + secHeight;
                    var btHeight = $(secName+' .btn_more').height();
                    var secTxTop = $(secName+' .tx_body').offset().top;
                    var btMoveStart = secTxTop - screenHeight + btHeight*2;
                    var btMoveEnd = secScBottom - screenHeight   ;
                    $(secName+' .btn_more').addClass('chg_top')
                    if( scrollTop >= btMoveStart && scrollTop <= btMoveEnd){
                        var btPosY =  scrollTop - secTxTop + screenHeight - btHeight*2 ;
                        $(secName+' .chg_top').css({"transform":"translate(0, " +  btPosY + "px)"});
                    }
                }else{
                    $('.btn_more').css({"transform":"translate(0, 0)"});
                    $('.btn_more').removeClass('chg_top');
                }

                if(winWidth >= 767){
                    $('.btn_more').css({"transform":"translate(0, 0)"});
                    $('.btn_more').removeClass('chg_top');
                }else{
                }
               
            }else{
                //alert('sub');
            }
        
            
        }

        function scrollMotion(){
				var posY = $(window).scrollTop() + ($(window).innerHeight() - ($(window).innerHeight() / 3));
				var tiSub = $(".s_motion");
    
				$.each(tiSub, function(i){
                    // console.log("tisub");
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

						}else if(tiSub.eq(i).hasClass("footer .subscribe") && tiSub.eq(i).offset().top <= $(window).scrollTop() + $(window).innerHeight()){
							if(tiSub.eq(i).attr("data-animated") != "true"){
								tiSub.eq(i).attr("data-animated", true);
							}
						}else{
                            if(tiSub.eq(i).attr("data-animated") == "true"){
                                tiSub.eq(i).attr("data-animated", false);
                            }

						}
					}
				});
			}

    
         function popOpen(pop_name) {
            $('body').addClass('overflow_h');
            $('.' + pop_name).fadeIn(1000);
             
         }



























