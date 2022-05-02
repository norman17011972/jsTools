////////////////////////////////////////////////////////////////////////////////////////////////
// write text + item values to console
////////////////////////////////////////////////////////////////////////////////////////////////
function f_debugItem(s,i) {
    if(DEBUG_L==1) {
	    console.log("****** Item Logging: " + s);
	    console.log("I_id: " + i.I_id);
	    console.log("I_type: " + i.I_type);
	    console.log("I_status: " + i.I_status);
	    console.log("I_sync: " + i.I_sync);
	    console.log("I_text: " + i.I_text);
	    console.log("I_location: " + i.I_location);
	    console.log("I_day: " + i.I_day);
	    console.log("I_time_start: " + i.I_time_start);
	    console.log("I_time_end: " + i.I_time_end);
	    console.log("I_duration: " + i.I_duration);
	    console.log("I_recStart: " + i.I_recStart);        
	    console.log("****** End Logging: " + s);
    }
}


