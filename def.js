// shown in footer
const S_VERSION= "(c) v0.29 2022 by NormanK";
const I_VERSION= Number(29);

// global - sorry
cs_owner = "*****";				// change only this to change user (all times 5 char!)
ACT_DAY = "unknown";	        // store actual year,week,... init at start and after selection
ACT_WEEK= "unknown";			
ACT_MONTH = "unknown";	
ACT_YEAR= "unknown";		

// platform 
ACT_VIEW = 1;                   // 1=day / 2=week / 3=month

// count up the unique ID
ID_MAX = Number(0);             // set by cookie or from server

// day strings of the actual week
ACT_MONDAY= "unknown";
ACT_TUESDAY= "unknown";
ACT_WEDNESDAY= "unknown";
ACT_THURSDAY= "unknown";
ACT_FRIDAY= "unknown";
ACT_SATURDAY= "unknown";
ACT_SUNDAY= "unknown";

// run in enviroment (server)
const ENV= 1;					// 1=Windows / 2=Linux local / 3=Linux server
var sENV= "";

switch (ENV) {
    case 1: { sENV= "http://127.0.0.1:222/cgi-bin/cgiInterface.exe?"; } break;
    case 2: { sENV= "http://127.0.0.1/cgi-bin/cgiInterface?"; } break;
    case 3: { sENV= "https://myshell.systems:443/cgi-bin/cgiInterface?"; } break;
    default: sENV= ""; 
}

// some fixed sizes
const SIZE_TEXT_10=    10;
const SIZE_TEXT_20=    20;
const SIZE_USER=       5;
const SIZE_USER_NAME=  20;

// (simple) debug level
const DEBUG_L= 1;               // 0= nothing / 1= all / 2= some

// can be used in all modules
var dayItemList= null;
var weekItemList= null;
var monthList= null;

