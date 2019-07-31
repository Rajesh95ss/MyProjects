public class ContactEmailQueuable implements Queueable {
    List<Contact> contactLists = new  List<Contact>();
    public ContactEmailQueuable(List<Contact> lstContact){
        system.debug('sad');
        contactLists.addAll(lstContact);
    }
    public void execute(QueueableContext context) {
          system.debug('sads');
        update contactLists;
       
    }
}