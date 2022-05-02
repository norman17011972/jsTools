////////////////////////////////////////////////////////////////////////////////////////////////
// function to calculate ACT_DAY, ACT_WEEK, ACT_MONTH and ACT_YEAR from today
////////////////////////////////////////////////////////////////////////////////////////////////
function f_week() {
	var date = new Date();
	ACT_DAY= Number(date.getDay()); if (ACT_DAY==0) { ACT_DAY= 7; }
	var currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
	ACT_YEAR = String(currentThursday.getFullYear());
	ACT_MONTH= String("0" + (date.getMonth() + 1)).slice(-2);
	var firstThursday = new Date(new Date(ACT_YEAR,0,4).getTime() +(3-((new Date(ACT_YEAR,0,4).getDay()+6) % 7)) * 86400000);
	ACT_WEEK = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
	if(ACT_WEEK < 10) { ACT_WEEK= "0" + ACT_WEEK; } else { ACT_WEEK= String(ACT_WEEK); }
	console.log("log ACT_YEAR: " + ACT_YEAR);
	console.log("log ACT_MONTH: " + ACT_MONTH);
	console.log("log ACT_WEEK: " + ACT_WEEK);
	console.log("log ACT_DAY: " + ACT_DAY);
}

////////////////////////////////////////////////////////////////////////////////////////////////
// function to calculate the full date for a day of the given week+year
////////////////////////////////////////////////////////////////////////////////////////////////
function calWeek(intDay,intWeek,intYear) {
	// VORARBEIT    
	dat = new Date(intYear,0,1);    	// Datum hier initalisiert auf der 1.1 des Jahres
	firstDay = dat.getDay();    		// Wochentag für den 1.1. des Jahres
	if( firstDay == 0 ) firstDay = 7; 	// (1=Montag, 2=Diestag, ..., 7=Sonntag)
		
	// Berechne Start der KW: Ist der 1.1 später als Donnerstag, startet die erste Kalenderwoche erst am folgenden Montag
	if( firstDay > 4 ) { dat.setTime( dat.getTime() + (8-firstDay) * 24*60*60*1000 ); }
		// Sonst startet die erste Kalenderwoche am Montag vor dem 1.1 bzw. am 1.1 wenn er ein Montag ist
	else { dat.setTime( dat.getTime() + (1-firstDay) * 24*60*60*1000 ); }

	// Die [intWeek]-te Kalenderwoche ist sieben mal [intWeek] minus eins Tage später als die erste
	dat.setTime( dat.getTime() + (intWeek-1)* 7*24*60*60*1000 );
	
	// init all weekdays
	ACT_MONDAY= (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear()); dat.setDate(dat.getDate() + 1);
	ACT_TUESDAY=  (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear()); dat.setDate(dat.getDate() + 1);
	ACT_WEDNESDAY=   (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear()); dat.setDate(dat.getDate() + 1);
	ACT_THURSDAY=   (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear()); dat.setDate(dat.getDate() + 1);
	ACT_FRIDAY=   (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear()); dat.setDate(dat.getDate() + 1);
	ACT_SATURDAY=   (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear()); dat.setDate(dat.getDate() + 1);
	ACT_SUNDAY=   (dat.getDate() + "-" + (dat.getMonth()+1) + "-" + dat.getFullYear());

	if(intDay==itemDay_E.MON) { return ACT_MONDAY; }
	else if(intDay==itemDay_E.TUE) { return ACT_TUESDAY; }
	else if(intDay==itemDay_E.WED) { return ACT_WEDNESDAY; }
	else if(intDay==itemDay_E.THU) { return ACT_THURSDAY; }
	else if(intDay==itemDay_E.FRI) { return ACT_FRIDAY; }
	else if(intDay==itemDay_E.SAT) { return ACT_SATURDAY; }
	else if(intDay==itemDay_E.SUN) { return ACT_SUNDAY; }
}

////////////////////////////////////////////////////////////////////////////////////////////////
// get actual date and check if week and/or year have changed
////////////////////////////////////////////////////////////////////////////////////////////////
function f_changeDate(oldWEEK, oldYEAR) {
	f_week();
	console.log("act week: " + ACT_WEEK + " act year: " + ACT_YEAR);
	console.log("old week: " + oldWEEK + " old year: " + oldYEAR);
	if ((ACT_WEEK != oldWEEK)||(ACT_YEAR != oldYEAR)) {  return true; } 
	else { return false; }
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// update week ACT_WEEK ++ / -- (and ACT_YEAR if necessary)
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function f_actWeekPlus() {
	var i_weeksThisYear= f_getWeeksOfYear(ACT_YEAR);
	if(ACT_WEEK==i_weeksThisYear) { ACT_WEEK= 1; ACT_YEAR++; }
	else { ACT_WEEK++; }
}

function f_actWeekMinus() {
	if(ACT_WEEK==1) { ACT_WEEK= f_getWeeksOfYear(ACT_YEAR-1); ACT_YEAR--; }
	else { ACT_WEEK--; }
}

function f_getWeeksOfYear(y) {
	var date = new Date(y,11,28);
	var currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
	var yearOfThursday = currentThursday.getFullYear();
	var firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(3-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);
	var weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
	return weekNumber;
}
