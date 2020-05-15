function listView(object, id){
	var html, newHtml, element;
	element = '.log_list_view';
	html = '<tr class="row100 body" id="item_box-id">\n' +
		'<td class="cell100 column1" id="node_uid-id"></td>\n' +
		'<td class="cell100 column2" id="release_version-id"</td>\n' +
		'<td class="cell100 column3" id="platform-id"></td>\n' +
		'<td class="cell100 column4" id="error-id"></td>\n' +
		'<td class="cell100 column5" id="error_type-id"></td>\n' +
		'<td class="cell100 column6" id="date-id"></td>\n' +
		'</tr>';
	newHtml = html.replace('item_box-id', 'item_box-'+id);
	newHtml = newHtml.replace('node_uid-id', 'node_uid-'+id);
	newHtml = newHtml.replace('release_version-id', 'release_version-'+id);
	newHtml = newHtml.replace('platform-id', 'platform-'+id);
	newHtml = newHtml.replace('error-id', 'error-'+id);
	newHtml = newHtml.replace('error_type-id', 'error_type-'+id);
	newHtml = newHtml.replace('date-id', 'date-'+id);
	document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
	console.log('view html code: ', newHtml, element, object, id);

	document.getElementById('node_uid-'+id).innerText = object.node_uid;
	document.getElementById('release_version-'+id).innerText = object.version;
	document.getElementById('platform-'+id).innerText = object.platform;
	document.getElementById('error-'+id).innerText = object._id;
	document.getElementById('error_type-'+id).innerText = object.error_name;
	document.getElementById('date-'+id).innerText = object.error_date;
	if(object.error_stack)
		document.getElementById('error_type-'+id).style.color = "red";
	else
		document.getElementById('error_type-'+id).style.color = "orange";
}

$(document).on("click",".log_list_view", function (event) {
	let select_project_area_id = event.target.id;
	var index = select_project_area_id.split("-");
	console.log('select_project: ', select_project_area_id, index[1]);
	let error_id = $('#error-'+index[1]).text();
	sessionStorage.setItem('error_id', error_id);
	location.href = 'detail.html'
});

window.addEventListener("load", function(){
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: '/api/v1/get_log',
		async: true,
		dataType: 'json',
		success: function (result) {
			result.forEach((data, index)=> {
				listView(data, index);
			});
		},
		error: function (error) {
			console.log(error);
		}
	});
});


(function ($) {
	"use strict";
	$('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).addClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
	});

	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).removeClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
	});
    

})(jQuery);

setTimeout(function(){
	window.location.reload(1);
}, 30000);