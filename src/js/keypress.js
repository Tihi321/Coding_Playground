/*
Shortcuts
ctrl + alt + 
num0 --> activate slider
num1 - num3 --> set focus to html, css or js editor
num4 - num6 --> html, css, js size preset
num7 - num9 --> html, css, js on off
1 - 5 --> layout size presets
7 - 0 --> left, top, right, bottom view
num+ --> font size presets
num- --> font size presets
w --> autoupdate
r --> update frame
l --> layout screen
b --> css screen
s --> javascript screen
p --> projects screen
x --> export/save screen
a --> add new file
c --> export current project
m --> iframe ruler
n --> iframe width meter
j --> Js Lint
k --> Css Lint
g --> play css code
f --> full screen
h --> preview window
t --> inlet color picker
y --> inlet slider
f11 --> codemirror editor full screen
*/
document.onkeydown = keydown;

function keydown(evt) {

    if (!evt){ evt = event;}

    if (evt.ctrlKey && evt.altKey && evt.keyCode === 96) {
        $(".ui-slider-handle").focus();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 49) {
        $(columnSizeBtnEmpty).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 50) {
        $(columnSizeBtnMin).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 51) {
        $(columnSizeBtnMid).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 52) {
        $(columnSizeBtnMax).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 53) {
        $(columnSizeBtnFull).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 107) {
        fontSizePlus();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 109) {
        fontSizeSmall();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 103) {
        $(htmlRemoveBtn).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 104) {
        $(cssRemoveBtn).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 105) {
        $(jsRemoveBtn).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 100) {
        htmlReSize();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 101) {
        cssReSize();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 102) {
        jsReSize();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 55) {
        if (screenSize === 1) {
            layoutLeft();
        }
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 56) {
        if (screenSize === 1) {
            layoutTop();
        }
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 57) {
        if (screenSize === 1) {
            layoutRight();
        }
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 48) {
        if (screenSize === 1) {
            layoutBottom();
        }
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 87) {
        $(autoDisableBtn).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 82) {
        updateIframe();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 88) {
        $(layoutSettingsBtn).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 67) {
        $(exportCurrentProject).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 68) {
        $(addNewFileWindowBtn).click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 97) {
        htmlEditor.focus();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 98) {
        cssEditor.focus();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 99) {
        jsEditor.focus();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 78) {
        $('input[name=iframeWidth]').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 77) {
        $('input[name=iframeRuler]').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 74) {
        $('input[name=cmJsLint]').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 75) {
        $('input[name=cmCssLint]').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 70) {
        $("header").toggle();
        $("footer").toggle();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 72) {
        $('#outerWindowOpen').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 71) {
        $('#playCodeCss').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 84) {
        $('input[name=cmCPicker]').click();
    } else if (evt.ctrlKey && evt.altKey && evt.keyCode === 89) {
        $('input[name=cmInSlider]').click();
    }
}

function fontSizePlus() {
    if (fontSizeNum < 3) {
        fontSizeNum++;
        setFontSize();
    }

}

function fontSizeSmall() {
    if (fontSizeNum > 1) {
        fontSizeNum--;
        setFontSize();
    }
}

function setFontSize() {
    switch (fontSizeNum) {
        case 1:
            $(fontSizeBtnNormal).click();
            break;
        case 2:
            $(fontSizeBtn2x).click();
            break;
        case 3:
            $(fontSizeBtn4x).click();
            break;
        default:
            break;
    }
}