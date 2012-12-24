$(document).ready(function(){
	var hash = window.location.hash;
	hash = hash ? hash.substr(1) : 'home';

	var cl;
	switch(hash)
	{
		case 'home':cl = 1;break;
		case 'who_am_i':cl = 2;break;
		case 'projects':cl = 3;break;
		case 'contacts':cl = 4;break;
		default:cl = 1;break;
	}
	$('#indicator').addClass('i_' + cl);

	$('.lightbox').lightBox({fixedNavigation: false});

	var menuclick = false;

	$('#menu a').click(function(){
		menuclick = true;
		var id = $(this).attr('id');
		mark(id, true);

		$('html,body').animate({scrollTop: $('#' + id + '_block').css('marginTop').split('px')[0]*1 - 255}, 'slow');
		$('.contcont').animate({opacity: 1}, 'slow', function(){menuclick = false;});

		return false;
	});

	var bh;
	function blackhole(now){
		var br = false;
		var scroll_top = $(window).scrollTop();

		$.each($('.contcont'), function(){
			if(!br && $(this).css('marginTop').split('px')[0] >= scroll_top){
				var cont = $(this);
				if(!now){
					bh = setTimeout(function(){$('#' + $(cont).attr('id').split('_block')[0]).click();}, 2250);
				}else{
					$('#' + $(cont).attr('id').split('_block')[0]).click();
				}
				br = true;
			}
		});
	}

	$(window).scroll(function(){
		var scroll_top = $(window).scrollTop();

		if(!menuclick){
			var found = false;
			clearInterval(bh);

			$.each($('.contcont'), function(){
				if(!found){
					var mt = $(this).css('marginTop').split('px')[0]*1;
					var mb = mt + $(this).find('div:first').height()*1;

					if((scroll_top <= mt) || (scroll_top >= mt && scroll_top <= mb)){ // visible..
						found = true;
						mark($(this).attr('id').split('_block')[0], false);

						if((scroll_top >= mt && scroll_top >= mb - 255)){ // staying in the nothing
							blackhole();
						}
					}
				}
			});
		}

		if(scroll_top){
			if($('.top').parent().css('display') == 'none'){
				$('.top').parent().fadeIn();
			}
		}else{
			$('.top').parent().fadeOut();
		}
	});

	function mark(id, effects){
		if(effects){
			$('.contcont').animate({opacity: 0}, 'fast');
		}

		var br = false;
		var c = 1;

		$.each($('.contcont'), function(){
			if(!br){
				if($(this).attr('id') != id + '_block'){
					c++;
				}else{
					br = true;
				}
			}
		});

		if(effects){
			$('#indicator').fadeOut(250).hide().removeClass('i_1 i_2 i_3 i_4').addClass('i_' + c).fadeIn(250);
		}else{
			$('#indicator').removeClass('i_1 i_2 i_3 i_4').addClass('i_' + c);
		}
	}

	var counter = 0;
	var total = $('.contcont').length;
	var win_hei = $(window).height();
	var till_now = 255;

	$.each($('.contcont'), function(){
		var h = $(this).find('div:first').height();

		if(!counter){ //first
			$(this).css('marginTop', till_now);
			till_now += h;
		}else if(counter == total - 1){ //last
			till_now += win_hei;
			$(this).css('marginTop', till_now);
			$(this).css('paddingBottom', win_hei - 255);
		}else{ //mid
			till_now += win_hei;
			$(this).css('marginTop', till_now);
			till_now += h;
		}
		counter++;
	});

	// header blink
	function changeabsopacity(){
		var s = 0.99;

		if($('.abs').css('opacity').substr(0, 4) == s){ // if visible
			s = 0.85;
		}

		$('.abs').animate({opacity: s}, 1500).css('filter', ''); // animate opacity

		setTimeout(changeabsopacity, 3000); // call self after ns.......
	}
	changeabsopacity();

	var go_up = true;
	$('#header span').click(function(){
		var fs = $(this).css('fontSize').split('px')[0]*1;
		if(go_up && fs > 60) go_up = false;
		if(!go_up && fs < 40) go_up = true;

		$(this).animate({fontSize: go_up ? fs + 10 : fs - 10, opacity: Math.max(Math.random(), 0.9)}, 'slow');
	});

	$('.go_down').click(function(){
		blackhole(true);
	});

	$('.top').click(function(){
		$('#menu a:first').click();
	})
});
