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

function iv(wv_ii) {
    var fc_email = getCookieValue("erp_usermail");
    document.getElementById("activ_user").innerHTML=fc_email;
var wv_id = wv_ii;
var sql_ask ="SELECT ws.id, ws.part_number AS product_number, ws.location, ws.item_name, ws.qty, ws.status, ws.type, ws.stock_min, ws.supplier, (SELECT MAX(time_when) FROM warehouse_log WHERE item_id = ws.id AND operation = 2) AS last_delivery, (SELECT price FROM warehouse_log WHERE item_id = ws.id AND price IS NOT NULL AND price != 0 ORDER BY time_when DESC LIMIT 1) AS last_price, (SELECT AVG(price) FROM warehouse_log WHERE item_id = ws.id AND price IS NOT NULL AND price != 0) AS average_price FROM warehouse_stock AS ws WHERE ws.id = '"+wv_id+"';";
console.log(sql_ask);
var temp_s, temp_t;
var ivfb="";

$.ajax({
    url: "scripts/php/w_usjd.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
        console.log(data);
        document.getElementById("wv_pn").innerHTML = data.product_number;
        document.getElementById("wv_in").innerHTML = data.item_name;
        document.getElementById("wv_qty").innerHTML = data.qty;
        document.getElementById("wv_il").innerHTML = data.location;
        switch (data.status) {
            case "1":
                temp_s = "Active";
            break;
            case "2":
                temp_s = "Obsolid";
            break;
            default:
    temp_s = "Unknown type";
        }
        document.getElementById("wv_s").innerHTML = temp_s;
        document.getElementById("wv_s").value = data.status;

        switch (data.type) {
            case "1":
                temp_t = "Part";
            break;
            case "2":
                temp_t = "Consumable";
            break;
            case "3":
                temp_t = "Module";
            break;
            case "4":
                temp_t = "Final Product";
            break;
            default:
    temp_t = "Unknown type";
        }
        document.getElementById("wv_t").innerHTML = temp_t;
        document.getElementById("wv_t").value = data.type;

        document.getElementById("wv_sm").innerHTML = data.stock_min;
        document.getElementById("wv_sup").innerHTML = data.supplier;
        document.getElementById("wv_ld").innerHTML = data.last_delivery;
        document.getElementById("wv_lp").innerHTML = data.last_price;
        temp_lprice = Number(data.average_price);
        document.getElementById("wv_ap").innerHTML = temp_lprice.toFixed(2);
        document.title = data.product_number+" - "+data.item_name;



    },  error: function (xhr, status, error) {
        console.log("Wystąpił błąd: " + error);
        console.log(xhr.responseText); // wyświetla treść błędu w konsoli
    
}});
sql_ask ="SELECT DATE_FORMAT(STR_TO_DATE(time_when, '%d.%m.%Y, %H:%i:%s'), '%Y-%m-%d %H:%i:%s') AS formatted_time, time_when, operation, operation, qty, description, document, who FROM warehouse_log WHERE item_id='"+wv_id+"' ORDER BY formatted_time DESC";
$.ajax({
    url: "scripts/php/w_umjd.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
        console.log(data);
        for(let key in data){
            let temp_o;
            switch (data[key].operation){
                case "1":
                    temp_o="Create";
                    data[key].description="";
                    data[key].document="";
                    break;
                case "2":
                    temp_o="+";
                    break;
                case "3":
                    temp_o="-";
                    break;
                    case "4":
                        temp_o="Edit";
                        break;
                default:
                    temp_o= "Unknown type";
            }
            let temp_w = data[key].who;
            temp_w = temp_w.replace("@manufacturing.partners", "");

            ivfb=ivfb+"<tr><td>"+data[key].time_when+"</td><td>"+temp_o+"</td><td>"+data[key].qty+"</td><td>"+data[key].description+"</td><td>"+data[key].document+"</td><td>"+temp_w+"</td></tr>";
        }
    },        error: function (xhr, status, error) {
        console.log("Wystąpił błąd: " + error);
      }
});
document.getElementById("item_logs").innerHTML =ivfb;
}