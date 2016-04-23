# What is ES6?
ES6 is the next version of JavaScript, short for Ecmascript 6. The proper name is ES2015. This page aims to provide some answers to some of the weird syntax you might see in Chatr if you already know JS but don't know ES6.

# That's cool.. but why is this relevant to Chatr? Isn't 'vanilla' JavaScript good enough for what we are doing?
We are using React.js. A lot of the documentation in React.js use ES6 code, to maintain consistency, we shall also.

Besides, we will need to transpile our React components anyways with the same tool that transpiles ES6, so you might as well use the features (more on this below).

With ES6, you can still write old JavaScript code, it doesn't matter. ES6 just adds some additional functionality and sugar. If you would rather write in plain old JS, go ahead, this is just meant to alleviate any confusion

# Okay, so what can ES6 do?
Here is a very brief overview of what ES6 can do. By no means comprehensive, if you are interested in that, I'd definitely check out the Mozilla docs, or Google and find resources.

These are simply the features I can think of that are useful/already being used in Chatr.

## Anonymous/Arrow functions ( `=>`)

```js

//-------- ANONYMOUS/ARROW FUNCTIONS ----------

//es5 way
function (params) {
  foo();
}

//es6 way
(params) => {
  foo();
}


//Say you had a callback, and inside wanted to return something

//es5 way
function doAsyncStuff(foo, function(param) {
  return param;
});

//es6 way. notice we have no return statement
//if you have one parameter and only one statement,
//it is implicitly returned.
//you can also omit braces and parenthesis
function doAsyncStuff(foo, param => param);

//multiple params and statements require parenthesis and braces
function doAsyncStuff(foo, (param1, param2) => {
  return {param1, param2}
});

//Do stuff inside arrow functions
function doStuff(foo, () => {
  doMoreStuff();
});
```

## Spread operator `...`

```js
//Lets say we have some array, bar.
var bar = [ 1, 2 ,3 ];

//es5 way

//You could also use something like an advanced for loop, mapping function, etc
//but in general, you would have to use some looping construct.
for (var i = 0; i < bar.length; i++) {
  console.log(bar); //prints 1, 2, 3
}

//es6 way
console.log(...bar); //prints 1, 2, 3


//The spread operator is a super quick way to get all the elements of an array.
//Really useful for manipulating lists. This is how our message list is being populated with messages (temporarily)
```

## `let` and `const`

```js
// ---------`let` and `const`---------

//Up until now, JavaScript only had 2 types of scope, function scope and global scope, which really sucked because it could cause weird errors.

//with es6 we got let and const, which gives us block level scope.

// So what is `let`

//es5 way

function foo() {   
  var foo = true;

  if (someCondition) {     
    var foo = false;     
    console.log(foo); //Not surprisingly, this prints false.   
  }

  console.log(foo); //Gotcha! This prints false.
}

//es6 with let

function foo() {   
  let foo = true;

  if (someCondition) {
    let foo = false;     
    console.log(foo); //false  
  }

  console.log(foo); //true, we now have block level scoping.
}


// so what is 'const'?

//short for constant

const foo = "hello world";

foo = "new hello world"; //would produce an error, can't reassign consts.
```

## String interoplation

```js
//es5 way
var myName = 'Cosmo Kramer'
console.log("Hi, my name is " + myName); // prints, Hi, my name is Cosmo Kramer


//es6 way.
//Notice we start our string with the ` symbol, the backtick (key is found before the 1 character on the US keyboard)

var myName = 'Jerry Seinfeld'
console.log(`Hi, my name is ${myName}`); //prints, Hi, my name is Jerry Seinfeld.
```

# 'Transpilation? Babel?'
While ES6 makes JavaScript more bearable, the problem is that most major browsers do not fully support it yet. So we have to transpile our code into old ES5 code. Luckily we have a tool called babel, and a variety of useful plugins that does this for us so we can develop with ES6 today.

## Remarks and useful links
If you see any other weird syntax, please message in the Slack page so someone can explain and update this wiki.

Here are some useful links going more in depth with this new syntax

[1] - [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

[2] - [Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

[3] - [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

[4] - [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
