({
	handleClick : function(component, event, helper) {
		var emailVar = component.get('v.emailStr');
         var action = component.get('c.validateEmailCallout');
        action.setParams({
            "email" : emailVar            
        });
        
        action.setCallback(component, function(response){
           var state=response.getState();
           if(state === 'SUCCESS')
           {
               var message = response.getReturnValue();
               console.log('message'+message);
               if(message == true){
                   component.set('v.isValid', true);  
                    component.set('v.isInvalid', false);
               }
               else{
                   component.set('v.isValid', false);
                    component.set('v.isInvalid', true);
               }
           }          
       });
        $A.enqueueAction(action);    
	},
    reset: function(component, event, helper) {
		   component.set('v.isValid', false);  
           component.set('v.isInvalid', false); 
        	component.set('v.emailStr', '');
    }
})