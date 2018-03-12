(function () {
    // document.addEventListener("DOMContentLoaded", function(event) {

    var internetExplorer;

    var ua = navigator.userAgent.toLowerCase();
    var safari = false;
    try {
      safari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(!window['safari'] || safari.pushNotification);
    } catch (err) {}

    safari = (safari || ((ua.indexOf('safari') != -1) && (!(ua.indexOf('chrome') != -1) && (ua.indexOf('version/') != -1))));

    if (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
      internetExplorer = true;
    }


    //locks screen to portrait on mobile
    if (!isBrowserEdge() && !internetExplorer && !safari) {

      screen.orientation.lock('portrait').catch(function () {});

    }

    if (safari) {
      console.log("Safari");
      safariOverlay();
      return;
    }

    function isBrowserEdge() {
      return typeof CSS !== 'undefined' && CSS.supports("(-ms-ime-align:auto)");
    }

    function safariOverlay() {
      $("body").prepend("<div class=\"overlay\"></div>");
      $(".overlay").css({
        "position": "absolute",
        "width": "100vw",
        "height": "100vh",
        "z-index": 99999,
        "background-color": "#000",
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-items": "center"

      }).prepend("<div class=\"safari-msg\"><div>Please use different browser, Safari is not supported, Thanks</div><div>Molim koristite drugi pretraživač, Safari nije podržan, Hvala</div></div>");
      $(".safari-msg").css({
        "background-color": "#ddd",
        "background-image": "linear-gradient(top, #bbb, #eee)",
        "padding":"0 4em", 
        "border":"5px solid #f47321"
      }).children().css({
        "color": "#111", 
        "font-size": "1.5em",
        "margin":"1em 0"
      });
    }
///////     GLOBAL VARIABLES         ////////
var libsJs = []; // array for storing javascript libraries
var libsCss = []; // array for storing css libraries
var disableAutoload = 2;
var cssObject = {}; // storing css data
var jsObject = {}; // storing js data
var doc = $("#live_update")[0].contentWindow.document; // iframe document, used in updateiframe function
var html = ""; // stores fetched data from codemirror html textarea
var css = ""; // stores fetched data from codemirror css textarea
var js = ""; // stores fetched data from codemirror js textarea
var stringJs = "";
var stringCss = "";
var complCss = "";
var complJs = "";
var codeSnips = []; // main object for projects
var codeSnipsLoad = [];
var codeSnipsTemplates = [];
var codeSnipsImport = [];
var codeSnipsSnippets = [];
var codeSnipsTools = [];
var codeSnipsShared = [];
var folderNameToggle = 1; /// toggle for file name window, between js and css
var saveNames = []; // name of the save, used to populate option under load window
var cssPre = ""; // css preprocesor
var jsPre = ""; // javascript preprocesor
var jsDom = "inbody"; // variable where to put javascript files body or head
var fontSizeNum = 1; // switch for font size shortcut keys
var screenSize = 0; // used for switching between buttons for removing and enlarging html, css, js on small and bigger screens
var babelJsVersion = ""; // storing babel version
var em = false; // switch between px and em in iframe width, under section
var startLayout = true; // start at beggining with layout left, under media queries
var layoutOrientation = ""; // used to remove mutation listener on layout change for right column
var jsLint = true;
var cssLint = true;
var outerWindow = false;
var outerWindowFrame;
var outerWindowTitle = "";
var fullScreenBtn = ".full-screen";
var commandsCodeSize = "";
var commandsLayoutType = "";
var playCode = false;
var plaCssCodeStart;
var nohtml, nocss, nojs, cssonly, htmlonly, jsonly;
var addStartJs = false;
var addStartCode = "";
var cMGutters = false;
var layoutType;
var changeDimension;
var noChangeDimension;
var lastVal1 = "",
    lastVal2 = "";
var splitterSize = 15;
var splitterHiddenSize = 800;
var layoutResizeOrientation = "";
var borderWidth = 1;

/// mutation observer for changes in atributes for right collumn, connects under side layouts
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var mostUsedJs = [{
    name: "Jquery 3.2",
    value: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
}, {
    name: "Jquery-UI 1.12",
    value: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
}, {
    name: "Bodymovin 4.1",
    value: "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.10.0/bodymovin.min.js"
}, {
    name: "Motionbump 0.1",
    value: "https://motionbumpcom.ipage.com/Subdomains/libraries/motionbump/js/mb.libs.min.js"
}, {
    name: "Angular 1.65",
    value: "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js"
}, {
    name: "Backbone 1.3",
    value: "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"
}, {
    name: "Bootstrap 4.0",
    value: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"
}, {
    name: "Bootstrap-3.3",
    value: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"
}, {
    name: "Ember 2.13",
    value: "https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.13.3/ember.min.js"
}, {
    name: "Foundation 6.4",
    value: "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.1/js/foundation.min.js"
}, {
    name: "Tween-max 1.20",
    value: "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"
}, {
    name: "Lodash 4.17",
    value: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"
}, {
    name: "Modernizr 2.83",
    value: "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"
}, {
    name: "Polymer 0.5.6",
    value: "https://cdnjs.cloudflare.com/ajax/libs/polymer/0.5.6/polymer.min.js"
}, {
    name: "React 15.6",
    value: "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"
}, {
    name: "React-dom 15.6",
    value: "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"
}, {
    name: "Snap.svg 0.5",
    value: "https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"
}, {
    name: "Three.js 86",
    value: "https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"
}, {
    name: "Underscore 1.8",
    value: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"
}, {
    name: "Vue 2.3.4",
    value: "https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js"
}, {
    name: "Zepto 1.2",
    value: "https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"
}, {
    name: "Zing-chart",
    value: "https://cdn.zingchart.com/zingchart.min.js"
}, {
    name: "FlowTypet 1.1",
    value: "https://cdnjs.cloudflare.com/ajax/libs/Flowtype.js/1.1.0/flowtype.min.js"
}];





var mostUsedCss = [{
    name: "Reset",
    value: "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
}, {
    name: "Normalize",
    value: "https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
}, {
    name: "Jquery-UI",
    value: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css"
}, {
    name: "Bootstrap 4.0",
    value: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
}, {
    name: "Bootstrap 3.3.7",
    value: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
}, {
    name: "Foundation 6.3",
    value: "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/css/foundation.min.css"
}, {
    name: "Animate.css 3.5",
    value: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
}, {
    name: "Materialize 0.98",
    value: "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css"
}, {
    name: "Bulma 0.4",
    value: "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.2/css/bulma.min.css"
}, {
    name: "Font-awesome 4.7",
    value: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
}, {
    name: "Font-awesome-anim 0.0.1",
    value: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome-animation/0.0.10/font-awesome-animation.min.css"
}, {
    name: "Material-design-iconic 2.2",
    value: "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
}];


/// global elements

var autoDisableBtn = "#autoUpdate";
var runCodeBtn = ".run-code";

var layoutSettingsBtn = "#layoutSettingsBtn";
var cssSettingsBtn = "#cssSettingsBtn";
var javascriptSettingsBtn = "#javascriptSettingsBtn";
var projectsSettingsBtn = "#projectsSettingsBtn";
var exportSettingsBtn = "#exportSettingsBtn";

var submenuLayoutBtn = "#subMenuLayout";
var submenuCssBtn = "#subMenuLibraries";
var submenuJSBtn = "#subMenuSave";
var submenuProjectsBtn = "#subMenuProjects";
var submenuExportBtn = "#subMenuExport";

var layoutButtonWrapper = ".layoutButWrapper";
var fontSizeBtnWrapper = ".font-col-size";

var htmlTitleBg = "#htmlTitle";
var cssTitleBg = "#cssTitle";
var jsTitleBg = "#jsTitle";

var fontSizeBtnNormal = "#fontNormal";
var fontSizeBtn2x = "#font2x";
var fontSizeBtn4x = "#font4x";

var columnSizeBtnEmpty = "#collMinFull";
var columnSizeBtnMin = "#colMin";
var columnSizeBtnMid = "#colMid";
var columnSizeBtnMax = "#colMax";
var columnSizeBtnFull = "#colMaxFull";

var htmlRemoveBtn = "#htmlButRemove";
var cssRemoveBtn = "#cssButRemove";
var jsRemoveBtn = "#jsButRemove";

var htmlSizePlus = "#htmlBut";
var cssSizePlus = "#cssBut";
var jsSizePlus = "#javascriptBut";

var htmlCMSection = ".html";
var cssCMSection = ".css";
var jsCMSection = ".javascript";

var mainWrapper = ".wrapper";
var leftColumn = ".left-col";
var rightColumn = ".right-col";

var layoutBtnLeft = "#btnLayout-l";
var layoutBtnRight = "#btnLayout-r";
var layoutBtnTop = "#btnLayout-t";
var layoutBtnBottom = "#btnLayout-b";

/// windows 
var floatingWindow = ".floating-window-base";
var closeBtnWindowBase = ".close-btn-window";
var settingsWindow = "#settingsPopWindow";
var infoWindowBtn = "#infoWindowBtn";
var infoWindow = "#infoWindow";

var submenuLayoutWrapper = "#layoutSettingsWrapper";
var submenuCssWrapper = "#cssSettingsWrapper";
var submenuJsWrapper = "#jsSettingsWrapper";
var submenuProjectsWrapper = "#projectsSettingsWrapper";
var submenuExportWrapper = "#exportSettingsWrapper";

var addExternalLibraryBtnCss = "#addExternalCssLibrary";
var librariesTextareaCss = '#libTextareaCss';

var addExternalLibraryBtnJs = "#addExternalJsLibrary";
var librariesTextareaJs = '#libTextareaJs';

var confirmationBox = "#confirmBox";
var addNewFileWindow = "#addFileWindow";
var addNewFileInput = '#addFolder';
var addFileBtn = "#addFiles";
var addNewFileWindowBtn = ".add-new-file";

var loadFilesBtn = "#loadFiles";
var importLoadedFiles = "#importLoadFiles";
var saveFilesBtn = "#saveFiles";
var saveNameInput = '#saveName';
var loadImportedFiles = "#loadImportedFiles";
var exportCurrentProject = "#exportOneProjectFiles";

var exportAllProjects = "#exportProjectFiles";
var importJsonProject = "#importProjectFiles";

var loadTemplateFiles = "#loadTemplateFiles";
var importSnippetsFiles = "#importSnippetFiles";
var importToolsFiles = "#importToolFiles";
var loadPortfolioFiles = "#loadProjectFiles";

var CMColorPalleteUpdate1 = "#updateColorOne";
var CMColorPalleteUpdate2 = "#updateColorTwo";
var CMColorPalleteUpdate3 = "#updateColorThree";
var CMColorPalleteUpdate4 = "#updateColorFour";
var CMColorPalleteUpdate5 = "#updateColorFive";

var infoSharedTitles = "#infoShared";

var colorPalette1, colorPalette2, colorPalette3, colorPalette4, colorPalette5;

var select = document.getElementById("loadSelect");
var selectCssFileNames = document.getElementById("optionCssFiles");
var selectJsFileNames = document.getElementById("optionJsFiles");
var selectPreCss = document.getElementById("preCssSelect");
var selectPreJs = document.getElementById("preJsSelect");
var selectLoadType = document.getElementById("loadTypeSelect");
var selectLoadImport = document.getElementById("loadImportSelect");
var selectLoadProjects = document.getElementById("loadProjectSelect");
var selectTemplateProjects = document.getElementById("loadTemplateSelect");
var selectImportSnippets = document.getElementById("importSnippetSelect");
var selectImportTools = document.getElementById("importToolsSelect");
var usedLibsJs = document.getElementById("jsLibsUsed");
var usedLibsCss = document.getElementById("cssLibsUsed");
var rightCol = document.querySelector('#right-col');
var iframeWidth = document.querySelector('#iframeWidth');


/// resizable collumns

var splitter = document.getElementById("splitter");
var splitterHidden = document.getElementById("splitterHidden");
var curYPos, curXPos, curDown;



/// setting global variables
cssObject.base = "";
jsObject.master = "";

// footer buttons variables
var fontSize = 18;
var windowSizeToggle = 0;

////code at start

var codeAtStartJs = {
    playWithLib: "var startAnimation = true;",
};

////code at start end


///////     START EVENTS       ////////

Sass.setWorkerUrl('js/libraries/sass/sass.worker.min.js');

loadLocalJson();
populateMostUsedJs();
populateMostUsedCss();

/// Click events for big screen buttons HTML, CSS Javascript inside header
/// when page loads add click events for big screen

buttonsFieldAssignBig();

/// sets font and layout outline

$(fontSizeBtnNormal).addClass("active-svg-btn");

// vieport height listener

var bg = $("#content");

function resizeBackground() {
    bg.height($(window).height());
}

$(window).resize(resizeBackground);
resizeBackground();

// remove preview for microsoft edge

if (isBrowserEdge()) {
    $("#outerWindowOpen").css("display", "none");
}




/// address url bar implementation, for sharing purposes

var startCommands = "";
var startProjectNameFull = "";
var startProjectName = "";
var startSharedName = "";
var addressUrl = document.URL.split('?');
if (addressUrl.length > 1) {
    startProjectNameFull = addressUrl[1].split('&');
}
if (startProjectNameFull.length > 1) {
    startCommands = startProjectNameFull[1].split('-');
}

for (var i = 0; i <= startCommands.length - 1; i++) {
    switch (startCommands[i]) {
        case "fullscreen":
            $("header").toggle();
            $("footer").toggle();
            commandsCodeSize = "preview";
            break;
        case "playcss":
            plaCssCodeStart = true;
            break;
        case "preview":
            commandsCodeSize = "preview";
            break;
        case "nohtml":
            nohtml = true;
            break;
        case "nocss":
            nocss = true;
            break;
        case "nojs":
            nojs = true;
            break;
        case "cssonly":
            cssonly = true;
            break;
        case "htmlonly":
            htmlonly = true;
            break;
        case "jsonly":
            jsonly = true;
            break;
        case "min":
            commandsCodeSize = "min";
            break;
        case "right":
            commandsLayoutType = "right";
            break;
        case "left":
            commandsLayoutType = "left";
            break;
        case "top":
            commandsLayoutType = "top";
            break;
        case "bottom":
            commandsLayoutType = "bottom";
            break;
        case "play":
            addStartJs = true;
            addJsCodeStart("playWithLib");
            break;
        default:
            break;
    }
}

if (startProjectNameFull !== "") {
    var projectType = startProjectNameFull[0].split('=');
    if (projectType[0] === "p") {
        startProjectName = projectType[1];
    }
    if (projectType[0] === "s") {
        startSharedName = projectType[1];
    }
}

function addJsCodeStart(code) {

    addStartCode += (codeAtStartJs[code] + "\n");
}
function removeFromArray(array, value) {
    var i = array.length;
    while (i--) {
        if (array[i] === value) { array.splice(i, 1); }
    }
}
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
    $(".CodeMirror-sizer").css("font-size", fontSize + "px");
    $(fontSizeBtnNormal).addClass("active-svg-btn");
    $(fontSizeBtn2x).removeClass("active-svg-btn");
    $(fontSizeBtn4x).removeClass("active-svg-btn");
    htmlEditor.setValue(fetchHtml());
    cssEditor.setValue(fetchCSS());
    jsEditor.setValue(fetchJS());
});

$(fontSizeBtn2x).on("click", function() {
    $(".CodeMirror-sizer").css("font-size", (fontSize + 2) + "px");
    $(fontSizeBtn2x).addClass("active-svg-btn");
    $(fontSizeBtnNormal).removeClass("active-svg-btn");
    $(fontSizeBtn4x).removeClass("active-svg-btn");
    htmlEditor.setValue(fetchHtml());
    cssEditor.setValue(fetchCSS());
    jsEditor.setValue(fetchJS());

});

$(fontSizeBtn4x).on("click", function() {
    $(".CodeMirror-sizer").css("font-size", (fontSize + 4) + "px");
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
/////////     CODEMIRROR               ////////////

var value = "// The bindings defined specifically in the Sublime Text mode\nvar bindings = {\n";
var map = CodeMirror.keyMap.sublime;
for (var key in map) {
    if (map.hasOwnProperty(key)) {
        var val = map[key];
        if (key !== "fallthrough" && val !== "..." && (!/find/.test(val) || /findUnder/.test(val))) {
            value += "  \"" + key + "\": \"" + val + "\",\n";
        }
    }
}

value += "}\n\n// The implementation of joinLines\n";
value += CodeMirror.commands.joinLines.toString().replace(/^function\s*\(/, "function joinLines(").replace(/\n  /g, "\n") + "\n";

var cmGutterOptions = {
    noBreakLint: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    breakNoLint: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"],
    lintNoBreak: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    lintBreak: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"]
};

var emmetKeymap = {
    'Alt-Shift-Q': 'emmet.expand_abbreviation',
    'Tab': 'emmet.expand_abbreviation_with_tab',
    'Ctrl-E': 'emmet.balance_outward',
    'Shift-Ctrl-E': 'emmet.balance_inward',
    'Cmd-M': 'emmet.matching_pair',
    'Shift-Ctrl-A': 'emmet.wrap_with_abbreviation',
    'Ctrl-Alt-Right': 'emmet.next_edit_point',
    'Ctrl-Alt-Left': 'emmet.prev_edit_point',
    'Cmd-L': 'emmet.select_line',
    'Cmd-Shift-M': 'emmet.merge_lines',
    'Cmd-/': 'emmet.toggle_comment',
    'Cmd-J': 'emmet.split_join_tag',
    'Cmd-K': 'emmet.remove_tag',
    'Shift-Cmd-Y': 'emmet.evaluate_math_expression',
    'Ctrl-Up': 'emmet.increment_number_by_1',
    'Ctrl-Down': 'emmet.decrement_number_by_1',
    'Ctrl-Alt-Up': 'emmet.increment_number_by_01',
    'Ctrl-Alt-Down': 'emmet.decrement_number_by_01',
    'Shift-Ctrl-Up': 'emmet.increment_number_by_10',
    'Shift-Ctrl-Down': 'emmet.decrement_number_by_10',
    'Shift-Cmd-.': 'emmet.select_next_item',
    'Shift-Cmd-,': 'emmet.select_previous_item',
    'Cmd-B': 'emmet.reflect_css_value',
    'Enter': 'emmet.insert_formatted_line_break_only'
};

// Initialize HTML editor
var htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
    mode: "text/html",
    styleActiveLine: true,
    theme: "ambiance",
    tabMode: "indent",
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    showCursorWhenSelecting: true,
    keyMap: "sublime",
    dragDrop: true,
    foldGutter: true,
    matchTags: true,
    matchBrackets: true,
    scrollbarStyle: "overlay",
    scrollPastEnd: true,
    gutters: cmGutterOptions.noBreakLint,
    profile: 'html',
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Alt-F": "findPersistent",
        "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); },
        "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")) { cm.setOption("fullScreen", false); }
        }
    },
    paletteHints: true
});

Inlet(htmlEditor);
emmetCodeMirror(htmlEditor);

var cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
    mode: "text/css",
    theme: "ambiance",
    tabMode: "indent",
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    showCursorWhenSelecting: true,
    keyMap: "sublime",
    dragDrop: true,
    foldGutter: true,
    matchTags: true,
    matchBrackets: true,
    scrollbarStyle: "overlay",
    scrollPastEnd: true,
    gutters: cmGutterOptions.lintNoBreak,
    profile: 'css',
    extraKeys: {
        "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); },
        "Alt-F": "findPersistent",
        "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")) { cm.setOption("fullScreen", false); }
        }

    },
    paletteHints: true,
    lint: true
});

Inlet(cssEditor);
emmetCodeMirror(cssEditor);

// change keys for emmet and sublime
var htmlKeysEmmet = new emmetCodeMirror(htmlEditor);
var cssKeysEmmet = new emmetCodeMirror(cssEditor);
htmlKeysEmmet.state.keyMaps[0] = emmetKeymap;
htmlKeysEmmet.state.keyMaps[1] = emmetKeymap;
cssKeysEmmet.state.keyMaps[0] = emmetKeymap;
cssKeysEmmet.state.keyMaps[1] = emmetKeymap;

var jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
    mode: { name: "javascript", globalVars: false },
    theme: "ambiance",
    tabMode: "indent",
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    showCursorWhenSelecting: true,
    keyMap: "sublime",
    foldGutter: true,
    matchBrackets: true,
    matchTags: true,
    dragDrop: true,
    scrollbarStyle: "overlay",
    scrollPastEnd: true,
    gutters: cmGutterOptions.lintNoBreak,
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Alt-F": "findPersistent",
        "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); },
        "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")) { cm.setOption("fullScreen", false); }
        }
    },
    paletteHints: true,
    lint: true
});
Inlet(jsEditor);

// Codemirror ger value of fields

function fetchHtml() {
    var htmlCode = htmlEditor.getValue();
    return htmlCode;
}

function fetchCSS() {
    var cssCode = cssEditor.getValue();
    return cssCode;
}

function fetchJS() {
    var jsCode = jsEditor.getValue();
    return jsCode;
}



// gutters

htmlEditor.on("gutterClick", function(cm, n) {
    if (cMGutters) {
        var info = cm.lineInfo(n);
        var options = info.gutterMarkers;
        if (info.gutterMarkers !== null) {
            if (info.gutterMarkers.hasOwnProperty("CodeMirror-foldgutter")) {
                options = info.gutterMarkers.breakpoints;
            }
        }
        cm.setGutterMarker(n, "breakpoints", options ? null : makeMarker());
    }
});

cssEditor.on("gutterClick", function(cm, n) {
    if (cMGutters) {
        var info = cm.lineInfo(n);
        var options = info.gutterMarkers;
        if (info.gutterMarkers !== null) {
            if (info.gutterMarkers.hasOwnProperty("CodeMirror-foldgutter")) {
                options = info.gutterMarkers.breakpoints;
            }
        }
        cm.setGutterMarker(n, "breakpoints", options ? null : makeMarker());
    }
});

jsEditor.on("gutterClick", function(cm, n) {
    if (cMGutters) {
        var info = cm.lineInfo(n);
        var options = info.gutterMarkers;
        if (info.gutterMarkers !== null) {
            if (info.gutterMarkers.hasOwnProperty("CodeMirror-foldgutter")) {
                options = info.gutterMarkers.breakpoints;
            }
        }
        cm.setGutterMarker(n, "breakpoints", options ? null : makeMarker());
    }
});


function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#C1C1C1";
    marker.innerHTML = "●";
    return marker;
}


$('input[name=cmBreakGutt]').change(function() {

    if ($(this).is(':checked')) {

        cMGutters = true;

        htmlEditor.setOption("gutters", cmGutterOptions.breakNoLint);

        if (cssLint) {
            cssEditor.setOption("gutters", cmGutterOptions.lintBreak);
        } else {
            cssEditor.setOption("gutters", cmGutterOptions.breakNoLint);
        }

        if (jsLint) {
            jsEditor.setOption("gutters", cmGutterOptions.lintBreak);
        } else {
            jsEditor.setOption("gutters", cmGutterOptions.breakNoLint);
        }

    } else {

        cMGutters = false;

        htmlEditor.setOption("gutters", cmGutterOptions.noBreakLint);

        if (cssLint) {
            cssEditor.setOption("gutters", cmGutterOptions.lintNoBreak);
        } else {
            cssEditor.setOption("gutters", cmGutterOptions.noBreakLint);
        }

        if (jsLint) {
            jsEditor.setOption("gutters", cmGutterOptions.lintNoBreak);
        } else {
            jsEditor.setOption("gutters", cmGutterOptions.noBreakLint);
        }
    }
});

// implementation for checkbox inputs for linters

$('input[name=cmCssLint]').change(function() {
    if ($(this).is(':checked')) {
        cssLint = true;
        if (cMGutters) {
            cssEditor.setOption("gutters", cmGutterOptions.lintBreak);
        } else {
            cssEditor.setOption("gutters", cmGutterOptions.lintNoBreak);
        }
        cssEditor.setOption("lint", true);
    } else {
        cssLint = false;
        if (cMGutters) {
            cssEditor.setOption("gutters", cmGutterOptions.breakNoLint);
        } else {
            cssEditor.setOption("gutters", cmGutterOptions.noBreakLint);
        }
        cssEditor.setOption("lint", false);
    }
});

$('input[name=cmJsLint]').change(function() {
    if ($(this).is(':checked')) {
        jsLint = true;
        if (cMGutters) {
            jsEditor.setOption("gutters", cmGutterOptions.lintBreak);
        } else {
            jsEditor.setOption("gutters", cmGutterOptions.lintNoBreak);
        }

        jsEditor.setOption("lint", true);
    } else {
        jsLint = false;
        if (cMGutters) {
            jsEditor.setOption("gutters", cmGutterOptions.breakNoLint);
        } else {
            jsEditor.setOption("gutters", cmGutterOptions.noBreakLint);
        }

        jsEditor.setOption("lint", false);
    }
});



/// iplementation of code format

$("#formatHtmlCode").click(function(e) {
    e.stopImmediatePropagation();
    autoFormatSelection(htmlEditor);
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");
});

$("#formatCssCode").click(function(e) {
    e.stopImmediatePropagation();
    autoFormatSelection(cssEditor);
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");
});

$("#formatJsCode").click(function(e) {
    e.stopImmediatePropagation();
    autoFormatSelection(jsEditor);
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");
});


function autoFormatSelection(editor) {
    var range = getSelectedRange(editor);
    editor.autoFormatRange(range.from, range.to);
}


function getSelectedRange(editor) {
    return { from: editor.getCursor(true), to: editor.getCursor(false) };
}


// color picker and slider toggle
/* jshint ignore:start */
$('input[name=cmCPicker]').change(function() {
    if ($(this).is(':checked')) {
        inletPickerVisibility = "visible";
        $(".picker").css("visibility", "visible");
    } else {
        inletPickerVisibility = "hidden";
        $(".picker").css("visibility", "hidden");
    }
});
/* jshint ignore:end */

$(".inlet_slider").css("display", "none");
$('input[name=cmInSlider]').change(function() {
    if ($(this).is(':checked')) {
        $(".inlet_slider").css("display", "inline-block");
    } else {
        $(".inlet_slider").css("display", "none");
    }
});
////   functions for updating iframe



///////// tell the embed parent frame the height of the content

// var embeddPareantHeight = 'if(window.parent && window.parent.parent){window.parent.parent.postMessage(["resultsFrame", {height: document.body.getBoundingClientRect().height,slug: "None"}], "*")}';





function updateIframe() {

    if (outerWindowFrame && outerWindowFrame.closed) {
        outerWindow = false;
    }

    doc = $("#live_update")[0].contentWindow.document;

    html = fetchHtml();
    css = fetchCSS();
    js = fetchJS();
    complCss = "";
    complJs = "";
    stringJs = "";
    stringCss = "";

    jsObject[$("#optionJsFiles").val()] = js;
    cssObject[$("#optionCssFiles").val()] = css;

    /* jshint shadow:true */
    for (var key in cssObject) {
        if (cssObject.hasOwnProperty(key)) {
            complCss += cssObject[key];
        }
    }

    for (var key in jsObject) {
        if (jsObject.hasOwnProperty(key)) {
            complJs += jsObject[key];
        }
    }
/* jshint shadow:false */

    if(addStartJs){
        complJs = addStartCode + complJs;
    }

    // add libraries from array
    if (libsJs.length) {
        libsJs.forEach(function(entry) {
            stringJs += '<script src="' + entry + '"></script>';
        });
    }

    if (jsPre === "Babel-2015") {
        babelJsVersion = "es2015";
        stringJs = stringJs + "<script src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js'></script>";
    } else if (jsPre === "Babel-2016") {
        babelJsVersion = "es2016";
        stringJs = stringJs + "<script src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js'></script>";
    } else if (jsPre === "Babel-2017") {
        babelJsVersion = "es2017";
        stringJs = stringJs + "<script src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js'></script>";
    }

    // add libraries from array
    if (libsCss.length) {
        libsCss.forEach(function(entry) {
            stringCss += '<link rel="stylesheet" type="text/css" href="' + entry + '">';
        });
    }
    doc.open();
    doc.write('<!DOCTYPE html><head><meta charset="UTF-8">' + stringCss + stringJs + '</head><body></body></html>');
    doc.close();

    if (outerWindow) {
    	outerWindowFrame.document.open();
        outerWindowFrame.document.write('<!DOCTYPE html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="shortcut icon" href="images/icon.ico" /><title>Preview</title>' + stringCss + stringJs + '</head><body></body></html>');
        outerWindowFrame.document.close();
        if (outerWindowTitle !== "") {
            outerWindowFrame.document.title = outerWindowTitle;
        }
    }


    // add element to body, styles and script to head and erase all existing code inside

    appendBodyHtml();
}


function insertJs() {

    if (jsPre === "Babel-2015" || jsPre === "Babel-2016" || jsPre === "Babel-2017") {
        var babelInput = "<script>var babel_scripts = document.querySelectorAll('script[type=\"text/babel\"]');Array.prototype.forEach.call(babel_scripts, function (script, index, arr) {var input = script.textContent;var output = Babel.transform( input, { presets: ['" + babelJsVersion + "', 'react'] }).code;var new_script = document.createElement('script');new_script.setAttribute('type', 'text/javascript');new_script.textContent = output;script.remove();document.querySelector('body').appendChild(new_script);});</script>";
        if (jsDom === "inhead") {

            $(doc.head).append('<script type="text/babel">' + complJs + '</script>');
            $(doc.body).append(babelInput);

            if (outerWindow) {
                $(outerWindowFrame.document.head).append('<script type="text/babel">' + complJs + '</script>');
                $(outerWindowFrame.document.body).append(babelInput);
            }

        } else {

            $(doc.body).append('<script type="text/babel">' + complJs + '</script>');
            $(doc.body).append(babelInput);

            if (outerWindow) {
                $(outerWindowFrame.document.body).append('<script type="text/babel">' + complJs + '</script>');
                $(outerWindowFrame.document.body).append(babelInput);
            }

        }
    } else {

        if (jsDom === "inhead") {

            $(doc.head).append('<script>' + complJs + '</script>');

            if (outerWindow) {
                $(outerWindowFrame.document.head).append('<script>' + complJs + '</script>');
            }

        } else {

            $(doc.body).append('<script>' + complJs + '</script>');

            if (outerWindow) {
                $(outerWindowFrame.document.body).append('<script>' + complJs + '</script>');
            }

        }
    }

}




function appendBodyHtml() {

    $(doc.body).append(html);


    if ($(doc.body).length >= 1) {

        if (outerWindow) {
            $(outerWindowFrame.document.body).append(html);
        }

        appendContnetJsCss();
        return;
    }
    setTimeout(function() {
        appendBodyHtml();
    }, 1);
}


function appendContnetJsCss() {
    if (cssPre === "SCSS") {
        var sass = new Sass();
        sass.options('defaults');
        sass.compile(complCss, function(result) {
            $(doc.head).append("<style>" + result.text + "</style>");

            if (outerWindow) {
                $(outerWindowFrame.document.head).append("<style>" + result.text + "</style>");
            }

            insertJs();
        });

    } else if (cssPre === "SASS") {
        var sass2 = new Sass();
        sass2.options({
            // Treat source_string as SASS (as opposed to SCSS)
            indentedSyntax: true,
        }, function callback() {

        });
        sass2.compile(complCss, function(result) {
            $(doc.head).append("<style>" + result.text + "</style>");

            if (outerWindow) {
                $(outerWindowFrame.document.head).append("<style>" + result.text + "</style>");
            }

            insertJs();
        });

    } else {
        $(doc.head).append("<style>" + complCss + "</style>");

        if (outerWindow) {
            $(outerWindowFrame.document.head).append("<style>" + complCss + "</style>");
        }

        insertJs();
    }

}



// Key binind, on keyup in the Codemirror textarea, update iframe

$(".innerbox").on("keyup", function() {

    doc = $("#live_update")[0].contentWindow.document;

    html = fetchHtml();
    css = fetchCSS();
    js = fetchJS();
    complCss = "";
    complJs = "";

    jsObject[$("#optionJsFiles").val()] = js;
    cssObject[$("#optionCssFiles").val()] = css;

    if (disableAutoload === 1) {
        updateIframe();
    }

});
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
//// settings-sub-menu


var subMenuSettingsItems = [submenuLayoutWrapper, submenuCssWrapper, submenuProjectsWrapper, submenuJsWrapper, submenuExportWrapper];
var subMenuSettingsButtonsArray = [submenuLayoutBtn, submenuCssBtn, submenuProjectsBtn, submenuJSBtn, submenuExportBtn];

$(submenuLayoutBtn).on('click', function(event) {
    event.preventDefault();
    $(submenuLayoutWrapper).css("display", "block");
    changeSubMenuSettings(submenuLayoutWrapper);
});

$(submenuCssBtn).on('click', function(event) {
    event.preventDefault();
    $(submenuCssWrapper).css("display", "block");
    changeSubMenuSettings(submenuCssWrapper);
});

$(submenuProjectsBtn).on('click', function(event) {
    event.preventDefault();
    $(submenuProjectsWrapper).css("display", "block");
    changeSubMenuSettings(submenuProjectsWrapper);
});

$(submenuJSBtn).on('click', function(event) {
    event.preventDefault();
    $(submenuJsWrapper).css("display", "block");
    changeSubMenuSettings(submenuJsWrapper);
});

$(submenuExportBtn).on('click', function(event) {
    event.preventDefault();
    $(submenuExportWrapper).css("display", "block");
    changeSubMenuSettings(submenuExportWrapper);
});

function changeSubMenuSettings(item) {

    for (var i = 0; i <= (subMenuSettingsItems.length - 1); i++) {
        if (subMenuSettingsItems[i] !== item) {
            $(subMenuSettingsItems[i]).css("display", "none");
            $(subMenuSettingsButtonsArray[i]).removeClass("active-sub-menu-link");
        } else {
            $(subMenuSettingsItems[i]).css("display", "block");
            $(subMenuSettingsButtonsArray[i]).addClass("active-sub-menu-link");
        }

    }

}


////////   Css wrapper


////////////   preprocessors

$("#preCssSelect").on('change', function() {
    if (selectPreCss.selectedIndex === 1) {
        cssPre = "SCSS";
    } else if (selectPreCss.selectedIndex === 2) {
        cssPre = "SASS";
    } else {
        cssPre = "";
    }

});




function populateMostUsedCss() {
    var once = 1;
    var counter = 0;
    mostUsedCss.forEach(function() {
        if (once === 1) {
            $("#cssLibraries").append('<option value="' + mostUsedCss[counter].name + '" selected>' + mostUsedCss[counter].name + '</option>');
            once = 2;
            counter++;
        } else {
            $("#cssLibraries").append('<option value="' + mostUsedCss[counter].name + '">' + mostUsedCss[counter].name + '</option>');
            counter++;
        }
    });
}




// adding libraries to an array on keypress Enter

$(librariesTextareaCss).on("keypress", function(e) {
    if (e.keyCode === 13) {
        addLibraries(0, librariesTextareaCss);
        return false; // prevent the button click from happening
    }
});



// adding libraries to an array to store button ADD

$(addExternalLibraryBtnCss).on("click", function() {
    addLibraries(0, librariesTextareaCss);
});



$("#addCssLibrary").on("click", function() {

    var selIndex = $("#cssLibraries").prop("selectedIndex");
    var strName = mostUsedCss[selIndex].name;

    if (libsCss.length) {
        libsCss.forEach(function(entry) {
            if (entry !== mostUsedJs[selIndex].value) {
                libsCss = libsCss.concat(mostUsedCss[selIndex].value);
                $("#cssLibsUsed").append('<option value="' + strName + '" selected>' + strName + '</option>');

            }
        });
    } else {
        libsCss = libsCss.concat(mostUsedCss[selIndex].value);
        $("#cssLibsUsed").append('<option value="' + strName + '" selected>' + strName + '</option>');
    }


});


$("#removeCssLibrary").on("click", function() {

    var selIndex = usedLibsCss.selectedIndex;

    if (libsCss.length) {
        libsCss.splice(selIndex, 1);
        usedLibsCss.remove(usedLibsCss.selectedIndex);
    }

});

/// color palette

$(CMColorPalleteUpdate1).on("click", function() {
    colorPalette1 = $("#colorOne").val();
    $("#colorOne").css("border", "2px solid " + colorPalette1);
    $("#colorOne").css("box-shadow", "inset 0 0 5px 2px  " + colorPalette1);
    $("#CMColorPaletteOne").css("background", colorPalette1);
});

$(CMColorPalleteUpdate2).on("click", function() {
    colorPalette2 = $("#colorTwo").val();
    $("#colorTwo").css("border", "2px solid " + colorPalette2);
    $("#colorTwo").css("box-shadow", "inset 0 0 5px 2px " + colorPalette2);
    $("#CMColorPaletteTwo").css("background", colorPalette2);
});

$(CMColorPalleteUpdate3).on("click", function() {
    colorPalette3 = $("#colorThree").val();
    $("#colorThree").css("border", "2px solid " + colorPalette3);
    $("#colorThree").css("box-shadow", "inset 0 0 5px 2px " + colorPalette3);
    $("#CMColorPaletteThree").css("background", colorPalette3);
});

$(CMColorPalleteUpdate4).on("click", function() {
    colorPalette4 = $("#colorFour").val();
    $("#colorFour").css("border", "2px solid " + colorPalette4);
    $("#colorFour").css("box-shadow", "inset 0 0 5px 2px " + colorPalette4);
    $("#CMColorPaletteFour").css("background", colorPalette4);
});

$(CMColorPalleteUpdate5).on("click", function() {
    colorPalette5 = $("#colorFive").val();
    $("#colorFive").css("border", "2px solid " + colorPalette5);
    $("#colorFive").css("box-shadow", "inset 0 0 5px 2px " + colorPalette5);
    $("#CMColorPaletteFive").css("background", colorPalette5);
});

$('input[name=colorOneActivate]').change(function() {
    if ($(this).is(':checked')) {
        $("#CMColorPaletteOne").css("display", "inline-block");
    } else {
        $("#CMColorPaletteOne").css("display", "none");
    }
});

$('input[name=colorTwoActivate]').change(function() {
    if ($(this).is(':checked')) {
        $("#CMColorPaletteTwo").css("display", "inline-block");
    } else {
        $("#CMColorPaletteTwo").css("display", "none");
    }
});
$('input[name=colorThreeActivate]').change(function() {
    if ($(this).is(':checked')) {
        $("#CMColorPaletteThree").css("display", "inline-block");
    } else {
        $("#CMColorPaletteThree").css("display", "none");
    }
});
$('input[name=colorFourActivate]').change(function() {
    if ($(this).is(':checked')) {
        $("#CMColorPaletteFour").css("display", "inline-block");
    } else {
        $("#CMColorPaletteFour").css("display", "none");
    }
});
$('input[name=colorFiveActivate]').change(function() {
    if ($(this).is(':checked')) {
        $("#CMColorPaletteFive").css("display", "inline-block");
    } else {
        $("#CMColorPaletteFive").css("display", "none");
    }
});


$("#CMColorPaletteOne").on("click", function() {

    if (colorPalette1 !== "") {
        $("#CMColorHidOne").click();
    }

});

$("#CMColorPaletteTwo").on("click", function() {
    if (colorPalette2 !== "") {
        $("#CMColorHidTwo").click();
    }
});

$("#CMColorPaletteThree").on("click", function() {
    if (colorPalette3 !== "") {
        $("#CMColorHidThree").click();
    }
});

$("#CMColorPaletteFour").on("click", function() {
    if (colorPalette4 !== "") {
        $("#CMColorHidFour").click();
    }
});


$("#CMColorPaletteFive").on("click", function() {
    if (colorPalette5 !== "") {
        $("#CMColorHidFive").click();
    }
});
//jshint unused:false
$("#CMColorHidOne").on("click", function() {

    var clipboardHtml = new Clipboard('#CMColorHidOne', {
        text: function() {
            return colorPalette1;
        }
    });

});

$("#CMColorHidTwo").on("click", function() {

    var clipboardHtml = new Clipboard('#CMColorHidTwo', {
        text: function() {
            return colorPalette2;
        }
    });

});

$("#CMColorHidThree").on("click", function() {

    var clipboardHtml = new Clipboard('#CMColorHidThree', {
        text: function() {
            return colorPalette3;
        }
    });

});

$("#CMColorHidFour").on("click", function() {

    var clipboardHtml = new Clipboard('#CMColorHidFour', {
        text: function() {
            return colorPalette4;
        }
    });

});

$("#CMColorHidFive").on("click", function() {

    var clipboardHtml = new Clipboard('#CMColorHidFive', {
        text: function() {
            return colorPalette5;
        }
    });

});
//jshint unused:true
/////  Javascript Wrapper


// preprocessor

$("#preJsSelect").on('change', function() {
    if (selectPreJs.selectedIndex === 1) {
        jsPre = "Babel-2015";
    } else if (selectPreJs.selectedIndex === 2) {
        jsPre = "Babel-2016";
    } else if (selectPreJs.selectedIndex === 3) {
        jsPre = "Babel-2017";
    } else {
        jsPre = "";
    }
});

///////  load Type

$("#loadTypeSelect").on('change', function() {

    switch (selectLoadType.selectedIndex) {
        case 0:
            jsDom = "inhead";
            break;
        case 1:
            jsDom = "inbody";
            break;
        default:
            break;
    }
});


$(librariesTextareaJs).on("keypress", function(e) {
    if (e.keyCode === 13) {
        addLibraries(1, librariesTextareaJs);
        return false; // prevent the button click from happening
    }
});


$("#addJsLibrary").on("click", function() {
    var selIndex = $("#jsLibraries").prop("selectedIndex");
    var strName = mostUsedJs[selIndex].name;

    if (libsJs.length) {
        libsJs.forEach(function(entry) {
            if (entry !== mostUsedJs[selIndex].value) {
                libsJs = libsJs.concat(mostUsedJs[selIndex].value);
                $("#jsLibsUsed").append('<option value="' + strName + '" selected>' + strName + '</option>');

            }
        });
    } else {
        libsJs = libsJs.concat(mostUsedJs[selIndex].value);
        $("#jsLibsUsed").append('<option value="' + strName + '" selected>' + strName + '</option>');
    }
});

$(addExternalLibraryBtnJs).on("click", function() {
    addLibraries(1, librariesTextareaJs);
});


$("#removeJsLibrary").on("click", function() {

    var selIndex = usedLibsJs.selectedIndex;

    if (libsJs.length) {
        libsJs.splice(selIndex, 1);
        usedLibsJs.remove(usedLibsJs.selectedIndex);
    }

});

function populateMostUsedJs() {

    var once = 1;
    var counter = 0;
    mostUsedJs.forEach(function() {
        if (once === 1) {
            $("#jsLibraries").append('<option value="' + mostUsedJs[counter].name + '" selected>' + mostUsedJs[counter].name + '</option>');
            once = 2;
            counter++;
        } else {
            $("#jsLibraries").append('<option value="' + mostUsedJs[counter].name + '">' + mostUsedJs[counter].name + '</option>');
            counter++;
        }
    });
}




////// ADD Libraries

function addLibraries(toggleLibs, textarea) {
    var str = $(textarea).val();
    var subString = str.split('/');
    if (toggleLibs === 1) {
        if (libsJs.indexOf(str) === -1) {
            libsJs = libsJs.concat(str);
            $("#jsLibsUsed").append('<option value="' + subString[subString.length - 1] + '" selected>' + subString[subString.length - 1] + '</option>');
        }
    } else {
        if (libsCss.indexOf(str) === -1) {
            libsCss = libsCss.concat(str);
            $("#cssLibsUsed").append('<option value="' + subString[subString.length - 1] + '" selected>' + subString[subString.length - 1] + '</option>');
        }
    }
    $(textarea).val("");
}





//////////   Export wrapper

// Save Section

//////////  Option for saving and loading


$(saveFilesBtn).on("click", function() {
    saveJson();
});

/// for textinput enter button

$(saveNameInput).on("keypress", function(e) {
    if (e.keyCode === 13) {
        saveJson();
        return false; // prevent the button click from happening
    }
});



function saveJson() {

    var name = $("#saveName").val();
    if (name === "") {
        var html = fetchHtml();
        var css = fetchCSS();
        var js = fetchJS();
        if (saveNames.length && html !== "" && css !== "" && js !== "") {
            $(saveNameInput).val(select.options[select.selectedIndex].text);
            saveJson();
            $(saveNameInput).val("");
        } else if (!saveNames.length) {
            clearStorage();
        }
        return;
    }
    if (saveNames.length) {
        if (saveNames.indexOf(name) !== -1) {
            setJson(saveNames.indexOf(name), name);
            $(saveNameInput).val("");
        } else {
            setJson(saveNames.length, name, 1);
            saveNames.push(name);
            $("#loadSelect").append('<option value="' + name + '">' + name + '</option>');

            $(saveNameInput).val("");
        }
    } else {
        setJson(0, name, 0);
        saveNames.push(name);
        $("#loadSelect").append('<option value="' + name + '">' + name + '</option>');
        $(saveNameInput).val("");
    }
}


$("#deleteFiles").on("click", function() {

    if (!$('#loadSelect').val()) {
        return;
    }

    $(confirmationBox).css("display", "block");
    $(settingsWindow).css("display", "none");

});

$("#yesDelete").click(function() {
    deleteFromJson();
    saveLocalJson();
    $(saveNameInput).val("");
    $(confirmationBox).css("display", "none");
    $(settingsWindow).css("display", "block");

});

$("#noDelete").click(function() {
    $(confirmationBox).css("display", "none");
    $(settingsWindow).css("display", "block");

});


function deleteFromJson() {
    saveNames.splice(select.selectedIndex, 1);
    var temp = codeSnips;
    temp.splice(select.selectedIndex, 1);
    codeSnips = temp;
    select.remove(select.selectedIndex);
}

$('#loadSelect').on("click", function() {
    $(saveNameInput).val(saveNames[select.selectedIndex]);
});


$(loadFilesBtn).on("click", function() {

    if (saveNames.length) {
        loadFromJson();
    }
});



function loadFromJson() {

    loadJson(select.selectedIndex);
    updateIframe();
}

$(importLoadedFiles).on("click", function() {
    importSnippetsObject(codeSnips, select.selectedIndex);
});




////////  Export Section

$(loadImportedFiles).on("click", function() {

    if (JSON.stringify(codeSnipsImport) === "[]") {
        return;
    }
    loadProjectJson(codeSnipsImport, selectLoadImport.selectedIndex);
    updateIframe();
});

//jshint unused:false
$(exportCurrentProject).on("click", function() {
    var tempWireframe = codeSnipsWireframe;
    var clipboardExportOne = new Clipboard(exportCurrentProject, {
        text: function() {
            if (JSON.stringify(codeSnips) === "[]") {
                return;
            } else if (select.selectedIndex === undefined) {
                return;
            } else {
                tempWireframe[0] = codeSnips[select.selectedIndex];
                return JSON.stringify(tempWireframe);
            }

        }
    });
});


$(exportAllProjects).on("click", function() {
    var clipboardExportAll = new Clipboard(exportAllProjects, {
        text: function() {
            if (JSON.stringify(codeSnips) === '[]') {
                return JSON.stringify(codeSnipsWireframe);
            } else {
                return JSON.stringify(codeSnips);
            }

        }
    });

});
//jshint unused:true
/* jshint shadow:true */
$(importJsonProject).on("click", function() {


    try {

        var tempImport = $("#importTextarea").val();
        codeSnipsImport = JSON.parse(tempImport);

    } catch (e) {
        return;
    }
    codeSnipsImport = [];
    while (selectLoadImport.firstChild) {
        selectLoadImport.removeChild(selectLoadImport.firstChild);
    }
    var tempImport = $("#importTextarea").val();
    codeSnipsImport = JSON.parse(tempImport);
    populateImportFields(codeSnipsImport);
    $("#importTextarea").val("");




});
/* jshint shadow:false */


function populateImportFields(loadDataObject) {
    var loadNames = [];
    loadDataObject.forEach(function(entry) {
        loadNames.push(entry.name);
    });
    loadNames.forEach(function(entry) {
        $("#loadImportSelect").append('<option value="' + entry + '">' + entry + '</option>');
    });
}




///////// PROJECTS WINDOW


$(loadTemplateFiles).on("click", function() {

    if (JSON.stringify(codeSnipsTemplates) === "[]") {
        return;
    }

    loadProjectJson(codeSnipsTemplates, selectTemplateProjects.selectedIndex);
    updateIframe();

});

$(importSnippetsFiles).on("click", function() {

    if (JSON.stringify(codeSnipsSnippets) === "[]") {
        return;
    }

    importSnippetsObject(codeSnipsSnippets, selectImportSnippets.selectedIndex);

});

$(importToolsFiles).on("click", function() {

    if (JSON.stringify(codeSnipsTools) === "[]") {
        return;
    }

    importSnippetsObject(codeSnipsTools, selectImportTools.selectedIndex);

});


$(loadPortfolioFiles).on("click", function() {

    if (JSON.stringify(codeSnipsLoad) === "[]") {
        return;
    }

    loadProjectJson(codeSnipsLoad, selectLoadProjects.selectedIndex);
    updateIframe();

});







//////////   ADD FILES WINDOW



/// for textinput enter button

$(addNewFileInput).on("keypress", function(e) {
    if (e.keyCode === 13) {
        addFiles();
        return false; // prevent the button click from happening
    }
});



$("#optionCssFiles").on('change', function() {

    if (cssObject[$("#optionCssFiles").val()] === undefined) {
        cssEditor.setValue("");
        return;
    }
    cssEditor.setValue(cssObject[$("#optionCssFiles").val()]);
});



$("#optionJsFiles").on('change', function() {

    if (jsObject[$("#optionJsFiles").val()] === undefined) {
        jsEditor.setValue("");
        return;
    }
    jsEditor.setValue(jsObject[$("#optionJsFiles").val()]);
});



$(addFileBtn).on("click", function() {
    addFiles();
});



////  add select option under files for css and js 

function addFiles() {
    var str = $(addNewFileInput).val();
    if (str === "") {
        return;
    }
    if (folderNameToggle === 1) {
        if (jsObject.hasOwnProperty(str)) {
            $(".window-body-base").addClass("tooltip");
            setTimeout(function() {
                $(".window-body-base").removeClass("tooltip");
            }, 1000);
            return;
        }
        $("#optionJsFiles").append('<option value="' + str + '">' + str + '</option>');
        $(addNewFileInput).val("");

    } else {
        if (cssObject.hasOwnProperty(str)) {
            $(".window-body-base").addClass("tooltip");
            setTimeout(function() {
                $(".window-body-base").removeClass("tooltip");
            }, 1000);
            return;
        }
        $("#optionCssFiles").append('<option value="' + str + '">' + str + '</option>');
        $(addNewFileInput).val("");
    }
    removeAddFolderCssJs();
}
//////  SECTION BUTTONS    /////



////    SMALL MENU

$('.toggle-small').click(function(e) {
    e.stopImmediatePropagation();
    var _this = $(this);
    _this.toggleClass('toggle-on');
    _this.parent().next('.small-sub').toggleClass('small-sub-on');
});


// MAIN MENU 

////    SMALL MENU

$('#main-menu').click(function(e) {
    e.stopImmediatePropagation();
    var _this = $(this);
    _this.children(".toggle-small").toggleClass('toggle-on');
    _this.next('.small-sub').toggleClass('small-sub-on');
});



// enabling copy to clipboard when button with #id is clicked for copying code content
//jshint unused:false
$("#copyButtonHtml").on("click", function() {

    var clipboardHtml = new Clipboard('#copyButtonHtml', {
        text: function() {
            return htmlEditor.getValue();
        }
    });

});
$("#copyButtonCss").on("click", function() {

    var clipboardCss = new Clipboard('#copyButtonCss', {
        text: function() {
            return complCss;
        }
    });

});
$("#copyButtonJs").on("click", function() {

    var clipboardJs = new Clipboard('#copyButtonJs', {
        text: function() {
            return complJs;
        }
    });

});
//jshint unused:false

// copy buttons implementation of copy successful message

$("#copyHtml").on("click", function(e) {
    e.stopImmediatePropagation();
    if (htmlEditor.getValue() !== "") {
        $("#copyButtonHtml").click();
        $("#copiedHtml").css("display", "block");
        setTimeout(function() { $("#copiedHtml").css("display", "none"); }, 2000);
        $(".toggle-small").removeClass("toggle-on");
        $(".small-sub").removeClass(" small-sub-on");
    } else {
        $(".toggle-small").removeClass("toggle-on");
        $(".small-sub").removeClass(" small-sub-on");
    }



});

$("#copyCss").on("click", function(e) {
    e.stopImmediatePropagation();
    if (complCss !== "") {
        $("#copyButtonCss").click();
        $("#copiedCSS").css("display", "block");
        setTimeout(function() { $("#copiedCSS").css("display", "none"); }, 2000);
        $(".toggle-small").removeClass("toggle-on");
        $(".small-sub").removeClass(" small-sub-on");
    } else {
        $(".toggle-small").removeClass("toggle-on");
        $(".small-sub").removeClass(" small-sub-on");
    }


});


$("#copyJs").on("click", function(e) {
    e.stopImmediatePropagation();
    if (complJs !== "") {
        $("#copyButtonJs").click();
        $("#copiedJs").css("display", "block");
        setTimeout(function() { $("#copiedJs").css("display", "none"); }, 2000);
        $(".toggle-small").removeClass("toggle-on");
        $(".small-sub").removeClass(" small-sub-on");
    } else {
        $(".toggle-small").removeClass("toggle-on");
        $(".small-sub").removeClass(" small-sub-on");
    }

});


/// autoplay css Code

/// function for code writting, take callback function, time, string and editor parameter

function codePlayer(string, editor, time, completed) {
    var subString = "";
    var counter = 0;
    var editorSize = {};
    editor.setOption("scrollPastEnd", false);
    callBackMethod();

    function callBackMethod() {
        if ((counter <= string.length - 1) && (playCode)) {
            subString += string[counter];
            editor.setValue(subString);
            editorSize = editor.getScrollInfo();
            if(string[counter] === "}"){
                updateIframe();
            }
            counter++;
            editor.scrollTo(0, editorSize.height);
            setTimeout(function() {
                callBackMethod();
            }, time);
        } else if (playCode) {
            completed(string, editor);
        } else {
            editor.setValue(string);
            updateIframe();
        }
    }
}

function codeCompleted(string, editor) {
    editor.setOption("scrollPastEnd", true);
    editor.setValue(string);

    if (selectCssFileNames.selectedIndex === selectCssFileNames.length - 1) {
        playCode = false;
        $(".play-code").html("play");
        return;
    } else {
        selectCssFileNames.selectedIndex = selectCssFileNames.selectedIndex + 1;
        editor.setValue(cssObject[$("#optionCssFiles").val()]);
        updateIframe();
        setTimeout(runCodePlayer(), 1000);
    }

}


/// onstart checks if project has been loaded and then starts css animation
function playCssStart(){

    if(plaCssCodeStart){
        if((cssObject.base !== "")){
            runBtnCodePlayer();
        }else{
            setTimeout(playCssStart(), 1000);
        }
    }
}



function runCodePlayer() {
    css = fetchCSS();
    codePlayer(css, cssEditor, 50, codeCompleted);
}

function runBtnCodePlayer() {
    if (playCode) {
        $(".play-code").html("play");
        playCode = false;
        return;
    } else {
        $(".play-code").html("stop");
        playCode = true;
    }

    runCodePlayer();
}



$("#playCodeCss").on("click", function(e) {
    e.stopImmediatePropagation();
    /// remove parent menu
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");
    runBtnCodePlayer();

});


/// full screen button fullScreenBtn

$(fullScreenBtn).on("click", function(e) {
    e.stopImmediatePropagation();
    /// remove parent menu
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");

    $("header").toggle();
    $("footer").toggle();

});

/// add multiple files buttons

$(addNewFileWindowBtn).on("click", function() {

    /// remove parent menu
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");

    // displays about window
    $(floatingWindow).css("display", "flex");
    $(addNewFileWindow).css("display", "block");
    setTimeout(function() {
        $(floatingWindow).addClass("floating-on");
        $(addNewFileWindow).addClass("add-new-file-window-on");
    }, 1);

    // add event listener to document, click anywhere on document where id is not
    // id of paren here is titleLogoId, othervise it registers click event from parent

    $(document).on("click", function(event) {
        if (event.target.id === "floatingWindowBase") {
            removeAddFolderCssJs();
            $(this).unbind(event);

        }
    });

});


$("#minFolderJsBtn").on("click", function() {
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");

    var jsFolderName = selectJsFileNames.options[selectJsFileNames.selectedIndex];

    if (jsFolderName.text !== "master") {
        if (jsObject.hasOwnProperty(jsFolderName.text)) {
            delete jsObject[jsFolderName.text];
        }
        jsFolderName.parentNode.removeChild(jsFolderName);
        jsEditor.setValue(jsObject.master);
    }
});

$("#minFolderCssBtn").on("click", function() {
    $(".toggle-small").removeClass("toggle-on");
    $(".small-sub").removeClass(" small-sub-on");

    var cssFolderName = selectCssFileNames.options[selectCssFileNames.selectedIndex];
    if (cssFolderName.text !== "base") {

        if (cssObject.hasOwnProperty(cssFolderName.text)) {
            delete cssObject[cssFolderName.text];
        }
        cssFolderName.parentNode.removeChild(cssFolderName);
        cssEditor.setValue(cssObject.base);

    }
});


//// file name window 


$("#jsFolder").on("click", function() {
    $("#cssFolder").removeClass("active-btn");
    $("#jsFolder").addClass("active-btn");
    folderNameToggle = 1;
});

$("#cssFolder").on("click", function() {
    $("#jsFolder").removeClass("active-btn");
    $("#cssFolder").addClass("active-btn");
    folderNameToggle = 2;
});


// update iFrame width

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "attributes") {
            updateWidth();
        }
    });
});

/// when window width changes update width meter
$(window).resize(function() {
    updateWidthOnResize();
});


function updateWidthOnResize(){
    if (layoutOrientation === "side") {
        updateWidth();
    } else {
        var pxWidth = $(window).width();
        if (em) {
            iframeWidth.innerHTML = parseInt(pxWidth / 16) + " em";
        } else {
            iframeWidth.innerHTML = pxWidth + " px";
        }
    }
}


function updateWidth() {
    var collWidth = rightCol.style.width;
    collWidth = collWidth.substring(0, (collWidth.length - 1));
    var pxWidth = parseInt(($(window).width() / 100) * collWidth);

    if (em) {
        iframeWidth.innerHTML = parseInt(pxWidth / 16) + " em";
    } else {
        iframeWidth.innerHTML = pxWidth + " px";
    }

}

// on click change px to em
iframeWidth.addEventListener("click", function() {
    if (em) {
        em = false;
        updateWidth();
    } else {
        em = true;
        updateWidth();
    }
});
// FOOTER BUTTONS
// click events and implementation

$(infoWindowBtn).on("click", function() {


    // displays about window
    $(floatingWindow).css("display", "flex");
    $(infoWindow).css("display", "block");
    setTimeout(function() {
        $(floatingWindow).addClass("floating-on");
        $(infoWindow).addClass("info-window-on");
    }, 1);

    // add event listener to document, click anywhere on document where id is not
    // id of paren here is titleLogoId, othervise it registers click event from parent
    $(document).on("click", function(event) {
        if (event.target.id === "floatingWindowBase") {
            $(floatingWindow).css("display", "none");
            $(infoWindow).css("display", "none");
            $(floatingWindow).removeClass("floating-on");
            $(infoWindow).removeClass("info-window-on");
            $(this).unbind(event);

        }
    });

});
function importJson() {
    $.ajax({
        'url': "js/projects/projects.json",
        'dataType': "json",
        'success': function(data) {
            codeSnipsLoad = data;
            populateLoadFields(codeSnipsLoad);
        }
    });
}

function importShared() {
    $.ajax({
        'url': "js/projects/shared.json",
        'dataType': "json",
        'success': function(data) {
            codeSnipsShared = data;
            loadShared(codeSnipsShared);
        }
    });
}

function importJsonTemplates() {
    $.ajax({
        'url': "js/projects/templates.json",
        'dataType': "json",
        'success': function(data) {
            codeSnipsTemplates = data;
            populateTemplateFields(codeSnipsTemplates);
        }
    });
}

function importJsonSnippets() {
    $.ajax({
        'url': "js/projects/snippets.json",
        'dataType': "json",
        'success': function(data) {
            codeSnipsSnippets = data;
            populateSnippetsFields(codeSnipsSnippets);
        }
    });
}

function importJsonTools() {
    $.ajax({
        'url': "js/projects/tools.json",
        'dataType': "json",
        'success': function(data) {
            codeSnipsTools = data;
            populateToolsFields(codeSnipsTools);
        }
    });
}


importJson();
importJsonTemplates();
importJsonSnippets();
importJsonTools();
importShared();



function loadProjectJson(loadObject, n) {
    outerWindowTitle = loadObject[n].name;
    document.title = loadObject[n].name;
    htmlEditor.setValue(loadObject[n].data.html);
    cssEditor.setValue(loadObject[n].data.css.base);
    jsEditor.setValue(loadObject[n].data.js.master);

    jsObject = loadObject[n].data.js;
    cssObject = loadObject[n].data.css;
    libsJs = loadObject[n].deps.jsdep;
    libsCss = loadObject[n].deps.cssdep;
    cssPre = loadObject[n].prepro.csspre;
    jsPre = loadObject[n].prepro.jspre;
    jsDom = loadObject[n].jsdom;

    refactorFolderList();
    populatePreprocessors(cssPre, jsPre);

    populateLibrariesJs(libsJs);
    populateLibrariesCss(libsCss);
}




function importSnippetsObject(loadObject, n) {

    var combinedHtml = fetchHtml();
    var combinedCss = fetchCSS();
    var combinedJs = fetchJS();
    jQuery.extend(jsObject, loadObject[n].data.js);
    jQuery.extend(cssObject, loadObject[n].data.css);
    combinedHtml = html + loadObject[n].data.html;
    combinedCss = combinedCss + loadObject[n].data.css.base;
    combinedJs = combinedJs + loadObject[n].data.js.master;
    libsJs.concat(loadObject[n].deps.jsdep);
    libsCss.concat(loadObject[n].deps.cssdep);

    refactorFolderList();

    populateLibrariesJs(libsJs);
    populateLibrariesCss(libsCss);

    selectCssFileNames.selectedIndex = 0;
    selectJsFileNames.selectedIndex = 0;
    htmlEditor.setValue(combinedHtml);
    cssEditor.setValue(combinedCss);
    jsEditor.setValue(combinedJs);
    updateIframe();

}





function populateLoadFields(loadDataObject) {
    var loadNames = [];
    loadDataObject.forEach(function(entry) {
        loadNames.push(entry.name);
    });
    loadNames.forEach(function(entry) {
        $("#loadProjectSelect").append('<option value="' + entry + '">' + entry + '</option>');
    });
    if (startProjectName !== "") {
        for (var i = 0; i <= loadDataObject.length - 1; i++) {
            if (startProjectName === loadDataObject[i].name) {
                loadProjectJson(loadDataObject, i);
                updateIframe();
                playCssStart();
            }


        }
    }
}

function populateTemplateFields(loadDataObject) {
    var loadNames = [];
    loadDataObject.forEach(function(entry) {
        loadNames.push(entry.name);
    });
    loadNames.forEach(function(entry) {
        $("#loadTemplateSelect").append('<option value="' + entry + '">' + entry + '</option>');
    });
}

function populateSnippetsFields(loadDataObject) {
    var loadNames = [];
    loadDataObject.forEach(function(entry) {
        loadNames.push(entry.name);
    });
    loadNames.forEach(function(entry) {
        $("#importSnippetSelect").append('<option value="' + entry + '">' + entry + '</option>');
    });
}

function populateToolsFields(loadDataObject) {
    var loadNames = [];
    loadDataObject.forEach(function(entry) {
        loadNames.push(entry.name);
    });
    loadNames.forEach(function(entry) {
        $("#importToolsSelect").append('<option value="' + entry + '">' + entry + '</option>');
    });
}

function loadShared(loadDataObject) {
    var sharedNames = "";
    for (var i = 0; i <= loadDataObject.length - 1; i++) {

        if (i === (loadDataObject.length - 1)) {
            sharedNames += loadDataObject[i].name;
        } else {
            sharedNames += (loadDataObject[i].name + " - ");
        }

        if (startSharedName !== "") {
            if (startSharedName === loadDataObject[i].name) {
                loadProjectJson(loadDataObject, i);
                updateIframe();
                playCssStart();
            }
        }
    }
    $(infoSharedTitles).html(sharedNames);
}
//// save to json object emulating database, then to local storage

var codeSnipsWireframe = [{
		"name": "",
		"data": {
			"html": "",
			"css": {
					"base": ""
				},
			"js": {
					"master": ""
				}
		},
		"deps": {
			"cssdep": [],
			"jsdep": []
		},
		"prepro": {
			"csspre":"",
			"jspre":""
		},
		"jsdom":""
	}]
;

var codeArray = {
		"name": "",
		"data": {
			"html": "",
			"css": {
					"base": ""
				},
			"js": {
					"master": ""
				}
		},
		"deps": {
			"cssdep": [],
			"jsdep": []
		},
		"prepro": {
			"csspre":"",
			"jspre":""
		},
		"jsdom":""
	};

function setJson(n, name, choice){

	if(choice===0){
	codeSnips=JSON.parse(JSON.stringify(codeSnipsWireframe));

	}else if( choice===1 ){
	codeSnips.push(codeArray);	
	}



codeSnips[n].name= name;
codeSnips[n].data.html = fetchHtml();

////  saves folder names in object as key -- start
codeSnips[n].data.css = {};
codeSnips[n].data.js = {};
/* jshint shadow:true */
for (var key in cssObject) {
		  if (cssObject.hasOwnProperty(key)) {
		  	codeSnips[n].data.css[key] = cssObject[key];
	}
		}

for (var key in jsObject) {

		  if (jsObject.hasOwnProperty(key)) {
		  	codeSnips[n].data.js[key] = jsObject[key];
	}
		}
/* jshint shadow:false */
////  saves folder names in object as key -- end

/// removes duplicate libraries on load -- start

libsCss = libsCss.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) === index;
    });

libsJs = libsJs.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) === index;
    });

/// removes duplicate libraries on load -- end

codeSnips[n].deps.cssdep = libsCss;
codeSnips[n].deps.jsdep = libsJs;
codeSnips[n].prepro.csspre = cssPre;
codeSnips[n].prepro.jspre = jsPre;
codeSnips[n].jsdom = jsDom;
codeSnips=JSON.parse(JSON.stringify(codeSnips));
saveLocalJson();
}

function loadJson(n){
	codeSnips=JSON.parse(JSON.stringify(codeSnips));
 	htmlEditor.setValue(codeSnips[n].data.html);
 	cssEditor.setValue(codeSnips[n].data.css.base);
 	jsEditor.setValue(codeSnips[n].data.js.master);

	// set document window name
	outerWindowTitle = codeSnips[n].name;
	document.title = codeSnips[n].name;

 	jsObject = codeSnips[n].data.js;
	cssObject = codeSnips[n].data.css;
	libsJs = codeSnips[n].deps.jsdep;
	libsCss = codeSnips[n].deps.cssdep;
	cssPre = codeSnips[n].prepro.csspre;
	jsPre = codeSnips[n].prepro.jspre;
	jsDom = codeSnips[n].jsdom;

	refactorFolderList();
 	populatePreprocessors(cssPre, jsPre);
	switch(jsDom) {
    case "inhead":
        selectLoadType.selectedIndex = 0;
        break;
    case "inbody":
        selectLoadType.selectedIndex = 1;
        break;
    default:
        break;
}
	populateLibrariesJs(libsJs);
	populateLibrariesCss(libsCss);

	codeSnips=JSON.parse(JSON.stringify(codeSnips));
}


function refactorFolderList(){
	$( "#optionCssFiles" ).empty();
	$( "#optionJsFiles" ).empty();
/* jshint shadow:true */
	for (var key in cssObject) {
		if (cssObject.hasOwnProperty(key)) {
			$("#optionCssFiles").append('<option value="' + key + '">' + key + '</option>');
	}
	}

	for (var key in jsObject) {
		 if (jsObject.hasOwnProperty(key)) {
		 	$("#optionJsFiles").append('<option value="' + key + '">' + key + '</option>');
		}
	}
/* jshint shadow:false */
}

function saveLocalJson(){
	localStorage.setItem('codeSnips', JSON.stringify(codeSnips));
}

function loadLocalJson(){
	if (localStorage.getItem('codeSnips') !== null) {
    	var startObject = JSON.parse(localStorage.getItem('codeSnips'));
		startLoad(startObject);
}
}


function startLoad(startObject){
	codeSnips = JSON.parse(JSON.stringify(startObject));
	codeSnips.forEach(function(entry){
		saveNames.push(entry.name);
	});
	saveNames.forEach(function(entry){
		$("#loadSelect").append('<option value="' + entry + '">' + entry + '</option>');
	});
}

function clearStorage(){
	localStorage.clear();
}


function populateLibrariesJs(populateArray){
	while (usedLibsJs.firstChild) {
    usedLibsJs.removeChild(usedLibsJs.firstChild);
    }
    var subString = [];
	var counter = 0 ;
	populateArray.forEach(function(){
	subString = populateArray[counter].split('/');
	$("#jsLibsUsed").append('<option value="' + subString[subString.length-1] + '" selected>' + subString[subString.length-1] + '</option>');
	counter++;
	});
}

function populateLibrariesCss(populateArray){
	while (usedLibsCss.firstChild) {
    usedLibsCss.removeChild(usedLibsCss.firstChild);
    }
    var subString = [];
	var counter = 0 ;
	populateArray.forEach(function(){
	subString = populateArray[counter].split('/');
	$("#cssLibsUsed").append('<option value="' + subString[subString.length-1] + '" selected>' + subString[subString.length-1] + '</option>');
	counter++;
	});
}

function populatePreprocessors(cssPre, jsPre){
	if(cssPre === "SCSS"){
		$('input[name=cmCssLint]').click();
		selectPreCss.selectedIndex = 1;
	}else if(cssPre === "SASS"){
		$('input[name=cmCssLint]').click();
		selectPreCss.selectedIndex = 2;
	}else if(!($('input[name=cmCssLint]').is(':checked'))){
		$('input[name=cmCssLint]').click();
	}


	if(jsPre === "Babel-2015"){
		$('input[name=cmJsLint]').click();
		selectPreJs.selectedIndex = 1;
	}else if(jsPre === "Babel-2016"){
		$('input[name=cmJsLint]').click();
		selectPreJs.selectedIndex = 2;
	}else if(jsPre === "Babel-2017"){
		$('input[name=cmJsLint]').click();
		selectPreJs.selectedIndex = 3;
	}else if(!($('input[name=cmJsLint]').is(':checked'))){
		$('input[name=cmJsLint]').click();
	}
}
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


// });

})();