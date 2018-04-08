# dropDownTextField
https://jsfiddle.net/frogg616/eqcw1m9n/147/
html input with drop down text


##Usage
1. Include both .min files in your project 
    "<link rel="stylesheet" type="text/css" href="/path/ddtf.min.css">"
    "<script src="/path/ddtf.min.js"</script>"
2. Include jQuery "<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>"
3. Set element and data, then call methods
```javascript
var element = $('body');
var data = [1,2,3,4,5];
ddtf().itemAppend(element,data);
```
    
You can also call methods independently if you'd like to do something other than append
```javascript
var element = $('body');
var data = [1,2,3,4,5];
var res = ddtf().createItem(data);
element.append(res.item);
ddtf().enableItemActions(res.id);
```
