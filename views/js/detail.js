function detalView(object) {
    document.getElementById('node_uid_id').value = object.node_uid;
    document.getElementById('date_id').value = object.error_date;
    document.getElementById('version_id').value = object.version;
    document.getElementById('ver_id').value = object.ver;
    document.getElementById('platform_id').value = object.platform;
    document.getElementById('process_type_id').value = object.process_type;
    document.getElementById('app_location_id').value = object.appLocation;
    document.getElementById('error_name_id').value = object.error_name;
    document.getElementById('error_message_id').innerText = object.error_message;
    if(object.error_stack)document.getElementById('error_stack_id').innerText = object.error_stack;
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