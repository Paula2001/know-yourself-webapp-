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
    execute(){
        console.log(this.arr);
    }
}
module.exports = Ajax ;
