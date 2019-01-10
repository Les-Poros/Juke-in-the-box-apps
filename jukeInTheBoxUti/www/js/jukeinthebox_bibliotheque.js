function recupBibliotheque() {
    $.ajax({
      url: "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue.php",
      context: document.body,
      headers: {
        "Authorization": "Basic " + btoa("rimet2u:070998.A")
      }
    }).done(function (json) {
      for (var i=0; i<json["catalogue"]["pistes"].length; i++){
        $(".bibliotheque").append(descPiste(json["catalogue"]["pistes"][i]));
       }
    });
  }

  function descPiste(piste){
    let desc= "<div class='piste'>";
    desc += "<img class ='img_piste' src='" + piste["imagePiste"]+ "' />";
    desc += "<p>" 
    let taille = piste["artistes"].length;
    if (taille == 1) {
    desc += piste["artistes"][0]["prénom"] +" "+ piste["artistes"][0]["nom"];
    }
    else{
        desc += piste["artistes"][0]["prénom"] +" "+ piste["artistes"][0]["nom"];
        for(var i=1; i<taille; i++) {
            desc += " / " + piste["artistes"][i]["prénom"] +" "+ piste["artistes"][i]["nom"];
        }
    }
    desc += " - " + piste["nomPiste"] + " (" + piste["annéePiste"] + ") </p>";
    desc += "<button class='add_button' onclick='../js/jukeinthebox_addfile.js'>Ajouter à la file</button>";
    desc += "</div>";
    desc += "<hr>";
    return desc;
  }

  recupBibliotheque();