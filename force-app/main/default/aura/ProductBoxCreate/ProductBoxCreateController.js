({
	handleRecordUpdated : function(component, event, helper) {
	console.log("ss "+JSON.stringify(component.get("v.accountRecord.LastModifiedDate")));
        var today = new Date();
        var tt=today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("sd"+tt);    
	}
})