

// create HTML table
function CreateTable() {
	var div = document.getElementById("matchingTable");
	var html = "";
	
	var col2Ar = new Array();
	var col3Ar = new Array();
	
	for (var key in tableInfo) {
		col2Ar.push(key +"_"+tableInfo[key].info);
		col3Ar.push(tableInfo[key].desc);
	
	}
	
	//randomize column 2 values
	col2Ar = Randomize(col2Ar);
	
	for (var i = 0; i < col2Ar.length; i++) {
		var k = col2Ar[i].split("_")[0];
		var text = col2Ar[i].split("_")[1];
		
		// create row
		html += "<div style='min-width:500px; height: 25px; display: block; clear: both; padding: 15px; border: 1px solid #aaa;  background: #eee; vertical-align: middle'>"
		+ "<div id='col2" + k + "' style='min-width:250px; display: inline; float: left'>" + text +"</div>"
		+ "<div style='width:250px; float: left; display: inline;'><select id='col3" + k + "' onFocus='Clear()'>"
		+ CreateSelectOptions(col3Ar) + "</select><i id='i_" + k +"' class='icon-remove' style='visibility: hidden'></i></div> </div>";
		
	}		
	
	// buttons
	html += "<div style='min-width:500px; height: 25px; display: block; clear: both; padding: 15px; border: 1px solid #aaa;  background: #ccc; vertical-align: middle; text-align: right'><button class='btn btn-info' type='button' onClick='CheckAnswers()'>Check Answers</button>"
		+"<button class='btn btn-info' type='button' onClick='ResetAnswers()'>Clear</button></div>";
	div.innerHTML = html;
}

function CreateSelectOptions(ar) {
	var list = "<option>select</option>";
	for (var i = 0; i < ar.length; i++) {
		list += "<option>" + ar[i] + "</option>"
	}
	
	return list
}

/********************* HELPER FUNCTIONS *****************/
function Clear() {
	$("i").css("visibility", "hidden");
}

function Randomize(array) {
	for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function ResetAnswers() {
	$("select").val('-1');
	Clear();
}

function CheckAnswers(){
	for (var key in tableInfo) {
		var col3 = $("#col3" + key + " option:selected").attr("value");  
		
		var col3_ans = tableInfo[key].desc;
		
		var correct = (col3==col3_ans);
		
		var chk = $("#i_" + key);
		chk.css("visibility", "visible");
	
		if (correct) {
			chk.attr("class", "icon-ok");
		} else {
			chk.attr("class", "icon-remove");
		}

	}
}

$(document).ready(function() {
	CreateTable();
});


