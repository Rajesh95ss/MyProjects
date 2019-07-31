import {
    LightningElement,
    api
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

export default class ViewTreeSelected extends NavigationMixin(LightningElement) {
    @api recordid;
    handleView() {
        /* eslint-disable*/
        alert();
        // // Navigate to contact record page
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__recordPage',
        //     attributes: {
        //         recordId: recordid,
        //         objectApiName: 'Contact',
        //         actionName: 'view',
        //     },
        // });
    }
}