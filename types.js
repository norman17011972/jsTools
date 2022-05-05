
// send the request to server
const aRequest_E = {
    UNDEFINED       : "00",
    APP_EDIT_ITEM   : "01",
    APP_DEL_ITEM    : "02",

    REQ_ITEM_DAY    : "10",
    REQ_ITEM_WEEK   : "11",
    REQ_ITEM_MONTH  : "12",

    APP_CHECK_PWD  : "20"
};

// item type (what action is stored in the item)
const itemType_E = {
    unused      : 0,    
    IT_WORK     : 1,    // normal work
    IT_DRIVE_W  : 2,    // drive to work
    IT_DRIVE_B  : 3,    // drive back
    IT_HOLI     : 4,    // public holiday
    IT_FREE     : 5,    // free day (payed)
    IT_VACA     : 6,    // holyday (payed)
    IT_ILL      : 7,     // corona ;-)
    IT_ERROR    : 8     // after bug
};

// actual situation of a item
const itemStatus_E = {
    unused  : 0,
    init    : 1,
    run     : 2,
    paused  : 3,
    edit    : 4,
    managed : 5,
    day     : 6,
    deleted : 7,
    error   : 9    
};

// days of the week 
const itemDay_E = {
    unused  : 0,
    MON     : 1,
    TUE     : 2,
    WED     : 3,
    THU     : 4,
    FRI     : 5,
    SAT     : 6,
    SUN     : 7,
    ERROR   : 8
};
