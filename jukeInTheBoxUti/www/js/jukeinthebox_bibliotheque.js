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
      desc += "<input type='submit' id='add_button" + piste["idPiste"] + "' onclick='addFile(" + piste["idPiste"] + ")' name=" + piste["idPiste"] + " value='Ajouter à la file' />";
  desc += "</div>";
  desc += "<hr>";
  return desc;
}

function addFile(idPiste) {
  console.log(idPiste);
  $.ajax({
    url: "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/addfile.php",
    type: "POST",
    data: {
      'id': idPiste,
    },
    headers: {
      "Authorization": "Basic " + btoa("rimet2u:070998.A")
    }
  });
}

  recupBibliotheque();