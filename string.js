////////////////////////////////////////////////////////////////////////////////////////////////
// create day string
////////////////////////////////////////////////////////////////////////////////////////////////
function f_dayString(s) {
    if(s==itemDay_E.MON) { return "Montag"; }
    else if(s==itemDay_E.TUE) { return "Dienstag"; }
    else if(s==itemDay_E.WED) { return "Mittwoch"; }
    else if(s==itemDay_E.THU) { return "Donnerstag"; }
    else if(s==itemDay_E.FRI) { return "Freitag"; }
    else if(s==itemDay_E.SAT) { return "Samstag"; }
    else if(s==itemDay_E.SUN) { return "Sonntag"; }
    else { return "Unbekannt"; }
}

////////////////////////////////////////////////////////////////////////////////////////////////
// create status(day) string (if ERROR then return default Montag)
////////////////////////////////////////////////////////////////////////////////////////////////
function f_dayNumber(s) {
	if(s=="Montag") { return itemDay_E.MON; }
	else if(s=="Dienstag") { return itemDay_E.TUE; }
	else if(s=="Mittwoch") { return itemDay_E.WED; }
	else if(s=="Donnerstag") { return itemDay_E.THU; }
	else if(s=="Freitag") { return itemDay_E.FRI; }
	else if(s=="Samstag") { return itemDay_E.SAT; }
	else if(s=="Sonntag") { return itemDay_E.SUN; }
	else return itemDay_E.MON; 
}

////////////////////////////////////////////////////////////////////////////////////////////////
// create task string
////////////////////////////////////////////////////////////////////////////////////////////////
function f_taskString(s) {
    if(s==itemType_E.IT_WORK) { return "Arbeitszeit"; }
    else if(s==itemType_E.IT_DRIVE_W) { return "Anfahrt"; }
    else if(s==itemType_E.IT_DRIVE_B) { return "Heimfahrt"; }
    else if(s==itemType_E.IT_HOLI) { return "Feiertag"; }
    else if(s==itemType_E.IT_FREE) { return "Frei"; }
    else if(s==itemType_E.IT_VACA) { return "Urlaub"; }
    else if(s==itemType_E.IT_ILL) { return "Krank"; }
    else { return "Unbekannt"; }
}

////////////////////////////////////////////////////////////////////////////////////////////////
// return time now in hh:mm
////////////////////////////////////////////////////////////////////////////////////////////////
function f_now() {
	var a= new Date();						// start time is now
	var i_minutes, i_hours;				
	if(a.getMinutes() < 10) { i_minutes= "0" + a.getMinutes(); } else  { i_minutes= a.getMinutes(); }
	if(a.getHours() < 10) { i_hours= "0" + a.getHours(); } else  { i_hours= a.getHours(); }
	return (i_hours + ":" + i_minutes);
}

////////////////////////////////////////////////////////////////////////////////////////////////
// return time from minutes i in hh:mm
////////////////////////////////////////////////////////////////////////////////////////////////
function f_timeString(i) {
	var i_hours= i / 60;
	i_hours= Math.floor(i_hours);
	var i_minutes= i % 60;
	if(i_hours < 10) { i_hours= "0" + i_hours; }
	if(i_minutes < 10) { i_minutes= "0" + i_minutes; }
	return i_hours + ":" + i_minutes;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// duration in minutes will be returned in "h.min"
////////////////////////////////////////////////////////////////////////////////////////////////
function f_durationString(i) {
	var i_hours= i / 60;
	i_hours= Math.floor(i_hours);
	console.log("****** f_durationString i_hours:", i_hours);
	var i_minutes= i % 60;
	console.log("****** f_durationString i_minutes:", i_minutes);
	return i_hours + "." + i_minutes;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// return numbers from date string s (yyyy-mm-dd z.B. "2022-08-03") (i defines the get: 1=year/2=month/3=day)
////////////////////////////////////////////////////////////////////////////////////////////////
function f_getDateNumber(s,i) {
    switch(i) {
        case 1: return Number(s.substr(0,4));
        case 2: return Number(s.substr(5,2));
        case 3: return Number(s.substr(8,2));
    }
}

