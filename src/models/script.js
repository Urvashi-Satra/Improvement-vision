// initialize variables
var random;
var selection;
var string = "";
var colour = "";
// quotes must not be duplicated until they have all been used
// so first, initialize array of used random numbers
var usedRandomNumbers = [];
// next, initialize counter that will track when all quotes have been used
var counter = 0;



// this function will increase counter and reset once all quotes have been used
function trackUsed() {
  counter += 1;
  // if all quotes have been used once, reset array of used numbers
  if (counter === quotes.length) {
     usedRandomNumbers.length = 0;
     counter = 0;
  }
}

// this code will randomly change the background colour
// first, this function creates random values
function rgbRandom() {
  return Math.floor(Math.random() * 256);
}
// next, create string and add to html
function colourChange() {
  colour = 'rgb(' + rgbRandom() + ',' + rgbRandom() + ',' + rgbRandom() + ')';
  document.getElementById("colour").style.backgroundColor = colour;
}


/* this function will select a random quote object from array,
  then test to see whether quote has been used,
  then return quote object */
function getRandomQuote() {

  // generate random number between 0 and total number of values in array
    random = Math.floor(Math.random() * quotes.length);
      // if number has not been used already, add it to used numbers and return random quote
      if (usedRandomNumbers.indexOf(random) === -1) {
          usedRandomNumbers.push(random);
          trackUsed();
          return quotes[random];
      // if it has been used, generate random numbers until you get a new one
      } else {
          while (usedRandomNumbers.indexOf(random) > -1) {
            random = Math.floor(Math.random() * quotes.length);
          }
          // then add it to used numbers and return random quote
          usedRandomNumbers.push(random);
          trackUsed();
          return quotes[random];
      }
}

// this function adds the selected quote to the page and calls colourChange
function printQuote() {
  // call colourChange
  colourChange();
  // call getRandomQuote, store the returned quote object in a variable
  selection = getRandomQuote();
  // construct a string using the different properties of the quote object
  string = "";
  string += '<p class="quote">' + selection.quote + '</p>';
 
  string += '</p>';

  // display final HTML string to the page
  document.getElementById('quote-box').innerHTML = string;
}


document.getElementById('loadQuote').addEventListener("click", printQuote, false);

window.setInterval(printQuote, 30000);
