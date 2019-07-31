import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/DynamicTreeStructure.getAccounts';

export default class Dynamic_Tree_Structure extends LightningElement {
  @wire(getAccounts) accounts;
}