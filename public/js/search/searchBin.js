(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Ajax Module controls all of the ajax requests
 *
 * Paula George
 *
 */
class Ajax {
    /**
     * @param {boolean} searchBool
     * @param {boolean} postBool
     *
     * @return void
     */
    constructor(searchBool = false, postBool = false) {
        this.arr = [];
        this.lenOfMainArr = null;
        this.input = null;
        this.searchBool = searchBool;
        this.postBool = postBool;
    }

    /**
     *Ajax request to the  controller
     *
     * @param {string} inputIdClass
     *
     * @param {boolean} classNum
     *
     * @param {boolean} idOrClass
     *
     * @param {string} fileName
     *
     * the function sends two ajax request one for index to fireup dispatch function
     *
     * the other request is the data request
     *
     * @return void
     */
    request(inputIdClass ,idOrClass = true ,classNum = 0 ,fileName = 'data.php') {
        let self = this;
        $(document).ready(function () {
            self.input = (idOrClass) ? document.getElementById(inputIdClass).value : document.getElementsByClassName(inputIdClass)[classNum].value ;
            if (self.input.match(/^\s+/) || self.input === "") {
                self.execute('[]');
            } else {
                jQuery.ajax({
                    type: 'post',
                    data: {ajax: 1, name: self.input},
                    success: function () {
                        jQuery.ajax({
                            url: '../'+fileName,
                            type: 'post',
                            context: this,
                            success: function (response){
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
    execute(response) {
        alert(response);
    }
}
module.exports = Ajax ;

},{}],2:[function(require,module,exports){
let ajax = require('../Ajax');
class Search extends ajax{
    constructor(){
        super();
        this.createTable();
    }
    execute(jsonObj){
        this.arr =  JSON.parse(jsonObj);
        if(this.lenOfMainArr === null || this.lenOfMainArr === 0){
            this.createElements(this.arr);
        }else if(this.lenOfMainArr === this.arr.length){
            this.modifyElements(this.arr);
        }else if(this.lenOfMainArr !== this.arr.length){
            this.addRemoveElements(this.arr);
        }
    }
    createTable(){
        let table = document.createElement("TABLE");
        table.id = "searchTable";
        document.getElementById("ajax").appendChild(table);
    }
    createCol(){
        let col = document.createElement("TR");
        col.className = "searchCol";
        document.getElementById("searchTable").appendChild(col);
    }
    createRow(i){
        let row = document.createElement("TD");
        row.className = "searchRow";
        document.getElementsByClassName("searchCol")[i].appendChild(row);
    }
    createLink(array,i){
        let link = document.createElement("A");
        link.href = array[i].id;
        link.innerHTML = this.autoComplete(array ,i);
        link.className = "searchLink";
        document.getElementsByClassName("searchRow")[i].appendChild(link);
    }
    createElements(array,loopBeginning = 0){
        for(let i = loopBeginning; i < array.length;i++) {
            this.createCol();
            this.createRow(i);
            this.createLink(array,i);
        }
        this.lenOfMainArr = array.length ;
    }
    modifyElements(array){
        let link = document.getElementsByClassName("searchLink") ;
        for(let i = 0; i < array.length; i++){
            link[i].href = "/home/"+array[i].id+"/index";
            link[i].innerHTML = this.autoComplete(array ,i);
        }
        this.lenOfMainArr = array.length ;
    }
    addRemoveElements(array){
        let row = document.getElementsByClassName('searchRow');
        let col = document.getElementsByClassName('searchCol');
        if(array.length < this.lenOfMainArr){
            for(let i = this.lenOfMainArr - 1; i >= array.length; i--){
                row[i].parentNode.removeChild(row[i]);
                document.getElementById('searchTable').removeChild(col[i]);
            }
        }else{
            for(let i = this.lenOfMainArr; i < array.length;i++) {
                this.createCol();
                this.createRow(i);
                this.createLink(array,i);
            }
        }
        this.modifyElements(array);
        this.lenOfMainArr = array.length ;
    }
    autoComplete(array ,i){
        let searchVal = document.getElementById("search").value.trim() ;
        let first_name = array[i].first_name;
        let last_name = array[i].last_name;
        let name = first_name + " " + last_name ;
        let text = name.replace(searchVal,`<b>${searchVal}</b>` );
        return text ;
    }
}

let search = new Search() ;
document.getElementById("search").onkeyup = function(){
    search.request('search');
};
window.onclick = function () {
    search.execute('[]');
};
},{"../Ajax":1}]},{},[2]);
