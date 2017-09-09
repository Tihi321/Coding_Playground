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