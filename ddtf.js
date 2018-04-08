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
        item += 	'<li>'+data[i]+'</li>';
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
      
        var focused = $(document.activeElement);
        var target = $('.ddtf');
        focused.addClass("hi");
        if(focused.parents(target).length){
          var ddtf = focused.closest(target);
          var listOpen = ddtf.find(".ddtf-list");
          openList(listOpen);
        }
      
        var list = $('.ddtf-list.open');
      	if(!list.length){
        	return;
        }
      
        switch(e.which) {
            case 13: // up
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


/*
example usage
*/
var data = [
 	"12:00am","12:30am",
  "1:00am","1:30am",
  "2:00am","2:30am",
  "3:00am","3:30am",
  "4:00am","4:30am",
  "5:00am","5:30am",
  "6:00am","6:30am",
  "7:00am","7:30am",
  "8:00am","8:30am",
  "9:00am","9:30am",
  "10:00am","10:30am",
  "11:00am","11:30am",
  "12:00pm","12:30pm",
  "1:00pm","1:30pm",
  "2:00pm","2:30pm",
  "3:00pm","3:30pm",
  "4:00pm","4:30pm",
  "5:00pm","5:30pm",
  "6:00pm","6:30pm",
  "7:00pm","7:30pm",
  "8:00pm","8:30pm",
  "9:00pm","9:30pm",
  "10:00pm","10:30pm",
  "11:00pm","11:30pm",
];

var data2 = [
 	"0:00","0:30",
  "1:00","1:30",
  "2:00","2:30",
  "3:00","3:30",
  "4:00","4:30",
  "5:00","5:30",
  "6:00","6:30",
  "7:00","7:30",
  "8:00","8:30",
  "9:00","9:30",
  "10:00","10:30",
  "11:00","11:30",
  "12:00","12:30",
  "13:00","13:30",
  "14:00","14:30",
  "15:00","15:30",
  "16:00","16:30",
  "17:00","17:30",
  "18:00","18:30",
  "19:00","19:30",
  "20:00","20:30",
  "21:00","21:30",
  "22:00","22:30",
  "23:00","23:30",
];


$('.foo').on("click",function(){
  var element = $('body');
  ddtf().itemAppend(element,data);
});
ddtf().itemAppend($('body'),data);












