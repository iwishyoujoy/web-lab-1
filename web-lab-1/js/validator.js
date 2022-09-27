function checkInput(y) {
    let validationInfoPanel = document.querySelector('.validationInfo');
    var validationInfo = '';
    var isYCorrect = false;


    validationInfoPanel.classList.remove("show");

    if (!(y.trim() === "")) {
        console.log(y);
        if (/-?\d[\.е]\d+|-?\d/.test(y)) {
            if ((parseInt(y) > -3) && (parseInt(y) < 3)) {
                isYCorrect = true;
                console.log(y);
            } else {validationInfo += "<span class='popup-content'>Y должен быть в интервале (-3..3)!</span>";
            }
        } else validationInfo += "<span class='popup-content'>Y должен быть числом!</span>";
    } else validationInfo += "<span class='popup-content'>Введите Y!</span>";


    validationInfoPanel.innerHTML = validationInfo;
    //validationInfoPanel.textContent = validationInfo;
    validationInfoPanel.classList.add("show");

    return isYCorrect;
}


function validateTextField() {
    $('.y-text').on('input', function() {
        $(this).val($(this).val().replace(/[^.-\d]/, ''));
    });
}