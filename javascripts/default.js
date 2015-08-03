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
	drawCalendar();
}

function drawCalendar() {
	populateDropdown();
	
	var selectedMonthFirstDate = new Date($("#dropdown-year").val(), $("#dropdown-month").val() - 1, 1);
	var selectedMonthNumberOfDays = new Date($("#dropdown-year").val(), $("#dropdown-month").val(), 0).getDate();
	var previousMonthNumberOfDays = new Date($("#dropdown-year").val(), $("#dropdown-month").val() - 1, 0).getDate();
	var nextMonthNumberOfDays = new Date($("#dropdown-year").val(), $("#dropdown-month").val() + 1, 0).getDate();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	var todaysDate = new Date().getDate();
	var todaysMonth = new Date().getMonth() + 1;
	var todaysYear = new Date().getFullYear();
	var selectedMonth = parseInt($("#dropdown-month").val());
	var selectedYear = parseInt($("#dropdown-year").val());
	
	var selectedMonthDayCounter = 1;
	var previousMonthDayCounter = (selectedMonthFirstDate.getDay() == 0) 
									? previousMonthNumberOfDays - 6 
									: previousMonthNumberOfDays - selectedMonthFirstDate.getDay() + 1;
	var nextMonthDayCounter = 1;
	
	$("#monthly-calendar").empty();
	
	//create columns id
	var $colgroup = $("<colgroup />");
	for(columnCounter = 0; columnCounter < days.length; columnCounter++) {
		$colgroup.append($("<col />").attr("id", days[columnCounter].toLowerCase()));
	}
	$("#monthly-calendar").append($colgroup);
	
	//populate the calendar with dates based on year and month selected
	for(rowCounter = 1; rowCounter <= 7; rowCounter++) {
		var $row = $("<tr />");
		
		for(columnCounter = 0; columnCounter < days.length; columnCounter++) {
			var $cell = $("<td />");
			
			//if it's first row, populate the cells with header text. Otherwise, populate cells with dates.
			if(rowCounter == 1) {
				$cell = $("<th />");
				$cell.html(days[columnCounter]);
			}
			else {
				if(previousMonthDayCounter <= previousMonthNumberOfDays) {
					$cell.addClass("previousMonth").html(previousMonthDayCounter);
					
					if(previousMonthDayCounter == todaysDate && selectedMonth - 1 == todaysMonth && selectedYear == todaysYear)
						$cell.addClass("today");					
					
					previousMonthDayCounter++;
				}
				else {
					if(selectedMonthDayCounter <= selectedMonthNumberOfDays) {
						$cell.html(selectedMonthDayCounter);
						
						if(selectedMonthDayCounter == todaysDate && selectedMonth == todaysMonth && selectedYear == todaysYear)
							$cell.addClass("today");
							
						selectedMonthDayCounter++;
					}
					else {
						$cell.addClass("nextMonth").html(nextMonthDayCounter);
						
						if(nextMonthDayCounter == todaysDate && selectedMonth + 1 == todaysMonth && selectedYear == todaysYear)
							$cell.addClass("today");
						
						nextMonthDayCounter++;
					}
				}
			}
			
			$row.append($cell);
		}
		
		$("#monthly-calendar").append($row);
	}
	
	/*var todaysDate = new Date();
	var firstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
	var lastDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0);
	var daysInWeek = 7;
	var done = false;
	
	for(i = 0; i < daysInWeek; i++) {
		
	}*/
	
	//alert(firstDay.getDay());
	//alert(lastDay.getDay());
}

/***
*	Populate the dropbox for month and year
*/
function populateDropdown() {
	//clear the dropbox content
	$("#dropdown-month").empty();
	$("#dropdown-year").empty();
	
	//initiate values for months and years
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var currentYear = new Date().getFullYear();
	
	//populate dropdown-month list
	for(i = 1; i < 13; i++) {
		$("#dropdown-month").append($("<option />").val(i).html(months[i - 1]));
	}
	
	//set default value of dropdown-month to current month
	$("#dropdown-month").val(new Date().getMonth() + 1);
	
	//populate dropdown-year list (
	for(i = currentYear - 1; i <= currentYear + 2; i++) {
		$("#dropdown-year").append($("<option />").val(i).html(i));
	}
	
	//set default value of dropdown-year to current year
	$("#dropdown-year").val(currentYear);
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