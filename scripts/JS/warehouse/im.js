function ims(value) {
    var m_i_id=value;
    var sql_ask="SELECT part_number, item_name FROM warehouse_stock WHERE id='"+m_i_id+"'";
    document.getElementById("move_item").classList.remove("hidden");
    document.getElementById("im_cb").value = m_i_id;
    $.ajax({
       url: "scripts/php/w_usjd.php",
       type: "POST",
       data: { sql_ask: sql_ask },
       dataType: "json",
       async: false,
       success: function (data) {
           console.log(data);
           document.getElementById("im_in").value = data.item_name;
           document.getElementById("im_pn").value = data.part_number;
           document.getElementById("im_cb").value =m_i_id;
           document.getElementById("feedback").innerHTML = "";
           document.getElementById("feedback").classList.add("hidden");
           window.scrollTo(0, 0);
       }
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

  function im() {
var js_snv;
  var js_imdir = document.getElementById("imdir").value;
   if (js_imdir==2){
    var fc_email = getCookieValue("erp_usermail");
    var currentDate = new Date();
   var js_iid = document.getElementById("im_cb").value;
   var js_imv = document.getElementById("imv").value;
   var js_imc = document.getElementById("imc").value;
   var js_imd = document.getElementById("imd").value;
   sql_ask="INSERT INTO b_stock (item_id, qty, why, time_when, who, description) VALUES ('"+js_iid+"', '"+js_imv+"', '"+js_imc+"', '"+currentDate.toLocaleString()+"', '"+fc_email+"', '"+js_imd+"');";
   console.log(sql_ask);
   $.ajax({
    url: "scripts/php/w_usjali.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
      js_succes=data.success;
        if(js_succes=true){
          var js_lii=data.lii;
          sql_ask="INSERT INTO warehouse_log (item_id, qty, operation, time_when, who, description) VALUES ('"+js_iid+"', '"+js_imv+"', '5', '"+currentDate.toLocaleString()+"', '"+fc_email+"', '"+js_lii+"');";
          console.log(sql_ask);
          $.ajax({
            url: "scripts/php/w_usna.php",
            type: "POST",
            data: { sql_ask: sql_ask },
            async: false,
            success: function (data) {
              console.log(data);
              sql_pre_ask = "SELECT qty FROM warehouse_stock where id='" + js_iid + "'";
              console.log(sql_pre_ask);
              $.ajax({
                url: "scripts/php/w_usjd.php",
                type: "POST",
                data: { sql_ask: sql_pre_ask },
                dataType: "json",
                async: false,
                success: function (data) {
                    var js_sov=parseInt(data.qty);
                    js_snv = js_sov - parseInt(js_imv);
                },
              });
            sql_ask="UPDATE warehouse_stock SET qty = '"+js_snv+"' WHERE id = '"+js_iid+"';";
              $.ajax({
                url: "scripts/php/w_usna.php",
                type: "POST",
                data: { sql_ask: sql_ask },
                async: false,
                success: function (data) {
                  document.getElementById("move_item").classList.add("hidden");
                  document.getElementById("feedback").innerHTML =document.getElementById("im_in").value+" was moved to B-stock";
                  document.getElementById("feedback").classList.remove("hidden");
                  document.getElementById("imv").value="1";
                  document.getElementById("imc").value="1";
                  document.getElementById("imd").value="";
                  document.getElementById("iiqty"+js_iid).innerHTML=js_snv;
                  var s_position = {
                    top: currentPosition,
                    left: 0,
                    behavior: 'smooth'
                  };
                  window.scrollTo(s_position);
                },
              });
            },
          });
        }else{
          js_em=data.message
            document.getElementById("feedback").innerHTML ="Error."+js_em;
            document.getElementById("feedback").classList.remove("hidden");
        }
    },
  });
   }
   }