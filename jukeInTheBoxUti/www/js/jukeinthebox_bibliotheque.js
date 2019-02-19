$(document).ajaxStart(function () {
  $("#wait").css("display", "block");
});

$(document).ajaxComplete(function () {
  $("#wait").css("display", "none");
});

function descPiste(piste) {
  let desc = "<div class='piste'>";
  desc += "<img class ='img_piste' src='" + piste["imagePiste"] + "' />";
  desc += "<p>"
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
  desc += " - " + piste["nomPiste"] + " (" + piste["annéePiste"] + ") </p>";
  desc += "<button class='add_button' type='submit' onclick='addFile(" + piste["idPiste"] + ")'>Ajouter à la file</button>";
  desc += "</div>";
  desc += "<hr>";
  return desc;
}

function addFile(idPiste) {
  console.log(idPiste);
  $.ajax({
    url: "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/addfile",
    type: "POST",
    data: {
      'id': idPiste,
    }
  }).done(function () {
    let lien = window.location.toString().split("bibliotheque.html");
    window.location = lien[0] + 'accueil.html';
    window.alert('Votre musique a été ajoutée à la file !');
  });
}


$(document).ready(function () {
  $('#search').keyup(function () {
    var piste = $(this).val();
    result_search(piste);
  });
});


function result_search(recherche) {
  $.ajax({
    type: 'GET',
    url: 'https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue',
    headers: {
      "Authorization": "Basic " + btoa("rimet2u:070998.A")
    },
    data: 'piste=' + recherche,
  }).done(function (json) {
    $(".biblio_pistes").html("");
    for (var i = 0; i < json["catalogue"]["pistes"].length; i++) {
      $(".biblio_pistes").append(descPiste(json["catalogue"]["pistes"][i]));
    }
  });

}

result_search("");