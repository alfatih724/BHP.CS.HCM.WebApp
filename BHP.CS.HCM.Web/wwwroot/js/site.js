var _SelectedLookupData;
var _TableLookup;

function _LoadingButton(element, set) {
    $(element).html(function () {
        if (set) {
            $(element).attr("disabled", "disabled");
            var cont = '<div style="display:none;">' + $(element).html() + '</div><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading';
            return cont
        } else {
            $(element).removeAttr("disabled");
            return $(element).find("div").html();
        }
    });

    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
}

function _LookupData(coldefs, dataset, title, clickevent, multiSelect) {
    $("#_LookupModal").find("h4.modal-title").text(title);

    if (_TableLookup != null && _TableLookup != undefined) {
        _TableLookup.destroy();
        _TableLookup.off('select');
        $('#_TableLookup').html("");
        _SelectedLookupData = null;
        $('#_TableLookupSelect').hide();
    }

    _TableLookup = $('#_TableLookup').DataTable({
        select: (!multiSelect) ? true : { style: 'multi' },
        columns: coldefs,
        data: dataset,
    });

    $("#_LookupModal").modal("show");

    if (_SelectedLookupData == null && !multiSelect) {
        _TableLookup
            .on('select', function (e, dt, type, indexes) {
                _SelectedLookupData = _TableLookup.rows(indexes).data().toArray();
                clickevent(_SelectedLookupData);
                $("#_LookupModal").modal("hide");
            });
    } else {
        $('#_TableLookupSelect').show();
        _TableLookup
            .on('select', function (e, dt, type, indexes) {
                _SelectedLookupData = _TableLookup.rows(indexes).data().toArray();
                if (_SelectedLookupData[0].locID == "All") {
                    clickevent(_SelectedLookupData);
                    $("#_LookupModal").modal("hide");
                }
            });
        $('#_TableLookupSelect')
            .on('click', function () {
                var tableLookupData = _TableLookup.rows({ selected: true }).data();
                if (tableLookupData.length > 0) {
                    _SelectedLookupData = tableLookupData;
                    for (var i = 1; i < tableLookupData.length; i++) {
                        _SelectedLookupData[0].locID += ',' + tableLookupData[i].locID;
                        _SelectedLookupData[0].locCode += ',' + tableLookupData[i].locCode;
                        _SelectedLookupData[0].locDisplay += ', ' + tableLookupData[i].locDisplay;
                    }
                    clickevent(_SelectedLookupData);
                    $("#_LookupModal").modal("hide");
                }

            });
    }

}

function _SetCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function _GetCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function _eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function JSGetLabelLookup(Key1FieldValue, ListName) {
    var returnValueString = "";
    for (vLoopList = 0; vLoopList < ListName.length; vLoopList++) {
        if (ListName[vLoopList]["Value"] == Key1FieldValue) {
            returnValueString = ListName[vLoopList]["Label"];
            break;
        }
    }

    return returnValueString;
}

function _getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function _dateToLocalUTC(dt) {
    return moment(moment.tz(dt, "Asia/Jakarta").utc()).local().format("DD MMM YYYY HH:mm:ss");
}

function _colRenderLink(data, link) {
    return "<a class='btn-link' href='" + link + "'>" + data + "</a>"
}
function _colRenderDeleteAction(onclick) {
    return "<a class=\"btn btn-link\" onclick=\"" + onclick + "\" ><i class='fas fa-trash text-danger'></i></a>"
}


function formatMillions(value) {
    return Math.abs(Number(value)) / 1.0e+6 + "M";
}

function formatThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertDatetimeMomentFormat(vValue, vFormat) {
    var vStrReturn = "";

    if (moment(vValue).format(vFormat) == "Invalid date") {
        vStrReturn = "-";
    }
    else {
        vStrReturn = moment(vValue).format(vFormat);
    }
    return vStrReturn;
}

function convertBase64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArrayToPNG(reportName, byte) {
    var blob = new Blob([byte], { type: "application/png" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName + ".png";
    link.download = fileName;
    link.click();
};

function unEntity(str) {
    return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function _ExportExcel(arrHeaderData, listData, fileName) {
    var arrExcelData = [];

    arrExcelData.push(arrHeaderData);

    $.each(listData, function (index, value) {
        var innerRowData = [];
        $.each(value, function (ind, val) {

            innerRowData.push(val);
        });
        arrExcelData.push(innerRowData);
    });

    var filename = fileName + ".xlsx";

    /* Sheet Name */
    var ws_name = "Data";

    if (typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(arrExcelData, { cellDates: true, dateNF: 'DD MMM YYYY' });

    // ws['!cols'] = fitToColumn(arrExcelData);

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, filename);
    if (typeof console !== 'undefined') console.log(new Date());

}
/*OTO 
 AddBy:Alip
 START FROM HERE
 */
function NumberTypeOtto(thiss) {
    thiss.value = thiss.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}

function checkDataOtto(data) {

    if (data == undefined) {
        data = "";
    } else if (data == null) {
        data = 0;
    }

    return data;

}

/*OTO 
 AddBy:Alip
 END
 */

function _ExportExcelX(arrHeaderData, listData, fileName, arrOvdColsWidth) {
    var arrExcelData = [];

    arrExcelData.push(arrHeaderData);

    $.each(listData, function (index, value) {
        var innerRowData = [];
        $.each(value, function (ind, val) {

            innerRowData.push(val);
        });
        arrExcelData.push(innerRowData);
    });

    var filename = fileName + ".xlsx";

    /* Sheet Name */
    var ws_name = "Data";

    if (typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(arrExcelData, { cellDates: true, dateNF: 'DD MMM YYYY' });

    ws['!cols'] = fitToColumn(arrExcelData);

    for (var loopOvdCols = 0; loopOvdCols < arrOvdColsWidth.length; loopOvdCols++) {
        ws['!cols'][arrOvdColsWidth[loopOvdCols].colNumber].wch = arrOvdColsWidth[loopOvdCols].colWidth;
    }

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, filename);
    if (typeof console !== 'undefined') console.log(new Date());

}

function _ExportExcelXDateTime(arrHeaderData, listData, fileName, arrOvdColsWidth) {
    var arrExcelData = [];

    arrExcelData.push(arrHeaderData);

    $.each(listData, function (index, value) {
        var innerRowData = [];
        $.each(value, function (ind, val) {

            innerRowData.push(val);
        });
        arrExcelData.push(innerRowData);
    });

    var filename = fileName + ".xlsx";

    /* Sheet Name */
    var ws_name = "Data";

    if (typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(arrExcelData, { cellDates: true, dateNF: 'DD MMM YYYY hh:mm:ss' });

    ws['!cols'] = fitToColumn(arrExcelData);

    for (var loopOvdCols = 0; loopOvdCols < arrOvdColsWidth.length; loopOvdCols++) {
        ws['!cols'][arrOvdColsWidth[loopOvdCols].colNumber].wch = arrOvdColsWidth[loopOvdCols].colWidth;
    }

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, filename);
    if (typeof console !== 'undefined') console.log(new Date());

}

function fitToColumn(arrayOfArray) {
    // get maximum character of each column
    return arrayOfArray[0].map((a, i) => ({
        wch: Math.max(...arrayOfArray.map(a2 => a2[i].toString().length))
    }));
}

function _excelDateToJSDate(excel_date, time = false) {
    let day_time = excel_date % 1
    let meridiem = "AMPM"
    let hour = Math.floor(day_time * 24)
    let minute = Math.floor(Math.abs(day_time * 24 * 60) % 60)
    let second = Math.floor(Math.abs(day_time * 24 * 60 * 60) % 60)
    hour >= 12 ? meridiem = meridiem.slice(2, 4) : meridiem = meridiem.slice(0, 2)
    hour > 12 ? hour = hour - 12 : hour = hour
    hour = hour < 10 ? "0" + hour : hour
    minute = minute < 10 ? "0" + minute : minute
    second = second < 10 ? "0" + second : second
    let daytime = "" + hour + ":" + minute + ":" + second + " " + meridiem
    return time ? daytime : (new Date(0, 0, excel_date, 0, -new Date(0).getTimezoneOffset(), 0)).toLocaleDateString(navigator.language, {}) + " " + daytime
}

function ConvertToJSDateFromExcelDateNumber(vParNumber) {
    var utc_days = Math.floor(vParNumber - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = vParNumber - Math.floor(vParNumber) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}


function _getPestType(dropdown, defaultValue) {
    $.ajax({
        url: BaseUrl + "Partial/GetPestType",
        type: 'POST',
        dataType: 'Json',
        beforeSend: function () {
            $("#" + dropdown).html("")
        },
        success: function (response) {
            if (response.result) {

                $.each(response.data, function (index, item) {
                    $("#" + dropdown).append("<option value='" + item.value + "'>" + item.text + "</option>");
                })


            }
            else {

                Swal.fire(
                    response.message,
                    '',
                    'error'
                );

            }
        },
        complete: function (result) {
            if (defaultValue != "") {
                $("#" + dropdown).val(decodeHtml(defaultValue));
            }
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

function _getPyramidArea(dropdown, defaultValue) {
    $.ajax({
        url: BaseUrl + "Partial/GetPyramidArea",
        type: 'POST',
        dataType: 'Json',
        beforeSend: function () {
            $("#" + dropdown).html("")
        },
        success: function (response) {
            if (response.result) {
                $.each(response.data, function (index, item) {
                    $("#" + dropdown).append("<option value='" + item.value + "'>" + item.text + "</option>");
                })
            }
            else {
                Swal.fire(
                    response.message,
                    '',
                    'error'
                );
            }
        },
        complete: function (result) {
            if (defaultValue != "") {
                $("#" + dropdown).val(decodeHtml(defaultValue));
            }
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

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
function startTimer(duration, display, timeout) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#" + display).text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }

        if (seconds == 0 && minutes == 0) {
            timeout();
            clearInterval(interval)
        }
    }, 1000);
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function addNumberCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


$(function () {

})






function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});