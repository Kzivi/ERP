
function se(value) {
 var se_i_id=value;
 var sql_ask="SELECT part_number, item_name FROM warehouse_stock WHERE id='"+se_i_id+"'";
 document.getElementById("stock_editing").classList.remove("hidden");
 $.ajax({
    url: "scripts/php/w_seps.php",
    type: "POST",
    data: { sql_ask: sql_ask },
    dataType: "json",
    async: false,
    success: function (data) {
        console.log(data);
        document.getElementById("se_in").value = data.item_name;
        document.getElementById("se_pn").value = data.part_number;
        document.getElementById("se_sb").value =se_i_id;
        window.scrollTo(0, 0);
    }
});
}