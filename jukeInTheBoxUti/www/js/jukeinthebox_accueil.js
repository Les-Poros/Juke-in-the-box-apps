let music;
let idmusic;

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
    let json = data;
    if (json["pistes"][0] != null) {
      if (idmusic != json["pistes"][0]["idFile"]) {
        idmusic = json["pistes"][0]["idFile"];
      }
      descPiste(json["pistes"][0]["piste"]);
    }
    else $(".musique_en_cours").html("<div class='info_musique'> <p>Musique dans la file : Aucune</p> </div>");
  });
}

function descPiste(piste) {
  let desc = "<p><h2>Titre :</h2> " + piste["nomPiste"] + "</p>";
  desc += "<p><h2>Artiste :</h2> ";
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
  desc += "</p>";
  desc += "<p><h2>Album : </h2>" + piste["albums"][0]["nomAlbum"] + "</p>";
  $(".musique_en_cours").append("<img class='img_musique' src='" + piste["imagePiste"] + "' width='150px' />");
  $(".musique_en_cours").append("<div class='info_musique'>" + desc + "</div>");
}

recupFile();