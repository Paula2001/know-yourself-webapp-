/**
* Ajax Module controls all of the ajax requests
 *
 * Paula George
*
 */
class Ajax {

    constructor(requestType){
        this.arr = [];
        this.lenOfMainArr = null ;
        this.request(requestType);
    }

    /**
    *Ajax request to the  controller
    *
    * @param controller which will get array from the controller
    *
    * the function sends two ajax request one for index to fireup dispatch function
    *
    * the other request is the data request
    *
    * @return void
     */
    request(requestType){
        $.ajax({
            url:"index.php?flag="+true ,
            type:"GET",

        })
        $.ajax({
            url:"data.php" ,
            type:"GET",
            context: this,
            success:function(data){
                this.execute(data);
            }
        })
    }
    /**
    *Creating Elements and pushing results into the view
    *
    * @param json object
    *
    * @return void
    *
     */
    createElements(arr){
        let main = document.getElementById('ajax');
        let table = document.createElement('table');
        table.id = 'ajaxTable' ;
        main.appendChild(table);
        let tableId = document.getElementById('ajaxTable');
        this.CreateRowsCols(arr);
        this.set_lenOfMainArr(arr.length);
    }
    /**
     * @param array
     *
     * Modify the content
     *
     * @return void
     *
     */
    modifyElements(arr){
        let col = document.getElementsByClassName('ajaxCol');
        let count = 0 ;
        for(let i = 0; i < arr.length;i++){
            for(let j = 0; j < arr[0].length;j++){
                col[count].innerHTML = arr[i][j];
                count++;
               }
        }
    }

    /**
     * @param JSON OBJECT
     *
     * On Ajax Success function
     *
     * @return void
     */
    execute(jsonObj){
        let array = JSON.parse(jsonObj);
        if(this.lenOfMainArr === array.length){
            this.modifyElements(array);
        }else if(this.lenOfMainArr === null) {
            this.createElements(array);
        }else if (this.lenOfMainArr != array.length){
            this.addRemove(array,array.length);
        }
    }

    /**
     *
     * @param array , int
     *
     * Add or Remove rows
     *
     * @return void
     */
    addRemove(arr,arrlen){
        let row = document.getElementsByClassName('ajaxRow');
        //remove and modify
        if(this.lenOfMainArr > arrlen){
            for(let i = this.lenOfMainArr - 1; i > arrlen - 1 ;i--){
                row[i].parentNode.removeChild(row[i]);
            }
        }
        //add and modify
        if(this.lenOfMainArr < arrlen){
            this.CreateRowsCols(arr,this.lenOfMainArr);

        }
        this.lenOfMainArr = arrlen;
        this.modifyElements(arr);

    }
    /**
     * @param array ,int
     *
     * Create  rows and cols inside ajaxTable
     *
     * @return void
     *
     */
    CreateRowsCols(arr ,bigLoopStart = 0 ){
        let tableId = document.getElementById('ajaxTable');
        for(let i = bigLoopStart; i < arr.length ;i++){
            let row = document.createElement("TR");
            row.className = 'ajaxRow';
            tableId.appendChild(row);

            for(let j = 0;j < arr[0].length; j++) {
                let col = document.createElement("TD");
                col.className = 'ajaxCol';
                let text = document.createTextNode(arr[i][j]);
                col.appendChild(text);
                document.getElementsByClassName('ajaxRow')[i].appendChild(col);
            }
        }
    }
    /**
     * @param int
     *
     * setter for lenOfMainArr
     *
     * @return void
     *
     */
    set_lenOfMainArr(lastArrLength){
        this.lenOfMainArr = lastArrLength ;
    }

}
