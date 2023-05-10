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

var fc_email = getCookieValue("erp_usermail");
var wv_id = document.getElementById("wv_id").innerHTML;
var wv_pn = document.getElementById("wv_pn").innerHTML;
var wv_in = document.getElementById("wv_in").innerHTML;
var currentDate = new Date();
var sql_ask = "DELETE FROM warehouse_stock WHERE id = '"+wv_id+"';";

$.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
        console.log(data);
    },
    error: function (xhr, status, error) {
        console.log("Wystąpił błąd: " + error);
      }
})

var sql_ask = "DELETE FROM warehouse_log WHERE item_id = '"+wv_id+"';";

$.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
        console.log(data);
//window.close();
    },
    error: function (xhr, status, error) {
        console.log("Wystąpił błąd: " + error);
      }
})

var sql_ask = "INSERT INTO warehouse_log (item_id, operation, time_when, who, description) VALUES ('"+wv_id+"', '404', '"+currentDate.toLocaleString()+"', '"+fc_email+"', '"+wv_pn+" - "+wv_in+"');"

$.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
        console.log(data);
window.close();
    },
    error: function (xhr, status, error) {
        console.log("Wystąpił błąd: " + error);
      }
})