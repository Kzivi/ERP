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

var sql_ask = "SELECT *, b_stock.qty as qty_b_stock, b_stock.id as id_b_stock, warehouse_stock.qty as qty_warehouse, warehouse_stock.id as id_warehouse FROM b_stock JOIN warehouse_stock ON b_stock.item_id = warehouse_stock.id;";
var bs_ta ="";
$.ajax({
  url: "scripts/php/w_umjd.php",
  type: "POST",
  data: { sql_ask: sql_ask },
  dataType: "json",
  async: false,
  success: function (data) {
      console.log(data);
      for(let key in data){
          let temp_why;
          switch (data[key].why){
              case "1":
                temp_why="Supplier";
                  break;
              case "2":
                temp_why="Process";
                  break;
          }
          var temp_w = data[key].who;
          temp_w = temp_w.replace("@manufacturing.partners", "");
          let temp_pn = data[key].part_number || "";
          bs_ta=bs_ta+"<tr><td>"+data[key].id_b_stock+"</td><td>"+data[key].time_when+"</td><td>"+temp_pn+"</td><td>"+data[key].item_name+"</td><td id='t_qty"+data[key].id_b_stock+"'>"+data[key].qty_b_stock+"</td><td>"+temp_why+"</td><td>"+data[key].description+"</td><td>"+temp_w+"</td><td><button type='button' class='btn btn-primary btn-sm ibsb' value='"+data[key].id_b_stock+"'>Solve</button></td></tr>";
      }
  },
});

document.getElementById("awating_threads").innerHTML =bs_ta;

//History display
sql_ask = "SELECT b_log.*, warehouse_stock.*, b_log.qty AS b_qty, warehouse_stock.qty AS w_qty FROM b_log JOIN warehouse_stock ON b_log.item_id = warehouse_stock.id ORDER BY STR_TO_DATE(b_log.time_when, '%d.%m.%Y, %H:%i:%s') DESC;"
var bs_tabela_log="";
$.ajax({
  url: "scripts/php/w_umjd.php",
  type: "POST",
  data: { sql_ask: sql_ask },
  dataType: "json",
  async: false,
  success: function (data) {
      console.log(data);
      for(let key in data){
        var t_cause;
            switch (data[key].cause){
                case "1":
                  t_cause="Man";
                    break;
                case "2":
                  t_cause="Method";
                    break;
                case "3":
                  t_cause="Machine";
                    break;
                    case "4":
                      t_cause="Management";
                        break;
                    case "5":
                      t_cause="Mother Nature";
                        break;
                        case "6":
                          t_cause="Material";
                            break;
            }
            var t_result;
            switch (data[key].result){
                case "1":
                  t_result="Repaired";
                    break;
                case "2":
                  t_result="Not confirmed";
                    break;
                case "3":
                  t_result="Utilized";
                    break;
                    case "4":
                      t_result="Demo";
                        break;
                    case "5":
                      t_result="Sentedback";
                        break;
            }
            let t_pn = data[key].part_number || "";
            temp_w = data[key].who;
            temp_w = temp_w.replace("@manufacturing.partners", "");
        bs_tabela_log=bs_tabela_log+"<tr><th>"+data[key].thread_id+"</th><th>"+data[key].time_when+"</th><th>"+t_pn+"</th><th>"+data[key].item_name+"</th><th>"+data[key].b_qty+"</th><th>"+data[key].description_cause+"</th><th>"+t_cause+"</th><th>"+data[key].description_result+"</th><th>"+t_result+"</th><th>"+temp_w+"</th></tr>"
      }
  },
});
document.getElementById("item_logs").innerHTML =bs_tabela_log;

function ibsb_click(value) {
  var bs_ci=value;
  var sql_ask = "SELECT *, b_stock.qty as qty_b_stock, b_stock.id as id_b_stock, warehouse_stock.qty as qty_warehouse, warehouse_stock.id as id_warehouse FROM b_stock JOIN warehouse_stock ON b_stock.item_id = warehouse_stock.id WHERE b_stock.id='"+bs_ci+"';";
  $.ajax({
    url: "scripts/php/w_umjd.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
        console.log(data);
        document.getElementById("bs_ti").value=data[0].id_b_stock;
        document.getElementById("bs_tw").value=data[0].time_when;
        let temp_pn = data[0].part_number || "";
        document.getElementById("bs_pn").value=temp_pn;
        document.getElementById("bs_ii").value=data[0].id_warehouse;
        document.getElementById("bs_in").value=data[0].item_name;
        document.getElementById("bs_qty").value=data[0].qty_b_stock;
        document.getElementById("bs_qty").max=data[0].qty_b_stock;
        document.getElementById("bs_id").value=data[0].description;
        let temp_w = data[0].who;
        temp_w = temp_w.replace("@manufacturing.partners", "");
        document.getElementById("bs_w").value=temp_w;
        
        if(data[0].why=="1"){
          for(let i=1; i<6; i++){
            document.getElementById("c_v"+i).disabled=true;
            document.getElementById("bs_cv").value=6;
          }
        }else{
          for(let i=1; i<7; i++){
            document.getElementById("c_v"+i).disabled=false;
            document.getElementById("bs_cv").value=1;
          }
        }
     
    },
  });
}

function ibrb_click() {
  var bs_ti=document.getElementById("bs_ti").value;
  var bs_ii=document.getElementById("bs_ii").value;
  console.log("t_qty"+bs_ti);
  var bs_isq=document.getElementById("t_qty"+bs_ti).innerHTML;
  var bs_irq=document.getElementById("bs_qty").value;
  //QTY from warehouse_stoc.
  var sql_ask="SELECT qty FROM warehouse_stock WHERE id='"+bs_ii+"'";
  var bs_iwq;
  $.ajax({
    url: "scripts/php/w_usjd.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
      console.log(data);
      bs_iwq=parseInt(data.qty);
    },
  });
  var bs_nq=bs_isq-bs_irq;
  var bs_ir=document.getElementById("bs_r").value;
  var fc_email = getCookieValue("erp_usermail");
  let currentDate = new Date();
  var bs_ird=document.getElementById("bs_dis").value;
  var bs_ic=document.getElementById("bs_cv").value;
  var bs_icd=""+document.getElementById("bs_id").value+" -"+document.getElementById("bs_w").value+" "+document.getElementById("bs_tw").value;
  console.log(bs_ti,bs_ii,bs_isq,bs_irq,bs_iwq,bs_nq,bs_ir,fc_email,bs_ird,bs_ic,bs_icd);
  //Add to b_log
  sql_ask="INSERT INTO b_log (thread_id, item_id, qty, result, who, time_when, description_result, cause, description_cause) VALUES ('"+bs_ti+"', '"+bs_ii+"', '"+bs_irq+"', '"+bs_ir+"', '"+fc_email+"', '"+currentDate.toLocaleString()+"', '"+bs_ird+"', '"+bs_ic+"', '"+bs_icd+"');"
  $.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
      console.log(data);
    },
  });

  if (bs_ir<3){
    //add to warehouse_log
    sql_ask="INSERT INTO warehouse_log (item_id, qty, operation, time_when, who, description) VALUES ('"+bs_ii+"', '"+bs_irq+"', '6', '"+currentDate.toLocaleString()+"', '"+fc_email+"', '"+bs_ti+"');";
      $.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
      console.log(data);
    },
  });
  //warehouse_stock qty updating
  bs_iwq=bs_iwq + parseInt(bs_irq);
  sql_ask="UPDATE warehouse_stock SET qty = '"+bs_iwq+"' WHERE id = '"+bs_ii+"';";
  $.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function (data) {
      console.log(data);
    },
  });
  }
  if (bs_nq<1){
  sql_ask="DELETE FROM b_stock WHERE id = '"+bs_ti+"';";
  }else{
  sql_ask="UPDATE b_stock SET qty = '"+bs_nq+"' WHERE id = '"+bs_ti+"';";
  }
  $.ajax({
    url: "scripts/php/w_usna.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    async: false,
    success: function () {
      location.reload();
    },
  });
}
//issue searching segment
function searching_issue (){
  var sql_ask="";
  var bs_iss=document.getElementById("iss").value;
  if(bs_iss==""){
  sql_ask = "SELECT b_log.*, warehouse_stock.*, b_log.qty AS b_qty, warehouse_stock.qty AS w_qty FROM b_log JOIN warehouse_stock ON b_log.item_id = warehouse_stock.id ORDER BY STR_TO_DATE(b_log.time_when, '%d.%m.%Y, %H:%i:%s') DESC;"
  }else{
  sql_ask = "SELECT b_log.*, warehouse_stock.*, b_log.qty AS b_qty, warehouse_stock.qty AS w_qty FROM b_log JOIN warehouse_stock ON b_log.item_id = warehouse_stock.id WHERE thread_id LIKE '%"+bs_iss+"%' OR item_name LIKE '%"+bs_iss+"%' OR description_cause LIKE '%"+bs_iss+"%' OR description_result LIKE '%"+bs_iss+"%' OR part_number LIKE '%"+bs_iss+"%' ORDER BY STR_TO_DATE(b_log.time_when, '%d.%m.%Y, %H:%i:%s') DESC;"
  }
  var bs_tabela_log="";
$.ajax({
  url: "scripts/php/w_umjd.php",
  type: "POST",
  data: { sql_ask: sql_ask },
  dataType: "json",
  async: false,
  success: function (data) {
      console.log(data);
      for(let key in data){
        var t_cause;
            switch (data[key].cause){
                case "1":
                  t_cause="Man";
                    break;
                case "2":
                  t_cause="Method";
                    break;
                case "3":
                  t_cause="Machine";
                    break;
                    case "4":
                      t_cause="Management";
                        break;
                    case "5":
                      t_cause="Mother Nature";
                        break;
                        case "6":
                          t_cause="Material";
                            break;
            }
            var t_result;
            switch (data[key].result){
                case "1":
                  t_result="Repaired";
                    break;
                case "2":
                  t_result="Not confirmed";
                    break;
                case "3":
                  t_result="Utilized";
                    break;
                    case "4":
                      t_result="Demo";
                        break;
                    case "5":
                      t_result="Sentedback";
                        break;
            }
            let t_pn = data[key].part_number || "";
            temp_w = data[key].who;
            temp_w = temp_w.replace("@manufacturing.partners", "");
        bs_tabela_log=bs_tabela_log+"<tr><th>"+data[key].thread_id+"</th><th>"+data[key].time_when+"</th><th>"+t_pn+"</th><th>"+data[key].item_name+"</th><th>"+data[key].b_qty+"</th><th>"+data[key].description_cause+"</th><th>"+t_cause+"</th><th>"+data[key].description_result+"</th><th>"+t_result+"</th><th>"+temp_w+"</th></tr>"
      }
  },
  error: function (data) {
  console.log(data);
  }
});
document.getElementById("item_logs").innerHTML =bs_tabela_log;
}