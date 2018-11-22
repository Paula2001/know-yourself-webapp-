/**
 * Ajax Module controls all of the ajax requests
 *
 * Paula George
 *
 */
class Ajax {

    constructor(searchBool = false ,postBool = false){
        this.arr = [];
        this.lenOfMainArr = null ;
        this.input = null;
        this.searchBool = searchBool;
        this.postBool = postBool ;
    }

    /**
     *Ajax request to the  controller
     *
     * @param {string} inputId
     *
     * the function sends two ajax request one for index to fireup dispatch function
     *
     * the other request is the data request
     *
     * @return void
     */
    request(inputId) {
        let self = this  ;
        $(document).ready(function() {
            self.input = $('#' + inputId).val();
            if (self.input == '' ||self.input == ' ' ) {
                self.execute('[]');
            }else{
                jQuery.ajax({
                    type: 'post',
                    data: {ajax: 1, name: self.input},
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
     * @param {json} jsonObj
     *
     * On Ajax Success function
     *
     * @return void
     */
    execute(jsonObj){
        this.arr =  JSON.parse(jsonObj);
        if(this.lenOfMainArr === this.arr.length){
            this.modifyElements();
        }else if(this.lenOfMainArr === null) {
            this.createElements();
        }else if (this.lenOfMainArr !== this.arr.length){
            this.addRemove();
        }
    }
    /**
     *Creating Main Elements
     *
     * @return void
     *
     */
    createElements(){
        let main = document.getElementById('ajax');
        let table = document.createElement('table');
        table.id = 'ajaxTable' ;
        main.appendChild(table);
        this.CreateCols();
        this.set_lenOfMainArr(this.arr.length);
    }
    /**
     * @param {int} bigLoopStart default 0
     *
     * Create  rows and cols inside ajaxTable
     *
     * @return void
     *
     */
    CreateCols(bigLoopStart = 0){
        let tableId = document.getElementById('ajaxTable');
        for(let i = bigLoopStart; i < this.arr.length ;i++){
            let row = document.createElement("TR");
            row.className = 'ajaxRow';
            tableId.appendChild(row);
            for(let j = 0;j < this.arr[0].length; j++) {
                this.createRows(i,j);
            }
        }
    }

    /**
     * @param {int} i , {int} j
     *
     * Create Rows
     *
     * @return void
     *
     */
    createRows(i,j){
        if(j % 2 !== 0 && this.searchBool) {
            let col = document.createElement("TD");
            col.className = 'ajaxCol';
            document.getElementsByClassName('ajaxRow')[i].appendChild(col);
            let link = document.createElement('a');
            link.className = 'link';
            link.innerHTML = this.replace(this.arr[i][j]);
            link.href = 'Posts/' + this.arr[i][j - 1] + '/edit';
            document.getElementsByClassName('ajaxCol')[i].appendChild(link);

        }
    }

    /**
     * Modify the content
     *
     * @return void
     *
     */
    modifyElements(){
        let col = document.getElementsByClassName('link');
        let count = 0 ;
        for(let i = 0; i < this.arr.length;i++){
            for(let j = 0; j < this.arr[0].length;j++)
            {
                //escape ids
                if(this.searchBool) {
                    if (j % 2 !== 0) {
                        col[count].innerHTML = this.replace(this.arr[i][j]);
                        count++;
                    }
                }
            }
        }
    }

    /**
     *
     * @param  int
     *
     * Add or Remove rows
     *
     * @return void
     */
    addRemove(){
        let row = document.getElementsByClassName('ajaxRow');
        //remove and modify
        if(this.lenOfMainArr > this.arr.length){
            for(let i = this.lenOfMainArr - 1; i > this.arr.length - 1 ;i--){
                row[i].parentNode.removeChild(row[i]);
            }
        }
        //add and modify
        if(this.lenOfMainArr < this.arr.length){
            this.CreateCols(this.lenOfMainArr);
        }
        this.lenOfMainArr = this.arr.length;
        this.modifyElements();

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
        let textReplace = arrText.replace(this.input.trim(),"<strong>"+this.input.trim()+"</strong>");
        return textReplace ;
    }
}

