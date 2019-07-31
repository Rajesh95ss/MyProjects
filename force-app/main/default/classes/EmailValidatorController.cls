public class EmailValidatorController {
    @AuraEnabled
 public static Boolean validateEmailCallout(String email){
      String emailString = EncodingUtil.URLENCODE(email,'UTF-8');
     system.debug('emailString Apex '+emailString);
        List<Contact> contactList = new List<Contact>();
         JSON2Apex isValid;
        Http h=new Http();
		HttpRequest request = new HttpRequest();
		HttpResponse response=new HttpResponse();
		request.setMethod('GET');
		request.setEndpoint('https://pozzad-email-validator.p.rapidapi.com/emailvalidator/validateEmail/'+emailString);
		request.setHeader('Accept', 'application/json');
		request.setHeader('X-RapidAPI-Host', 'pozzad-email-validator.p.rapidapi.com');
		request.setheader('X-RapidAPI-Key', '34da8e9db0msh81157f4e711615bp1cf8a3jsn1bb7cc8f74f2');
		response =  h.send(request);
		system.debug('response '+response.getbody());
         if(response.getStatusCode() == 200){
              isValid = JSON2Apex.parse(response.getbody()); 
         }
     return isValid.isValid;
    }
}