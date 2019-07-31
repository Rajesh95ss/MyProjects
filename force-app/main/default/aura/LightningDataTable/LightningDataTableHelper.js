({
    doFetchAccount : function(component) {
        var action = component.get('c.getLimitedAccounts');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var pageSize = component.get("v.pageSize");
                component.set('v.AccountData', response.getReturnValue());
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.AccountData").length);
                //Set the current Page as 0
                component.set("v.currentPage",0);
                // set star as 0
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                var PaginationList = [];
                for(var i=0; i< pageSize; i++){
                    if(component.get("v.AccountData").length> i){
                        PaginationList.push(response.getReturnValue()[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);
            }else{
                alert('ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    next : function(component, event){
        var current = component.get("v.currentPage");    
        var dTable = component.find("accountTable");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
        current = current +1;
        pgName = "page" + current;
        var selectedRows = component.get("v.SelectedAccount")[pgName];
        component.set("v.currentPage",current);
        console.log("Next selectedAccount "+JSON.stringify(component.get("v.SelectedAccount")));        
        var sObjectList = component.get("v.AccountData");
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
            var dTable = component.find("accountTable");
            dTable.set("v.selectedRows", selectedRowsIds); 
        }
    },
    previous : function(component, event){   
        var current = component.get("v.currentPage");
        var dTable = component.find("accountTable");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
        current = current - 1; 
        pgName = "page" + current;
        var selectedRows = component.get("v.SelectedAccount")[pgName];
        component.set("v.currentPage",current);
        console.log("Prev selectedAccount "+JSON.stringify(component.get("v.SelectedAccount")));        
        var sObjectList = component.get("v.AccountData");
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
            var dTable = component.find("accountTable");
            dTable.set("v.selectedRows", selectedRowsIds);
        }
    },
    save : function(component, event){
        console.log("selectedAccount "+JSON.stringify(component.get("v.SelectedAccount")));
    }
})