var js_password = document.getElementById("l_password").value;
var js_email = document.getElementById("l_email").value;
console.log("Email:", js_email, " Hasło:", js_password);

$.ajax({
  url: "scripts/PHP/login.php",
  type: "POST",
  data: { email: js_email, password: js_password },
  dataType: "json",
  success: function (data) {
    console.log(data);
    var erp_permission = data.json_permission;
    var erp_usermail = data.json_usermail;
    if (erp_permission !== "denial") {
      //cookie create
      let expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      document.cookie ="erp_usermail=" + erp_usermail + "; expires=" + expirationDate.toUTCString() + "; path=/";
      document.cookie ="erp_permission=" + erp_permission + "; expires=" + expirationDate.toUTCString() + "; path=/";
      window.location.assign("warehouse.html");
    } else {
      // Wyświetlenie komunikatu o błędzie logowania
      document.title = "ERP ERROR - Manufacturing Partners";
      document.getElementById("l_message").innerHTML =
        "Niepoprawny email lub hasło.";
      $(".wrong").fadeIn();
    }
  },
  error: function () {
    // Wyświetlenie komunikatu o błędzie serwera
    document.title = "ERP ERROR - Manufacturing Partners";
    document.getElementById("l_message").innerHTML =
      "Wystąpił błąd serwera.</br>Spróbuj ponownie później.";
    $(".wrong").fadeIn();
  },
});
