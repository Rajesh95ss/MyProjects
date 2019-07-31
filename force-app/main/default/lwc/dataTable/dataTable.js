import {
    LightningElement,
    wire,
    track
} from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import {
    updateRecord
} from 'lightning/uiRecordApi';
import {
    refreshApex
} from '@salesforce/apex';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';


const COLS = [{
        label: 'First Name',
        fieldName: 'FirstName',
        editable: true,
        sortable: "true"
    },
    {
        label: 'Last Name',
        fieldName: 'LastName',
        editable: true
    },
    {
        label: 'Title',
        fieldName: 'Title',
        editable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email'
    }
];
export default class DatatableUpdateExample extends LightningElement {
    @track data;
    @track error;
    @track columns = COLS;
    @track draftValues = [];
    @track sortBy;
    @track sortDirection;

    @wire(getContactList)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    handleSave(event) {
        /*eslint-disable*/
        debugger;
        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;

        const recordInput = {
            fields
        };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact updated',
                        variant: 'success'
                    })
                );
                // Clear all draft values
                this.draftValues = [];

                // Display fresh data in the datatable
                return refreshApex(this.contact);
            }).catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        const selected = [];
        // Display that fieldName of the selected rows
        /* eslint-disable*/
        for (let i = 0; i < selectedRows.length; i++) {
            selected.push(selectedRows[i].Id);
            /* eslint-disable*/
            alert("You selected: " + JSON.stringify(selected));
        }
    }

    handleSortdata(event) {
        // field name
        this.sortBy = event.detail.fieldName;
        console.log("fn " + this.sortBy);
        // sort direction
        this.sortDirection = event.detail.sortDirection;
        console.log("sortDirection " + this.sortDirection);
        // calling sortdata function to sort the data based on direction and selected field
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortData(fieldname, direction) {
        console.log("fieldname " + fieldname);
        console.log("direction " + direction);
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(this.data));

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1 : -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
        this.data = parseData;

    }

}