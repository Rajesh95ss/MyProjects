import {
    LightningElement,
    api,
    track
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

export default class ViewTreeSelected extends NavigationMixin(LightningElement) {
    @api recordid;
    @track
    recordPageUrl;

    handleView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordid,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });
        //     /*eslint-disable*/
        //     alert(this.recordId);
        //     this[NavigationMixin.Navigate]({
        //         type: 'standard__objectPage',
        //         attributes: {
        //             objectApiName: 'Contact',
        //             actionName: 'home',
        //         },
        //     });
        //     // Generate a URL to a User record page
        //     /*eslint-disable*/
        //     this[NavigationMixin.GenerateUrl]({
        //         type: 'standard__recordPage',
        //         attributes: {
        //             recordId: '0037F00001Qp5aqQAB',
        //             objectApiName: 'Contact',
        //             actionName: 'view',
        //         },
        //     }).then(url => {
        //         this.recordPageUrl = url;
        //     });
    }
}