import {
    LightningElement,
    api
} from 'lwc';
import Id from "@salesforce/user/Id";

export default class RecordFormLWC extends LightningElement {

    @api recordId;
    userId = Id;
}