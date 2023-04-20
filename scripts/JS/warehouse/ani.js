var js_anpn = document.getElementById("ani").value;
var js_anin = document.getElementById("anin").value;
var js_ans = document.getElementById("ans").value;
var js_ansm = document.getElementById("ansm").value;
var js_ant = document.getElementById("ant").value;
var js_chk_own = document.getElementById("chk_own").checked;
var js_nif=true; //new id its free?
var sql_ask="";
var js_lii="0";
var js_succes="";
var js_em="";
console.log(js_anpn, js_anin, js_ans, js_ansm, js_ant, js_chk_own);

function cans() {
    document.getElementById("feedback").innerHTML =js_anin+" was add.";
    document.getElementById("feedback").classList.remove("hidden");
    document.getElementById("adding_new").classList.add("hidden");
    document.getElementById("ani").value="";
    document.getElementById("ani").disabled=true;
    document.getElementById("anin").value="";
    document.getElementById("ans").value="";
    document.getElementById("ansm").value="";
    document.getElementById("ant").value="1";
    document.getElementById("chk_own").checked=false;
  }

if(js_chk_own==true){
    //Check that ID id exsist
    $.ajax({
        url: "scripts/php/w_anch.php",
        type: "POST",
        data: { js_anpn: js_anpn },
        dataType: "json",
        async: false,
        success: function (data) {
          console.log(data);
          js_nif = data.nif;
        },
      });
      if(js_nif==true){
        sql_ask="INSERT INTO warehouse_stock (part_number, item_name, supplier, stock_min, type) VALUES ('"+js_anpn+"', '"+js_anin+"', '"+js_ans+"', '"+js_ansm+"', '"+js_ant+"');"
        console.log(sql_ask);
        $.ajax({
            url: "scripts/php/w_ani.php",
            type: "POST",
            data: { sql_ask: sql_ask },
            dataType: "json",
            async: false,
            success: function (data) {
              js_succes=data.success;
                if(js_succes=true){
                  js_lii=data.lii;
                  cans();
                }else{
                  js_em=data.message
                    document.getElementById("feedback").innerHTML ="Error."+js_em;
                    document.getElementById("feedback").classList.remove("hidden");
                }
            },
          });
      }else{
        document.getElementById("feedback").innerHTML ="Part number already exist!";
        document.getElementById("feedback").classList.remove("hidden");

      }
}else{
    sql_ask="INSERT INTO warehouse_stock (item_name, supplier, stock_min, type) VALUES ('"+js_anin+"', '"+js_ans+"', '"+js_ansm+"', '"+js_ant+"');"
    console.log(sql_ask);
    $.ajax({
        url: "scripts/php/w_ani.php",
        type: "POST",
        data: { sql_ask: sql_ask },
        dataType: "json",
        async: false,
        success: function (data) {
          js_succes=data.success;
            if(js_succes=true){
              js_lii=data.lii;
              cans();
            }else{
              js_em=data.message
                document.getElementById("feedback").innerHTML ="Error."+js_em;
                document.getElementById("feedback").classList.remove("hidden");
            }
        },
      });
}

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

if(js_succes==true){
  var fc_email = getCookieValue("erp_usermail");
  let currentDate = new Date();
  sql_ask="INSERT INTO warehouse_log (item_id, operation, time_when, who) VALUES ('"+js_lii+"', '1','"+currentDate.toLocaleString()+"','"+fc_email+"');"
  $.ajax({
    url: "scripts/php/w_ani_log.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
      console.log(data);
    },
  });
}

