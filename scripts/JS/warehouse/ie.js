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

function nulltest(object_temp) {
    var element = document.getElementById(object_temp);
    if (element) {
      return element.value;
    } else {
      return null;
    }
  }
  
var js_idi = document.getElementById("wv_id").innerHTML;

var js_iopn = document.getElementById("wv_pn").innerHTML;
var js_inpn = nulltest("ie_pn");

var js_ioin = document.getElementById("wv_in").innerHTML;
var js_inin = nulltest("ie_in");

var js_iol = document.getElementById("wv_il").innerHTML;
console.log(js_iol);
var js_inl = nulltest("ie_il");
console.log(js_inl);

var js_ios = document.getElementById("wv_s").value;
var js_ins = nulltest("ie_s");

var js_iot = document.getElementById("wv_t").value;
var js_int = nulltest("ie_t");

var js_iosm = document.getElementById("wv_sm").innerHTML;
var js_insm = nulltest("ie_sm");

var js_iosup = document.getElementById("wv_sup").innerHTML;
var js_insup = nulltest("ie_sup");

var sql_pre=""; //Sprawdzi czy PN sie nie powtarza
var sql_cur=""; //Zaktualizuje dane
var log_dis="";
var fc_email = getCookieValue("erp_usermail");
var currentDate = new Date();

var js_ipnc=0;

console.log("ie.js uruchomiony");

if(js_iopn==js_inpn && js_ioin==js_inin && js_iol==js_inl && js_ios==js_ins && js_iot==js_int && js_iosm==js_insm && js_iosup==js_insup){
    console.log("Data is the same.");
    document.getElementById("feedback").innerHTML ="There is nothing to update.";
    document.getElementById("feedback").classList.remove("hidden");
} else {
    if (js_iopn!==js_inpn && js_inpn!==""){
    sql_pre="SELECT * FROM warehouse_stock WHERE part_number='"+js_inpn+"';";
    console.log(sql_pre);
    $.ajax({
        url: "scripts/php/w_ie.php",
        type: "POST",
        data: { sql_ask: sql_pre },
        dataType: "json",
        async: false,
        success: function (data) {
            js_ipnc = data.rows;
        }, error: function (xhr, status, error) {
            console.log("Wystąpił błąd: " + error);
            console.log(xhr.responseText); // wyświetla treść błędu w konsoli
        
    }});
    }
if (js_ipnc===0){
    sql_cur="UPDATE warehouse_stock SET ";

    if(js_iopn!=js_inpn){
        sql_cur=sql_cur+"part_number='"+js_inpn+"', ";
        log_dis=log_dis+"Part Number: "+js_iopn+" > "+js_inpn+", ";
    }
    if(js_ioin!=js_inin){
        sql_cur=sql_cur+"item_name='"+js_inin+"', ";
        log_dis=log_dis+"Item Name: "+js_ioin+" > "+js_inin+", ";
    }
    if(js_iol!=js_inl){
        sql_cur=sql_cur+"location='"+js_inl+"', ";
        log_dis=log_dis+"Localization: "+js_iol+" > "+js_inl+", ";
    }
    if(js_ios!=js_ins){
        sql_cur=sql_cur+"status='"+js_ins+"', ";
        log_dis=log_dis+"Status: "+js_ios+">"+js_ins+", ";
    }
    if(js_iot!=js_int){
        sql_cur=sql_cur+"type='"+js_int+"', ";
        log_dis=log_dis+"Type: "+js_iot+" > "+js_int+", ";
    }
    if(js_iosm!=js_insm){
        sql_cur=sql_cur+"stock_min='"+js_insm+"', ";
        log_dis=log_dis+"Stock Min: "+js_iosm+" > "+js_insm+", ";
    }
    if(js_iosup!=js_insup){
        sql_cur=sql_cur+"supplier='"+js_insup+"', ";
        log_dis=log_dis+"Supplier: "+js_iosup+" > "+js_insup+", ";
    }


    log_dis=log_dis.slice(0, -2);
    sql_cur=sql_cur.slice(0, -2)+" WHERE id ='"+js_idi+"';";
    console.log(sql_cur);
    var sql_log="INSERT INTO warehouse_log (item_id, operation, time_when, who, description) VALUES ('"+js_idi+"', '4', '"+currentDate.toLocaleString()+"', '"+fc_email+"', '"+log_dis+"' );";
    $.ajax({
        url: "scripts/php/w_usna.php",
        type: "POST",
        data: { sql_ask: sql_log },
        async: false,
        success: function (data) {
            $.ajax({
                url: "scripts/php/w_usna.php",
                type: "POST",
                data: { sql_ask: sql_cur },
                async: false,
                success: function (data) {
                    location.reload();
                }, error: function (xhr, status, error) {
                    console.log("Wystąpił błąd: " + error);
                    console.log(xhr.responseText); // wyświetla treść błędu w konsoli               
            }});
        }, error: function (xhr, status, error) {
            console.log("Wystąpił błąd: " + error);
            console.log(xhr.responseText); // wyświetla treść błędu w konsoli
        
    }});
    
}else{
    document.getElementById("feedback").innerHTML ="Item with that part number already exists";
    document.getElementById("feedback").classList.remove("hidden");
}
}
