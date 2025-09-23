const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', function () {
  suite('Basic Assertions', function () {
    // #1
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'This is an optional error description - e.g. null is null');
      assert.isNotNull(1, '1 is not null');
    });
    // #2
    test('#isDefined, #isUndefined', function () {
  // null is a defined value, so we use isDefined.
  assert.isDefined(null, 'null is not undefined');
  
  // undefined is the value we are checking for, so we use isUndefined.
  assert.isUndefined(undefined, 'undefined IS undefined');

  // A string has a value, so it is defined.
  assert.isDefined('hello', 'A string is not undefined');
});
    // #3
    test('#isOk, #isNotOk', function () {
  // null is a "falsy" value.
  assert.isNotOk(null, 'null is falsey');

  // Any non-empty string is "truthy".
  assert.isOk("I'm truthy", 'A string is truthy');

  // The boolean true is also "truthy".
  assert.isOk(true, 'true is truthy');
});
    // #4
    test('#isTrue, #isNotTrue', function () {
  // This is the boolean value true.
  assert.isTrue(true, 'true is true');

  // A double negation (!!) on a truthy string evaluates to the boolean true.
  assert.isTrue(!!'double negation', 'Double negation of a truthy value is true');

  // An object is "truthy", but it is not the boolean value `true`.
  assert.isNotTrue({ value: 'truthy' }, 'Objects are truthy, but are not boolean values');
});
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    // #5
    test('#equal, #notEqual', function () {
  // The number 12 IS loosely equal to the string '12' due to type coercion.
  assert.equal(12, '12', 'Numbers are coerced into strings with ==');
  
  // These are two different objects in memory, so their references are not equal.
  assert.notEqual({ value: 1 }, { value: 1 }, '== compares object references');
  
  // 6 * '2' evaluates to the number 12, which is loosely equal to the string '12'.
  assert.equal(6 * '2', '12');
  
  // 6 + '2' concatenates to the string '62', which is not equal to the string '12'.
  assert.notEqual(6 + '2', '12');
});
    // #6
    test('#strictEqual, #notStrictEqual', function () {
  // The number 6 is NOT strictly equal to the string '6' because their types are different.
  assert.notStrictEqual(6, '6');
  
  // 3 * 2 evaluates to the number 6, which is strictly equal to 6.
  assert.strictEqual(6, 3 * 2);
  
  // 6 * '2' evaluates to the number 12, which is strictly equal to 12.
  assert.strictEqual(6 * '2', 12);
  
  // These are two different arrays in memory, so their references are not strictly equal.
  assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
});
    // #7
    test('#deepEqual, #notDeepEqual', function () {
  // These objects have the same keys and values, so they are deeply equal. The order of keys does not matter.
  assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, "The order of keys doesn't matter");
  
  // The inner arrays [5, 6] and [6, 5] have different element orders. For arrays, order matters. Thus, the objects are not deeply equal.
  assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, "The order of array elements does matter");
});
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite('Comparisons', function () {
    // #8
    test('#isAbove, #isAtMost', function () {
  // 'hello'.length is 5, which is at most 5.
  assert.isAtMost('hello'.length, 5);
  
  // 1 is greater than 0.
  assert.isAbove(1, 0);
  
  // Math.PI (approx. 3.14) is greater than 3.
  assert.isAbove(Math.PI, 3);
  
  // 1 minus a random number (0-1) is always at most 1.
  assert.isAtMost(1 - Math.random(), 1);
});
    // #9
    test('#isBelow, #isAtLeast', function () {
  // 'world'.length is 5, which is at least 5.
  assert.isAtLeast('world'.length, 5);
  
  // 2 times a random number (0-1) is always at least 0.
  assert.isAtLeast(2 * Math.random(), 0);
  
  // 5 modulo 2 is 1, which is less than 2.
  assert.isBelow(5 % 2, 2);
  
  // 2 divided by 3 is less than 1.
  assert.isBelow(2 / 3, 1);
});
    // #10
    test('#approximately', function () {
  // weirdNumbers(0.5) returns a value between 0.5 and 1.5. This is within 0.5 of 1.
  assert.approximately(weirdNumbers(0.5), 1, 0.5);
  
  // weirdNumbers(0.2) returns a value between 0.2 and 1.2. This is within 0.8 of 1.
  assert.approximately(weirdNumbers(0.2), 1, 0.8);
});
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {
    // #11
    test('#isArray, #isNotArray', function () {
  // .split() method always returns an array.
  assert.isArray('isThisAnArray?'.split(''), 'String.prototype.split() returns an array');
  
  // .indexOf() method always returns a number, which is not an array.
  assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number');
});
    // #12
    test('Array #include, #notInclude', function () {
  // The 'winterMonths' array does not contain 'jul'.
  assert.notInclude(winterMonths, 'jul', "It's summer in july...");

  // The 'backendLanguages' array does contain 'javascript'.
  assert.include(backendLanguages, 'javascript', 'JS is a backend language');
});
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {
    // #13
    test('#isString, #isNotString', function () {
  // Math.sin() returns a number (float), which is not a string.
  assert.isNotString(Math.sin(Math.PI / 4), 'a float is not a string');
  
  // An environment variable is typically a string.
  assert.isString(process.env.PATH, 'an env variable is a string (or undefined)');
  
  // JSON.stringify() converts an object into a JSON string.
  assert.isString(JSON.stringify({ type: 'object' }), 'JSON.stringify returns a string');
});
    // #14
    test('String #include, #notInclude', function () {
  // The string 'Arrow' does contain the substring 'row'.
  assert.include('Arrow', 'row', "'Arrow' contains 'row'");
  
  // The string 'dart' does not contain the substring 'queue'.
  assert.notInclude('dart', 'queue', "But 'dart' doesn't contain 'queue'");
});
    // #15
    test('#match, #notMatch', function () {
  const regex = /^#\s\w+\s\w+\s,\sage:\s\d+\s?$/;
  // The output of formatPeople('John Doe', 35) matches the regex pattern.
  assert.notMatch(formatPeople('John Doe', 35), regex);
  
  // The output for 'Paul Smith III' has three words, and the age 'twenty-four' is not digits (\d+), so it does not match.
  assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
});
  });

  // -----------------------------------------------------------------------------

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16
    test('#property, #notProperty', function () {
  // The 'myCar' object does not have a 'wings' property.
  assert.notProperty(myCar, 'wings', 'Cars don\'t have wings');
  
  // The 'airlinePlane' object does have an 'engines' property.
  assert.property(airlinePlane, 'engines', 'Planes have engines');
  
  // The 'myCar' object does have a 'wheels' property.
  assert.property(myCar, 'wheels', 'Cars have wheels');
});
// #17
// #17
test('#typeOf, #notTypeOf', function () {
  assert.typeOf(myCar, 'object');
  assert.typeOf(myCar.model, 'string');
  assert.typeOf(airlinePlane.wings, 'number');
  assert.typeOf(myCar.wheels, 'number');

  // add at least one notTypeOf check
  assert.notTypeOf(airlinePlane.engines, 'string'); 
});


    // #18
    test('#instanceOf, #notInstanceOf', function () {
  // 'myCar' is an instance of Car, not Plane.
  assert.notInstanceOf(myCar, Plane);
  
  // 'airlinePlane' is an instance of Plane.
  assert.instanceOf(airlinePlane, Plane);
  
  // Almost everything in JavaScript is an instance of Object.
  assert.instanceOf(airlinePlane, Object);
  
  // 'myCar.wheels' is a number, not an instance of the String constructor.
  assert.notInstanceOf(myCar.wheels, String);
});
  });

  // -----------------------------------------------------------------------------
});
