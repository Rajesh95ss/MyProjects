({
    getObjectOptions : function(component, event, helper){
        console.log("Inside");
		var action = component.get('c.getOrganisationObjects');  
        var objects = [];
        action.setCallback(this, function(response) {
             console.log("Inside action");
            var state = response.getState();
            if (state === "SUCCESS") {
                var objectList=response.getReturnValue();
                console.log("objectList "+JSON.stringify(objectList));
				//if (objectList.length > 0) {
                    console.log("Inside IF");
                    for (var key in objectList) {
                        console.log("key", key);
                    	objects.push({
                                    key: key,
                                    value: objectList[key]
                                });
                }  
                component.set("v.objectOptions", objects); 
                //}
            }  
        });
         $A.enqueueAction(action);   
    },
    
    getselectedObjectRecords : function(component, helper) {
         var action = component.get('c.getSelectedsObjectRecords');
         action.setParams({
                "objectName" : component.get("v.selectedValue")            
            });        
          /*component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'},
            {label: 'Account Type', fieldName: 'Type', type: 'text'},
			{label: 'Billing City', fieldName: 'BillingCity', type: 'text'}            
        ]);
        var defaultColumns = [];
        defaultColumns.push("Account Name", "Account Type", "Account Phone", "Billing City");
       component.set("v.selectedGenreList", defaultColumns);*/
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var pageSize = component.get("v.pageSize");
                component.set('v.data', response.getReturnValue());
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.data").length);
                //Set the current Page as 0
                component.set("v.currentPage",0);
                // set star as 0
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                var PaginationList = [];
                for(var i=0; i< pageSize; i++){
                    if(component.get("v.data").length> i){
                        PaginationList.push(response.getReturnValue()[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);
            }
        });
        $A.enqueueAction(action);        
    },    
   
    
    searchResultAccounts: function(component) {
        var accountSearch = component.get("v.searchKeyword");
        var originalAllData = component.get("v.allData");
        if(accountSearch != null && accountSearch != ''){
            var action = component.get('c.searchRAccounts');
            action.setParams({
                "Name" : accountSearch            
            });
            
            action.setCallback(this, function(response){
                var state=response.getState();
                if(state === 'SUCCESS')
                {
                    component.set("v.allData", response.getReturnValue());             
                }          
            });
            $A.enqueueAction(action);
        }
        else{
            console.log('else');
            component.set("v.allData", originalAllData);            
        }
    },
   
    getColumnFields: function(component, helper){
        var allFieldsData = [];
        var columnFields = [];
        var action1 = component.get("c.getFields");
        action1.setParams({
                "objectName" : component.get("v.selectedValue")            
            });
        action1.setCallback(this,function(response) {
            var state = response.getState();
            var arrayMapKeys = [];
            var plValues = [];
            if (state === "SUCCESS") {
                var allFields = response.getReturnValue();
                component.set('v.fields', allFields);
                var obj = JSON.parse(allFields);                
                for (var key in obj) {
                    arrayMapKeys.push(key);
                }
                arrayMapKeys.sort();
                for(var i=0 ; i<=  arrayMapKeys.length; i++){
                    
                    plValues.push({
                        label: arrayMapKeys[i],
                        value: arrayMapKeys[i]
                    });
                }
                plValues.sort();
                component.set("v.GenreList", plValues);   
                 component.set("v.showColumnCustomisationModal", "true");
            }
            
        });
        $A.enqueueAction(action1);
    },
    builDataTableColumns: function(component, event, helper){
        var arrayMapKeys = [];
        var columnFields =[];
        var allFields = component.get('v.fields');
        var selectedFields = component.get("v.selectedGenreList");
        var obj = JSON.parse(allFields);
        for(var i=0 ; i<selectedFields.length; i++){     
            arrayMapKeys.push(selectedFields[i]);	
        }     
        //arrayMapKeys.sort(); 
        for(var i=0 ; i<arrayMapKeys.length; i++){   
            columnFields.push({label: arrayMapKeys[i], fieldName: obj[arrayMapKeys[i]], type: 'text'});                    
        }        
        component.set("v.columns", columnFields);
        component.set("v.showColumnCustomisationModal", "false");
    },
     next : function(component, event){
        var current = component.get("v.currentPage");    
        var dTable = component.find("accountDataTable");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
        current = current +1;
        pgName = "page" + current;
        var selectedRows = component.get("v.SelectedAccount")[pgName];
        component.set("v.currentPage",current);
        console.log("Next selectedAccount "+JSON.stringify(component.get("v.SelectedAccount")));        
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++){
            if(sObjectList.length > i){
                Paginationlist.push(sObjectList[i]);
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
        if (typeof selectedRows != 'undefined' && selectedRows) {
            var selectedRowsIds = [];
            for(var i=0;i<selectedRows.length;i++){
                selectedRowsIds.push(selectedRows[i].Id);  
            }         
            var dTable = component.find("accountDataTable");
            dTable.set("v.selectedRows", selectedRowsIds); 
        }
    },
    previous : function(component, event){   
        var current = component.get("v.currentPage");
        var dTable = component.find("accountDataTable");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
        current = current - 1; 
        pgName = "page" + current;
        var selectedRows = component.get("v.SelectedAccount")[pgName];
        component.set("v.currentPage",current);
        console.log("Prev selectedAccount "+JSON.stringify(component.get("v.SelectedAccount")));        
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                Paginationlist.push(sObjectList[i]);
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
        if (typeof selectedRows != 'undefined' && selectedRows) {
            var selectedRowsIds = [];
            for(var i=0;i<selectedRows.length;i++){
                selectedRowsIds.push(selectedRows[i].Id);  
            }         
            var dTable = component.find("accountDataTable");
            dTable.set("v.selectedRows", selectedRowsIds);
        }
    },
})