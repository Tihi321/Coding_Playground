/////////			MEDIA QUERRIES            ////////////

// layout for media querries

// media query event handlers

if (matchMedia) {
    var mqsmall = window.matchMedia("(max-width: 42em)");
    mqsmall.addListener(WidthChangeSmall);
    WidthChangeSmall(mqsmall);
}


// media query change small (max-width: 41.999em)

function WidthChangeSmall(mqsmall) {
    if (mqsmall.matches) {
        buttonsFieldRemoveBindings();
        buttonsFieldAssignSmall();
        midLayout();
        adaptSmallScreen();
        activateOneTextarea();
        screenSize = 0;

        if (commandsCodeSize !== "") {
            changeCodeSize(commandsCodeSize);
        } else {
            $(columnSizeBtnMid).click();
        }
        $(htmlSizePlus).click();
        if (cssonly || htmlonly || jsonly) {
            startCssOnly(0);
        }
    } else {
        activateAllTextareas();
        buttonsFieldRemoveBindings();
        buttonsFieldAssignBig();
        adaptBigScreen();

        if (commandsLayoutType !== "") {
            changeLayoutType(commandsLayoutType);
        }

        if (commandsCodeSize !== "") {
            changeCodeSize(commandsCodeSize);
        }

        if (nocss || nohtml || nojs) {
            removeStartEditor();
        }

        if (cssonly || htmlonly || jsonly) {
            startCssOnly(1);
        }

        if (startLayout) {
            if (commandsLayoutType === "") {
                layoutRight();
            }
            if (commandsCodeSize === "") {
                $(columnSizeBtnMid).click();
            }
            startLayout = false;
        } else if (commandsLayoutType === "") {
            layoutTop();
        }
        screenSize = 1;
    }

}

function startCssOnly(screenSize) {
    if (cssonly) {
        if (screenSize === 0) {
            $(cssSizePlus).click();
        } else {
            $(htmlRemoveBtn).click();
            $(jsRemoveBtn).click();
        }
    } else if (htmlonly) {
        if (screenSize === 0) {
            $(htmlSizePlus).click();
        } else {
            $(cssRemoveBtn).click();
            $(jsRemoveBtn).click();
        }
    } else {
        if (screenSize === 0) {
            $(jsSizePlus).click();
        } else {
            $(htmlRemoveBtn).click();
            $(cssRemoveBtn).click();
        }
    }

}

function removeStartEditor() {

    if (nohtml) {
        $(htmlRemoveBtn).click();
    }
    if (nojs) {
        $(jsRemoveBtn).click();
    }
    if (nocss) {
        $(cssRemoveBtn).click();
    }

}



/// changes layout according to adress
function changeLayoutType(commandsLayoutType) {
    switch (commandsLayoutType) {
        case "right":
            layoutRight();
            break;
        case "left":
            layoutLeft();
            break;
        case "top":
            layoutTop();
            break;
        case "bottom":
            layoutBottom();
            break;
        default:
            break;
    }

}

function changeCodeSize(commandsCodeSize) {
    switch (commandsCodeSize) {
        case "preview":
            $(columnSizeBtnEmpty).click();
            break;
        case "min":
            $(columnSizeBtnMin).click();
            break;
        default:
            break;
    }
}

// remove click events from big screen and add new events for small screen
// for buttons HTML, CSS Javascript inside Header


function buttonsFieldRemoveBindings() {
    $(".title").off("mouseenter mouseleave");
    $(htmlTitleBg).off("click");
    $(cssTitleBg).off("click");
    $(jsTitleBg).off("click");
    $(htmlRemoveBtn).off("click");
    $(cssRemoveBtn).off("click");
    $(jsRemoveBtn).off("click");
    $(htmlSizePlus).off("click");
    $(cssSizePlus).off("click");
    $(jsSizePlus).off("click");
    $(htmlSizePlus).removeClass("active-btn inactive-btn");
    $(cssSizePlus).removeClass("active-btn inactive-btn");
    $(jsSizePlus).removeClass("active-btn inactive-btn");
    $(htmlRemoveBtn).removeClass("active-btn inactive-btn");
    $(cssRemoveBtn).removeClass("active-btn inactive-btn");
    $(jsRemoveBtn).removeClass("active-btn inactive-btn");
}


// click events for small screen for buttons HTML, CSS Javascript inside Header
//only show one field and disable the rest

function buttonsFieldAssignSmall() {

    $(htmlRemoveBtn).on("click", function() {
        $(htmlSizePlus).click();
    });

    $(cssRemoveBtn).on("click", function() {
        $(cssSizePlus).click();
    });

    $(jsRemoveBtn).on("click", function() {
        $(jsSizePlus).click();
    });


    $(htmlSizePlus).on("click", function() {
        $(htmlCMSection).css("display", "flex");
        $(cssCMSection).css("display", "none");
        $(jsCMSection).css("display", "none");

        $(htmlSizePlus).addClass("active-btn");
        $(cssSizePlus).removeClass("active-btn");
        $(jsSizePlus).removeClass("active-btn");

        $(htmlRemoveBtn).addClass("active-btn");
        $(cssRemoveBtn).removeClass("active-btn");
        $(jsRemoveBtn).removeClass("active-btn");

    });

    $(cssSizePlus).on("click", function() {
        $(cssCMSection).css("display", "flex");
        $(htmlCMSection).css("display", "none");
        $(jsCMSection).css("display", "none");

        $(cssSizePlus).addClass("active-btn");
        $(htmlSizePlus).removeClass("active-btn");
        $(jsSizePlus).removeClass("active-btn");

        $(cssRemoveBtn).addClass("active-btn");
        $(htmlRemoveBtn).removeClass("active-btn");
        $(jsRemoveBtn).removeClass("active-btn");
    });

    $(jsSizePlus).on("click", function() {
        $(jsCMSection).css("display", "flex");
        $(cssCMSection).css("display", "none");
        $(htmlCMSection).css("display", "none");


        $(jsSizePlus).addClass("active-btn");
        $(htmlSizePlus).removeClass("active-btn");
        $(cssSizePlus).removeClass("active-btn");

        $(jsRemoveBtn).addClass("active-btn");
        $(cssRemoveBtn).removeClass("active-btn");
        $(htmlRemoveBtn).removeClass("active-btn");
    });

}

function activateOneTextarea() {
    $(cssCMSection).css("display", "none");
    $(jsCMSection).css("display", "none");
}

function activateAllTextareas() {
    $(htmlCMSection).css("display", "flex");
    $(cssCMSection).css("display", "flex");
    $(jsCMSection).css("display", "flex");
}


function adaptSmallScreen() {
    $("#outerWindowOpen").css("display", "none");
    $(layoutButtonWrapper).css("display", "none");
    $(fontSizeBtnWrapper).css("flex-direction", "column");
}

function adaptBigScreen() {
    $("#outerWindowOpen").css("display", "inline-block");
    $(layoutButtonWrapper).css("display", "flex");
    $(fontSizeBtnWrapper).css("flex-direction", "row");
}