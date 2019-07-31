({
    doInit: function (component, event, helper) {
        // Set the columns of the Table 
        component.set('v.columns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Type', fieldName: 'Type', type: 'text'},
            {label: 'Id', fieldName: 'Id', type: 'text'},
        ]);
        helper.doFetchAccount(component);
    },
    getSelectedName: function (component, event) {

    },
    next: function (component, event, helper) {
        helper.next(component, event);
    },
    previous: function (component, event, helper) {
        helper.previous(component, event);
    },
    save: function (component, event, helper) {
        helper.save(component, event);
    }
})