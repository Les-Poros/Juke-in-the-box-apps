  function recupBibliotheque() {
    $.ajax({
      url: "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue.php",
      context: document.body,
      headers: {
        "Authorization": "Basic " + btoa("rimet2u:070998.A")
      }
    }).done(function (data) {
      let json = JSON.parse(data);
      for (var i=0; i<json["catalogue"].length; i++){
        $(".bibliotheque").append(descPiste(json["catalogue"][i]));
       }
    });
  }

  function descPiste(piste){
    let desc= "<div class='piste'>";
    desc += "</div>";
    return desc;
  }

  recupBibliotheque()