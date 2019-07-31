/**
 * @File Name          : StreeStructure.cls
 * @Description        : 
 * @Author             : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Group              : 
 * @Last Modified By   : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Last Modified On   : 26/7/2019, 3:28:42 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    26/7/2019, 12:43:43 PM   ChangeMeIn@UserSettingsUnder.SFDoc     Initial Version
**/
public class StreeStructure {
    Public Static Map<Id, List<Contact>> treeMap     = new Map<Id, List<Contact>>();
 
    @AuraEnabled(cacheable=true)
    public static  List<item> getAccountTree(){
        treeMap                           =  getMap(); 
        List<item> items                  = new List<item>();
        List<Contact> acctList            = new List<Contact>();
          
        Map<Id, Contact> msdMap   = new  Map<Id, Contact>([SELECT Id, Name,Contacts__c From Contact Where Contacts__c = null ]);
        
        for(Contact thissaff : msdMap.values() ) {
           item accitem = new item(thissaff.Name, String.valueOf(thissaff.Id), false);
           items.add(accitem);
        }
        String jsonData = JSON.serialize(items);
        return items;
      }
    
    private static  Map<Id, List<Contact>> getMap() {
        Map<Id, List<Contact>> treeMap     = new Map<Id, List<Contact>>();
         for(Contact thisTree: [SELECT Id,Name,Contacts__c From Contact Where Contacts__c != null]){
             if(treeMap.containsKey(thisTree.Contacts__c)) {
                treeMap.get(thisTree.Contacts__c).add(thisTree);
            }
            else {
                treeMap.put(thisTree.Contacts__c, new  List<Contact> { thisTree });
            }
         }
        return treeMap;
    }
    
    @AuraEnabled(cacheable=true)
    public static  List<Contact> getSaffronType(String recordId){
        return[SELECT Id,Name,Contacts__c FROM Contact WHERE Id =:recordId];
    }
    //Item Wrapper Class
    public class item{
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public Boolean expanded {get; set;}
        @AuraEnabled
        public List<item> items {get; set;}
         
        public item(String label, String name, Boolean expanded){
            this.label    = label;
            this.name     = name;
            this.expanded = false;
            items = new List<item>();
            if(treeMap.get(name) != null) {
                for(Contact thisTree: treeMap.get(name)) {
                    items.add(new item(thisTree.Name, thisTree.Id, false));
                }
            }

        }
    }
}