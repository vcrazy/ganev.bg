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

	$('#menu a').click(function(){
		var id = $(this).attr('id');
		mark(id, true);

		$('body').animate({scrollTop: $('#' + id + '_block').css('marginTop').split('px')[0]*1 - 255}, 'slow');
		$('.contcont').animate({opacity: 1}, 'slow');

		return false;
	});

	$(window).scroll(function(){
		var scroll_top = $(window).scrollTop();
		var scroll_bottom = scroll_top + $(window).height();
		var found = false;

		$.each($('.contcont'), function(){
			if(!found){
				var mt = $(this).css('marginTop').split('px')[0]*1 + 255;
				var mb = mt + $(this).css('height').split('px')[0]*1 - 255;

				if((scroll_top < mt && scroll_bottom >= mb) || (scroll_top >= mt && scroll_top <= mb)){ // visible..
					$('.abs').animate({opacity: 0.9}, 'slow');
					found = true;
					mark($(this).attr('id').split('_block')[0], false);
				}
			}
		});

		if(!found){
			$('.abs').css('opacity', 1);
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
});
