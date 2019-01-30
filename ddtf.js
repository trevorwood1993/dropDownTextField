/*
Made by Trevor Wood
github.com/trevorwood222
*/

if(typeof ddtf != 'function'){window.ddtf = function(){
	if ( typeof ddtf.init == 'undefined' ) {
		ddtf.init = true;
		ddtf.idCount = 0;
		ddtf.lists = [];
		setDocumentActions();
  }
  
	function createItem(
              listData, // Array - List of items
              options, // Array - 
              inputName, // String 
              inputPlaceholder, // String
              inputValue // String
            ){
		inputName == undefined ? inputName = "" : true;
		inputPlaceholder == undefined ? inputPlaceholder = "" : true;
		inputValue == undefined ? inputValue = "" : true;

		var id = ddtf.idCount++;
		var item = "";
		item += '<div data-ddtfid="'+id+'" class="ddtf">';
		item += 	'<div class="ddtf-main">';
		item += 		'<input name="'+inputName+'" placeholder="'+inputPlaceholder+'" type="text" value="'+inputValue+'">';
		item += 		'<div class="ddtf-bttn"><span></span></div>';
		item += 	'</div>';
		item += 	'<div class="ddtf-list">';
		item += 		'<ul>';
		for (var i = 0; i < listData.length; i++) {
			item += 	'<li>'+listData[i]+'</li>';
		}
		item += 		'</ul>';
		item += 	'</div>';
		item += '</div>';
	
		return {
			"id":id,
			"item":item
		}
	}
	
	function enableItemActions(
              id // Integer - elements id
            ){
		var item = $('.ddtf[data-ddtfid='+id+']');
		var button = item.find(".ddtf-bttn");
		var input = item.find("input");
		var list = item.find(".ddtf-list");
		
		button.on("click",function(){
			if(list.hasClass("open")){
				closeList(list);
			}else{
				openList(list,input);
			}
    });
    
    input.on("focus",function(){
      openList(list,input);
    });

    input.on("keyup",function(e){
      switch(e.which) {
        case 13: // enter
          return;
        case 38: // up
          return;
        case 40: // down
          return;
      }

      var val = $(this).val();
      var sel = list.find("li:first-of-type");
      list.find("li").each(function(){
        var text = $(this).text();
        if(text.includes(val)){
          sel = $(this);
          return false;
        }
      });
      list.find("li").removeClass("sel");
      sel.addClass("sel");
      scrollToSel(list,200);
    });
		
		list.find("li").on("click",function(){
			var text = $(this).text();
			input.val(text);
			closeList(list);
		});
		
  }
  
	function openList(
              list, // Element
              input // Element
            ){
		var val = input.val();

		var sel = list.find("li:first-of-type");
		list.find("li").each(function(){
			var text = $(this).text();
			if(text.includes(val)){
				sel = $(this);
				return false;
			}
		});

		list.addClass("open");
		list.find("li").removeClass("sel");
		setLiHover(list);

		sel.addClass("sel");
		scrollToSel(list,0);
  }
  
	function closeList(
              list // Element
            ){
		list.removeClass("open");
		unSetLiHover(list);
	}
	
	function setLiHover(
              list // element
            ){
		var li = list.find("li");
		li.on("mouseover",function(){
			li.removeClass("sel");
			$(this).addClass("sel");
		}).on("mouseout",function(){
			$(this).removeClass("sel");
		});
  }
  
	function unSetLiHover(
              list // Element
            ){
		var li = list.find("li");
		li.off("mouseover",function(){});
		li.off("mouseout",function(){});
	}
 
	function setSelText(
              list // Element
            ){
		var ddtf = list.closest(".ddtf");
		var selText = list.find("li.sel").text();
		ddtf.find("input").val(selText);
	}
	
	function moveSelected(
              list, // Element
              dir // String - "up" or "down"
            ){
		var li = list.find("li.sel");
		var moveSelLi;
		
		if(dir == "up"){
			moveSelLi = li.prev();
		}else{
			moveSelLi = li.next();
		}
		var newIndex = moveSelLi.parent().children().index(moveSelLi);
		
		if(newIndex == -1){
			if(dir == "up"){
				moveSelLi = list.find("li:last-of-type");
			}else{
				moveSelLi = list.find("li:first-of-type");
			}
		}
		
		li.removeClass("sel");
		moveSelLi.addClass("sel");
		scrollToSel(list);
		
	}
	function scrollToSel(
              list, // Element
              scrollSpeed // Integer 
            ){
    
    scrollSpeed == undefined ? scrollSpeed = 200 : "";

		var li = list.find("li.sel");
		var index = li.parent().children().index(li);
		var liHeight = li.height();
		var scrollPixels = (index+0)*liHeight;
		
    scrollPixels -= liHeight*2;
    
		list.stop();
		list.animate({
				scrollTop: scrollPixels
		}, scrollSpeed);
	}
	
	function setDocumentActions(){
		$(document).on("click",function(event){
			if($('.ddtf-list.open').length){
				$('.ddtf-list.open').each(function(){
					var item = $(this).closest(".ddtf");
					if(!$(event.target).closest(item).length){
						closeList($(this));
					}
				});
			}
		});
		$(document).keydown(function(e) {
			var list = $('.ddtf-list.open');
			
			if(!list.length){
				var focused = $(document.activeElement);
				var target = $('.ddtf');
				if(focused.parents(target).length && (e.which == 38 || e.which == 40)){
					var ddtf = focused.closest(target);
					var input = ddtf.find("input");
					var listOpen = ddtf.find(".ddtf-list");
					openList(listOpen,input);
					return;
				}
			}
			
			if(e.which == 9){// tab
				closeList(list);
				return;
			}
		
			switch(e.which) {
					case 13: // enter
						setSelText(list);
						closeList(list);
						break;
					case 38: // up
						moveSelected(list,"up");
						break;
					case 40: // down
						moveSelected(list,"down");
						break;
					default: 
						return; 
			}
			e.preventDefault(); 
		});
		
	}
	
	function itemAppend(
              element, // Element
              list, // Array 
              options, // Array
              inputName, // String
              inputPlaceholder, // String
              inputValue // String
            ){
		var res = ddtf().createItem(list,options,inputName,inputPlaceholder,inputValue);
		element.append(res.item);
		ddtf().enableItemActions(res.id);
	}

	// Drop down text field request
	function createDDTFR(
              classes, // String
              listName, // String
              inputName, // String
              inputPlaceholder, // String
              inputValue // String
            ){
		classes == undefined ? classes = "" : true;
		listName == undefined ? listName = "" : true;
		inputName == undefined ? inputName = "" : true;
		inputPlaceholder == undefined ? inputPlaceholder = "" : true;
		inputValue == undefined ? inputValue = "" : true;

		var data = '<div class="ddtf-r '+classes+'"';
		data += ' data-list="'+listName+'"';
		data += ' data-name="'+inputName+'"';
		data += ' data-ph="'+inputPlaceholder+'"';
		data += ' data-val="'+inputValue+'"';
		data += '></div>';
		return data;
	}
	
	function autoload(){
		$('.ddtf-r').each(function(){
			var listName = $(this).attr("data-list");
      var options = []
			var inputName = $(this).attr("data-name");
			var inputPlaceholder = $(this).attr("data-ph");
			var inputValue = $(this).attr("data-val");
      var list = ddtf.lists[listName];
			ddtf().itemAppend($(this),list,options,inputName,inputPlaceholder,inputValue);
			$(this).addClass('ddtf-f').removeClass('ddtf-r');
		});
	}

	return {
		createItem: createItem,
		enableItemActions: enableItemActions,
		itemAppend: itemAppend,
		createDDTFR: createDDTFR,
		autoload: autoload
	};
}}
//init
ddtf();



