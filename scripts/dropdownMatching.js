/**Reads content from 2-column table and creates a select dropdown activity
 * - Column one contains the question, column 2 contains the answer
 * - Select Options are created from all unique column 2 text
 */
$(document).ready(function() {
	
	/**Reads table in body and creates tableInfo object 
	 * @returns object {i: {info: string, desc: string},..}
	 * 
	*/
	function GetTableInfo() {
		let data = {};
		$("tbody tr").each(function(i, el){ 
			let col1 = $(el).find("td:first").text().trim(),
				col2 = $(el).find("td:last").text().trim();
				data[i] = {info: col1, desc: col2}
			//console.log(i, $(el).text());
		});
		return data;
	}
	
	CreateDDMatching(GetTableInfo());

	/**Create data from tableInfo
	 * @param obect tableInfo 
	 */
	function CreateDDMatching(tableInfo) {
		let $div = $("<div id=ddMatching class=dd-matching></div>");
		let html = "", col1Ar = [], col2Ar = [];
	
		for (let key in tableInfo) {
			col1Ar.push(key +"_"+tableInfo[key].info);
			col2Ar.push(tableInfo[key].desc);
		}
		
		//randomize column 2 values
		col1Ar = Randomize(col1Ar);
		
		for (let i = 0; i < col1Ar.length; i++) {
			let k = col1Ar[i].split("_")[0];
			let text = col1Ar[i].split("_")[1];
			
			// create row
			html += "<div class='ddm-row'>"
			+ "<div id='col1" + k + "' class='ddm-col1'>" + text +"</div>"
			+ "<div class='ddm-col2'><select id='col2" + k + "'>"
			+ CreateSelectOptions($.unique(col2Ar)) + "</select><i id='i_" + k +"' class='icon-remove' style='visibility: hidden'></i></div> </div>";
			
		}		
		
		// buttons
		html += "<div style='min-width:500px; height: 25px; display: block; clear: both; padding: 15px; border: 1px solid #aaa;  background: #ccc; vertical-align: middle; text-align: right'><button id='check-ans' class='btn btn-info' type='button'>Check Answers</button>"
			+"<button  id='reset-ans' class='btn btn-info' type='button'>Clear</button></div>";
		$div.html(html);

		$( "body" ).append($div);
		$("table").remove();

		// bind events
		$("#check-ans").click(function(){CheckAnswers(tableInfo)});
		$("#reset-ans").click(function(){ResetAnswers()})
		$("select").click(function(){Clear()});
	}

	function CreateSelectOptions(ar) {
		let list = "<option>select</option>";
		for (let i = 0; i < ar.length; i++) {
			list += "<option>" + ar[i] + "</option>"
		}
		
		return list
	}

	/********************* HELPER FUNCTIONS *****************/
	function Clear() {
		$("i").css("visibility", "hidden");
	}

	function Randomize(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	function ResetAnswers() {
		$("select").val('-1');
		Clear();
	}

	function CheckAnswers(tableInfo){
		for (let key in tableInfo) {
			let col2 = $("#col2" + key + " option:selected").attr("value").replace(/(?:\r\n|\r|\n| )/g, '');  			
			let col2_ans = tableInfo[key].desc.replace(/(?:\r\n|\r|\n| )/g, '');
			let correct = (col2==col2_ans); console.log(col2); console.log(col2_ans);
			let chk = $("#i_" + key);
			chk.css("visibility", "visible");
		
			if (correct) {
				chk.attr("class", "icon-ok");
			} else {
				chk.attr("class", "icon-remove");
			}

		}
		//console.log(tableInfo);
	}
});


