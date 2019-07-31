({
      doInit: function(component, event, helper) {
        // Fetch the account list from the Apex controller
        helper.getAccountList(component);
        helper.getPicklistFieldValues(component);
      },
      checkboxSelect: function(component, event, helper) {
        helper.getAccountOptions(component, event);
      },
    searchAccounts: function(component, event, helper) {
        helper.searchResultAccounts(component);
      },
    accountView: function(component, event, helper){
         window.open("/"+event.getSource().get("v.value"));
    },
    editAccount: function(component, event, helper){
        helper.accountEdit(component, event, helper);
	},
    closeModal: function(component, event, helper){
        component.set('v.showAccountEditModal', "false");
        component.set('v.showSuccessMessage', "false");
    },
    updateAccount: function(component, event, helper){
    	helper.handleSaveRecord(component, event, helper); 
        helper.getAccountList(component);        
    },
    deleteAccounts: function(component, event, helper){
       if(confirm('Are you sure you want to delete this Account?')){
        	helper.accountDelete(component, event, helper); 
           	helper.getAccountList(component);     
       }    	 	   
    }    
})