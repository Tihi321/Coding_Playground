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