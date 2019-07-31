public class AccountController {
    @AuraEnabled
    public static List<sObject> getSelectedsObjectRecords(String objectName){
        String objFields = getQueryFields(objectName);
        List<sObject> sObjectList = Database.query('SELECT ' + objFields + ' from '+ objectName);
        return sObjectList;
    }
    @AuraEnabled
    public static List<Account> getAccounts(String pageSize, String pageNumber){
        Integer psize = Integer.valueOf(pageSize);
        Integer pnumber = Integer.valueOf(pageNumber)-1;
         
        List<Account> accList = [SELECT Id, Name, AccountNumber, Industry, Phone
                                  FROM Account LIMIT :Integer.valueOf(psize) OFFSET :(psize*pnumber)];
        return accList;
    }
    @AuraEnabled
    public static List <Account> searchRAccounts(String Name) {
        String accountName = Name+'%';
        return [SELECT Id, name, industry, Bread_Winner__Total_Draft_Amount__c, 
                Bread_Winner__Total_Amount_Paid__c, Bread_Winner__Total_Amount_Overdue__c, 
                Bread_Winner__Total_Unallocated_Credit__c, Type, Website, NumberOfEmployees, BillingCity, Phone 
                FROM Account WHERE Name LIKE :accountName ORDER BY createdDate ASC];
    }
     @AuraEnabled
    public static Map<String, String> getOrganisationObjects() {
        List<Schema.SObjectType> allObjects = Schema.getGlobalDescribe().Values();
       Map<String, String> options = new Map<String, String>();
        
        for(Schema.SObjectType sObjectVar : allObjects)
        {
            options.put(sObjectVar.getDescribe().getLabel(), sObjectVar.getDescribe().getName());
        }
        return options;
    }
    @AuraEnabled
    public static String getFields(String objectName) {
        Map<String, Schema.SObjectType> global_describe = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = global_describe.get(objectName).getDescribe().fields.getMap();
        List<SelectOption> fieldsName =new List<SelectOption>();
        Map<String, String> mapfields = new Map<String, String>();
        for(Schema.SObjectField sfield : fieldMap.Values())
        {
            schema.describefieldresult dfield = sfield.getDescribe();
            mapfields.put(dfield.getLabel(),dfield.getName());
            
        }
        String JsonMap = JSON.serialize(mapfields);
        return JsonMap;
    }
     // return all fields of the specified object
    public static List<String> getFieldss(String objname){
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        Schema.SObjectType ctype = gd.get(objname);
        Map<String, Schema.SobjectField> fmap = ctype.getDescribe().fields.getMap();
        List<String> lstKeys = new List<String>();
        for(String key : fmap.keyset()) {
            lstKeys.add(key);
        }
        return lstKeys;
    }

   // return string collection
   public static string getQueryFields(String objname) {
       List<String> lstFields = getFieldss(objname);
       String output = '';
       for(String field : lstFields) {
           if(output == '')
               output = field;
           else
               output += ',' + field;
       }

       return output;
   }
}