var js_anpn = document.getElementById("ani").value;
var js_anin = document.getElementById("anin").value;
var js_ans = document.getElementById("ans").value;
var js_ansm = document.getElementById("ansm").value;
var js_ant = document.getElementById("ant").value;
var js_chk_own = document.getElementById("chk_own").checked;
var js_nif=true; //new id its free?
var sql_ask="";
console.log(js_anpn, js_anin, js_ans, js_ansm, js_ant, js_chk_own);

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
        sql_ask="INSERT INTO warehouse_stock (part_number, item_name, supplier, stock_min, type) VALUES ('"+js_anpn+"', '"+js_anin+"', '"+js_ans+"', '"+js_ansm+"', '"+js_ant+"');" //Tu skończyłem nie działa dodawanie nowego przedmiotu
        console.log(sql_ask);
        $.ajax({
            url: "scripts/php/w_ani.php",
            type: "POST",
            data: { sql_ask: sql_ask },
            async: false,
            success: function (data) {
                if(data==""){
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
                }else{
                    console.log(data);
                    document.getElementById("feedback").innerHTML ="Error.";
                    document.getElementById("feedback").classList.remove("hidden");
                }
            },
          });
      }else{
        document.getElementById("feedback").innerHTML ="Part number already exist!";
        document.getElementById("feedback").classList.remove("hidden");

      }
}

