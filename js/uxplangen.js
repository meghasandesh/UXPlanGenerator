function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

$(document).ready(function() {
	var uxplan = store.get('uxplan');
	var title = store.get('title');

	if(title) {
		$('.js-title').val(title);
	}

	if(!uxplan) {
		uxplan = [];
	}
	else {
		$('.js-ux-list .ux-activity').each(function(){
			if(uxplan.indexOf($(this).find('h3').html()) != -1) {
				$(this).find('.plus').hide();
				$(this).find('.check').show();
			}
		});
	}

	$('.js-add-btn').click(function() {
		//var activity = $(this).closest('.ux-activity').clone();
		var title = $(this).closest('.ux-activity').find('h3').html();
		
		var dups = false;
		if($('.js-ux-plan .ux-activity').length > 0) {
			$('.js-ux-plan .ux-activity h3').each(function() {
				if(title == $(this).html()) {
					dups = true;
				}
			});
		}

		if(!dups) {
			//activity.appendTo('.js-ux-plan');
			activity = $(this).closest('.ux-activity').toggleClass('checked');
			uxplan.push(title);
			$(this).find('.plus').toggle();
			$(this).find('.check').toggle();
		}
		//todo: deduplicate entries
		uxplan = removeDups(uxplan);
		store.set('uxplan', uxplan);
	});

	$(".js-search").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $(".js-ux-list .ux-activity").filter(function() {
	      $(this).toggle($(this).find('h3').html().toLowerCase().indexOf(value) > -1);
	    });
	  });

	$('.js-category').change(function() {
		var value = $(this).val().toLowerCase();
		$(".js-ux-list .ux-activity").filter(function() {
	      $(this).toggle($(this).find('.type').html().toLowerCase().indexOf(value) > -1);
	    });
	});

	$('.js-title').focusout(function() {
		var value = $(this).val();
		store.set('title', value);
	});

	$('.js-view-plan').click(function() {
		$('.ux-activity').each(function() {
			if($(this).hasClass('checked')) {
				
			}
		});
	});

	$('.js-view-all').click(function() {
		$('.js-ux-list').show();
		$('.js-ux-plan').hide();
	});

	$('.js-reset-plan').click(function() {
		uxplan = [];
		store.remove('uxplan');
		$('.js-ux-plan').html('');
	});

	$('.js-print-page').click(function() {
		window.print();
	});

	$('.js-category').select2();

	//todo: 

});

