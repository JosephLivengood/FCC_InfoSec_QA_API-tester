'use strict'

var APIPrefix = '/_api';
var challengeSection = [
  /*{
    name: 'npm - package.json',
    defaultPrj : 'red-moose'
  }, {
    name: 'node - express',
    defaultPrj : 'west-horse'
  }, {
    name: 'mongo - mongoose',
    defaultPrj : 'trite-organ'
  }, {
    name: 'infosec - helmet',
    defaultPrj: 'rust-ninja'
  }, {
    name: 'QA tests basic',
    defaultPrj: 'time-shape'
  }, {
    name: 'Advanced Express',
    defaultPrj: 'luminous-dart'
  },{
    name : 'MS1 - timestamp',
    defaultPrj: 'curse-arrow'
  }, {
    name : 'MS2 - header parser',
    defaultPrj: 'dandelion-roar'
  }, {
    name : 'MS3 - url shortener',
    defaultPrj: 'thread-paper'
  }, {
    name: 'MS4 - image search',
    defaultPrj: 'evening-bane'
  },{
    name : 'MS5 - file metadata',
    defaultPrj: 'purple-paladin'
  },{
    name : 'MS6 - exercise tracker',
    defaultPrj: 'nonstop-pond'
  },*/
  {
    name : 'ISQA_1 - Personal Library',
    defaultPrj: 'spark-cathedral'
  }
];


var APITests = [
  /*{
    // npm - package.json - DONE
   // "test - valid sync assertion" : "assert('ok', 'test not working')",
    // "test - invalid sync assertion test" : "assert(false, 'Invalid assertion test OK')",
    "author" : "getUserInput => ($.get(getUserInput('url') + '/_api/package.json').then(data => { var packJson = JSON.parse(data); assert(packJson.author, 'no author field'); }, xhr => { throw new Error(xhr.statusText); }).promise())",
    "description" : "getUserInput => $.get(getUserInput('url') + '/_api/package.json').then(data => { var packJson = JSON.parse(data); assert(packJson.description, 'no description field'); }, xhr => { throw new Error(xhr.statusText); })",
    "version" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert(packJson.version, 'no version field'); }).promise())",
    "license" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert(packJson.license, 'no license field'); }).promise())",
    "keywords" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert(packJson.keywords , 'no keywords field'); }).promise())",
    "keywords isArray" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.isArray(packJson.keywords); }).promise())",
    "keywords include freecodecamp" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.include(packJson.keywords, 'freecodecamp'); }).promise())",
    "deps-include-moment" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.property(packJson.dependencies, 'moment'); }).promise())",
    "moment 2.14.0" :  "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.match(packJson.dependencies.moment, /^[\\^\\~]?2\\.14\\.0/); }).promise())",
    "moment old version 2.10.2" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.match(packJson.dependencies.moment, /^[\\^\\~]?2\\.10\\.2/); }).promise())",
    "moment tilde ~2.10.x" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.match(packJson.dependencies.moment, /^\\~2\\.10\\./); }).promise())",
    "moment caret ^2.x.x" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.match(packJson.dependencies.moment, /^\\^2\\./); }).promise())",
    "deps not include moment" : "() => ($.get(window.projectUrl + '/_api/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.notProperty(packJson.dependencies, 'moment'); }).promise())"
  }, {
    // basic node-express - DONE
    /** latest test format => **//* "hello console" : "getUserInput => $.get(getUserInput('url') + '/_api/hello-console').then(data => { assert.isTrue(data.passed, '\"Hello World\" should be in the console'); }, xhr => { throw new Error(xhr.responseText); })",
    "first working server - get 'Hello Express'" : "getUserInput => $.get(getUserInput('url')).then(function(data){ assert.equal(data, 'Hello Express') }, xhr => { throw new Error(xhr.responseText); })",
    "serve html" : "getUserInput => $.get(getUserInput('url')).then(function(data){ assert.match(data, /<h1>.*<\\/h1>/); }, xhr => { throw new Error(xhr.responseText); })",
    "serve static assets - public/style.css" : "getUserInput => $.get(getUserInput('url') + '/style.css').then(function(data){ assert.match(data, /body\\s*\\{[^\\}]*\\}/); }, xhr => { throw new Error(xhr.responseText); })",
    "GET /json -> {message: 'Hello json'}" : "() => ($.get(window.projectUrl + '/json').then(function(data){ assert.equal(data.message, 'Hello json'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "use .env vars" : "() => ($.get(window.projectUrl + '/_api/use-env-vars').then(function(data){ assert.isTrue(data.passed, 'the JSON response should change setting the env MESSAGE_STYLE'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "logger MWare" : "() => ($.get(window.projectUrl + '/_api/root-middleware-logger').then(function(data){ assert.isTrue(data.passed, 'the logger middleware should be mounted'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "GET /now stackLength == 2" : "() => ($.get(window.projectUrl + '/_api/chain-middleware-time').then(function(data){ assert.equal(data.stackLength, 2, 'route /now should have middleware mounted'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "GET /now => current time +/- 20s" : "() => ($.get(window.projectUrl + '/_api/chain-middleware-time').then(function(data){ var now = new Date(); assert.isAtMost(Math.abs(new Date(data.time) - now), 20000); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "GET /ech0-t3st/echo => { echo: 'ech0-t3st' }" : "() => ($.get(window.projectUrl + '/ech0-t3st/echo').then(function(data){ assert.equal(data.echo, 'ech0-t3st') }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "GET /name?last=Richards&first=Keith => { name: 'Keith Richards' }" : "() => ($.get(window.projectUrl + '/name?last=Richards&first=Keith').then(function(data){ assert.equal(data.name, 'Keith Richards') }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "mount body-parser" : "() => ($.get(window.projectUrl + '/_api/add-body-parser').then(function(data){ assert.isAbove(data.mountedAt, 0) }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "POST /name " : "() => ($.post(window.projectUrl + '/name', {first: 'Mick', last: 'Jagger'}).then(function(data){ assert.equal(data.name, 'Mick Jagger') }, xhr => { throw new Error(xhr.responseText); }).promise())"
  }, {
    // mongodb-mongoose - /** NEW FORMAT HERE !!! **/ /*
    "mongodb installed" : "getUserInput => $.get(getUserInput('url') + '/_api/file/package.json').then(function(data){ var packJson = JSON.parse(data); assert.property(packJson.dependencies, 'mongodb'); }, xhr => { throw new Error(xhr.responseText); })",
    "mongoose installed" : "getUserInput => ($.get(getUserInput('url') + '/_api/file/package.json').then(function(data){ var packJson = JSON.parse(data); assert.property(packJson.dependencies, 'mongoose'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "mongoose schema": "getUserInput => ($.post(getUserInput('url') + '/_api/mongoose-model', {name: 'Mike', age: 28, favoriteFoods: ['pizza', 'cheese']}).then(data => { assert.equal(data.name, 'Mike', '\"model.name\" is not what expected'); assert.equal(data.age, '28', '\"model.age\" is not what expected'); assert.isArray(data.favoriteFoods, '\"model.favoriteFoods\" is not an Array'); assert.include(data.favoriteFoods, 'pizza', '\"model.favoriteFoods\" does not include the expected items'); assert.include(data.favoriteFoods, 'cheese', '\"model.favoriteFoods\" does not include the expected items'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "create and save" : "getUserInput => ($.get(getUserInput('url') + '/_api/create-and-save-person').then(data => { assert.isString(data.name, '\"model.name\" should be a String'); assert.isNumber(data.age, '28', '\"model.age\" should be a Number'); assert.isArray(data.favoriteFoods, '\"model.favoriteFoods\" should be an Array'); assert.equal(data.__v, 0, 'The db item should be not previously edited'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "create many": "getUserInput => ($.ajax({url: getUserInput('url') + '/_api/create-many-people', type: 'POST', contentType:'application/json', data: JSON.stringify([{name: 'John', age: 24, favoriteFoods: ['pizza', 'salad']}, {name: 'Mary', age: 21, favoriteFoods: ['onions', 'chicken']}])}).then(data => { assert.isArray(data, 'the response should be an array'); assert.equal(data.length, 2, 'the response does not contain the expected number of items'); assert.equal(data[0].name, 'John', 'The first item is not correct'); assert.equal(data[0].__v, 0, 'The first item should be not previously edited'); assert.equal(data[1].name, 'Mary', 'The second item is not correct'); assert.equal(data[1].__v, 0, 'The second item should be not previously edited'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "find all by name" : "getUserInput => ($.post(getUserInput('url') + '/_api/find-all-by-name', {name: 'r@nd0mN4m3', age: 24, favoriteFoods: ['pizza']}).then(data => { assert.isArray(data, 'the response should be an Array');  assert.equal(data[0].name, 'r@nd0mN4m3', 'Model.name is not what expected'); assert.equal(data[0].__v, 0, 'The item should be not previously edited'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "find one by food": "getUserInput => ($.post(getUserInput('url') + '/_api/find-one-by-food', {name: 'Gary', age: 46, favoriteFoods: ['chicken salad']}).then(data => { assert.equal(data.name, 'Gary', 'item.name is not what expected'); assert.deepEqual(data.favoriteFoods, ['chicken salad'], 'item.favoriteFoods is not what expected'); assert.equal(data.__v, 0, 'The item should be not previously edited'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "find by id": "getUserInput => ($.get(getUserInput('url') + '/_api/find-by-id').then(data => { assert.equal(data.name, 'test', 'item.name is not what expected'); assert.equal(data.age, 0, 'item.age is not what expected'); assert.deepEqual(data.favoriteFoods, ['none'], 'item.favoriteFoods is not what expected'); assert.equal(data.__v, 0, 'The item should be not previously edited'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "find-edit-update": "getUserInput => ($.post(getUserInput('url') + '/_api/find-edit-save', {name:'Poldo', age: 40, favoriteFoods:['spaghetti']}).then(data => { assert.equal(data.name, 'Poldo', 'item.name is not what expected'); assert.equal(data.age, 40, 'item.age is not what expected'); assert.deepEqual(data.favoriteFoods, ['spaghetti', 'hamburger'], 'item.favoriteFoods is not what expected'); assert.equal(data.__v, 1, 'The item should be previously edited'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "findOneAndUpdate age": "getUserInput => ($.post(getUserInput('url') + '/_api/find-one-update', {name:'Dorian Gray', age: 35, favoriteFoods:['unknown']}).then(data => { assert.equal(data.name, 'Dorian Gray', 'item.name is not what expected'); assert.equal(data.age, 20, 'item.age is not what expected'); assert.deepEqual(data.favoriteFoods, ['unknown'], 'item.favoriteFoods is not what expected'); assert.equal(data.__v, 0, 'findOneAndUpdate does not increment version'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "delete by Id": "getUserInput => ($.post(getUserInput('url') + '/_api/remove-one-person', {name:'Jason Bourne', age: 36, favoriteFoods:['apples']}).then(data => { assert.equal(data.name, 'Jason Bourne', 'item.name is not what expected'); assert.equal(data.age, 36, 'item.age is not what expected'); assert.deepEqual(data.favoriteFoods, ['apples'], 'item.favoriteFoods is not what expected'); assert.equal(data.__v, 0); assert.equal(data.count, 0, 'the db items count is not what expected'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "delete many by name": "getUserInput => ($.ajax({url: getUserInput('url') + '/_api/remove-many-people', type: 'POST', contentType:'application/json', data: JSON.stringify([{name: 'Mary', age: 16, favoriteFoods: ['lollipop']}, {name: 'Mary', age: 21, favoriteFoods: ['steak']}])}).then(data => { assert.isTrue(!!data.ok, 'The mongo stats are not what expected'); assert.equal(data.n, 2, 'The number of items affected is not what expected'); assert.equal(data.count, 0, 'the db items count is not what expected'); }, xhr => { throw new Error(xhr.responseText); }).promise())",
    "chain query helpers": "getUserInput => ($.ajax({url: getUserInput('url') + '/_api/query-tools', type: 'POST', contentType:'application/json', data: JSON.stringify([{name: 'Pablo', age: 26, favoriteFoods: ['burrito', 'hot-dog']}, {name: 'Ashley', age: 32, favoriteFoods: ['steak', 'burrito']}, {name: 'Mario', age: 51, favoriteFoods: ['burrito', 'prosciutto']}])}).then(data => { assert.isArray(data, 'the response should be an Array'); assert.equal(data.length, 2, 'the data array length is not what expected'); assert.notProperty(data[0], 'age', 'The returned first item has too many properties'); assert.equal(data[0].name, 'Ashley', 'The returned first item name is not what expected'); assert.notProperty(data[1], 'age', 'The returned second item has too many properties'); assert.equal(data[1].name, 'Mario', 'The returned second item name is not what expected');}, xhr => { throw new Error(xhr.responseText); }).promise())",

  }, {
    // Infosec with Helmet - DONE
    "helmet installed" : "() => ($.get(window.projectUrl + '/_api/file/package.json').then(function(data){ var packJson = JSON.parse(data);     assert.property(packJson.dependencies, 'helmet'); }).promise())",
    "hidePoweredBy mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'hidePoweredBy'); assert.notEqual(data.headers['x-powered-by'], 'Express')}).promise())",
    "frameguard mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'frameguard'); }).promise())",
    "frameguard set to DENY" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.property(data.headers, 'x-frame-options'); assert.equal(data.headers['x-frame-options'], 'DENY');}).promise())",
    "xssFilter mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'xXssProtection'); assert.property(data.headers, 'x-xss-protection'); }).promise())",
    "noSniff mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'nosniff'); assert.equal(data.headers['x-content-type-options'], 'nosniff'); }).promise())",
    "ieNoOpen mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'ienoopen'); assert.equal(data.headers['x-download-options'], 'noopen'); }).promise())",
    "hsts mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'hsts'); assert.property(data.headers, 'strict-transport-security'); }).promise())",
    "hsts max-age=7776000 (90 days)" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.equal(data.headers['strict-transport-security'], 'max-age=7776000'); }).promise())",
    "dnsPrefetchControl mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'dnsPrefetchControl'); assert.equal(data.headers['x-dns-prefetch-control'], 'off'); }).promise())",
    "noCache mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'nocache'); assert.equal(data.headers['cache-control'], 'no-store, no-cache, must-revalidate, proxy-revalidate'); }).promise())",
    "csp mounted" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){ assert.include(data.appStack, 'csp'); }).promise())",
    "csp config ok" : "() => ($.get(window.projectUrl + '/_api/app-info').then(function(data){\
      var cspHeader = Object.keys(data.headers).filter(function(k){ return k === 'content-security-policy' || k === 'x-webkit-csp' || k === 'x-content-security-policy' })[0];\
      assert.equal(data.headers[cspHeader], \"default-src 'self'; script-src 'self' trusted-cdn.com\"); }).promise())"
  }, {
    // QA-tests / mocha-chai DONE
    "U0 - #isNull" : "() => ($.get(window.projectUrl + '/_api/get-tests?type=unit&n=0').then(function(data){assert.equal(data.state, 'passed');  assert.equal(data.assertions[0].method, 'isNull'); }).promise())",
    "U0 - #isNotNull" : "() => ($.get(window.projectUrl + '/_api/get-tests?type=unit&n=0').then(function(data){assert.equal(data.state, 'passed');  assert.equal(data.assertions[1].method, 'isNotNull'); }).promise())",
    "F0 - GET /hello with no name - status" : "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=0').then(function(data){ assert.equal(data.assertions[0].method, 'equal'); assert.equal(data.assertions[0].args[0], 'res.status'); assert.equal(data.assertions[0].args[1], '200');}).promise())",
    "F0 - GET /hello with no name - text": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=0').then(function(data){ assert.equal(data.assertions[1].method, 'equal'); assert.equal(data.assertions[1].args[0], 'res.text'); assert.equal(data.assertions[1].args[1], '\\'hello Guest\\'');}).promise())",
    "F1 GET /hello?name=xxx": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=1').then(function(data){ assert.equal(data.assertions[1].method, 'equal'); assert.equal(data.assertions[1].args[0], 'res.text'); assert.match(data.assertions[1].args[1], /hello [\\w\\d_-]/);}).promise())",
    "F2 PUT /travellers {surname: 'Colombo'} - type": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=2').then(function(data){ assert.equal(data.assertions[1].method, 'equal'); assert.equal(data.assertions[1].args[0], 'res.type'); assert.equal(data.assertions[1].args[1], '\\'application/json\\'');}).promise())",
    "F2 PUT /travellers {surname: 'Colombo'} - body.name": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=2').then(function(data){ assert.equal(data.assertions[2].method, 'equal'); assert.equal(data.assertions[2].args[0], 'res.body.name'); assert.equal(data.assertions[2].args[1], '\\'Cristoforo\\'');}).promise())",
    "F4-HB surname: Colombo - browser.success": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=5').then(function(data){ assert.equal(data.assertions[0].method, 'browser.success'); }).promise())",
    "F4-HB surname: Colombo - browser.text span#name": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=5').then(function(data){ assert.equal(data.assertions[1].method, 'browser.text'); assert.equal(data.assertions[1].args[0], '\\'span#name\\''); assert.equal(data.assertions[1].args[1], '\\'Cristoforo\\'');}).promise())",
    "F4-HB surname: Colombo - browser.element span#dates": "() => ($.get(window.projectUrl + '/_api/get-tests?type=functional&n=5').then(function(data){ assert.equal(data.assertions[3].method, 'browser.element'); assert.equal(data.assertions[3].args[0], '\\'span#dates\\''); assert.equal(data.assertions[3].args[1], 1);}).promise())",
  }, {
    // Advanced node-express
    "Advanced Express assertion test" : "assert(true)"
  },
    /** Microservice 1 - Timestamp - **WIP** **/ /*
  {
    "2016-12-25 - unix" : "getUserInput => $.get(getUserInput('url') + '/api/timestamp/2016-12-25').then(data => { assert.equal(data.unix, 1482624000000, 'Should be a valid unix timestamp'); }, xhr => { throw new Error(xhr.statusText); }).promise()",
    "2016-12-25 - utc" : "getUserInput => $.get(getUserInput('url')+ '/api/timestamp/2016-12-25').then(data => { assert.equal(data.utc, 'Sun, 25 Dec 2016 00:00:00 GMT', 'Should be a valid UTC date string'); }, xhr => { throw new Error(xhr.statusText); }).promise()",
    "ts_1482624000000 (dec 25 2106) - unix" : "getUserInput => $.get(getUserInput('url') + '/api/timestamp/1482624000000').then(data => { assert.equal(data.unix, 1482624000000) ;  }, xhr => { throw new Error(xhr.statusText); }).promise()",
    "ts_1482624000000 (dec 25 2106) - utc" : "getUserInput => $.get(getUserInput('url') + '/api/timestamp/1482624000000').then(data => { assert.equal(data.utc, 'Sun, 25 Dec 2016 00:00:00 GMT') ;  }, xhr => { throw new Error(xhr.statusText); }).promise()",
    // add tests for at least another date...
    "invalid date" : "getUserInput => $.get(getUserInput('url') + '/api/timestamp/this-is-not-a-date').then(data => { assert.equal(data.error.toLowerCase(), 'invalid date');}, xhr => { throw new Error(xhr.statusText); }).promise()",
    "empty date string - unix" : "getUserInput => $.get(getUserInput('url') + '/api/timestamp').then(data => { var now = Date.now(); assert.approximately(data.unix, now, 20000) ;}, xhr => { throw new Error(xhr.statusText); }).promise()",
    "empty date string - utc" : "getUserInput => $.get(getUserInput('url') + '/api/timestamp').then(data => { var now = Date.now(); var serverTime = (new Date(data.utc)).getTime(); assert.approximately(serverTime, now, 20000) ;}, xhr => { throw new Error(xhr.statusText); }).promise()",
  }, 
      // Microservice 2 - Header Parser - These are example tests, not accurate enough
  {
    "get a valid ip" : "getUserInput => $.get(getUserInput('url') + '/api/whoami').then(function(data){ assert.match(data.ipaddress, /^(::ffff:)?(\\d{1,3}\\.){3}\\d{1,3}$/); }, xhr => { throw new Error(xhr.statusText); }).promise()",
    "'accept-language' test 1" : "getUserInput => $.get({ url: getUserInput('url') + '/api/whoami', beforeSend: function(xhr){xhr.setRequestHeader('Accept-Language', 'lang-test-aCbLkofr89')}}).then(data => {console.log(navigator.languages); assert.equal(data.language, 'lang-test-aCbLkofr89');  }, xhr => { throw new Error(xhr.statusText); }).promise()",
    "'accept-language' test 2" : "getUserInput => $.get({ url: getUserInput('url') + '/api/whoami', beforeSend: function(xhr){xhr.setRequestHeader('Accept-Language', 'lang-test-xhKjh7865Q')}}).then(data => {console.log(navigator.languages); assert.equal(data.language, 'lang-test-xhKjh7865Q');  }, xhr => { throw new Error(xhr.statusText); }).promise()",
    "validate 'user-agent'" : "getUserInput => $.get(getUserInput('url') + '/api/whoami').then(data => { assert.equal(data.software, navigator.userAgent); }, xhr => { throw new Error(xhr.statusText); }).promise()",
  }, {
    // MS3 - URL shortener
    /** the creation and redirection need to be executed sequentially !!! **/ /*
    "check creation 1 - test service" : "getUserInput => { window.randNum = parseInt(Math.random()*1000); return $.post(getUserInput('url') + '/api/shorturl/new/', {url: 'https://shine-ear.gomix.me/rand-' + window.randNum}).then(data => { window.shurl = data.short_url; assert.isNotNull(data.short_url); assert.match(data.original_url, new RegExp('shine-ear.hyperdev.space\\/rand-' + window.randNum)); }, xhr => { throw new Error(xhr.responseText); }).promise(); }",
    "check redirection 1 - test service" : "getUserInput => $.get(getUserInput('url') + '/api/shorturl/' + window.shurl).then(data => { assert.equal(data.str, 'rand-' + window.randNum); assert.isTrue(data.red);}, xhr => { throw new Error(xhr.responseText); }).promise()",
    "check creation 2 - timestamp service" : "getUserInput => $.post(getUserInput('url') + '/api/shorturl/new/', {url: 'https://curse-arrow.gomix.me/api/timestamp'}).then(data => { window.shurl = data.short_url; assert.isNotNull(data.short_url); assert.match(data.original_url, /curse-arrow.gomix.me\\/api\\/timestamp/); }, xhr => { throw new Error(xhr.responseText); }).promise()",
    "check redirection 2 - timestamp service" : "getUserInput => $.get(getUserInput('url') + '/api/shorturl/' + window.shurl).then(data => { assert.approximately(data.unix, Date.now(), 20000); }, xhr => { throw new Error(xhr.responseText); }).promise()",
    "invalid url" : "getUserInput => $.post(getUserInput('url') + '/api/shorturl/new/', {url: 'ftp:/john-doe.org'}).then(data => { assert.equal(data.error.toLowerCase(), 'invalid url'); }, xhr => { throw new Error(xhr.responseText); }).promise()",
  }, {
    // MS4 - Image Search
    //"NOOP - test cors" : "getUserInput => $.get(getUserInput('url') + '/api/music/test').then(data => { console.log(data); assert.isOk(true);}, xhr => { throw new Error(xhr.responseText); }).promise()",
    //"nested API call test - timestamp" : "getUserInput => $.get('https://curse-arrow.gomix.me/api/timestamp').then(d1 => { return $.get('https://curse-arrow.gomix.me/api/timestamp').then( d2 => {console.log('d1', d1, 'd2', d2); assert.approximately(d1.unix, d2.unix, 500);}, xhr => { throw new Error(xhr.responseText); }) }, xhr => { throw new Error(xhr.responseText); })",
    "API results comparison ('Boston' on iTunes)" : "getUserInput => $.get(getUserInput('url') + '/api/music/boston').then(d1 => $.get({url: 'https://itunes.apple.com/search?term=boston&entity=album&country=US&callback=?', dataType: 'jsonp'}).then(d2 => {console.log('d1', d1, 'd2', d2); assert.deepEqual(d1, d2)}, xhr => { throw new Error(xhr.responseText); }), xhr => { throw new Error(xhr.responseText); })"
  },{
    // MS5 - File metadata
    "upload a BLOB 1": "getUserInput => {var fd = new FormData(); fd.append('upfile', new Blob(['abcde'], {type:'text/plain'}), 'test1.txt' ); return $.ajax({url: getUserInput('url') + '/api/fileanalyse', type: 'POST', data: fd, processData: false, contentType: false }).then(data => {console.log(data); assert.equal(data.name, 'test1.txt'); assert.equal(data.size, 5);}, xhr => {throw new Error(xhr.responseText); }).promise(); }",
    "upload a BLOB 2": "getUserInput => {var fd = new FormData(); fd.append('upfile', new Blob(['{\"a\":\"1234\"}'], {type:'application/json'}), 'test2.json' ); return $.ajax({url: getUserInput('url') + '/api/fileanalyse', type: 'POST', data: fd, processData: false, contentType: false }).then(data => {console.log(data); assert.equal(data.name, 'test2.json'); assert.equal(data.size, 12);}, xhr => {throw new Error(xhr.responseText); }).promise(); }",
  },*/
  
  
  /*
  {
    // MS6 - Exercise Tracker
    //test 1 doesnt pass sometimes, this is an issue with the project! It often returns thats its a duplicate user when it isnt.
    "I can create a user by <b>posting</b> form data <code>username</code> to <i>/api/exercise/new-user</i>": "{ getUserInput => $.post(getUserInput('url') + '/api/exercise/new-user',{username: (Math.floor(Math.random()*1000000)).toString()+'a'} ).then(data => { console.log(data); }, xhr => {throw new Error(xhr.statusText); }) }",
    "I can get an array of all users by <b>getting</b> <i>api/exercise/users</i>" : "getUserInput => $.get(getUserInput('url')+ '/api/exercise/users').then(data => { assert.isArray(data, 'users should return in an array'); }, xhr => { throw new Error(xhr.statusText); })",
    //those can stay inline while in dev, theyre simple
    
    "I can see a <code>username</code> & <code>_id</code> for each user in the users array" : `
      getUserInput => $.get(getUserInput('url')+ '/api/exercise/users').then(data => { 
        assert.property(data[0], 'username'); 
        assert.property(data[0], '_id');
        ms6testUser = data[0]._id 
      }, xhr => { throw new Error(xhr.statusText); }) `,
      
    "I can add an exercise to any user by <b>posting</b> form data <code>userId</code>, <code>description</code>, <code>duration</code>, & optionally <code>date</code> to <i>/api/exercise/add</i>. If no date supplied it will use current date.": `
      { getUserInput => $.post(getUserInput('url') + '/api/exercise/add',
      {userId: ms6testUser, description: 'crazyrunning', duration: '79'} )
      .then(data => { 
        assert.equal(data.description, 'crazyrunning');
        assert.equal(data.duration, 79, 'duration incorrectly saved');
        assert.match(data.date, /20[0-9]{2}/ , 'date incorrect, no year present');
      }, xhr => {throw new Error(xhr.statusText); }) }
    `,
    
    "I can retrieve a full exercise log of any user by <b>getting</b> <i>/api/exercise/log</i> with a parameter of <code>userId</code>": `
      { getUserInput => $.get(getUserInput('url') + '/api/exercise/log',
      {userId: ms6testUser} )
      .then(data => { 
        assert.isArray(data.log, 'log should be array');
        assert.property(data.log[0], 'description', 'duration incorrectly saved');
        assert.property(data.log[0], 'duration', 'date incorrect, no year present');
        assert.equal(data.userId, ms6testUser, 'log should be for the user requested');
        console.log(data);
      }, xhr => {throw new Error(xhr.statusText); }) }   
    `,
    
    "I can retrieve part of the log of any user by also passing along optional parameters of <code>from</code> & <code>to</code> or <code>limit</code>. (Date format yyyy-mm-dd, limit = int)": `
      { getUserInput => $.get(getUserInput('url') + '/api/exercise/log',
      {userId: ms6testUser, limit: 2} )
      .then(data => { 
        assert.isArray(data.log, 'log should be array');
        assert.lengthOf(data.log, 2, 'log should have supplied length')
        console.log(data);
      }, xhr => {throw new Error(xhr.statusText); }) }   
    `,
  },
  
  */
  
  
  
  
  
  
  
  
  /*
  * START OF IN-DEV TEST PROJECTS FOR ISQA PROJECTS
  * START OF IN-DEV TEST PROJECTS FOR ISQA PROJECTS
  * START OF IN-DEV TEST PROJECTS FOR ISQA PROJECTS
  * START OF IN-DEV TEST PROJECTS FOR ISQA PROJECTS
  */
  
  {
    //
    //--------[ISQA_1 - Personal Library]---------
    //
    //info/sample:  https://spark-cathedral.gomix.me/
    //code:         https://gomix.com/#!/project/spark-cathedral
    //
    //note:   potentially last project as it's fairly complex and encompassing, unless we create a token request api
    //        window.ISQA_1_testBookId created so we can store variable across tests using global scope. (Needed to reliably predict api return)
    //
    //todo:   impli mocha/tests on project
    //        test for those tests in this test testing enviroment
    //assert.equal(data.headers['cache-control'], 'no-store, no-cache, must-revalidate, proxy-revalidate');
    "I will not have anything cached in my client": `{
      getUserInput => $.get(getUserInput('url')+ '/_api/app-info')
      .then(data => {
        assert.equal(data.headers['cache-control'], 'no-store, no-cache, must-revalidate, proxy-revalidate');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "I will see that the site is powered by 'PHP 4.2.0' even though it isn't": `{
      getUserInput => $.get(getUserInput('url')+ '/_api/app-info')
      .then(data => {
        assert.equal(data.headers['x-powered-by'], 'PHP 4.2.0');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "I can <b>post</b> a <code>title</code> to <i>/api/books</i> to add a book and returned will be the object with the <code>title</code> and a unique <code>_id</code>": `{
      var testTitle = 'InfoSec for Smarties';
      getUserInput => $.post(getUserInput('url') + '/api/books',
      {title: testTitle} )
      .then(data => { 
        assert.property(data, 'title', 'returned object should contain title');
        assert.equal(data.title, testTitle, 'returned object title should contain correct posted title');
        assert.property(data, '_id', 'returned object should contain _id');
      }, xhr => {throw new Error(xhr.statusText); })
    }`,
    "I can <b>get</b> <i>/api/books</i> to retrieve an aray of all books containing <code>title</code>, <code>_id</code>, & <code>commentcount</code>": `{
      getUserInput => $.get(getUserInput('url')+ '/api/books')
      .then(data => { 
        assert.isArray(data, 'Return should be an array');
        assert.property(data[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(data[0], 'title', 'Books in array should contain title');
        assert.property(data[0], '_id', 'Books in array should contain _id');
        window.ISQA_1_testBookId = data[0]._id;
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "I can <b>get</b> </i>/api/books/{_id}</i> to retrieve a single object of a book containing <code>title</code>, <code>_id</code>, & an array of <code>comments</code> (empty array if no comments present)": `{
      getUserInput => $.get(getUserInput('url')+ '/api/books/'+window.ISQA_1_testBookId)
      .then(data => {
        assert.property(data, 'comments', 'Book should contain property comments');
        assert.isArray(data.comments, 'Book should contain array of comments');
        assert.property(data, 'title', 'Book should contain property title');
        assert.property(data, '_id', 'Book should contain property _id');
        assert.equal(data._id, window.ISQA_1_testBookId, 'Returned object should contain the correct book we requested');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "I can <b>post</b> a <code>comment</code> to <i>/api/books/{_id}</i> to add a comment to a book and returned will be the books object similar to <b>get</b> <i>/api/books/{_id}</i>": `{
      var testComment = 'Quality Assurance is Key';
      getUserInput => $.post(getUserInput('url') + '/api/books/'+window.ISQA_1_testBookId,
      {comment: testComment} )
      .then(data => { 
        assert.property(data, 'comments', 'Book should contain property comments');
        assert.isArray(data.comments, 'Book should contain array of comments');
        assert.include(data.comments, testComment, 'Book should contain the comment posted')
        assert.property(data, 'title', 'Book should contain property title');
        assert.property(data, '_id', 'Book should contain property _id');
        assert.equal(data._id, window.ISQA_1_testBookId, 'Returned object should contain the correct book we commented on');
      }, xhr => {throw new Error(xhr.statusText); })
    }`,    
    "I can <b>delete</b> <i>/api/books/{_id}</i> to delete a book from the collection. Returned will be 'delete successful' if successful": `{
      getUserInput => $.ajax({url: getUserInput('url')+ '/api/books/'+window.ISQA_1_testBookId, type: 'DELETE'})
      .then(data => { 
        assert.equal(data, 'delete successful', 'Successfully deleted process should return correct string');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "If I try to request a book that doesn't exist I will get a 'no book exists' message": `{
      getUserInput => $.get(getUserInput('url')+ '/api/books/'+window.ISQA_1_testBookId)
      .then(data => { 
        assert.equal(data, 'no book exists', 'Returned message should say "no book exists"')
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "I can send a <b>delete</b> request to <i>/api/books</i> to delete all books in the database. Returned will be 'complete delete successful' if successful": `{
      getUserInput => $.ajax({url: getUserInput('url')+ '/api/books', type: 'DELETE'})
      .then(data => { 
        assert.equal(data, 'complete delete successful', 'Successfully deleted process should return correct string');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "Database will be empty after a successful delete process": `{
      getUserInput => $.get(getUserInput('url')+ '/api/books')
      .then(data => { 
        assert.equal(data,'','Database should be empty after a successful full delete process');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "Functional test 1 (POST /api/books with title)" : `{
      getUserInput => $.get(getUserInput('url')+ '/_api/get-tests?type=functional&n=0')
      .then(data => {
        var testedFor = [];
        for (var i=0; i<data.assertions.length; i++) {
          testedFor.push(data.assertions[i].args[0]);
        }
        assert.include(testedFor, 'res.status', 'Should test for response status code');
        assert.include(testedFor, 'res.body', 'Should test response body for properties required to return');
        assert.include(testedFor, 'res.body.comments', 'Should test for res.body.comments to be an array');
        assert.include(testedFor, 'res.body.title', 'Should test res.body.title for correct title posted');
        assert.equal(data.state, 'passed', 'Functional test should pass');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "Functional test 2 (POST /api/books with no title)" : `{
      getUserInput => $.get(getUserInput('url')+ '/_api/get-tests?type=functional&n=1')
      .then(data => {
        var testedFor = [];
        for (var i=0; i<data.assertions.length; i++) {
          testedFor.push(data.assertions[i].args[0]);
        }
        assert.include(testedFor, 'res.status', 'Should test for response status code');
        assert.include(testedFor, 'res.text', 'Should test res.text to equal "missing title"');
        assert.equal(data.state, 'passed', 'Functional test should pass');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "Functional test 3 (/api/books => array of books)" : `{
      getUserInput => $.get(getUserInput('url')+ '/_api/get-tests?type=functional&n=2')
      .then(data => {
        var testedFor = [];
        var propertyTests = 0;
        for (var i=0; i<data.assertions.length; i++) {
          testedFor.push(data.assertions[i].args[0]);
          if(data.assertions[i].method == 'property') propertyTests++;
        }
        assert.include(testedFor, 'res.status', 'Should test for response status code');
        assert.include(testedFor, 'res.body', 'Should test res.body to be an array');
        assert.isAtLeast(propertyTests, 3, 'Should be testing for atleast 3 properties of response objects')
        assert.equal(data.state, 'passed', 'Functional test should pass');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "Functional test 4 (GET /api/books/[id] with unknown id)" : `{
      getUserInput => $.get(getUserInput('url')+ '/_api/get-tests?type=functional&n=3')
      .then(data => {
        var testedFor = [];
        for (var i=0; i<data.assertions.length; i++) {
          testedFor.push(data.assertions[i].args[0]);
        }
        assert.include(testedFor, 'res.status', 'Should test for response status code');
        assert.include(testedFor, 'res.text', 'Should test res.text to equal "no book exists"');
        assert.equal(data.state, 'passed', 'Functional test should pass');
      }, xhr => { throw new Error(xhr.statusText); })
    }`,
    "Functional test 5 (Test GET /api/books/[id] with valid/known id)" : `{
      getUserInput => $.get(getUserInput('url')+ '/_api/get-tests?type=functional&n=4')
      .then(data => {
        var testedFor = [];
        var propertyTests = 0;
        for (var i=0; i<data.assertions.length; i++) {
          testedFor.push(data.assertions[i].args[0]);
          if(data.assertions[i].method == 'property') propertyTests++;
        }
        assert.include(testedFor, 'res.status', 'Should test for response status code');
        assert.isAtLeast(propertyTests, 3, 'Should be testing for atleast 3 properties of response object')
        assert.include(testedFor, 'res.body._id', 'Should test res.body._id to equal _id passed to server');
        assert.include(testedFor, 'res.body.comments', 'Should test for res.body.coments to be an array')
        assert.equal(data.state, 'passed', 'Functional test should pass');
      }, xhr => { throw new Error(xhr.statusText); })
    }`, 
    "Functional test 6 (POST /api/books/[id] with comment)" : `{
      getUserInput => $.get(getUserInput('url')+ '/_api/get-tests?type=functional&n=5')
      .then(data => {
        var testedFor = [];
        var propertyTests = 0;
        var includeTests = 0;
        for (var i=0; i<data.assertions.length; i++) {
          testedFor.push(data.assertions[i].args[0]);
          if(data.assertions[i].method == 'property') propertyTests++;
          if(data.assertions[i].method == 'property') includeTests++;
        }
        assert.include(testedFor, 'res.status', 'Should test for response status code');
        assert.isAtLeast(propertyTests, 3, 'Should be testing for atleast 3 properties of response object')
        assert.include(testedFor, 'res.body.comments', 'Should test for res.body.comments to be an array')
        assert.isAtLeast(includeTests, 1, 'Should test comments to include comment sent to server')
        assert.equal(data.state, 'passed', 'Functional test should pass');
      }, xhr => { throw new Error(xhr.statusText); })
    }`, 

  }
  
  
];