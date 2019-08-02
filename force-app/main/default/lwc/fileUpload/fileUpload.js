import {
    LightningElement,
    api
} from 'lwc';
export default class MyComponentName extends LightningElement {
    @api recordId;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        /*eslint-disable*/
        alert("No. of files uploaded : " + uploadedFiles.length);
    }
}