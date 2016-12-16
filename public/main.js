$(document).ready(function() {

  // setup chai.assert ;
  var assert = chai.assert;
  var helpers = Rx.helpers;
  var domainSuffix = '.gomix.me' ; //'.hyperdev.space';
  
  window.getUserInput = function(what) {
    switch (what) {
      case 'url':
        return window.projectUrl;
      default:
        return '';
    }
  }

  var nextTest = 0;
  var activeTestSection = 0;
  // populate selector
  var selector = $('#APIType');
  APITests.forEach(function(t, i) {
    selector.append('<option value="' + i + '">' + challengeSection[i].name + '</option>');
  });
  populateLinks(0);
  selector.on('change', function() {
    activeTestSection = $('#APIType option:selected').val();
    populateLinks(activeTestSection);
  });

  $('#runTests').on('click', function(e) {
    runTest(nextTest, activeTestSection);
  });

  $('form').on('submit', function(e){e.preventDefault();});

  function setNextTest(res) {
    var l = $('#links > li');
    $('#links > li[value=' + nextTest + ']')
      .removeClass('waiting')
      .addClass(res ? 'pass' : 'fail');
    var n = nextTest;
    do {
      n++;
      if(l.length === n) n = 0;
    } while($('#links > li[value=' + n + ']').hasClass('pass') && n !== nextTest);

    if(!$('#links > li[value=' + n + ']').hasClass('pass')) {
      $('#links > li[value=' + n + ']').addClass('next-test');
      nextTest = n;
    } else {
      // no more tests -> RESET
      $('#runTests').attr('value','RESET').off('click');
      $('#runTests').on('click', function(e) {
        l.removeClass('pass fail current')
        nextTest = 0;
        $('#links > li[value=' + nextTest + ']').addClass('next-test');
        $('#runTests').off('click');
        $('#runTests').on('click', function(e) {
          runTest(nextTest, activeTestSection);
        }).attr('value','Next Test [*]');
      });
    }
  }
  

  function runTest(val, section) {
    nextTest = val;
    $('#links > li').removeClass('next-test current');
    var currentLink = $('#links > li[value=' + val + ']');
    currentLink.removeClass('pass fail').addClass('current');
    var text = currentLink.addClass('waiting').attr('title');
    var testString = APITests[section][text];

    // set the global projectUrl variable
    window.projectUrl = $('#url').val();
    $('#testResults').addClass('hidden');

    $('#loadingSpinner').removeClass('hidden');
    
    evalTest(text, testString).subscribe(
      t => {
        if(t.pass)
          return testSuccess(val)
        return testFailure(val, t)
      }
    )
  }

  
  function evalTest(text, testString){
    /** BERKELEY'S CODE HERE **/
    const newTest = { text, testString };
    let test;
    let __result;
    // debugger
    try {
      /* eslint-disable no-eval */
      // eval test string to actual JavaScript
      // This return can be a function
      // i.e. function() { assert(true, 'happy coding'); }
      test = eval(testString);
      /* eslint-enable no-eval */
      if (typeof test === 'function') {

        // we know that the test eval'ed to a function
        // the function could expect a callback
        // or it could return a promise/observable
        // or it could still be sync
        if (test.length <= 1) {
          // a function with length 1 means it expects 0 args
          // We call it and store the result
          // This result may be a promise or an observable or undefined
          __result = test(window.getUserInput);
        } else {
          // if function takes arguments
          // we expect it to be of the form
          // function(cb) { /* ... */ }
          // and callback has the following signature
          // function(err) { /* ... */ }
          __result = Rx.Observable.fromNodeCallback(test)(); // <= parentheses added here !!
        }

        if (helpers.isPromise(__result)) {
          // turn promise into an observable
          __result = Rx.Observable.fromPromise(__result);
        }
      } else {
        // test is not a function
        // fill result with for compatibility
        __result = Rx.Observable.of(null);
      }
    } catch (e) {
      // something threw an uncaught error
      // we catch here and wrap it in an observable
      __result = Rx.Observable.throw(e);
    }
    return __result
      .map(() => {
        // we don't need the result of a promise/observable/cb here
        // all data asserts should happen further up the chain
        // mark test as passing
        newTest.pass = true;
        return newTest;
      })
      .catch(err => {
        // we catch the error here to prevent the error from bubbling up
        // and collapsing the pipe
        newTest.err = err.message + '\n' + err.stack;
        // RxJS catch expects an observable as a return
        return Rx.Observable.of(err);
      });
      
    /** END BERKELEY'S CODE **/
  };

  function populateLinks(val) {
    $('#url').val('https://' + challengeSection[val].defaultPrj + domainSuffix);
    $('#testResults').addClass('hidden');
    var keys = Object.keys(APITests[val]);
    var ul = $('#links');
    ul.empty();
    nextTest = 0;
    keys.forEach(function(k, i) {
      var n = i === nextTest ? 'class="next-test" ' : '';
      ul.append('<li value="' + i + '" ' + n + 'title="' + k + '" >'
        + (i+1) + '.' + k + '</li>' );
    });
    $('#links > li').on('click', function(e){
      runTest(e.target.value, activeTestSection);
    });
  }

  function getResultPanel(outcome, err) {
    var result = outcome ? "passed" : "failed";
    $('#loadingSpinner').addClass('hidden');
    $('#testResults').html('<article class="test ' + result + '" >\
    <h3>' + result + '</h3>\
    <p>' + (err || "") + '</p>\
    </article>');
    $('#testResults').removeClass('hidden');
  }

  function testSuccess(val) {
    setNextTest(true, val);
    getResultPanel(true);
  }

  function testFailure(val, err) {
    getResultPanel(false, err);
    setNextTest(false, val);
  }
});
