/**
 * Ajax Module controls all of the ajax requests
 *
 * Paula George
 *
 */
class Ajax {

    constructor(){
        this.arr = [];
        this.lenOfMainArr = null ;
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
    request(value = 'name') {
        let self = this  ;
        $(document).ready(function() {
            let name = $('#' + value).val();
            if (name == '' ||name == ' ' ) {
                self.execute('[]');
            }else{
                jQuery.ajax({
                    type: 'post',
                    data: {ajax: 1, name: name},
                    success: function () {
                        jQuery.ajax({
                            url: 'data.php',
                            type: 'post',
                            data: {ajax: 1},
                            context: this,
                            success: function (response) {
                                self.execute(response);
                            }
                        });
                    }
                });
            }
        });
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
        let col = document.getElementsByClassName('link');
        let count = 0 ;
        for(let i = 0; i < arr.length;i++){
            for(let j = 0; j < arr[0].length;j++)
            {
                if(j % 2 === 0 ) {

                }else {
                    col[count].innerHTML = this.replace(arr[i][j]);
                    count++;
                }
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
        let array =  JSON.parse(jsonObj);
        alert(array);
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
     * @param {array} arr ,{int} bigLoopStart default 0
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
                if(j % 2 === 0){

                }else {
                    let col = document.createElement("TD");
                    let link = document.createElement('a');
                    link.className ='link';
                      col.className = 'ajaxCol';
                    link.innerHTML = this.replace(arr[i][j]);
                    link.href = 'Posts/'+arr[i][j-1]+'/edit';
                    document.getElementsByClassName('ajaxRow')[i].appendChild(col);
                    document.getElementsByClassName('ajaxCol')[i].appendChild(link);

                }
            }
        }
    }
    /**
     * @param {int} lastArrLength
     *
     * setter for lenOfMainArr
     *
     * @return void
     *
     */
    set_lenOfMainArr(lastArrLength){
        this.lenOfMainArr = lastArrLength ;
    }

    /**
     * @param {string} arrText
     *
     * replace function
     *
     *@return string
     */
    replace(arrText){
        let name = $('#name').val();
        let textReplace = arrText.replace(name.trim(),"<strong>"+name.trim()+"</strong>");
        return textReplace ;
    }


}

