/*
* Ajax Module controls most of the ajax requests
*
 */
class Ajax {

    constructor(){
        this.xml = new XMLHttpRequest();
        this.name = 'Paula';
    }

    /*
    *Ajax request to the  controller
    *
    * @param controller which will get array from
    *
    * @return void
     */
    request(requestType){
        $.ajax({
            url:"index.php?flag="+true ,
            type:"GET",
            success:function(data){
                console.log(data);
            }
        })
        $.ajax({
            url:"data.php" ,
            type:"GET",
            success:function(data){
                console.log(data);
            }
        })
    }
    /*
    *Get array to the view
    *
    * @param array it get from the request
    *
    * @return array
    *
     */
    getArray(arr){
        alert('as');
        return arr ;
    }
}
let ajax = new Ajax();
