////////////////////////////////////////////////////////////////////////////////////////////////
// a singele (todo)  - smalest information object
////////////////////////////////////////////////////////////////////////////////////////////////
class aItem {
	constructor() {
		this.I_id= Number(0);					// fix id to identify the item in the list
		this.I_group= "---";					// user group (identification)
		this.I_name= cs_owner;					// user name (identification)
		this.I_pwd= "---";						// user Pwd (identification)
		this.I_type= itemType_E.unused;			// what kind of task (work/ill/free day/...)	
		this.I_status= itemStatus_E.unused;		// what is the actual task status (init, run, paused)
        this.I_sync= false;                     // is task sunchronized to sever
		this.I_text= "---";						// free text
		this.I_location= "---";					// free text for location
		this.I_year= ACT_YEAR;					// date informations (not fix)
		this.I_month= ACT_MONTH;
		this.I_week= ACT_WEEK;
		this.I_day= itemDay_E.unused;			// event day
		this.I_time_start= "00:00";				// start time - to be edit
		this.I_time_end= "00:00";				// end time - to be edit	
		this.I_duration= Number(0);				// duration of the task
		this.I_recStart= Number(0);				// Start time of task (refreshed after continue)
	} 
}

///////////////////////////////////////////////////////////////////////////////////////////////
// a list - represents a list of items -> normaly one week or month (one page on the webside)
///////////////////////////////////////////////////////////////////////////////////////////////
class aList {
	constructor() {		      
		this.arrayItems =[];	    // item array (items "aItem" per week)
		this.L_load= false;			// loaded (true) or still on server (default: false)
	}
}

// create an empty list (init first time) 
weekItemList= new aList();	

// store a new item and redraw the list
function f_storeNewItemList(i) {
	i.I_id= f_itemID();
	weekItemList.arrayItems.push(i);
	f_debugItem("f_storeNewItemList",i);
	f_storeItemCgi(i);
}

///////////////////////////////////////////////////////////////////////////////////////////////
// new item from user input (day view overlay_6)
///////////////////////////////////////////////////////////////////////////////////////////////
function f_newInitItem(rate) {
	var newItem= new aItem();
	console.log("ItemType (rate DayView): " + rate);
	if(rate == itemType_E.IT_WORK) { 
		newItem.I_type= itemType_E.IT_WORK; newItem.I_status= itemStatus_E.init; newItem.I_day= ACT_DAY; }
	else if(rate == itemType_E.IT_DRIVE_W) { 
		newItem.I_type= itemType_E.IT_DRIVE_W; newItem.I_status= itemStatus_E.init; newItem.I_day= ACT_DAY; }
	else if(rate == itemType_E.IT_DRIVE_B) { 
		newItem.I_type= itemType_E.IT_DRIVE_B; newItem.I_status= itemStatus_E.init; newItem.I_day= ACT_DAY; }
	else if(rate == itemType_E.IT_HOLI) { 
		newItem.I_type= itemType_E.IT_HOLI; newItem.I_status= itemStatus_E.day; newItem.I_day= ACT_DAY; }
	else if(rate == itemType_E.IT_ILL) { 
		newItem.I_type= itemType_E.IT_ILL; newItem.I_status= itemStatus_E.day; newItem.I_day= ACT_DAY; }
	else if(rate == itemType_E.IT_FREE) { 
		newItem.I_type= itemType_E.IT_FREE; newItem.I_status= itemStatus_E.day; newItem.I_day= ACT_DAY; }
	else if(rate == itemType_E.IT_VACA) { 
		newItem.I_type= itemType_E.IT_VACA; newItem.I_status= itemStatus_E.day; newItem.I_day= ACT_DAY; }
			f_debugItem("f_newInitItem",newItem);
		return newItem;
}

///////////////////////////////////////////////////////////////////////////////////////////////
// new item from user input (week view overlay_8)
///////////////////////////////////////////////////////////////////////////////////////////////
function f_newFullItem(rate) {
	var newItem= new aItem();
	console.log("ItemType (rate WeekView): " + rate);
	if(rate == itemType_E.IT_WORK) { newItem.I_type= itemType_E.IT_WORK; newItem.I_status= itemStatus_E.edit; }
	else if(rate == itemType_E.IT_DRIVE_W) { newItem.I_type= itemType_E.IT_DRIVE_W; newItem.I_status= itemStatus_E.edit; }
	else if(rate == itemType_E.IT_DRIVE_B) { newItem.I_type= itemType_E.IT_DRIVE_B; newItem.I_status= itemStatus_E.edit; }
	else if(rate == itemType_E.IT_HOLI) { newItem.I_type= itemType_E.IT_HOLI; newItem.I_status= itemStatus_E.day; }
	else if(rate == itemType_E.IT_ILL) { newItem.I_type= itemType_E.IT_ILL; newItem.I_status= itemStatus_E.day; }
	else if(rate == itemType_E.IT_FREE) { newItem.I_type= itemType_E.IT_FREE; newItem.I_status= itemStatus_E.day; }
	else if(rate == itemType_E.IT_VACA) { newItem.I_type= itemType_E.IT_VACA; newItem.I_status= itemStatus_E.day; }

	newItem.I_text= document.getElementById("info_8").value;
	newItem.I_location= document.getElementById("ort_8").value;
	var rate2= document.querySelector('input[name="n_days_8"]:checked').id;

	console.log("Wochentag (rate2): " + rate2);
	newItem.I_day= Number(rate2);
	newItem.I_time_start= document.getElementById("ip_time1_8").value;				
	newItem.I_time_end= document.getElementById("ip_time2_8").value;		
	newItem.I_duration= f_calcDuration(newItem);						
	f_debugItem("f_newFullItem",newItem);
	return newItem;
}

///////////////////////////////////////////////////////////////////////////////////////////////
// start / stop / restart buttons
///////////////////////////////////////////////////////////////////////////////////////////////

function f_startItem(i) {
	console.log("startRecording()"); 
	weekItemList.arrayItems[i].I_recStart= f_calcMinutes(f_now());
	weekItemList.arrayItems[i].I_time_start= f_now();
	weekItemList.arrayItems[i].I_status= itemStatus_E.run;
	f_storeItemCgi(weekItemList.arrayItems[i]);
	f_debugItem("After Start: ", weekItemList.arrayItems[i]);
	f_clear();
}

function f_stopItem(i) {
	console.log("stopRecording()"); 
	weekItemList.arrayItems[i].I_time_end= f_now();
	weekItemList.arrayItems[i].I_status= itemStatus_E.paused;
	weekItemList.arrayItems[i].I_duration= f_calcDuration(weekItemList.arrayItems[i]);
	f_storeItemCgi(weekItemList.arrayItems[i]);
	f_debugItem("After Stop: ", weekItemList.arrayItems[i]);
	f_clear();
}

function f_reStartItem(i) {
	console.log("stopRecording()"); 
	weekItemList.arrayItems[i].I_recStart= f_calcMinutes(f_now());
	weekItemList.arrayItems[i].I_status= itemStatus_E.run;
	f_storeItemCgi(weekItemList.arrayItems[i]);
	f_debugItem("After ReStart: ", weekItemList.arrayItems[i]);
	f_clear();
}

////////////////////////////////////////////////////////////////////////////////////////////////
// sort a list by day
////////////////////////////////////////////////////////////////////////////////////////////////
function f_sortItemList(l) {
	var swappy = true;
	while(swappy) {
		swappy= false;

		for(i=0; i < (l.arrayItems.length-1); i++) 
		{
			if(l.arrayItems[i].I_day > l.arrayItems[i+1].I_day) {
				var temp = l.arrayItems[i];
				l.arrayItems[i] = l.arrayItems[i+1];
				l.arrayItems[i+1] = temp;
				swappy = true;
			}
		}
	}
}
