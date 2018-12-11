let ajax = require('../Ajax');
class Registration extends ajax{
    /**
     * runs the ajax construct
     *
     * @return void
     */
    constructor(){
        super();
        this.createElements();
        this.addOptions();
    }

    /**
     * @param {int} i
     *
     * create text area fields dynamically
     *
     * @return void
     *
     */
    createTextArea(i){
        let self = this ;
        let placeholder = ["First Name" ,
            "Last Name" ,
            "Password" ,
            "Confirm Your Password" ,
            "Email"
        ];
        let name = ["firstName" ,
            "lastName",
            "password",
            "confirmed",
            "email"
        ];
        let type = ( i > 1)  ?"password" : "text" ;
        if(i > 3){type = "email";}
        let textArea = document.createElement("input");
        textArea.className = "regTextField";
        textArea.name = name[i];
        textArea.autocomplete = "off";
        textArea.placeholder = placeholder[i];
        textArea.type = type;
        document.getElementById("textArea").appendChild(textArea);

        document.getElementsByClassName("regTextField")[i].onkeyup = function () {
            self.validateText(i);
        }
        document.getElementsByClassName("regTextField")[i].onblur = function () {
            self.validateText(i);
        }
    }

    /**
     * @param {int} i
     *
     * create drop list elements
     *
     * @return void
     */
    createDropList(i) {
        let self = this ;
        let dropList = document.createElement("select");
        let placeholder = ['Day','Month','Year'];
        let name = ['days',"months","years"] ;
        dropList.className = "age";
        dropList.placeholder = placeholder[i];
        dropList.name = name[i];
        document.getElementsByTagName("birthday")[0].appendChild(dropList);
        document.getElementsByClassName("age")[i].onchange = function(){
            self.validateText(i,true) ;
        }
    }

    /**
     * assemble all of the items i've been creating inside one function
     *
     * @return void
     */
    createElements(){
        for(let i = 0 ;i < 5;i++){
            this.createTextArea(i);
            if(i < 3){
                this.createDropList(i);
                this.addFirstOption(i);
            }
        }
    }
    /**
     * add options to select age
     *
     * @return void
     *
     */
    addOptions() {
        let num = 1;
        let date = new Date();
        let years = document.getElementsByClassName('age')[2];
        for (let i = date.getFullYear(); i >= 1900; i--) {
            let optionYears = document.createElement("option");
            optionYears.text = i;
            years.add(optionYears);
            this.addMonths(num);
            this.addDays(num);
            num++;
        }
    }

    /**
     * @param {int} num
     *
     * add months
     *
     * @return void
     */
    addMonths(num){
        let months = document.getElementsByTagName('select')[1];
        if (num <= 12) {
            let optionMonths = document.createElement("option");
            optionMonths.text = num;
            months.add(optionMonths);

        }
    }

    /**
     * @param {int} num
     *
     * add days
     *
     * @return void
     */
    addDays(num){
        if (num <= 31) {
            let days = document.getElementsByTagName('select')[0];
            let optionDays = document.createElement("option");
            optionDays.text = num;
            days.add(optionDays);
        }
    }

    /**
     * @param {int} num
     *
     * add the first option day ,month ,year to the droplist
     *
     * @return void
     */
    addFirstOption(num){
            let arrOptions = ['Day', 'Month', 'Year'];
            let droplist = document.getElementsByTagName('select')[num];
            let option = document.createElement("option");
            option.text = arrOptions[num];
            droplist.add(option);
    }

    /**
     * @param {int} num
     *
     *  switch to go through the html element when selected
     *
     *  @return void
     *
     */
    validateText(num ,ageBool = false) {
        if(num <= 1) {
            let msg = 'The name must not contain any special chars and be at least 4 chars at least';
            this.executeLenspecial(num,false,msg,4);
        }else if(num === 2){
            let msg = 'The password must contain at least 10 chars and contain at least 1 special char .';
            this.executeLenspecial(num,true,msg,10);

        }else if(num === 3){
            let msg = 'Please make sure that the password equals to the confirmed one ';
            this.confirmPass(msg,num);
        }else if(num === 4){
            registration.request("regTextField" ,false ,4);
            let msg = 'Please make sure that the email follow the standards xxx@xxx.xxx';
            this.checkEmail(msg,num);
        }
        this.enableKey();
    }

    /**
     *
     * @param {string} msg
     * @param {int} num
     *
     * this function creates error msgs
     *
     * @return void
     *
     */
    errorMsg(msg ,num){
        let textField = document.getElementsByClassName('regTextField')[num];
        let errMsgs = document.getElementById(num);
        if(!errMsgs) {
            let error = document.createElement('p');
            error.id = num;
            let text = document.createTextNode(msg);
            error.appendChild(text);
            document.getElementById('errorContainer').appendChild(error);
        }else{
            errMsgs.innerHTML = msg;
        }
        textField.style.backgroundColor = 'red';
    }

    /**
     * @param {int} num
     *
     * this function triggered when any condition is write manually of course
     *
     * @return void
     */
    success(num){
        let textField = document.getElementsByClassName('regTextField')[num];
        textField.style.backgroundColor = '#00FF00';
    }

    /**
     * @param {boolean} containSpecialBool
     * @param [int] num
     *
     * this function checks for existing of special characters
     *
     * @return {boolean}
     */

    checkSpecialChar(containSpecialBool ,num){
        let textField = document.getElementsByClassName('regTextField')[num];
        let regex = /[-!$@%#^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        let regexBool = Boolean(textField.value.match(regex));
        return (containSpecialBool === regexBool);
    }

    /**
     * @param {int} len
     * @param {int} num
     *
     * check the length of the input we receive
     *
     * @return {boolean}
     */
    checkLen(len,num){
        let textField = document.getElementsByClassName('regTextField')[num];
        return (textField.value.length >= len);
    }

    /**
     * @param {string} msg
     * @param {int} num
     *
     * check if 2 fields equals each other
     *
     * @return void
     */
    confirmPass(msg ,num){
        let textField = document.getElementsByClassName('regTextField');
        let errMsgs = document.getElementById(num);
        let password = textField[2].value;
        let confirmed = textField[3].value;
        if ( password !== confirmed || password === '' ) {
            this.errorMsg(msg ,num);
        } else{
            if(errMsgs) {
                document.getElementById('errorContainer').removeChild(document.getElementById(num));
            }
            this.success(num);
        }
    }

    /**
     * @param {int} num
     * @param {boolean} bool
     * @param {string} msg
     * @param {int} lengthChar
     *
     * execute the length function and special character existing
     *
     * @return void
     */
    executeLenspecial(num ,bool,msg ,lengthChar = 0){
            let textField = document.getElementsByClassName('regTextField')[num];
            let errMsgs = document.getElementById(num);
            if (!this.checkSpecialChar(bool ,num) || !this.checkLen(lengthChar,num)){
                this.errorMsg(msg,num);
            }else{
                if(errMsgs) {
                    document.getElementById('errorContainer').removeChild(document.getElementById(num));
                }
                this.success(num);
            }
    }

    /**
     *
     * @param {string} msg
     * @param {int} num
     *
     * check the email format = xxx@xxx.xxx
     *
     * @return void
     */
    checkEmail(msg,num){
        let regex = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/ ;
        let emailValue = document.getElementsByClassName('regTextField')[4].value;
        let textfield = document.getElementsByClassName('regTextField')[num];
        let errMsgs = document.getElementById(num);
        if(!textfield.value.match(regex)){
            this.errorMsg(msg,num);
        }else if(this.arr  === emailValue){
            let msg = "this email is already taken ";
            this.errorMsg(msg,num);
        }else{
            if(errMsgs) {
                document.getElementById('errorContainer').removeChild(document.getElementById(num));
            }
            this.success(num);
        }
    }

    /**
     *
     * the btn is disabled this function check is checking all of the form and then
     * the btn get enabled but after
     *
     * @return void
     *
     */
    enableKey(){
        let textField = document.getElementsByClassName('regTextField');
        let age = document.getElementsByClassName('age');

        for(let j = 0; j < textField.length; j++ ) {
            if(j < 3) {
                if (!age[j].value.match(/\d+/)) {
                    return;
                }
            }
            if (textField[j].value.match(/\s/g)) {
                return;
            }
        }
        for (let i = 0; i < 7; i++) {
            if (!document.getElementById(i)){
                document.getElementById('submit').disabled = false;
                document.getElementById('btnText').style.display = 'none';
            } else {
                document.getElementById('submit').disabled = true;
                break;
            }
        }
    }

    /**
     * @param {JSON} jsonObj
     *
     * this function equalize the converted json object to the global array inside the ajax class
     *
     * polymorphism
     */
    execute(jsonObj){
        this.arr = JSON.parse(jsonObj);
    }

}
let registration = new Registration() ;

