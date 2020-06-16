
class Diaporama {

    constructor() {

        this.indexOfTheSlideToDisplay = 1;
        this.leftArrowOnPageButton = document.getElementById("leftArrowOnPageButton");
        this.rightArrowOnPageButton = document.getElementById("rightArrowOnPageButton");
        this.divContainingTheSlide = document.getElementsByClassName("divContainingTheSlide");

    }

    run() {

        this.SlideToDisplay();
        this.DOM();

    }

    SlideToDisplay() {

        if (this.indexOfTheSlideToDisplay > this.divContainingTheSlide.length) {
            this.indexOfTheSlideToDisplay = 1;
        }

        if (this.indexOfTheSlideToDisplay < 1) {
            this.indexOfTheSlideToDisplay = this.divContainingTheSlide.length;
        }

        for (let i = 0; i < this.divContainingTheSlide.length; i++) {
            this.divContainingTheSlide[i].style.display = "none";
        }

        this.divContainingTheSlide[this.indexOfTheSlideToDisplay - 1].style.display = "block";
    }

    slideSelection(str) {

        if (str === "previous") {

            this.indexOfTheSlideToDisplay--;
            this.SlideToDisplay();

        } else if (str == "next") {

            this.indexOfTheSlideToDisplay++;
            this.SlideToDisplay();
        }
    }

    DOM() {

        let self = this;

        self.leftArrowOnPageButton.addEventListener("click", function () {

            self.slideSelection("previous");

        });

        self.rightArrowOnPageButton.addEventListener("click", function () {

            self.slideSelection("next");

        });

        setInterval(function () {

            self.slideSelection("next");

        }, 5000);

        document.addEventListener("keydown", function (e) {

            if (e.keyCode === 37) {

                self.slideSelection("previous");

            }

            if (e.keyCode === 39) {

                self.slideSelection("next");

            }
        });
    }
}
