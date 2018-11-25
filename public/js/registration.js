class registration {

    /**
     * add options to select age
     *
     * @return void
     *
     */
    static addOptions() {
        let num = 1;
        let date = new Date();
        let years = document.getElementsByTagName('select')[2];
        for (let i = date.getFullYear(); i >= 1900; i--) {
            let optionYears = document.createElement("option");
            optionYears.text = i;
            years.add(optionYears);
            registration.addMonths(num);
            registration.addDays(num);
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
    static addMonths(num){
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
    static addDays(num){
        let days = document.getElementsByTagName('select')[0];
        if (num <= 31) {
            let optionDays = document.createElement("option");
            optionDays.text = num;
            days.add(optionDays);

        }
    }

    /**
     * @param {int} num
     *
     *  switch to go through the html element when selected
     *
     *  @return void
     *
     */
    static validateText(num ,ageBool = false  ) {


        if(num <= 1) {
            let msg = 'The name must not contain any special chars and be at least 4 chars at least';
            registration.executeLenspecial(num,false,msg,4);
        }else if(num === 2){
            let msg = 'The password must contain at least 10 chars and contain at least 1 special char .';
            registration.executeLenspecial(num,true,msg,10);

        }else if(num === 3){
            let msg = 'Please make sure that the password equals to the confirmed one ';
            registration.confirmPass(msg,num);
        }else if(num === 4){
            let msg = 'Please make sure that the email follow the standards xxx@xxx.xxx';
            registration.checkEmail(msg,num);
        }
        registration.enableKey();
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
    static errorMsg(msg ,num){
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
     * this function triggered when any condition is write manually for course
     *
     * @return void
     */
    static success(num){
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

    static checkSpecialChar(containSpecialBool ,num){
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
    static checkLen(len,num){
        let textField = document.getElementsByClassName('regTextField')[num];
        return (textField.value.length >= len);
    }

    /**
     * @param msg
     * @param num
     *
     * check if 2 fields equals each other
     *
     * @return void
     */
    static confirmPass(msg ,num){
        let textField = document.getElementsByClassName('regTextField');
        let errMsgs = document.getElementById(num);
        let password = textField[2].value;
        let confirmed = textField[3].value;
        if ( password !== confirmed || password === '' ) {
            registration.errorMsg(msg ,num);
        } else{
            if(errMsgs) {
                document.getElementById('errorContainer').removeChild(document.getElementById(num));
            }
            registration.success(num);
        }
    }

    /**
     * @param num
     * @param bool
     * @param msg
     * @param lengthChar
     *
     * execute the length function and special character existing
     */
    static executeLenspecial(num ,bool,msg ,lengthChar = 0){
            let textField = document.getElementsByClassName('regTextField')[num];
            let errMsgs = document.getElementById(num);
            if (!registration.checkSpecialChar(bool ,num) || !registration.checkLen(lengthChar,num)){
                registration.errorMsg(msg,num);
            }else{
                if(errMsgs) {
                    document.getElementById('errorContainer').removeChild(document.getElementById(num));
                }
                registration.success(num);
            }
    }

    /**
     *
     * @param msg
     * @param num
     *
     * check the email format = xxx@xxx.xxx
     */
    static checkEmail(msg,num){
        let regex = /[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+/ ;
        let textfield = document.getElementsByClassName('regTextField')[num];
        let errMsgs = document.getElementById(num);
        if(!textfield.value.match(regex)){
            registration.errorMsg(msg,num)
        }else{
            if(errMsgs) {
                document.getElementById('errorContainer').removeChild(document.getElementById(num));
            }
            registration.success(num);
        }
    }

    /**
     *
     * the btn is disabled this function check is checking all of the form and then
     *
     * the btn get enabled but after
     *
     */
    static enableKey(){
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
}
