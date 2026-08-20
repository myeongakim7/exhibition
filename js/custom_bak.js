$( document ).ready(function() {
    AOS.init({
			once: false,
		});
		$(window).on('load', function () {
            AOS.refresh();
        });

    
    $(".menu_box,.close_btn").click(function(){
        header_Open();
    });
    $(".menu_list > li > a").click(function(){
        header_Open();
        $('html, body').animate({scrollTop: $(this.hash).offset.top}, 400);
    });
    /*$(".btn_ticket,.pop_close").click(function(){
        pop_Open();
    });*/

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
    

    function header_Open() {
        if($("#header").hasClass("open") === true) {
            $("#header").removeClass('open'); 
            $('body').removeClass('hidden');
            $(".section").removeAttr("data-header");
            $("#header").css("overflow", "hidden").removeAttr("data-header");
            /*$("#header .menu_wrap").css("transform", "scale(1)");*/
            setTimeout(function(){
                $("#header .menu_wrap .close_btn").removeAttr("data-animated");
                $("#header .menu_wrap .menu_inner").removeAttr("data-animated");
                $("#header .menu_wrap").hide();

            }, 600);
            
        } else {
            $("#header").addClass('open');
            $('body').addClass('hidden');
            $("#header .menu_wrap").show();
            setTimeout(function(){
                $("#header").css("overflow", "").attr("data-header", true);
                $(".section").attr("data-header", true);
                setTimeout(function(){
                    $("#header .menu_wrap .close_btn").attr("data-animated", true);
                    $("#header .menu_wrap .menu_inner").attr("data-animated", true);
                }, 1400);
            },10);
        }
        
    };

    function pop_Open() {
        if($(".pop").hasClass("open") === true) {
            $(".pop").removeClass('open'); 
            $('body').removeClass('hidden');
        } else {
            $(".pop").addClass('open'); 
            $('body').addClass('hidden');
        }
    };
    
    

    $(window).resize(function() {
        bg_Topsec();
        /*bg_About();*/
        headerInit();
        scrollMotion();
        /*scrollMotion();*/
        var width = $(document).width();
        if (width < 767) {
            slick_Resize();
            
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
            var scrollTop =  $(window).scrollTop();
            var scrollBtm = scrollTop + screenHeight;
            var scrollLimit = screenHeight ;
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
        }

        function scrollMotion(){
				var posY = $(window).scrollTop() + ($(window).innerHeight() - ($(window).innerHeight() / 3));
				var pageObj = [
					[".about .ti_sub","transition"],
					[".about .tx_body","transition_tx"],
					[".about .bg","transition"],

					[".prologue .ti_sub","transition"],
					[".prologue .tx_desc","transition"],
					[".prologue .tx_body","transition_tx"],
					[".prologue .jewelry .img_jewelry","transition"],
					[".prologue .jewelry .tx_jewelry","transition"],

					[".chapter1 .ti_sub","transition"],
					[".chapter1 .tx_desc","transition"],
					[".chapter1 .tx_body","transition_tx"],
					[".chapter1 .jewelry .img_jewelry","transition"],
					[".chapter1 .jewelry .tx_jewelry","transition"],

					[".chapter2 .ti_sub","transition"],
					[".chapter2 .tx_desc","transition"],
					[".chapter2 .tx_body","transition_tx"],
					[".chapter2 .jewelry .img_jewelry","transition"],
					[".chapter2 .jewelry .tx_jewelry","transition"],

					[".chapter3 .ti_sub","transition"],
					[".chapter3 .tx_desc","transition"],
					[".chapter3 .tx_body","transition_tx"],
					[".chapter3 .jewelry .img_jewelry","transition"],
					[".chapter3 .jewelry .tx_jewelry","transition"],

					[".symbol .ti_sub","transition"],
					[".symbol .tx_desc","transition"],
					[".symbol .tx_body","transition_tx"],
					[".symbol .jewelry .img_jewelry","transition"],

					[".archive .ti_sub","transition"],
					[".archive .tx_desc","transition"],
					[".archive .tx_body","transition_tx"],
					[".archive .tx_desc","transition"],
					[".archive .jewelry .img_jewelry","transition"],

					[".topic .cont_inner","transition"],

					[".footer .exhibition .info1","transition"],
					[".footer .exhibition .info2","transition"],
					[".footer .ticket","transition"],
					[".footer .subscribe","transition"],
				];

				$.each(pageObj, function(i){
					if($(pageObj[i][0]).offset()){
						if($(pageObj[i][0]).offset().top <= posY){

							if(pageObj[i][1] == "transition"){
								if($(pageObj[i][0]).attr("data-animated") != "true"){
									$(pageObj[i][0]).attr("data-animated", true);
								}
							}

							if(pageObj[i][1] == "transition_tx"){
								if($(pageObj[i][0]).attr("data-animated") != "true"){
									$(pageObj[i][0]).attr("data-animated", true);
								}
								if($(pageObj[i][0]).attr("data-animated-def") != "true"){
									$(pageObj[i][0]).attr("data-animated-def", true);
								}
							}

						}else if(pageObj[i][0] == ".footer .subscribe" && $(pageObj[i][0]).offset().top <= $(window).scrollTop() + $(window).innerHeight()){
							if($(pageObj[i][0]).attr("data-animated") != "true"){
								$(pageObj[i][0]).attr("data-animated", true);
							}
						}else{

							if(pageObj[i][1] == "transition" || pageObj[i][1] == "transition_tx"){
								if($(pageObj[i][0]).attr("data-animated") == "true"){
									$(pageObj[i][0]).attr("data-animated", false);
								}
							}

						}
					}
				});
			}

    



























