let count = true;
function update() {
    
    console.log('привет1')
    
    let xvals = document.getElementById("X");
    var xval = xvals.options[xvals.selectedIndex].text; //get x from select-bar
    
    let rvals = document.getElementById("R");
    var rval = rvals.options[rvals.selectedIndex].text; //get r from select-bar

    let yval = document.getElementById("Y").value; //get y from textbox

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

    if (checkY(yval)) {
       $.ajax({
            type: 'GET',
            url: '../php/main.php',
            async: false,
            data: { "x": xval, "y": yval, "r": rval },
            success: function (data) {
                console.log('привет')
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
    }else{
        alert("Something gone wrong on checking values! Those were your variables: " + 
        "\n" + "xval: " + xval + "\n" + "yval: " + yval + "\n" + "rval: " + rval);
    }
}

function onetime(){
    if(count){
        $('#results tr:last').after(localStorage.getItem("result"));
        count = false;
    }
}
