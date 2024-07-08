/**Reads content from table and creates a select dropdown activity
 * - Unique select options are created per column `<td>`, excluding class="_static"
 * - `<th>` and `<td>` of class="_static" are shown
 */
$(document).ready(function() {
	
	
	CreateDDMatching();

	/** Set up UI elems for dropdown matching activity 
	 * The container elem is #ddMatching
	*/
	function CreateDDMatching() {
		const $div = $("<div id='ddMatching'></div>");
		$("body").append($div);			

		$div.append($("table"));

		// buttons
		const $uibtns = UI_createBns();
		$div.append($uibtns);

		UI_CreateSelects();			
	}

	/** @returns $container div with UI buttons */
	function UI_createBns() {
		const $container = $("<div class='ui-btn-container'></div>");
		const $btn_checkAns = $("<button id='check-ans' class='btn btn-info' type='button'>Check Answers</button>");
		const $btn_reset = $("<button  id='reset-ans' class='btn btn-info' type='button'>Clear</button>");

		// bind events
		$btn_checkAns.click(function(){CheckAnswers()});
		$btn_reset.click(function(){ResetAnswers()})
		
		$container.append($btn_checkAns, $btn_reset);
		return $container;
	}

	/** Replaces td content with dropdown select and icon,  
	 * if corresponding th not '._static' class
	*/
	function UI_CreateSelects() {
		// get th not _static class
		let $ths = $("th._ddm");

		if ($ths.length==0) {
			//console.log($ths);
			//"if no th marked as class _static, then replace only the last column"
			$ths = $("th:last");
		}

		$ths.each( (n,th) => {	
			
			const colindex = $(th).index()+1;
			const $colntds = $("table tr td:nth-child(" + colindex + ")");
			let selOptions = [];

			$colntds.each((i,td) => {
				selOptions.push($(td).text().replace(/\n */g, "").trim());
			});
			
			// order, only unique values
			//selOptions = Randomize(selOptions);
			let uniqueRandom = Array.from(new Set(selOptions.sort()));//console.log(new Set(selOptions), selOptions);

			// replace td content with select component
			$colntds.each((i,td) => {
				const txt = $(td).text().replace(/\n */g, "").trim();
				/* Bootstrap class styles and funtionality */
				const $select = $('<select class="selectpicker form-control">').data("ans", txt);
				const $options = UI_CreateSelectOptions(uniqueRandom);
				
				$select.append($options);
				$select.click(function(){Clear()});

				// replace td content with select
				$(td).html($select);
				
			});

		});
		
		// add bootstrap class 'selectpicker' to select
        $('select').selectpicker('data-width', 'fit');
		$('.dropdown').on('click', function(){Clear()});
	}

	function UI_CreateSelectOptions(ar) {
		let list = "<option>select</option>";
		for (let i = 0; i < ar.length; i++) {
			const txt = ar[i];
			list += '<option data-content="' + txt +'" title="' + txt + '">' + txt + '</option>';
		}
		
		return list
	}

	/********************* HELPER FUNCTIONS *****************/
	function Randomize(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	/********************* EVENT HANDLERS *****************/
	function Clear() {
		$("i").remove();
	}
	
	function ResetAnswers() {
		$("select").val('-1');
		Clear();
	}

	function CheckAnswers(){
		const $selects = $("select");
		// using bootstrap icon css
		Clear();

		$selects.each(function(i,sel){
			const $fb_icon_right = $('<i class="glyphicon glyphicon-ok"></i>');
			const $fb_icon_wrong = $('<i class="glyphicon glyphicon-remove"></i>');
			
			const selected = $(sel).find(":selected").text();
			const ans = $(sel).data("ans");
			
			if(selected == ans) {
				$(sel).after($fb_icon_right);
			}else{
				$(sel).after($fb_icon_wrong);
			}
		});
	}
});


