

class ReservationTimer {

    constructor(remainingSeconds) {
        this.timerLocationOnThePage = document.getElementById("timer");
        this.remainingSeconds = remainingSeconds;
        this.interval = undefined;
        this.buttonValidateOnThePage = document.getElementById("buttonValidateOnThePage");
    }

    run() {
        let self = this;
        self.interval = setInterval(function () {
            self.timerStart()
        }, 1000);
    }

    timerStart() {

        let self = this;
        let conversionSecondsToMinutes = Math.floor(this.remainingSeconds / 60);
        let secondsLeftInTheMinute = this.remainingSeconds % 60;
        let zeroMinuteDispaly = 0;
        conversionSecondsToMinutes %= 60;

        this.remainingSeconds -= 1;

        localStorage.setItem('remainingTime', this.remainingSeconds);

        if (conversionSecondsToMinutes < 10) {
            zeroMinuteDispaly = "0" + zeroMinuteDispaly;
        }

        if (secondsLeftInTheMinute < 10) {
            zeroMinuteDispaly = "0" + secondsLeftInTheMinute;
        }

        if (this.remainingSeconds < 0) {
            sessionStorage.setItem('visitorHasAReservation', "no");
            clearInterval(self.interval);
        }

        this.timerLocationOnThePage.innerHTML = conversionSecondsToMinutes + " minute(s) et " + secondsLeftInTheMinute + " seconde(s) ";

        this.buttonValidateOnThePage.addEventListener("click", function () {
            clearInterval(self.interval);
            self.timerLocationOnThePage.innerHTML = "";
        });
    }



}