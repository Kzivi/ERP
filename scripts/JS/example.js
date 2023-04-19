console.log("Sprawdzanie ciasteczek");

function getCookieValue(cookieName) {
  const cookieParts = document.cookie.split(';');
  for (let i = 0; i < cookieParts.length; i++) {
    const cookieKeyValue = cookieParts[i].split('=');
    if (cookieKeyValue[0].trim() === cookieName) {
      return cookieKeyValue[1];
    }
  }
  return '';
}

if (getCookieValue('erp_usermail')) {
    if (getCookieValue('erp_permission')) {
  console.log("Ciasteczko znalezione");
  // Użycie funkcji do odczytu wartości parametrów
  var fc_permission = getCookieValue("erp_permission");
  var fc_email = getCookieValue("erp_usermail");
} 
}else {
  console.log("Ciasteczko nie znalezione");
  window.location.assign("index.html");
}
console.log("Email: " + fc_email + ", Uprawnienie: " + fc_permission);