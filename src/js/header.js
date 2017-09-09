///////     BUTTONS  AND IMPLEMENTATION       ////////


/// HEADER BUTTONS    ////

// only approve button to remove field if at least one filed more is active
// to prevent disabling of all fields at once


/////  buttons for big screen implemetation 

function buttonsFieldAssignBig() {

    var htmlDis,
        cssDisp,
        javaDisp;


    $(htmlRemoveBtn).on("click", function() {
        if (javaDisp === "none" && cssDisp === "none") {
            return;
        }
        $(htmlCMSection).toggle();
        $(htmlRemoveBtn).toggleClass("inactive-btn");
        $(htmlSizePlus).toggleClass("inactive-btn");
        htmlDis = $(htmlCMSection).css("display");
    });

    $(cssRemoveBtn).on("click", function() {
        if (javaDisp === "none" && htmlDis === "none") {
            return;
        }
        $(cssCMSection).toggle();
        $(cssRemoveBtn).toggleClass("inactive-btn");
        $(cssSizePlus).toggleClass("inactive-btn");
        cssDisp = $(cssCMSection).css("display");
    });

    $(jsRemoveBtn).on("click", function() {
        if (cssDisp === "none" && htmlDis === "none") {
            return;
        }
        $(jsRemoveBtn).toggleClass("inactive-btn");
        $(jsSizePlus).toggleClass("inactive-btn");
        $(jsCMSection).toggle();
        javaDisp = $(jsCMSection).css("display");
    });

    $(htmlSizePlus).on("click", function() {

        htmlSize();
    });

    $(cssSizePlus).on("click", function() {

        cssSize();
    });

    $(jsSizePlus).on("click", function() {

        jsSize();
    });


    $(".title").hover(function(event) {
        if (event.target === this) {
            $(this).addClass('title_lighten');
        }
    }, function() {
        $(this).removeClass("title_lighten");
    });

    $(htmlTitleBg).on("click", function(event) {
        event.stopImmediatePropagation();
        if (event.target === this) {
            htmlReSize();
            htmlEditor.focus();

        }

    });

    $(cssTitleBg).on("click", function(event) {
        event.stopImmediatePropagation();
        if (event.target === this) {
            cssReSize();
            cssEditor.focus();


        }

    });

    $(jsTitleBg).on("click", function(event) {
        event.stopImmediatePropagation();
        if (event.target === this) {
            jsReSize();
            jsEditor.focus();
        }
    });

}


function htmlSize() {

    if (screenSize === 1) {
        $(htmlRemoveBtn).click();
    }
}

function cssSize() {
    if (screenSize === 1) {
        $(cssRemoveBtn).click();
    }
}

function jsSize() {
    if (screenSize === 1) {
        $(jsRemoveBtn).click();
    }
}



function htmlReSize() {

    if (screenSize === 1) {
        if (windowSizeToggle === 1) {

            windowSizeToggle = 0;

            $(htmlCMSection).css("flex-grow", "1");
            $(cssCMSection).css("flex-grow", "1");
            $(jsCMSection).css("flex-grow", "1");

        } else {

            $(htmlCMSection).css("flex-grow", "40");
            $(cssCMSection).css("flex-grow", "1");
            $(jsCMSection).css("flex-grow", "1");

            windowSizeToggle = 1;

        }
    }
}

function cssReSize() {
    if (screenSize === 1) {

        if (windowSizeToggle === 2) {

            windowSizeToggle = 0;
            $(htmlCMSection).css("flex-grow", "1");
            $(cssCMSection).css("flex-grow", "1");
            $(jsCMSection).css("flex-grow", "1");

        } else {

            $(htmlCMSection).css("flex-grow", "1");
            $(cssCMSection).css("flex-grow", "40");
            $(jsCMSection).css("flex-grow", "1");

            windowSizeToggle = 2;

        }
    }
}

function jsReSize() {
    if (screenSize === 1) {

        if (windowSizeToggle === 3) {

            windowSizeToggle = 0;
            $(htmlCMSection).css("flex-grow", "1");
            $(cssCMSection).css("flex-grow", "1");
            $(jsCMSection).css("flex-grow", "1");

        } else {

            $(htmlCMSection).css("flex-grow", "1");
            $(cssCMSection).css("flex-grow", "1");
            $(jsCMSection).css("flex-grow", "40");
            windowSizeToggle = 3;
        }
    }
}




///  disable form autosubmit refresh

$(".no-autosubmit").submit(function(e) {
    e.preventDefault();
});



////////  BUTTONS


// autoload button implementation

$(autoDisableBtn).on("click", function() {
    if (disableAutoload === 1) {
        disableAutoload = 2;
        $(autoDisableBtn).removeClass("active-btn");
    } else {
        disableAutoload = 1;
        $(autoDisableBtn).addClass("active-btn");
    }
});

// Javascript buttons ADD and RUN

// Button Run updates iframe from Codemirror text area

$(runCodeBtn).on("click", function() {
    updateIframe();
});




//  menu dialog buttons


$(layoutSettingsBtn).on("click", function(event) {
    event.preventDefault();
    showSettingsPopWindow();
    $(submenuLayoutBtn).click();
});

$(cssSettingsBtn).on("click", function(event) {
    event.preventDefault();
    showSettingsPopWindow();
    $(submenuCssBtn).click();
});

$(javascriptSettingsBtn).on("click", function(event) {
    event.preventDefault();
    showSettingsPopWindow();
    $(submenuJSBtn).click();
});

$(projectsSettingsBtn).on("click", function(event) {
    event.preventDefault();
    showSettingsPopWindow();
    $(submenuProjectsBtn).click();
});


$(exportSettingsBtn).on("click", function(event) {
    event.preventDefault();
    showSettingsPopWindow();
    $(submenuExportBtn).click();
});


function showSettingsPopWindow() {
    // displays about window
    $(floatingWindow).css("display", "flex");
    setTimeout(function() {
        $(floatingWindow).addClass("floating-on");
        $(settingsWindow).addClass("settings-window-base-on");
    }, 1);

    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");

    // add event listener to document, click anywhere on document where id is not
    // id of paren here is titleLogoId, othervise it registers click event from parent

    $(document).on("click", function(event) {
        if (event.target.id === "floatingWindowBase") {
            removeSettingsPopWindow();
            $(this).unbind(event);

        }
    });

}




$(closeBtnWindowBase).on("click", function() {
    removeSettingsPopWindow();
    removeAddFolderCssJs();
    removeInfoWindow();
});

function removeSettingsPopWindow() {
    $(floatingWindow).css("display", "none");
    $(floatingWindow).removeClass("floating-on");
    $(settingsWindow).removeClass("settings-window-base-on");
    $(librariesTextareaCss).val("");
    $(librariesTextareaJs).val("");
}

function removeInfoWindow() {
    $(floatingWindow).css("display", "none");
    $(infoWindow).css("display", "none");
    $(floatingWindow).removeClass("floating-on");
    $(infoWindow).removeClass("info-window-on");

}

function removeAddFolderCssJs() {
    $(floatingWindow).css("display", "none");
    $(addNewFileWindow).css("display", "none");
    $(floatingWindow).removeClass("floating-on");
    $(addNewFileWindow).removeClass("add-new-file-window-on");
    $(addNewFileInput).val("");
}