function recupFile() {
  $(document).ajaxStart(function () {
    $("#wait").css("display", "block");
  });

  $(document).ajaxComplete(function () {
    $("#wait").css("display", "none");
  });

  $.ajax({
    url: "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/",
    context: document.body,
    headers: {
      "Authorization": "Basic " + btoa("rimet2u:070998.A")
    }
  }).done(function (data) {
    let compteur = 1;
    let json = data;
    if (json["pistes"][0] != null) {
      for (var i = 0; i < json["pistes"].length; i++) {
        $(".file_piste").append("<p class='musique_file'>" + compteur + descPiste(json["pistes"][i]["piste"]));
        compteur++;
      }
    }
    else $(".file_piste").html("<p class='musique_file'>Musique dans la file : Aucune</p>");
  });
}

function descPiste(piste) {
  let desc = ") ";
  let taille = piste["artistes"].length;
  if (taille == 1) {
    desc += piste["artistes"][0]["prénom"] + " " + piste["artistes"][0]["nom"];
  }
  else {
    desc += piste["artistes"][0]["prénom"] + " " + piste["artistes"][0]["nom"];
    for (var i = 1; i < taille; i++) {
      desc += " / " + piste["artistes"][i]["prénom"] + " " + piste["artistes"][i]["nom"];
    }
  }
  desc += " - " + piste["nomPiste"] + "</p>";
  return desc;
}

recupFile();