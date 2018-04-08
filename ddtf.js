/*
Made by Trevor Wood
github.com/trevorwood1993
*/

if(typeof ddtf != 'function'){
  window.ddtf = function(){
  	if ( typeof ddtf.init == 'undefined' ) {
      ddtf.init = true;
  		ddtf.idCnt = 0;
      setDocumentActions();
  	}
    
   	function createItem(listData){
      var id = ddtf.idCnt++;
      var item = "";
      item += '<div data-ddtfid="'+id+'" class="ddtf">';
      item += 	'<div class="ddtf-main">';
      item += 		'<input type="text">';
      item += 		'<div class="ddtf-bttn"></div>';
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
    
    function enableItemActions(id){
      var item = $('.ddtf[data-ddtfid='+id+']');
      var button = item.find(".ddtf-bttn");
      var input = item.find("input");
      var list = item.find(".ddtf-list");
      
      button.on("click",function(){
      	if(list.hasClass("open")){
        	closeList(list);
        }else{
        	openList(list);
        }
      });
      
      list.find("li").on("click",function(){
      	var text = $(this).text();
        input.val(text);
        closeList(list);
      });
    	
  	}
    function openList(list){
      list.addClass("open");
      setLiHover(list);
    }
    function closeList(list){
			list.removeClass("open");
      unSetLiHover(list);
    }
    
    function setLiHover(list){
    	var li = list.find("li");
      li.on("mouseover",function(){
        li.removeClass("sel");
      	$(this).addClass("sel");
      }).on("mouseout",function(){
      	$(this).removeClass("sel");
      });
    }
    function unSetLiHover(list){
    	var li = list.find("li");
      li.off("mouseover",function(){});
      li.off("mouseout",function(){});
    }
   
    function setSelText(list){
    	var ddtf = list.closest(".ddtf");
      var selText = list.find("li.sel").text();
      ddtf.find("input").val(selText);
    }
    
    function moveSelected(list,dir){
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
    function scrollToSel(list){
    	var li = list.find("li.sel");
      var index = li.parent().children().index(li);
      var liHeight = li.height();
      var scrollPixels = (index+0)*liHeight;
      
      scrollPixels -= liHeight*2;
      
      list.stop();
      list.animate({
          scrollTop: scrollPixels
      }, 200);
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
          focused.addClass("hi");
          if(focused.parents(target).length && (e.which == 38 || e.which == 40)){
            var ddtf = focused.closest(target);
            var listOpen = ddtf.find(".ddtf-list");
            openList(listOpen);
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
            	console.log(e.which);
            	return; 
        }
        e.preventDefault(); 
      });
      
    }
    
    function itemAppend(element,data){
    	var res = ddtf().createItem(data);
      element.append(res.item);
      ddtf().enableItemActions(res.id);
    }
    
   	return {
    	createItem: createItem,
      enableItemActions: enableItemActions,
      itemAppend: itemAppend
   	};
	}
}
