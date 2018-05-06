//////  SECTION BUTTONS    /////

////    SMALL MENU

$(".toggle-small").click(function(e) {
  e.stopImmediatePropagation();
  var _this = $(this);
  _this.toggleClass("toggle-on");
  _this
    .parent()
    .next(".small-sub")
    .toggleClass("small-sub-on");
});

// MAIN MENU

////    SMALL MENU

$("#main-menu").click(function(e) {
  e.stopImmediatePropagation();
  var _this = $(this);
  _this.children(".toggle-small").toggleClass("toggle-on");
  _this.next(".small-sub").toggleClass("small-sub-on");
});

// enabling copy to clipboard when button with #id is clicked for copying code content
//jshint unused:false
$("#copyButtonHtml").on("click", function() {
  var clipboardHtml = new Clipboard("#copyButtonHtml", {
    text: function() {
      return htmlEditor.getValue();
    }
  });
});
$("#copyButtonCss").on("click", function() {
  var clipboardCss = new Clipboard("#copyButtonCss", {
    text: function() {
      return complCss;
    }
  });
});
$("#copyButtonJs").on("click", function() {
  var clipboardJs = new Clipboard("#copyButtonJs", {
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
    setTimeout(function() {
      $("#copiedHtml").css("display", "none");
    }, 2000);
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
    setTimeout(function() {
      $("#copiedCSS").css("display", "none");
    }, 2000);
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
    setTimeout(function() {
      $("#copiedJs").css("display", "none");
    }, 2000);
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
    if (counter <= string.length - 1 && playCode) {
      subString += string[counter];
      editor.setValue(subString);
      editorSize = editor.getScrollInfo();
      if (string[counter] === "}") {
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
function playCssStart() {
  if (plaCssCodeStart) {
    if (cssObject.base !== "") {
      runBtnCodePlayer();
    } else {
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

$("#jsMoveDownBtn").on("click", function() {
  $(".toggle-small").removeClass("toggle-on");
  $(".small-sub").removeClass(" small-sub-on");

  var index = selectJsFileNames.selectedIndex;

  if (index < selectJsFileNames.options.length - 1) {
    if (selectJsFileNames.options[index].text === "master") return;
    $(selectJsFileNames.options[index]).before(
      $(selectJsFileNames.options[index + 1])
    );
    jsObject = swap(jsObject, index, index + 1);
  }
});

$("#jsMoveUpBtn").on("click", function() {
  $(".toggle-small").removeClass("toggle-on");
  $(".small-sub").removeClass(" small-sub-on");

  var index = selectJsFileNames.selectedIndex;

  if (index > 1) {
    $(selectJsFileNames.options[index - 1]).before(
      $(selectJsFileNames.options[index])
    );
    jsObject = swap(jsObject, index, index - 1);
  }
});

$("#minFolderCssBtn").on("click", function() {
  $(".toggle-small").removeClass("toggle-on");
  $(".small-sub").removeClass(" small-sub-on");

  var cssFolderName =
    selectCssFileNames.options[selectCssFileNames.selectedIndex];
  if (cssFolderName.text !== "base") {
    if (cssObject.hasOwnProperty(cssFolderName.text)) {
      delete cssObject[cssFolderName.text];
    }
    cssFolderName.parentNode.removeChild(cssFolderName);
    cssEditor.setValue(cssObject.base);
  }
});

$("#cssMoveDownBtn").on("click", function() {
  $(".toggle-small").removeClass("toggle-on");
  $(".small-sub").removeClass(" small-sub-on");

  var index = selectCssFileNames.selectedIndex;

  if (index < selectCssFileNames.options.length - 1) {
    if (selectCssFileNames.options[index].text === "base") return;
    $(selectCssFileNames.options[index]).before(
      $(selectCssFileNames.options[index + 1])
    );
    cssObject = swap(cssObject, index, index + 1);
  }
});

$("#cssMoveUpBtn").on("click", function() {
  $(".toggle-small").removeClass("toggle-on");
  $(".small-sub").removeClass(" small-sub-on");
  
  var index = selectCssFileNames.selectedIndex;
  
  if (index > 1) {
    $(selectCssFileNames.options[index - 1]).before($(selectCssFileNames.options[index]));
    cssObject = swap(cssObject, index, index - 1);
  }
});

/* function for swapping object keys */

function swap(obj, selected, target) {
  var newObject = {};
  var keysArray = Object.keys(obj);
  keysArray[selected] = keysArray.splice(target, 1, keysArray[selected])[0];

  keysArray.forEach(function(entry) {
    newObject[entry] = obj[entry];
  });

  return newObject;
}

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

function updateWidthOnResize() {
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
  collWidth = collWidth.substring(0, collWidth.length - 1);
  var pxWidth = parseInt($(window).width() / 100 * collWidth);

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
