class API {

  constructor() {
    this.lat = 36.7012167;
    this.lon = 137.2132087;
    this.map = null;
    this.mapDiv = document.getElementById("carte");
    this.nom = document.getElementById('nom');
    this.etat = document.getElementById('etat');
    this.adresse = document.getElementById('adresse');
    this.veloDispos = document.getElementById('veloDispos');
    this.buttonReservationOnThePage = document.getElementById("buttonReservationOnThePage");
    this.placeOfStationDataOnThePage = document.getElementById("placeOfStationDataOnThePage");
    this.locationOfEntriesForReservation = document.getElementById("entrerReserver");
    this.response = undefined;
  }


run() {

  let self = this;

  this.map = new google.maps.Map(this.mapDiv, {
    center: new google.maps.LatLng(this.lat, this.lon),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    scrollwheel: false,

    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
    },

    navigationControl: true,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.ZOOM_PAN
    }
  });

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 

      self.response = JSON.parse(this.responseText);

      console.log(self.response)

      for (let station in self.response) { 

        var iconVeloDispo = 'https://zupimages.net/up/20/04/ib4m.png';
        var iconVeloNonDispo = 'https://zupimages.net/up/20/04/7ai9.png';

        let creerMarqueur = function (response) {

          var marqueur = new google.maps.Marker({

            position: { lat: response[station].position.latitude, lng: response[station].position.longitude },
            title: station,
            map: self.map,
            status: self.response[station].status,
            numero: self.response[station].number,
            nom: self.response[station].name,
            adresse: self.response[station].address,
            veloDisponible: self.response[station].totalStands.availabilities.bikes,
            veloTotal: self.response[station].totalStands.capacity,
            icon: iconVeloDispo

          });

          if (marqueur.status == 'CLOSED') {
            marqueur.icon = iconVeloNonDispo;
          }

          marqueur.addListener('click', function () {
            
            placeOfStationDataOnThePage.style.display = "block";
            locationOfEntriesForReservation.style.display = "none";
            nom.innerHTML = "" + marqueur.nom;
            adresse.innerHTML = "" + marqueur.adresse;
            veloDispos.innerHTML = "" + marqueur.veloDisponible + "/" + marqueur.veloTotal;
            buttonReservationOnThePage.style.display = "block";
            localStorage.setItem('nomStation', marqueur.nom);

            if (marqueur.status == 'OPEN') {
              etat.innerHTML = "Ouvert";
            } else {
              etat.innerHTML = "Fermé";
            }
          });
        }

        let nouveauMarqueur = new creerMarqueur(self.response);

      }
    };
  };

  request.open("GET", "https://api.jcdecaux.com/vls/v3/stations?contract=toyama&apiKey=535bc8091d7e868da2d2f6eb2f6b4bd1d2a96bce");
  request.send();

}
};

