$(document).ready(function(){
	var browser = true;

	$('.close').click(function(){
		$('#info').hide();
		$('.info').addClass('double-vertical');
	});

	$('.info').click(function(){
		if(!browser){
			return;
		}

		var container_visible = $('#info').is(':visible'),
			element = $(this).html().replace(/\W/g, '').toLowerCase(),
			copy_elements = ['p', 'h1'];

		$('.info').removeClass('double-vertical');

		$('#tile_single').attr('class', $(this).attr('class')).removeClass('info').addClass('double-vertical');
		$('#tile_single').html($(this).html());

		for(var i in copy_elements){
			$('#tile_double ' + copy_elements[i]).html($('#text_' + element + ' .' + copy_elements[i]).html());
		}

		if(!container_visible){
			$('#info').show();
		}
	});

	$('#tile_single').click(function(){
		var classes = $(this).attr('class').split(' ');

		for(var i in classes){
			var split = classes[i].split('-');

			if(split[0] == 'bg'){
				$(this).removeClass(classes[i]).addClass(classes[i].replace(/^b/, 'f'));
			}else if(split[0] == 'fg'){
				$(this).removeClass(classes[i]).addClass(classes[i].replace(/^f/, 'b'));
			}
		}
	});

	if(navigator.appName == 'Microsoft Internet Explorer'){
		browser = false;

		var non_browser_str = 'WHYIE?';

		for(var i = 0; i < non_browser_str.length; i++){
			$('.info').eq(i).html(non_browser_str.charAt(i));
		}
	}
});
