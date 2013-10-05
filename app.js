function randomArrayElement(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
    
function tablestuff(data, tabletop) {
  var button = document.getElementById('generate'),
      rumour = document.getElementById('rumour');
          
  function generate() {
    var phrase = randomArrayElement(data.Phrase.elements).phrase,
        aside = randomArrayElement(data.Aside.elements).aside,
        replacer = function(match, key) {
          if(key) {
            var column = key.toLowerCase(), row;
            if(key.indexOf('-') > -1) {
              var tmp = key.split('-');
              key = tmp[0];
              row = randomArrayElement(data[key].elements);
              var result = row[tmp[1].toLowerCase()];
              if(result && result.length > 0) {
                return result;
              } else {
                column = key.toLowerCase();
              }
            } else {
              row = randomArrayElement(data[key].elements);
            }
            return row[column];
          } else {
            return 'ERROR';
          }
        };
     
    var p = phrase.replace(/\%([A-Za-z\-]+)\%/g, replacer);
    var a = aside.replace(/\%([A-Za-z\-]+)\%/g, replacer);
    rumour.innerHTML = capitaliseFirstLetter(p) + '. ' + a + '.';
  };
  
  button.onclick = generate;
  generate();
}
    
Tabletop.init( { 
  key: '0AuER3PNq5JgBdEsxTlJIZjhpRHJqZkJudkE0eUpEM1E',
  callback: tablestuff,
  simpleSheet: false,
  parameterize: 'http://darkliquid.co.uk/playground/numenera/rumours/proxy.php?url='
});
