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
        for (let i = 1900; i <= date.getFullYear(); i++) {
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
     * @param num
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
}
