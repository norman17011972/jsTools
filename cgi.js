///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// read items for a week
// input: (global) ACT_YEAR / ACT_WEEK
// output: (global) weekItemList
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function f_ItemWeekImport() {
    delete weekItemList;
    weekItemList= new aList();	
	weekItemList.L_load= false;

	var newItem= new aItem();
	newItem.I_name= cs_owner;
	var aJSON = f_jsonObject(newItem);

	var req = new XMLHttpRequest();
	req.open("get",sENV + aRequest_E.REQ_ITEM_WEEK + aJSON, true); 
	req.onreadystatechange = f_WeekImport;
	req.send();
}

function f_WeekImport(e)
{
   if(e.target.readyState == 4 && e.target.status == 200) {
	console.log(e.target.responseText);

	try {
		var recv = JSON.parse(e.target.responseText);
	  } catch (e) { f_showOverlay_22(); return; }

	for (let i=0; i<recv.WeekItems.length; i++) {
            let tmp= new aItem();

            tmp.I_id= recv.WeekItems[i].id;		
            tmp.I_type= recv.WeekItems[i].type;		
            tmp.I_status= recv.WeekItems[i].status;		
            tmp.I_text= decodeURI(recv.WeekItems[i].text);					
            tmp.I_location= decodeURI(recv.WeekItems[i].location);	
            tmp.I_day= Number(recv.WeekItems[i].day);					
            tmp.I_time_start= recv.WeekItems[i].t_start;				
            tmp.I_time_end= recv.WeekItems[i].t_end;			
			tmp.I_duration= Number(recv.WeekItems[i].duration);			
            tmp.I_recStart= Number(recv.WeekItems[i].recstart);				
    
			weekItemList.arrayItems.push(tmp);
            //f_debugItem("Insert in List:", tmp);
		}
		weekItemList.L_load= true;		
		f_clear();
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// read items for a day
// input: (global) ACT_YEAR / ACT_WEEK / ACT_DAY
// output: (global) dayItemList
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function f_ItemDayImport() {
    delete dayItemList;
    dayItemList= new aList();	
	dayItemList.L_load= false;

	var newItem= new aItem();
	newItem.I_name= cs_owner;
	newItem.I_day= ACT_DAY;
	var aJSON = f_jsonObject(newItem);	

	var req = new XMLHttpRequest();
	req.open("get",sENV + aRequest_E.REQ_ITEM_DAY + aJSON, true); 
	req.onreadystatechange = f_DayImport;
	req.send();
}

function f_DayImport(e)
{
   if(e.target.readyState == 4 && e.target.status == 200) {
	console.log(e.target.responseText);

	try {
		var recv = JSON.parse(e.target.responseText);
	  } catch (e) { f_showOverlay_22(); return; }

	for (let i=0; i<recv.DayItems.length; i++) {
            let tmp= new aItem();

            tmp.I_id= recv.DayItems[i].id;		
            tmp.I_type= recv.DayItems[i].type;		
            tmp.I_status= recv.DayItems[i].status;		
            tmp.I_text= decodeURI(recv.DayItems[i].text);					



            tmp.I_location= decodeURI(recv.DayItems[i].location);	
            tmp.I_day= Number(recv.DayItems[i].day);					
            tmp.I_time_start= recv.DayItems[i].t_start;				
            tmp.I_time_end= recv.DayItems[i].t_end;			
			tmp.I_duration= Number(recv.DayItems[i].duration);			
            tmp.I_recStart= Number(recv.DayItems[i].recstart);				
    
			weekItemList.arrayItems.push(tmp);
            if(tmp.I_id > weekItemList.id_max) { weekItemList.id_max= tmp.I_id; }
            //f_debugItem("Insert in List:", tmp);
		}
		dayItemList.L_load= true;		
		f_clear();
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// read full month from server
// input: s_y (string year) s_m (string month)
// output: (global) monthList
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function f_ItemMonthImport(s_y, s_m) {    
	delete monthList;
	monthList= new aMonth();

	var newItem= new aItem();
	newItem.I_year= s_y;
	newItem.I_month= s_m;
	var aJSON = f_jsonObject(newItem);	
	        
	var req = new XMLHttpRequest();
	req.open("get",sENV + aRequest_E.REQ_ITEM_MONTH + aJSON, true); 
	req.onreadystatechange = f_MonthImport;
	req.send();
}

function f_MonthImport(e)
{
   if(e.target.readyState == 4 && e.target.status == 200) {
		console.log(e.target.responseText);

		try { var recv = JSON.parse(e.target.responseText); } catch (e) { f_showOverlay_23(); return; }

		// store the week information
		for (let i=0; i<recv.monthItems.length; i++) {
			var aW= new aWeek();
			aW.i_number= recv.monthItems[i].week;
			aW.i_min_work= Number(recv.monthItems[i].time_work);
			aW.i_min_driveW= Number(recv.monthItems[i].time_driveW);
			aW.i_min_driveB= Number(recv.monthItems[i].time_driveB);
			aW.i_min_holy= Number(recv.monthItems[i].time_holy);
			aW.i_min_vaca= Number(recv.monthItems[i].time_vaca);
			aW.i_min_ill= Number(recv.monthItems[i].time_ill);
			aW.i_min_free= Number(recv.monthItems[i].time_free);
			monthList.arrayWeeks.push(aW);
		}

		// store all days information
		for (let i=0; i<monthList.arrayWeeks.length; i++) {
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].mon;
				aD.itemType= recv.dayInfos[i].mon_type;
				aD.itemStatus= recv.dayInfos[i].mon_stat;
				aD.i_min_work= recv.dayInfos[i].mon_work;
				aD.i_min_driveW= recv.dayInfos[i].mon_driveW;
				aD.i_min_driveB= recv.dayInfos[i].mon_driveB;
				monthList.arrayWeeks[i].a_days.push(aD);
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].tue;
				aD.itemType= recv.dayInfos[i].tue_type;
				aD.itemStatus= recv.dayInfos[i].tue_stat;
				aD.i_min_work= recv.dayInfos[i].tue_work;
				aD.i_min_driveW= recv.dayInfos[i].tue_driveW;
				aD.i_min_driveB= recv.dayInfos[i].tue_driveB;
				monthList.arrayWeeks[i].a_days.push(aD);
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].wed;
				aD.itemType= recv.dayInfos[i].wed_type;
				aD.itemStatus= recv.dayInfos[i].wed_stat;
				aD.i_min_work= recv.dayInfos[i].wed_work;
				aD.i_min_driveW= recv.dayInfos[i].wed_driveW;
				aD.i_min_driveB= recv.dayInfos[i].wed_driveB;
				monthList.arrayWeeks[i].a_days.push(aD);
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].thu;
			monthList.arrayWeeks[i].a_days.push(aD);
				aD.itemType= recv.dayInfos[i].thu_type;
				aD.itemStatus= recv.dayInfos[i].thu_stat;
				aD.i_min_work= recv.dayInfos[i].thu_work;
				aD.i_min_driveW= recv.dayInfos[i].thu_driveW;
				aD.i_min_driveB= recv.dayInfos[i].thu_driveB;
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].fri;
				aD.itemType= recv.dayInfos[i].fri_type;
				aD.itemStatus= recv.dayInfos[i].fri_stat;
				aD.i_min_work= recv.dayInfos[i].fri_work;
				aD.i_min_driveW= recv.dayInfos[i].fri_driveW;
				aD.i_min_driveB= recv.dayInfos[i].fri_driveB;
				monthList.arrayWeeks[i].a_days.push(aD);
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].sat;
				aD.itemType= recv.dayInfos[i].sat_type;
				aD.itemStatus= recv.dayInfos[i].sat_stat;
				aD.i_min_work= recv.dayInfos[i].sat_work;
				aD.i_min_driveW= recv.dayInfos[i].sat_driveW;
				aD.i_min_driveB= recv.dayInfos[i].sat_driveB;
				monthList.arrayWeeks[i].a_days.push(aD);
			var aD= new aDay(); aD.s_day= recv.dayInfos[i].sun;
				aD.itemType= recv.dayInfos[i].sun_type;
				aD.itemStatus= recv.dayInfos[i].sun_stat;
				aD.i_min_work= recv.dayInfos[i].sun_work;
				aD.i_min_driveW= recv.dayInfos[i].sun_driveW;
				aD.i_min_driveB= recv.dayInfos[i].sun_driveB;
				monthList.arrayWeeks[i].a_days.push(aD);
		}

		monthList.L_load= true;	
		f_clear();	
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// store single item
// input: i (aItem)
// output: -
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function f_storeItemCgi(i) {
	var aJSON = f_jsonObject(i);
	var req = new XMLHttpRequest();
	console.log("send object: " + aJSON);
	req.open("get",sENV + aRequest_E.APP_EDIT_ITEM + aJSON, true);
	req.onreadystatechange = checkItemRequest;
	req.send(); 
}

function checkItemRequest(e) {
	if(e.target.status != 204) {
		console.log("Bad Request - Keine 204!");
		f_showOverlay_22();	
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// delete single item
// input: i (aItem)
// output: -
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function f_deleteItemCgi(i) {
	var aJSON = f_jsonObject(weekItemList.arrayItems[i]);
	var req = new XMLHttpRequest();
	console.log("delete Item I-id: ", weekItemList.arrayItems[i].I_id);
	req.open("get",sENV + aRequest_E.APP_DEL_ITEM + aJSON, true); 
	req.onreadystatechange = checkDeleteRequest;
	req.send(); 
}

function checkDeleteRequest(e) {
	if(e.target.status != 204) {
		console.log("Bad Request - Keine 204!");
		f_showOverlay_22();	
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// send "check the name of the user" to server
// input: s_name
// output: -
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function f_checkPWD(s_name) {
	var newItem= new aItem();
	newItem.I_name= s_name;
	var aJSON = f_jsonObject(newItem);

	var req = new XMLHttpRequest();
	console.log("Send name to server: " + s_name);
	req.open("get",sENV + aRequest_E.APP_CHECK_PWD + aJSON, true); 
	req.onreadystatechange = f_checkUserPwd;
	req.send();
}

////////////////////////////////////////////////////////////////////////////////////////////////
// result of "check the name of the super user" from server
////////////////////////////////////////////////////////////////////////////////////////////////
function f_checkUserPwd(e) {
   if(e.target.readyState == 4 && e.target.status == 200) {
	console.log("Server reply user pwd: " + e.target.responseText);

	try { var recv = e.target.responseText;
	  } catch (e) {
			console.log("Catch: no response: f_checkUserPwd");
			document.getElementById("inp_admin").innerHTML= "***";
			f_writeUserCookie("no_user");
			return;
		}

	console.log("checkUserPwd reply length: " + recv.length);

	if(recv == "no_user") { console.log("recv == no_user"); document.getElementById("inp_user").innerHTML= "***"; }
	else  { console.log("equal"); document.getElementById("inp_user").innerHTML= "Angemeldet"; }
	cs_owner= recv;
	f_writeUserCookie(recv);
	f_redraw();
	}
	else { // if(e.target.status != 204) 
		console.log("Keine 200!");
		f_writeUserCookie("no_user");
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// create JSON object of a item
// input: aItem i
// output: JSON object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function f_jsonObject(i) {
	var obj = { td_group: i.I_group, td_pwddd: i.I_pwd, td_uname: i.I_name, td_idddd: Number(i.I_id),
		td_yearr: Number(i.I_year), td_month: Number(i.I_month), td_weekk: Number(i.I_week), td_dayyy: Number(i.I_day), 
		td_typee: Number(i.I_type), td_statu: Number(i.I_status), td_textt: i.I_text, td_locat: i.I_location, 
		td_times: i.I_time_start, td_timee: i.I_time_end, td_durat: Number(i.I_duration), td_start: Number(i.I_recStart) };

	var myJSON = JSON.stringify(obj);
	encodeURI(myJSON);
	return myJSON;
}
