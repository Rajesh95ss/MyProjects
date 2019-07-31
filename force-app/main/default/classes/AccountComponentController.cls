public class AccountComponentController {

    @AuraEnabled
      public static List <Account> getAccounts() {
        return [SELECT Id, name, industry, Type, Website, NumberOfEmployees, BillingCity, Phone FROM Account ORDER BY createdDate ASC];
      }
      @AuraEnabled
      public static List <Account> searchRAccounts(String Name) {
          String accountName = Name+'%';
          return [SELECT Id, name, industry, Type, Website, NumberOfEmployees, BillingCity, Phone FROM Account WHERE Name LIKE :accountName ORDER BY createdDate ASC];
      }
    @AuraEnabled        
   public static List<String> getPicklistValues(String picklistFieldApi, String objectName){
      Map<String, Schema.SObjectType> schemaMap      = Schema.getGlobalDescribe();
      Map<String, Schema.SObjectField> fieldMap      = schemaMap.get(objectName).getDescribe().fields.getMap();
      List<Schema.PicklistEntry> pick_list_values     = fieldMap.get(picklistFieldApi).getDescribe().getPickListValues();
      List<String> picklistValueOptions         = new List<String>();
      for(Schema.PicklistEntry a : pick_list_values) {
          picklistValueOptions.add(a.getValue());
      }
      return picklistValueOptions;
  }
    @AuraEnabled
      public static void deleteAccount(Id accountId) {
          DELETE[SELECT Id FROM Account WHERE id = :accountId];
      }
}