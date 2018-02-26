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
var fontSize = 16;
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