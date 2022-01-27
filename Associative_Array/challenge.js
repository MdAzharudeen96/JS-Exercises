function parseMe() {
    var textOnly = document.getElementsByClassName("parseme")[0].textContent;
    var trimmedText = textOnly.trim().toLowerCase().replace(/[\.,!?]/g, '');
    console.log(trimmedText);
    var arrayTest = trimmedText.split(' ').sort();
    console.log("length of array" + arrayTest.length);
    
    /*arrayTest.forEach(function(elem) {
      console.log(elem);
    });*/
    return arrayTest;
  }
  
  function countWords(arrayOfWords) {
    var word, tallyOfWords = {}, sortedWords = [];
  
    if (arrayOfWords.length) {
      // Create a hashmap of word tally counts
      arrayOfWords.forEach(function(word) {
        tallyOfWords[word] = tallyOfWords[word] || 0;
        tallyOfWords[word]++;
      });
    }
    
    // Loop thru associative array
    for (sWord in tallyOfWords) {
      // sort
      sortedWords.push({
        word: sWord,
        count: tallyOfWords[sWord]
      });
    }
   
    sortedWords.sort(function(a,b) {
      return a.count < b.count ? true : false;
    });
    
    return sortedWords;
  }
  
  var results,
  words = parseMe();
  results = countWords(words);
  
  results.forEach(function(result) {
    console.log("word: " + result.word + " count: " + result.count);
  })
  