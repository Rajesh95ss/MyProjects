({
    // Fetch the accounts from the Apex controller
    getAccountList: function(component) {
        var action = component.get('c.getAccounts');
        // Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set('v.accounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    //Show account options to create Contact and Account
    getAccountOptions: function(component,event) {      
    	var selectedRec = event.getSource().get("v.text");
        if(selectedRec != null && selectedRec != ''){
            component.set('v.isDisplay', "true");
        }
       
    },	
    searchResultAccounts: function(component) {
      	component.set('v.isDisplay', "false");
        var action = component.get('c.searchRAccounts');
        action.setParams({
            "Name" : component.get("v.searchKeyword")            
        });
      
        action.setCallback(this, function(response){
           var state=response.getState();
           if(state === 'SUCCESS')
           {
               component.set("v.accounts", response.getReturnValue());
           }          
       });
        $A.enqueueAction(action);
    },
    accountEdit: function(component,event,helper){        
    	var editAccountId = event.getSource().get("v.value");
        if(editAccountId != null && editAccountId != ''){
            component.set('v.accountId', editAccountId);
        	component.set('v.showAccountEditModal', "true");
        }
	},
    getPicklistFieldValues: function(component){
    	var action = component.get('c.getPicklistValues'); 
        action.setParams({
            "picklistFieldApi" : "Type",
            "objectName"       : "Account"
        });
        action.setCallback(this, function(actionResult) {
            component.set('v.typeList', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
	},   
    handleSaveRecord: function(component, event, helper) {
        component.find("recordEditor").saveRecord($A.getCallback(function(saveResult) {
            
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                component.set('v.showAccountEditModal', "false");                
                component.set('v.message', "Account updated successfully.");
                component.set('v.showSuccessMessage', "true");
                /*var toastEvent = $A.get("event.force:showToast");
                toastEvent.setParams({
                    "message": "Account \""+component.get("v.simpleRecord.Name")+"\" updated successfully.",
                    "duration":"5000",
                    "key": "info_alt",
                    "type": "success",
                    "mode": "pester",
                    
                });               
                toastEvent.fire(); */
            }
            else if(saveResult.state === "ERROR") {
                var toastEvent = $A.get("event.force:showToast");
               } 
        }));
    },
    accountDelete: function(component, event, helper) {
        
         var action = component.get('c.deleteAccount');
        action.setParams({
            "accountId" : event.getSource().get("v.value")            
        });
      
        action.setCallback(component, function(response){
           var state=response.getState();
           if(state === 'SUCCESS')
           {
                component.set('v.message', "Account deleted successfully.");
                component.set("v.searchKeyword", '');
                component.set('v.showSuccessMessage', "true");
               
           }          
       });
        $A.enqueueAction(action);        
    }
})