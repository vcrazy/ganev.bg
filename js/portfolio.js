$(document).ready(function(){
	var hash = window.location.hash;
	hash = hash ? hash.substr(1) : 'home';
	$('#main_info div[id!="' + hash + '_block"]').hide();

	var cl;
	switch(hash)
	{
		case 'home': cl = 1; break;
		case 'who_am_i': cl = 2; break;
		case 'projects': cl = 3; break;
		case 'contacts': cl = 4; break;
		default: cl = 1; break;
	}
	$('#indicator').addClass('i_' + cl);

	$('.lightbox').lightBox({fixedNavigation:false});

	$('#menu a').click(function(){
		$('#main_info div[id!="' + $(this).attr('id') + '_block' + '"]').delay(250).slideUp();

		var id = $(this).attr('id');

		$('#' + id + '_block').slideDown();

		var br = false;
		var c = 1;

		$.each($('#main_info div'), function(){
			if(!br){
				if($(this).attr('id') != id + '_block'){
					c++;
				}else{
					br = true;
				}
			}
		});

		$('#indicator').fadeOut(250).hide().removeClass('i_1 i_2 i_3 i_4').addClass('i_' + c).fadeIn(250);

		return true;
	});

	$('a.read_more[href^="#"]').click(function(){
		var href = $(this).attr('href').substr(1);

		$('#main_info div[id!="' + href + '_block' + '"]').delay(250).slideUp();

		$('#' + href + '_block').slideDown();

		var br = false;
		var c = 1;

		$.each($('#main_info div'), function(){
			if(!br){
				if($(this).attr('id') != href + '_block'){
					c++;
				}else{
					br = true;
				}
			}
		});

		$('#indicator').fadeOut(250).hide().removeClass('i_1 i_2 i_3 i_4').addClass('i_' + c).fadeIn(250);

		return true;
	});

	$('#footer a, #footer_links a').click(function(){
		return $('#menu').find('a[href="' + $(this).attr('href') + '"]').click();
	});
});
