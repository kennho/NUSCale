// JavaScript Document

/***
*	Initialise elements in the login page.
*/
function initLogin() {
	loginHandler();
}

/***
*	Event Handler for elements in login page.
*/
function loginHandler() {
	$("#id-textbox").focus(function() {
		toggleLabel(this);
	});
	
	$("#id-textbox").blur(function() {
		toggleLabel(this);
	});
	
	$("#password-textbox").focus(function() {
		toggleLabel(this);
	});
	
	$("#password-textbox").blur(function() {
		toggleLabel(this);
	});
}

/***
*	Initialise elements in the index page.
*/
function initPage() {
	
}

/***
*	Toggle the label of a textbox when that particular textbox gains focus.
*
*	element: the element to have its' label toggled
*	ignoreSpace: treat space as empty
*/
function toggleLabel(element) {
	var content = $(element).val();
	
	if(!$.trim(content)) {
		$(element).siblings("label").toggle();
		$(element).val("");	
	}
}