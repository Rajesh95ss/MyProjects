({
    /*
     * This finction defined column header
     * and calls getAccounts helper method for column data
     * editable:'true' will make the column editable
     * */
    doInit : function(component, event, helper) {   
        
        //console.log('as'+obj.key1);
        helper.getObjectOptions(component, event, helper);        
    },
    getDataTable: function(component, event, helper) {
        console.log("value "+JSON.stringify(component.get("v.selectedValue")));
        helper.getColumnFields(component, event, helper);
        helper.getselectedObjectRecords(component, event, helper);
    },
    /*searchAccounts: function(component, event, helper) {
        console.log('sa');
        helper.searchResultAccounts(component);
        helper.buildData(component, helper);
    },*/
    
    handleTableColumns: function (component, event, helper) {
        //Get the Selected values   
        var selectedValues = event.getParam("value");       
        //Update the Selected Values  
        component.set("v.selectedGenreList", selectedValues);
    },
    onSubmit: function(component, event, helper){
        //Get selected Genre List on button click 
        helper.builDataTableColumns(component, event, helper);
        
    },
     getSelectedName: function (component, event) {
		var selectedRows = event.getParam('selectedRows');
        component.set('v.selectedRowsCount', selectedRows.length);
         var count = component.get('v.selectedRowsCount');
         if(count == 5){
			alert('You cant able to select more than 5 rows');             
         }
    },
    next: function (component, event, helper) {
        helper.next(component, event);
    },
    previous: function (component, event, helper) {
        helper.previous(component, event);
    },
    
    handleSelect : function(component, event, helper) {
        
        var selectedRows = event.getParam('selectedRows'); 
        if(selectedRows != null && selectedRows != ''){
            var previous = component.get("v.selectedAccts");
            var setRows = [];
            setRows.push(previous);
            for ( var i = 0; i < selectedRows.length; i++ ) {
                
                setRows.push(selectedRows[i]);
                
            }
            component.set("v.selectedAccts", setRows);
        }
        else{
            var previous = component.get("v.selectedAccts");
            var setRows = [];
            setRows.push(previous);
            component.set("v.selectedAccts", setRows);
        }
    },
    showColumnCustomizations: function(component, event, helper){
        component.set("v.showColumnCustomisationModal", "true");
    },
    
})