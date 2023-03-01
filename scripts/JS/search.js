$.ajax({
  url: "scripts/PHP/search.php",
  type: "POST",
  dataType: "json",
  success: function (data) {
    var output =
      "<table><tr><b><td width=20px>ID</td> <td width=200px>Email</td> <td width=100px>Permission</td></b></tr>";
    for (var i = 0; i < data.length; i++) {
      var db_id = data[i].id.id;
      var db_mail = data[i].email.email;
      var db_permission = data[i].permission.permission;
      output +=
        "<tr><td>" +
        db_id +
        "</td><td>" +
        db_mail +
        "</td><td>" +
        db_permission +
        "</td></tr>";
    }
    output += "</table>";

    var search_resoult = document.getElementById("search-resoult");
    search_resoult.innerHTML = output;
  },
  error: function (xhr, status, error) {
    console.log("Wystąpił błąd: " + error);
  },
});
