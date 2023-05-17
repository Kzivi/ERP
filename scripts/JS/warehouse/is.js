var js_isd = document.getElementById("isd").value;
console.log(js_isd);
var sql_ask = "SELECT DISTINCT id, part_number, item_name, qty, status, location, type, stock_min FROM warehouse_stock WHERE part_number LIKE '%" + js_isd + "%' OR item_name LIKE '%" + js_isd + "%' OR supplier LIKE '%" + js_isd + "%'";
console.log(sql_ask);
var srfb="";
var temp_class="";
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
        console.log(data);
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