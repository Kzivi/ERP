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

function sns(value) {
  var js_sii = value;
  var js_so = document.getElementById("iso").value;
  var js_sv = document.getElementById("isv").value;
  var js_sdoc = document.getElementById("isdoc").value;
  var js_sdis = document.getElementById("isdis").value;
  var js_sp = document.getElementById("isp").value;
  var sql_pre_ask = "";
  var sql_ask = "";
  var js_snv;
  var js_to;

  if (js_so == "") {
    document.getElementById("feedback").innerHTML = "Operation can't be blank";
    document.getElementById("feedback").classList.remove("hidden");
  } else {
    if (js_sv <= 0 || js_sv=="") {
      document.getElementById("feedback").innerHTML = "Value can't be blank";
      document.getElementById("feedback").classList.remove("hidden");
    } else {
      document.getElementById("feedback").innerHTML = "";
      document.getElementById("feedback").classList.add("hidden");
      sql_pre_ask = "SELECT qty FROM warehouse_stock where id='" + js_sii + "'";
      console.log(sql_pre_ask);
      $.ajax({
        url: "scripts/php/w_usjd.php",
        type: "POST",
        data: { sql_ask: sql_pre_ask },
        dataType: "json",
        async: false,
        success: function (data) {
            var js_sov=parseInt(data.qty);
          if(js_so=="+"){
            js_snv = js_sov + parseInt(js_sv);
            js_to="2";
          }
          if(js_so=="-"){
            js_snv = js_sov - parseInt(js_sv);
            js_to="3";
          }
        },
      });
      sql_ask ="UPDATE warehouse_stock SET qty='"+js_snv+"' WHERE id='" + js_sii + "'";
      console.log(sql_ask);
      $.ajax({
        url: "scripts/php/w_usna.php",
        type: "POST",
        data: { sql_ask: sql_ask },
        async: false,
        success: function (data) {
      var fc_email = getCookieValue("erp_usermail");
     let currentDate = new Date();
      sql_ask="INSERT INTO warehouse_log (item_id, operation, qty, time_when, who, document, description, price) VALUES ('"+js_sii+"', '"+js_to+"', '"+js_sv+"', '"+currentDate.toLocaleString()+"','"+fc_email+"','"+js_sdoc+"','"+js_sdis+"','"+js_sp+"');"
      document.getElementById("iiqty"+js_sii).innerHTML = js_snv;
      $.ajax({
        url: "scripts/php/w_usna.php",
        type: "POST",
        data: { sql_ask: sql_ask },
        async: false,
        success: function (data) {
            document.getElementById("feedback").innerHTML = "Stock Updated!";
            document.getElementById("feedback").classList.remove("hidden");
            document.getElementById("iso").value="";
            document.getElementById("isv").value="";
            document.getElementById("isdoc").value="";
            document.getElementById("isdis").value="";
            document.getElementById("isp").value="";
            document.getElementById("stock_editing").classList.add("hidden");

            sql_ask="SELECT qty, stock_min, status FROM warehouse_stock WHERE id="+js_sii+";";
            console.log(sql_ask);
            $.ajax({
              url: "scripts/php/w_umjd.php",
              type: "POST",
              data: { sql_ask: sql_ask },
              dataType: "json",
              async: false,
              success: function (data) {
                if ((data[0].qty<data[0].stock_min && data[0].status=="1") || data[0].qty<0){
                  document.getElementById("iiqty"+js_sii).classList.add("bg-danger");
                }else{
                  document.getElementById("iiqty"+js_sii).classList.remove("bg-danger");
                }
                  
              },
            });


            var s_position = {
                top: currentPosition,
                left: 0,
                behavior: 'smooth'
              };
              window.scrollTo(s_position);

//Lable Creator
if(js_to=="2"){
            var nameValue = $("#se_in").val();
            var id_temp = document.getElementById("se_pn").value;
            var numberValue = "*"+id_temp.replace(/ /g, "")+"*";
            var qtyValue = js_sv;
            var whoValue = fc_email.replace("@manufacturing.partners", "");
            var date_temp = currentDate.toLocaleString();
            var whenValue = date_temp;
            var url = "lable/w_in_lable.html?name=" + encodeURIComponent(nameValue) + "&number=" + encodeURIComponent(numberValue) + "&qty=" + encodeURIComponent(qtyValue) + "&who=" + encodeURIComponent(whoValue) + "&when=" + encodeURIComponent(whenValue);
            window.open(url);
}

        },
        error: function (xhr, status, error) {
            document.getElementById("feedback").innerHTML = "Error";
            document.getElementById("feedback").classList.remove("hidden");
            console.log("Wystąpił błąd: " + error);
          }
    });
},  error: function (xhr, status, error) {
    document.getElementById("feedback").innerHTML = "Error";
    document.getElementById("feedback").classList.remove("hidden");
    console.log("Wystąpił błąd: " + error);
  }
    });
  }
}
}
