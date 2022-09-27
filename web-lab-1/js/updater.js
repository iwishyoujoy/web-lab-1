let count = true;
function update() {

    let yval = document.getElementById("Y").value;

    let xvals = document.getElementById("X");
    var xval = xvals.options[xvals.selectedIndex].text;

    let rvals = document.getElementById("R");
    var rval = rvals.options[rvals.selectedIndex].text;

    

    /*event.preventDefault();
        let data = " R= " + encodeURIComponent(rval) + " & x= " + encodeURIComponent(xval) + " & y= " + encodeURIComponent(yval);
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "main.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log(xval, yval, rval);
                    updateTable(data);
                }
            }
        }*/

    if (checkInput(yval)) {
       $.ajax({
            type: 'GET',
            url: '../php/main.php',
            async: false,
            data: { "x": xval, "y": yval, "r": rval },
            success: function (data) {
                $('#results tr:last').after(data);
                let prev = localStorage.getItem("result");
                prev = prev + "\n" + data;
                localStorage.setItem("result", prev);
            },
            error: function (xhr, textStatus, err) {
                alert("readyState: " + xhr.readyState + "\n"+
                "responseText: " + xhr.responseText + "\n"+
                "status: " + xhr.status + "\n"+
                "text status: " + textStatus + "\n" +
                "error: " + err);
            }
        });
    }
}

function onetime(){
    if(count){
        $('#results tr:last').after(localStorage.getItem("result"));
        count = false;
    }
}
