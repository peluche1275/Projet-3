class Reservation {

    constructor() {

        this.buttonReservationOnThePage = document.getElementById("buttonReservationOnThePage");
        this.locationOfEntriesForReservation = document.getElementById("locationOfEntriesForReservation");
        this.buttonValidateOnThePage = document.getElementById("buttonValidateOnThePage");
        this.panelThatDisplaysReservationInfos = document.getElementById("section3");
        this.inputLastNameVisitor = document.getElementById("inputLastNameVisitor");
        this.inputFirstNameVisitor = document.getElementById("inputFirstNameVisitor");
        this.displayFullNameVisitor = document.getElementById("nomPrenom");
        this.placeOfStationDataOnThePage = document.getElementById("placeOfStationDataOnThePage");
    }

    run() {
        let self = this;

        this.inputLastNameVisitor.value = localStorage.getItem('inputLastNameVisitoru');
        this.inputFirstNameVisitor.value = localStorage.getItem('inputFirstNameVisitoru');

        if (sessionStorage.getItem('visitorHasAReservation') == "yes") {

            this.panelThatDisplaysReservationInfos.style.display = "block";
            this.displayFullNameVisitor.innerHTML = localStorage.getItem('inputLastNameVisitoru') + " " + localStorage.getItem('inputFirstNameVisitoru') + " à la station : " + localStorage.getItem('nomStation');

            let remainingTime = localStorage.getItem('remainingTime');

            let timer = new ReservationTimer(remainingTime);
            timer.run();

        };

        this.buttonReservationOnThePage.addEventListener("click", function () {

            self.locationOfEntriesForReservation.style.display = "flex";
            self.buttonReservationOnThePage.style.display = "none";
            self.placeOfStationDataOnThePage.style.display = "none";

        });

        this.buttonValidateOnThePage.addEventListener("click", function () {

            self.panelThatDisplaysReservationInfos.style.display = "block";

            let timer = new ReservationTimer(1200);
            timer.run();

            localStorage.setItem('inputLastNameVisitoru', self.inputLastNameVisitor.value);
            localStorage.setItem('inputFirstNameVisitoru', self.inputFirstNameVisitor.value)

            self.displayFullNameVisitor.innerHTML = localStorage.getItem('inputLastNameVisitoru') + " " + localStorage.getItem('inputFirstNameVisitoru') + " à la station : " + localStorage.getItem('nomStation');

            sessionStorage.setItem('visitorHasAReservation', "yes");

        });

    }
}
