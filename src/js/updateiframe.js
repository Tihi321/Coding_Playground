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