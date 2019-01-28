# dropDownTextField
https://jsfiddle.net/frogg616/eqcw1m9n/187/ 

HTML input with drop down text for easy selecting


## Usage
1. Include both ddtf.css and ddtf.js
2. Include jQuery "<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>"
3. Set data in `ddtf.lists` i.e. `ddtf.lists['nameOfTheArray'] = yourArrayList`

Placing a div before hand
```html
<div class="ddtf-r" data-list="times"></div>
<script>
ddtf().autoload();
</script>
```

Creating it with JavaScript then appending
```html
<div class="createDDTFR-example"></div>
<script>
var element = ddtf().createDDTFR(
                        "classes anyclass you might have", // classes - String
                        "times", // listName - String
                        "bar", // inputName - String
                        "bar placeholder", // inputPlaceholder - String
                        "" // inputValue - String
                      );
  $('.createDDTFR-example').append(element);
  ddtf().autoload(); 
</script>
```

Create and append all in one go
```javascript
var element = $('body');
    ddtf().itemAppend(element,ddtf.lists['times']);
```

You can also call methods independently if you'd like to do something other than append
```javascript
var result = ddtf().createItem(
              listData, // Array - List of items
              options, // Array - 
              inputName, // String 
              inputPlaceholder, // String
              inputValue // String
            );
element.append(result.item);
ddtf().enableItemActions(result.id);
```




