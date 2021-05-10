function detalView(object) {
    document.getElementById('wallet_address_id').value = object.wallet_address;
    document.getElementById('date_id').value = object.error_date;
    document.getElementById('version_id').value = object.version;
    document.getElementById('platform_id').value = object.platform;
    document.getElementById('process_type_id').value = object.process_type;
    document.getElementById('app_location_id').value = object.app_location;
    document.getElementById('error_name_id').value = object.error_name;
    document.getElementById('error_message_id').innerText = object.error_message;
}


window.addEventListener("load", function(){
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/api/v1/' + sessionStorage.getItem('error_id'),
        async: true,
        dataType: 'json',
        success: function (result) {
            console.log(result)
            detalView(result)
            // result.forEach((data, index)=> {
            //     listView(data, index);
            // });
        },
        error: function (error) {
            console.log(error);
        }
    });
});