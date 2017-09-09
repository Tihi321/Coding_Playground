/// resizable columns

splitter.addEventListener('mousedown', function(e) {
    e.stopImmediatePropagation();
    $("#splitterHidden").css("visibility", "visible");
    curYPos = e.pageY;
    curXPos = e.pageX;
    curDown = true;
});

splitterHidden.addEventListener('mousemove', function(e) {
    e.stopImmediatePropagation();
    var windowtWidth = window.innerWidth;
    var windowtHeight = window.innerHeight;
    if (curDown) {
        resizeCollumns(Math.round((e.clientX / windowtWidth) * 100), Math.round((e.clientY / windowtHeight) * 100));
    }
});

splitterHidden.addEventListener('mousedown', function(e) {
    e.stopImmediatePropagation();
    curYPos = e.pageY;
    curXPos = e.pageX;
    curDown = true;
});

splitterHidden.addEventListener('mouseup', function(e) {
    e.stopImmediatePropagation();
    curDown = false;
    $("#splitterHidden").css("visibility", "hidden");
});

splitterHidden.addEventListener('mouseleave', function(e) {
    e.stopImmediatePropagation();
    curDown = false;
    $("#splitterHidden").css("visibility", "hidden");
});

function resizeCollumns(width, height) {

    if (layoutResizeOrientation === "top") {
        if (height >= 20) {
            if ($(leftColumn).css("visibility") === "hidden") {
                $(leftColumn).css("visibility", "visible");
                setTimeout(function() {
                    htmlEditor.refresh();
                    cssEditor.refresh();
                    jsEditor.refresh();
                }, 10); // or 10, 100
            }
            reiszeLayoutType(false, height + "%", (100 - height) + "%");
        }
    } else if (layoutResizeOrientation === "left") {
        if ($(leftColumn).css("visibility") === "hidden") {
            $(leftColumn).css("visibility", "visible");
            setTimeout(function() {
                htmlEditor.refresh();
                cssEditor.refresh();
                jsEditor.refresh();
            }, 10); // or 10, 100
        }
        if (width >= 20) {
            reiszeLayoutType(false, width + "%", (100 - width) + "%");
        }


    } else if (layoutResizeOrientation === "right") {
        if (width <= 80) {
            if ($(leftColumn).css("visibility") === "hidden") {
                $(leftColumn).css("visibility", "visible");
                setTimeout(function() {
                    htmlEditor.refresh();
                    cssEditor.refresh();
                    jsEditor.refresh();
                }, 10); // or 10, 100
            }
            reiszeLayoutType(false, (100 - width) + "%", width + "%");
        }

    } else {
        if (height <= 80) {
            if ($(leftColumn).css("visibility") === "hidden") {
                $(leftColumn).css("visibility", "visible");
                setTimeout(function() {
                    htmlEditor.refresh();
                    cssEditor.refresh();
                    jsEditor.refresh();
                }, 10); // or 10, 100
            }
            reiszeLayoutType(false, (100 - height) + "%", height + "%");
        }
    }
}



// function that change layout by disabling elements and changing flex parameter
// inside wrappers

function midLayout() {
    layoutResizeOrientation = "top";
    $(mainWrapper).css("flex-direction", "column");
    layoutType = "small";
    reiszeLayoutType(true);
    $("#splitter").css("height", splitterSize + "px").css("width", "100%").css("border-top-width", borderWidth + "px").css("border-bottom-width", borderWidth + "px").css("border-left-width", "0px").css("border-right-width", "0px");
    $("#splitterHidden").css("height", splitterHiddenSize + "px").css("width", "100%").css("top", (((splitterHiddenSize / 2) - (splitterSize / 2)) * -1) + "px").css("left", "0px");
    layoutOrientation = "topBottom";
    observer.disconnect();
}

function layoutLeft() {
    layoutResizeOrientation = "left";
    $(layoutBtnLeft).addClass("active-svg-btn");
    $(layoutBtnRight).removeClass("active-svg-btn");
    $(layoutBtnTop).removeClass("active-svg-btn");
    $(layoutBtnBottom).removeClass("active-svg-btn");
    $(mainWrapper).css("flex-direction", "row");
    activateLayoutSide();
    layoutOrientation = "side";
    observer.observe(rightCol, {
        attributes: true //configure it to listen to attribute changes
    });
}

function layoutRight() {
    layoutResizeOrientation = "right";
    $(layoutBtnRight).addClass("active-svg-btn");
    $(layoutBtnLeft).removeClass("active-svg-btn");
    $(layoutBtnTop).removeClass("active-svg-btn");
    $(layoutBtnBottom).removeClass("active-svg-btn");
    $(mainWrapper).css("flex-direction", "row-reverse");
    activateLayoutSide();
    layoutOrientation = "side";
    observer.observe(rightCol, {
        attributes: true //configure it to listen to attribute changes
    });

}

function layoutTop() {
    layoutResizeOrientation = "top";
    $(layoutBtnTop).addClass("active-svg-btn");
    $(layoutBtnRight).removeClass("active-svg-btn");
    $(layoutBtnLeft).removeClass("active-svg-btn");
    $(layoutBtnBottom).removeClass("active-svg-btn");
    $(mainWrapper).css("flex-direction", "column");
    activateLayoutTop();
    layoutOrientation = "topBottom";
    observer.disconnect(); // don't ipdate on right column change

}

function layoutBottom() {
    layoutResizeOrientation = "bottom";
    $(layoutBtnBottom).addClass("active-svg-btn");
    $(layoutBtnRight).removeClass("active-svg-btn");
    $(layoutBtnTop).removeClass("active-svg-btn");
    $(layoutBtnLeft).removeClass("active-svg-btn");
    $(mainWrapper).css("flex-direction", "column-reverse");
    activateLayoutTop();
    layoutOrientation = "topBottom";
    observer.disconnect(); // don't ipdate on right column change
}

function activateLayoutTop() {
    layoutType = "top";
    $(leftColumn).css("flex-direction", "row");
    reiszeLayoutType(true);
    $("#splitter").css("height", splitterSize + "px").css("width", "100%").css("border-top-width", borderWidth + "px").css("border-bottom-width", borderWidth + "px").css("border-left-width", "0px").css("border-right-width", "0px");
    $("#splitterHidden").css("height", splitterHiddenSize + "px").css("width", "100%").css("top", (((splitterHiddenSize / 2) - (splitterSize / 2)) * -1) + "px").css("left", "0px");

}

function activateLayoutSide() {
    layoutType = "side";
    $(leftColumn).css("flex-direction", "column");
    reiszeLayoutType(true);
    $("#splitter").css("width", splitterSize + "px").css("height", "100%").css("border-left-width", borderWidth + "px").css("border-right-width", borderWidth + "px").css("border-top-width", "0px").css("border-bottom-width", "0px");
    $("#splitterHidden").css("width", splitterHiddenSize + "px").css("height", "100%").css("left", (((splitterHiddenSize / 2) - (splitterSize / 2)) * -1) + "px").css("top", "0px");
}



// LAYOUT BUTTONS
// buttons for layout on top of the page LEFT, RIGHT, TOP, BOTTOM

$(layoutBtnLeft).on("click", function() {
    layoutLeft();
    updateWidthOnResize();
});

$(layoutBtnRight).on("click", function() {
    layoutRight();
    updateWidthOnResize();
});

$(layoutBtnTop).on("click", function() {
    layoutTop();
    updateWidthOnResize();
});

$(layoutBtnBottom).on("click", function() {
    layoutBottom();
    updateWidthOnResize();
});



///  font size and collumn size buttons

$(fontSizeBtnNormal).on("click", function() {
    $(".CodeMirror").css("font-size", fontSize + "px");
    $(fontSizeBtnNormal).addClass("active-svg-btn");
    $(fontSizeBtn2x).removeClass("active-svg-btn");
    $(fontSizeBtn4x).removeClass("active-svg-btn");
    htmlEditor.setValue(fetchHtml());
    cssEditor.setValue(fetchCSS());
    jsEditor.setValue(fetchJS());
});

$(fontSizeBtn2x).on("click", function() {
    $(".CodeMirror").css("font-size", (fontSize + 2) + "px");
    $(fontSizeBtn2x).addClass("active-svg-btn");
    $(fontSizeBtnNormal).removeClass("active-svg-btn");
    $(fontSizeBtn4x).removeClass("active-svg-btn");
    htmlEditor.setValue(fetchHtml());
    cssEditor.setValue(fetchCSS());
    jsEditor.setValue(fetchJS());

});

$(fontSizeBtn4x).on("click", function() {
    $(".CodeMirror").css("font-size", (fontSize + 4) + "px");
    $(fontSizeBtn4x).addClass("active-svg-btn");
    $(fontSizeBtn2x).removeClass("active-svg-btn");
    $(fontSizeBtnNormal).removeClass("active-svg-btn");
    htmlEditor.setValue(fetchHtml());
    cssEditor.setValue(fetchCSS());
    jsEditor.setValue(fetchJS());

});


// columns size

$(columnSizeBtnEmpty).on("click", function() {
    iframeWidth.innerHTML = window.innerWidth + " px";
    $(columnSizeBtnEmpty).addClass("active-svg-btn");
    $(columnSizeBtnMin).removeClass("active-svg-btn");
    $(columnSizeBtnMid).removeClass("active-svg-btn");
    $(columnSizeBtnMax).removeClass("active-svg-btn");
    $(columnSizeBtnFull).removeClass("active-svg-btn");
    reiszeLayoutType(false, "0", "100%");
    $(leftColumn).css("visibility", "hidden");

});


$(columnSizeBtnMin).on("click", function() {
    updateWidth();
    $(columnSizeBtnMin).addClass("active-svg-btn");
    $(columnSizeBtnEmpty).removeClass("active-svg-btn");
    $(columnSizeBtnMid).removeClass("active-svg-btn");
    $(columnSizeBtnMax).removeClass("active-svg-btn");
    $(columnSizeBtnFull).removeClass("active-svg-btn");
    reiszeLayoutType(false, "30%", "70%");
    if ($(leftColumn).css("visibility") === "hidden") {
        $(leftColumn).css("visibility", "visible");
    }

});

$(columnSizeBtnMid).on("click", function() {
    updateWidth();
    $(columnSizeBtnMid).addClass("active-svg-btn");
    $(columnSizeBtnEmpty).removeClass("active-svg-btn");
    $(columnSizeBtnMin).removeClass("active-svg-btn");
    $(columnSizeBtnMax).removeClass("active-svg-btn");
    $(columnSizeBtnFull).removeClass("active-svg-btn");
    reiszeLayoutType(false, "50%", "50%");
    if ($(leftColumn).css("visibility") === "hidden") {
        $(leftColumn).css("visibility", "visible");
    }
});

$(columnSizeBtnMax).on("click", function() {
    updateWidth();
    $(columnSizeBtnMax).addClass("active-svg-btn");
    $(columnSizeBtnEmpty).removeClass("active-svg-btn");
    $(columnSizeBtnMin).removeClass("active-svg-btn");
    $(columnSizeBtnMid).removeClass("active-svg-btn");
    $(columnSizeBtnFull).removeClass("active-svg-btn");
    reiszeLayoutType(false, "70%", "30%");
    if ($(leftColumn).css("visibility") === "hidden") {
        $(leftColumn).css("visibility", "visible");
    }
});


$(columnSizeBtnFull).on("click", function() {
    $(columnSizeBtnFull).addClass("active-svg-btn");
    $(columnSizeBtnEmpty).removeClass("active-svg-btn");
    $(columnSizeBtnMin).removeClass("active-svg-btn");
    $(columnSizeBtnMid).removeClass("active-svg-btn");
    $(columnSizeBtnMax).removeClass("active-svg-btn");
    reiszeLayoutType(false, "100%", "0");
    if ($(leftColumn).css("visibility") === "hidden") {
        $(leftColumn).css("visibility", "visible");
    }

});

function reiszeLayoutType(last, value1, value2) {
    value1 = value1 || "50%";
    value2 = value2 || "50%";
    if (!last) {
        lastVal1 = value1;
        lastVal2 = value2;
    } else if (lastVal1 !== "" && lastVal2 !== "") {
        value1 = lastVal1;
        value2 = lastVal2;
    }

    if (layoutType === "top") {
        changeDimension = "height";
        noChangeDimension = "width";
        $(htmlCMSection).removeClass('widthSide widthTopSmall').addClass('widthTop');
        $(cssCMSection).removeClass('widthSide widthTopSmall').addClass('widthTop');
        $(jsCMSection).removeClass('widthSide widthTopSmall').addClass('widthTop');
    } else if (layoutType === "side") {
        changeDimension = "width";
        noChangeDimension = "height";
        $(htmlCMSection).removeClass('widthTop widthTopSmall').addClass('widthSide');
        $(cssCMSection).removeClass('widthTop widthTopSmall').addClass('widthSide');
        $(jsCMSection).removeClass('widthTop widthTopSmall').addClass('widthSide');
    } else {
        changeDimension = "height";
        noChangeDimension = "width";
        $(htmlCMSection).removeClass('widthSide widthTop').addClass('widthTopSmall');
        $(cssCMSection).removeClass('widthSide widthTop').addClass('widthTopSmall');
        $(jsCMSection).removeClass('widthSide widthTop').addClass('widthTopSmall');
    }
    $(leftColumn).css(noChangeDimension, "100%");
    $(rightColumn).css(noChangeDimension, "100%");
    $(leftColumn).css(changeDimension, value1);
    $(rightColumn).css(changeDimension, value2);
}


// implementation for checkbox inputs for iframe ruler and iframe width

$("#iframeRulerBtn").click(function() {
    if ($("#iframeRuler").css("display") !== "block") {
        $("#iframeRuler").css("display", "block");
        $("#iframeRulerBtn").addClass("active-btn");
    } else {
        $("#iframeRulerBtn").removeClass("active-btn");
        $("#iframeRuler").css("display", "none");
    }
});

$("#iframeWidthBtn").click(function() {

    if ($("#iframeWidth").css("display") !== "block") {
        $("#iframeWidth").css("display", "block");
        $("#iframeWidthBtn").addClass("active-btn");
    } else {
        $("#iframeWidthBtn").removeClass("active-btn");
        $("#iframeWidth").css("display", "none");
    }
});



/// implementation for outer window preview

$('#outerWindowOpen').click(function(event) {
    event.stopImmediatePropagation();
    if (outerWindowFrame && !outerWindowFrame.closed) {
        return;
    }
    var options = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=800, top=50, left=500";
    outerWindowFrame = window.open("", "Preview", options);
    outerWindow = true;
    updateIframe();

});