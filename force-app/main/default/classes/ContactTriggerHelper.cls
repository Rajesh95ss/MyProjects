public class ContactTriggerHelper {
    public static Boolean isRun =true;
    public static void emailValidator(List<Contact> contactList){
        isRun =false;
        String emailStr;
        Id contactId;
        for(Contact thisContact : contactList){
            if(String.IsNotBlank(thisContact.Email)){
                contactId = thisContact.Id;
                emailStr = EncodingUtil.URLENCODE(thisContact.Email,'UTF-8');
            } 
        }
        if(String.IsNotBlank(emailStr)){
            validateEmailCallout(emailStr, contactId);
        }
    }
    
    @future (callout=true)
    public static void validateEmailCallout(String email, Id contactId){
        List<Contact> contactList = new List<Contact>();
         JSON2Apex isValid;
        Http h=new Http();
		HttpRequest request = new HttpRequest();
		HttpResponse response=new HttpResponse();
		request.setMethod('GET');
		request.setEndpoint('https://pozzad-email-validator.p.rapidapi.com/emailvalidator/validateEmail/'+email);
		request.setHeader('Accept', 'application/json');
		request.setHeader('X-RapidAPI-Host', 'pozzad-email-validator.p.rapidapi.com');
		request.setheader('X-RapidAPI-Key', '34da8e9db0msh81157f4e711615bp1cf8a3jsn1bb7cc8f74f2');
		response =  h.send(request);
		system.debug('response '+response.getbody());
         if(response.getStatusCode() == 200){
              isValid = JSON2Apex.parse(response.getbody());
             system.debug('isValid'+isValid.isValid);
             for(Contact thisContact : [SELECT Id, Description FROM Contact WHERE id = :contactId]){
                 thisContact.Description = String.valueOf(isValid.isValid);
                 contactList.add(thisContact);
                 system.debug('thisContact.Descriptio'+ thisContact.Description);
             }              
            //ContactEmailQueuable cq = new ContactEmailQueuable(contactList);
             System.enqueueJob(new ContactEmailQueuable(contactList));
         }
    }
}