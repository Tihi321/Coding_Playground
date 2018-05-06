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
		selectPreJs.selectedIndex = 1;
	}else if(jsPre === "Babel-2016"){
		selectPreJs.selectedIndex = 2;
	}else if(jsPre === "Babel-2017"){
		selectPreJs.selectedIndex = 3;
	}
}