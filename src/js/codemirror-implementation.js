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