trigger ContactTrigger on Contact (before insert, before update) {
    if(ContactTriggerHelper.isRun){
        ContactTriggerHelper.emailValidator(trigger.new);
    }
}