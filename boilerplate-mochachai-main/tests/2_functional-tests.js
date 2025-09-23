const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest', 'Response text should be "hello Guest"');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Mevinu')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Mevinu', 'Response text should be "hello Mevinu"');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'Response type should be application/json');
          assert.equal(
            res.body.surname,
            'Colombo',
            'Response body should contain the sent surname'
          );
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'Response type should be application/json');
          assert.equal(
            res.body.surname,
            'da Verrazzano',
            'Response body should contain the sent surname'
          );
          done();
        });
    });
  });
});

const Browser = require('zombie');
// This tells Zombie where to find your running application.
Browser.site = 'http://127.0.0.1:3000'; 

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  // Create a new browser instance for our tests.
  const browser = new Browser();

  // This hook tells the browser to visit your site's homepage before the tests run.
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      // Find the 'surname' input, fill it with 'Colombo', and press the submit button.
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', function () {
          // After the form submits and the page reloads...
          // check that the request was successful.
          assert.equal(browser.statusCode, 200, 'Response status should be 200');
          // check that the new text 'Colombo' is in the <span id="surname"> element.
          assert.equal(browser.text('span#surname'), 'Colombo');
          done();
        });
      });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      // Find the 'surname' input, fill it with 'Vespucci', and press the submit button.
      browser.fill('surname', 'Vespucci').then(() => {
        browser.pressButton('submit', function() {
          // After the form submits and the page reloads...
          // check that the request was successful.
          assert.equal(browser.statusCode, 200, 'Response status should be 200');

          // check that the new text 'Vespucci' is in the <span id="surname"> element.
          assert.equal(browser.text('span#surname'), 'Vespucci');
          done();
        });
      });
    });
  });
});