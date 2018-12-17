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
        link.href ="/home/"+array[i].id+"/index";
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