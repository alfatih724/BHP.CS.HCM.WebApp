
function getEMPL(EMPLID) {
    $.ajax({
        url: BaseUrl + "EMPL/GetEMPL",
        type: 'POST',
        dataType: 'Json',
        data: {
            param: {
			 EMPLID: EMPLID

            }
        },
        beforeSend: function () {

        },
        success: function (response) {
            if (response.Result) {
                var data = JSON.parse(response.Data)[0];

                fetchData(data);
            }
            else {
                Swal.fire(
                    response.Message,
                    '',
                    'error'
                );
            }
        },
        complete: function (result) {
            _LoadingButton($("#buttonSearch"), false);
        },
        error: function (xhr, status, message) {
            Swal.fire(
                message,
                '',
                'error'
            );
        },
    });
}

function checkEMPL(EMPLID) {
    $.ajax({
        url: BaseUrl + "EMPL/GetEMPL",
        type: 'POST',
        dataType: 'Json',
        data: {
            param: {
			 EMPLID: EMPLID

            }
        },
        beforeSend: function () {

        },
        success: function (response) {
            console.log(response)
            if (response.Result && response.Data != "[]") {
                var data = JSON.parse(response.Data)[0];

                Swal.fire({
                    title: 'Data key(s) already exists in database, do you want to load this data?',
                    showDenyButton: true,
                    /*showCancelButton: true,*/
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        fetchData(data)
                    }
                })

            }

        },
        complete: function (result) {
            _LoadingButton($("#buttonSearch"), false);
        },
        error: function (xhr, status, message) {
            Swal.fire(
                message,
                '',
                'error'
            );
        },
    });
}

function searchData() {
    $.ajax({
        url: BaseUrl + "EMPL/GetAllEMPL",
        type: 'POST',
        dataType: 'Json',
        data: {
            param: {

			 EMPLID: $("#EMPLID").val(),
			 FIRST_NAME: $("#FIRST_NAME").val(),
			 LAST_NAME: $("#LAST_NAME").val()
            }
        },
        beforeSend: function () {
            _LoadingButton($("#buttonSearch"), true);
            tableSearchResult.clear().draw();
        },
        success: function (response) {
            if (response.Result) {
                tableSearchResult.rows.add(JSON.parse(response.Data)).draw();
            }
            else {
                Swal.fire(
                    response.Message,
                    '',
                    'error'
                );
            }
        },
        complete: function (result) {
            _LoadingButton($("#buttonSearch"), false);
        },
        error: function (xhr, status, message) {
            Swal.fire(
                message,
                '',
                'error'
            );
        },
    });
}


function deleteData(EMPLID) {

    Swal.fire({
        title: 'Are you sure to delete this data key(s)?',
        showDenyButton: true,
        /*showCancelButton: true,*/
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: BaseUrl + "EMPL/DeleteEMPL",
                type: 'POST',
                dataType: 'Json',
                data: {
                    param: {
            			 EMPLID: EMPLID

                    }
                },
                beforeSend: function () {

                },
                success: function (response) {
                    if (response.Result) {

                        Swal.fire(
                            response.Message,
                            '',
                            'success'
                        );

                        $("#buttonSearch").click();
                    }
                    else {
                        Swal.fire(
                            response.Message,
                            '',
                            'error'
                        );
                    }
                },
                complete: function (result) {

                },
                error: function (xhr, status, message) {
                    Swal.fire(
                        message,
                        '',
                        'error'
                    );
                },
            });
        }
    })


}

function saveData() {
    $.ajax({
        url: BaseUrl + "EMPL/SaveEMPL",
        type: 'POST',
        dataType: 'Json',
        data: {
            param: {
				 EMPLID: $("#EMPLID").val(),
				 FIRST_NAME: $("#FIRST_NAME").val(),
				 LAST_NAME: $("#LAST_NAME").val(),
				 EMAIL: $("#EMAIL").val(),
				 BIRTHDATE: $("#BIRTHDATE").val(),
				 AGE: $("#AGE").val(),
				 ADDRESS: $("#ADDRESS").val(),
				 PHONE: $("#PHONE").val(),
				 SALARY: $("#SALARY").val(),

            }
        },
        beforeSend: function () {
            _LoadingButton($("#buttonSave"), true);
        },
        success: function (response) {
            if (response.Result) {

                Swal.fire(
                    response.Message,
                    '',
                    'success'
                );

	 $("#EMPLID").attr("disabled", "disabled");
            }
            else {
                Swal.fire(
                    response.Message,
                    '',
                    'error'
                );
            }
        },
        complete: function (result) {
            _LoadingButton($("#buttonSave"), false);
        },
        error: function (xhr, status, message) {
            Swal.fire(
                message,
                '',
                'error'
            );
        },
    });
}


function fetchData(data) {
	$("#EMPLID").val(data.EMPLID);
	$("#FIRST_NAME").val(data.FIRST_NAME);
	$("#LAST_NAME").val(data.LAST_NAME);
	$("#EMAIL").val(data.EMAIL);
	$("#BIRTHDATE").val(data.BIRTHDATE);
	$("#AGE").val(data.AGE);
	$("#ADDRESS").val(data.ADDRESS);
	$("#PHONE").val(data.PHONE);
	$("#SALARY").val(data.SALARY);


	 $("#EMPLID").attr("disabled", "disabled");
}

