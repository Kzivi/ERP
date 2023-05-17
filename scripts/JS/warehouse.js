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

  document.getElementById("activ_user").innerHTML = fc_email;

} 
}else {
  console.log("Ciasteczko nie znalezione");
  window.location.assign("index.html");
}
console.log("Email: " + fc_email + ", Uprawnienie: " + fc_permission);

var temp_class = "";
var js_isd = document.getElementById("isd").value;
console.log(js_isd);
var sql_ask = "SELECT DISTINCT id, part_number, item_name, qty, status, location, type, stock_min FROM warehouse_stock WHERE (qty<stock_min AND status=1) OR qty<0";
console.log(sql_ask);
var srfb="";
document.getElementById("feedback").classList.add("hidden");
document.getElementById("feedback").innerHTML = "";
document.getElementById("stock_editing").classList.add("hidden");
document.getElementById("adding_new").classList.add("hidden");

$.ajax({
    url: "scripts/php/w_umjd.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
        for(let key in data){
            let temp_status;
            switch (data[key].status){
                case "1":
                    temp_status="Active";
                    break;
                case "2":
                    temp_status="Obsolid";
                    break;
            }
            let temp_type;
                switch (data[key].type){
                    case "1":
                        temp_type="Part";
                        break;
                    case "2":
                        temp_type="Comsumable";
                        break;
                        case "3":
                            temp_type="Module";
                            break;
                            case "4":
                                temp_type="Final Product";
                                break;
                }
            
                if (parseInt(data[key].qty) < 0) {
                  temp_class = "bg-danger";
                } else if (parseInt(data[key].qty) < parseInt(data[key].stock_min) && parseInt(data[key].status) == 1) {
                  temp_class = "bg-danger";
                } else {
                  temp_class = "";
                }

            var temp_pn = data[key].part_number || "";
            var temp_l = data[key].location || "";
            srfb=srfb+"<tr><td>"+temp_pn+"</td><td>"+data[key].item_name+"</td><td class='"+temp_class+"' id=iiqty"+data[key].id+">"+data[key].qty+"</td><td>"+temp_status+"</td><td>"+temp_type+"</td><td>"+temp_l+"</td><td><button type='button' class='btn btn-primary btn-sm iqb' value='"+data[key].id+"'>+/-</button> <button type='button' class='btn btn-primary btn-sm ivb' value='"+data[key].id+"'>View</button> <button type='button' class='btn btn-primary btn-sm imb' value='"+data[key].id+"'>Move</button></td></tr>";
          }
    },
  });

  document.getElementById("searching_resoult_section").innerHTML =srfb;