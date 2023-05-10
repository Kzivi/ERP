var js_isd = document.getElementById("isd").value;
console.log(js_isd);
var sql_ask = "SELECT DISTINCT id, part_number, item_name, qty, status, location FROM warehouse_stock WHERE part_number LIKE '%" + js_isd + "%' OR item_name LIKE '%" + js_isd + "%' OR supplier LIKE '%" + js_isd + "%'";
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


            srfb=srfb+"<tr><td>"+data[key].part_number+"</td><td>"+data[key].item_name+"</td><td id=iiqty"+data[key].id+">"+data[key].qty+"</td><td>"+temp_status+"</td><td>"+data[key].location+"</td><td><button type='button' class='btn btn-primary btn-sm iqb' value='"+data[key].id+"'>+/-</button> <button type='button' class='btn btn-primary btn-sm ivb' value='"+data[key].id+"'>View</button> <button type='button' class='btn btn-primary btn-sm imb' disabled value='"+data[key].id+"'>Move</button></td></tr>";
        }
    },
  });

  document.getElementById("searching_resoult_section").innerHTML =srfb;