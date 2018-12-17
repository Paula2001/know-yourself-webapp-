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
                            url: '../../'+fileName,
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
