////////////////////////////////////////////////////////////////////////////////////////////////
// write user name to cookie
////////////////////////////////////////////////////////////////////////////////////////////////
function f_writeUserCookie(c_username) {
	console.log("f_writeUserCookie: " + c_username);
	var a = new Date();
	a = new Date(a.getTime() +1000*60*60*24*365);
	cookievalue = "myShell=" + c_username + ";" + "expires=" + a.toGMTString() + ";";
	document.cookie = cookievalue; 
}

////////////////////////////////////////////////////////////////////////////////////////////////
// raed user name from cookie
////////////////////////////////////////////////////////////////////////////////////////////////
function f_readUserCookie() {
	var nameEQ = "myShell" + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	   var c = ca[i];
	   while (c.charAt(0)==' ') c = c.substring(1,c.length);
	   if (c.indexOf(nameEQ) == 0) {
		  cookie_value= c.substring(nameEQ.length,c.length);
		  if(cookie_value != "no_user") { document.getElementById("inp_user").innerHTML= "Angemeldet"; }
		  else { document.getElementById("inp_user").innerHTML= "***"; }
		  cs_owner= cookie_value;
		  console.log("f_readUserCookie: " + cookie_value); 
		  return;
	   }
	}
	console.log("Can not read user Cockie"); 
}

////////////////////////////////////////////////////////////////////////////////////////////////
// return number of minutes from string "hh:mm"
////////////////////////////////////////////////////////////////////////////////////////////////
function f_calcMinutes(hhmm) {
	var i_HOURS= Number(hhmm.substr(0,2));
	var i_MINUTES= Number(hhmm.substr(3,2));
	return (i_HOURS * 60) + i_MINUTES;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// return duration (in minutes) by given item 
////////////////////////////////////////////////////////////////////////////////////////////////
function f_calcDuration(p_a_item) {
	f_debugItem("f_calcDuration",p_a_item);
	if(p_a_item.I_recStart == 0) {
		var i_1= f_calcMinutes(p_a_item.I_time_start);
		var i_2= f_calcMinutes(p_a_item.I_time_end);
		if(i_1 < i_2) { return (i_2-i_1); }
		else { return(1440 - i_1 + i_2); }
	}
	else {
		var t_now= f_now();
		var i_1= f_calcMinutes(t_now);
		var i_2= p_a_item.I_recStart;

		if(i_1 > i_2) { return (p_a_item.I_duration + i_1 - i_2); }
		else if(i_1 < i_2) { return (p_a_item.I_duration + (1440 - i_2) + i_1); }
		else { return p_a_item.I_duration; }
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// creata week selector - only for overlay_4 (plus helpers)
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function f_weekList() {
	var weekList = null;
	//f_week();
	weekList = document.createElement("datalist"); 
	weekList.setAttribute("id","weekList_4");
	for(let i=1; i<16; i++) {
		var element_option_4= document.createElement("option");
		element_option_4.setAttribute("value", f_getWeekString(i));
		weekList.appendChild(element_option_4);
	}
	document.getElementById("text_4").value= "";
	document.getElementById("text_4").addEventListener("focus",f_weekList);
	document.getElementById("text_4").appendChild(weekList);
}

function f_getWeekString(i) {
	var i_m= Number(ACT_WEEK);
	var i_y= Number(ACT_YEAR);

	// get number of weeks this year i_mThis and las year i_mLast 
    var i_mThis= Number(f_getWeeksOfYear(i_y)); //console.log("this Weeks: " + i_mThis);
    var i_mLast= Number(f_getWeeksOfYear(i_y-1)); //console.log("last Weeks: " + i_mLast);

	var i_num= ACT_WEEK - 8 + i; // start 8 weeks earlyer

	if(i_num < 1) { i_num= i_mLast + i_num; i_y--; }
	else if(i_num > i_mThis) { i_num= i_num-i_mThis; i_y++; }

	if(i_num<10) { return("Woche: 0" + i_num + " Jahr: " +  i_y); }
	else { return("Woche: " + i_num + " Jahr: " +  i_y); }
}

function f_getWeeksOfYear(y) {
	var date = new Date(y,11,28);
	//console.log("Date: " + date.getFullYear());
	var currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
	var yearOfThursday = currentThursday.getFullYear();
	var firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(3-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);
	var weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
	return weekNumber;
}

function f_getWeek(s) {
	ACT_YEAR= s.substr(16,4);
	ACT_WEEK= s.substr(7,2);
	return;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// return new itemID yywwdhhmm from now 
////////////////////////////////////////////////////////////////////////////////////////////////
function f_itemID() {
	var date = new Date();
	aDay= Number(date.getDay()); if (ACT_DAY==0) { ACT_DAY= 7; }
	var currentThu = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
	aYear = String(currentThu.getFullYear());
	aMonth= String("0" + (date.getMonth() + 1)).slice(-2);
	var firstThu = new Date(new Date(aYear,0,4).getTime() +(3-((new Date(aYear,0,4).getDay()+6) % 7)) * 86400000);
	aWeek = Math.floor(1 + 0.5 + (currentThu.getTime() - firstThu.getTime()) / 86400000/7);
	if(aWeek < 10) { aWeek= "0" + aWeek; } else { aWeek= String(aWeek); }

	var a= new Date();						// start time is now
	var i_min, i_hours, i_sec;				
	if(a.getSeconds() < 10) { i_sec= "0" + a.getSeconds(); } else  { i_sec= a.getSeconds(); }
	if(a.getMinutes() < 10) { i_min= "0" + a.getMinutes(); } else  { i_min= a.getMinutes(); }
	if(a.getHours() < 10) { i_hours= "0" + a.getHours(); } else  { i_hours= a.getHours(); }

	var itemID= aYear.substr(2,2) + aWeek + aDay + i_hours + i_min + i_sec; 
	console.log("New itemID: " + itemID);
	return itemID;
}


