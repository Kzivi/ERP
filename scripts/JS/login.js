var password = document.getElementById("password").value;
var email = document.getElementById("email").value;
console.log("Email:", email, " Hasło:", password);
$.ajax({
  url: "scripts/PHP/login.php",
  type: "POST",
  data: { email: email, password: password },
  success: function (data) {
    console.log(data);
    if (data == "success") {
      $.ajax({
        url: "scripts/PHP/permission.php",
        type: "POST",
        data: { email: email, password: password },
        dataType: "json",
        success: function (response) {
          var permission = response.permission;
          document.title = "ERP HOME " + email + " - Manufacturing Partners";
          document.getElementById("mail").innerHTML = "Witaj " + email + " !";
          if (permission === "1") {
            console.log("Uprawienia Administratora");
            $(".login-page").addClass("hidden");
            $(".home-page").removeClass("hidden");
            $(".admin-element").removeClass("hidden");
            $(".user-element").removeClass("hidden");
          } else if (permission === "2") {
            console.log("Uprawienia Użytkownika");
            $(".login-page").addClass("hidden");
            $(".user-element").removeClass("hidden");
            $(".home-page").removeClass("hidden");
          } else {
            console.log("Nieznana wartość uprawnień: " + permission);
          }
        },
        error: function (xhr, status, error) {
          console.log("Wystąpił błąd: " + error);
        },
      });
    } else {
      // Wyświetlenie komunikatu o błędzie logowania
      document.title = "ERP ERROR - Manufacturing Partners";
      $("#error-message").text("Niepoprawny email lub hasło.");
      $(".wrong").fadeIn();
    }
  },
  error: function () {
    // Wyświetlenie komunikatu o błędzie serwera
    document.title = "ERP ERROR - Manufacturing Partners";
    $("#error-message").text("Wystąpił błąd serwera.");
    $(".error").fadeIn();
  },
});
