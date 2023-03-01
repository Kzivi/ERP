document.title = "ERP ACCOUNT " + email + " - Manufacturing Partners";
$(".admin-element").fadeOut();
$(".user-element").fadeOut();
$(".admin-element").addClass("hidden");
$(".user-element").addClass("hidden");
$(".mail").addClass("hidden");
$(".to_home").removeClass("hidden");
$(".account-element").fadeIn();
$(".account-element").removeClass("hidden");
var i = 0;

var next = function () {
  console.log("next");
};

var back = function () {
  console.log("back");
};

$.ajax({
  url: "scripts/PHP/search.php",
  type: "POST",
  dataType: "json",
  success: function (data) {
    var db_id = [];
    var db_mail = [];
    var db_permission = [];
    var current_page = 1;

    var output =
      "<table><tr><td width=40px><b>ID</b></td> <td width=300px><b>Email</b></td> <td width=125px><b>Permission</b></td><td width=50px></td><td width=50px></td></tr>";
    for (i; (i < data.length) & (i < current_page * 10); i++) {
      db_id[i] = data[i].id.id;
      db_mail[i] = data[i].email.email;
      db_permission[i] = data[i].permission.permission;
      output +=
        "<tr><td>" +
        db_id[i] +
        "</td><td>" +
        db_mail[i] +
        "</td><td>" +
        db_permission[i] +
        "</td><td><p id='edit" +
        i +
        "'>Edytuj</p></td><td><p id='del" +
        i +
        "'>Usuń</p></td></tr>";
    }
    output += "</table>";

    var search_resoult = document.getElementById("search-resoult");
    search_resoult.innerHTML = output;
    var ser_res_dev = document.getElementById("ser-res-dev");
    var acount_pages = Math.ceil(data.length / 10);
    if (current_page == acount_pages) {
      er_res_dev.innerHTML = "<" + current_page + "/" + acount_pages;
    }
    if (current_page < acount_pages && current_page > 1) {
      ser_res_dev.innerHTML =
        "<" +
        current_page +
        "/" +
        acount_pages +
        "<input type='button' id='next' value='>'/>";
    }
    if (acount_pages == 1) {
      ser_res_dev.innerHTML = current_page + "/" + acount_pages;
    }
    if (current_page == 1) {
      ser_res_dev.innerHTML =
        current_page +
        "/" +
        acount_pages +
        "<input type='button' id='next' value='>'/>";
    }
  },
  error: function (xhr, status, error) {
    console.log("Wystąpił błąd: " + error);
  },
});
