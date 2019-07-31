import {
    LightningElement,
    track,
    wire
} from 'lwc';
import Id from '@salesforce/user/Id';

import getAccountTree from '@salesforce/apex/StreeStructure.getAccountTree';

export default class MethodText extends LightningElement {

    @track userName = Id;
    @track vale;
    @wire(getAccountTree)
    items;

    handleclick(event) {
        this.vale = event.detail.name;
        /* eslint-disable */

    }

}