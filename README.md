# Make Variables Not War — JavaScript Variables Exercise

[![Tests](https://github.com/RickRieger/make-variables-not-war/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/make-variables-not-war/actions/workflows/tests.yml)

My first **test-based JavaScript assignment** at the **Code Immersives** web development bootcamp in New York City (February 2021). The task was to declare variables of the right types and do some arithmetic in code, while a set of [Jest](https://jestjs.io/) tests checked each answer. This repo is my fork of the assignment, with my solution in [`main.js`](main.js).

**Skills practiced:** declaring variables with `let`, strings vs. numbers, combining strings, arithmetic and operator order, and defining a variable *in terms of* other variables. I also learned to read automated test results.

**Built with:** JavaScript (Node.js) and Jest 24. There's no web page; the badge above shows whether the tests currently pass on GitHub.

---

## Contents

- [My solution](#my-solution)
- [Run the tests](#run-the-tests)
- [How it's verified](#how-its-verified)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)
- [Original assignment (from the instructor)](#original-assignment-from-the-instructor)

---

## My solution

Written on **2021-02-11** (commit "javaScript assignment"). All 11 of the assignment's tests passed.

```js
let myFirstName = 'Rick';
let myLastName = 'Rieger';
let myBestFriend = 'Brian';
let mySentence = `My name is ${myFirstName} ${myLastName} and my best friend is ${myBestFriend}.`;
let myFavoriteNum = 18;
let myMentalAge = 30;
let myHeight = 69;
let myFavoriteYear = 1993;
let mySum = 3 + 1918 + 24 + 1;               // 1946
let myProduct = 232 * 43 / 2 + 4;            // 4992
let myHeightAndAge = myMentalAge + myHeight; // 99
```

| Task | What it shows |
|---|---|
| `myFirstName`, `myLastName`, `myBestFriend` | **Strings:** text values in quotes. |
| `mySentence` | **Combining strings.** A template literal (backticks with `${...}`) inserts the other variables, so if `myFirstName` changes, the sentence changes too. |
| `myFavoriteNum`, `myMentalAge`, `myHeight`, `myFavoriteYear` | **Numbers:** no quotes. `typeof 18` is `"number"`, while `typeof "18"` would be `"string"` and fail the test. |
| `mySum` | **Arithmetic in code:** `3 + 1918 + 24 + 1 = 1946`. The assignment says to calculate it in code instead of typing 1946. |
| `myProduct` | **Operator order:** `232 * 43 / 2 + 4`. Multiplication and division run left to right first (`9976 / 2 = 4988`), then the addition (`+ 4 = 4992`). |
| `myHeightAndAge` | **Defining a variable in terms of others:** it uses `myMentalAge + myHeight` rather than the literal `99`, so it stays correct if either value changes. That's the rule in the assignment's Guidelines. |

**A note on the variable name:** the assignment's task list asks for `heightAndAge`, but its tests import `myHeightAndAge`. I used `myHeightAndAge` so the tests could find it.

## Run the tests

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/make-variables-not-war.git
cd make-variables-not-war
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode, as in the original assignment: re-runs on every save
```

Expected result:

```
Test Suites: 2 passed, 2 total
Tests:       14 passed, 14 total
```

(The 11 original tests plus 3 added in the cleanup below.)

## How it's verified

[`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs `npm run test:ci` on GitHub Actions after every push, and the badge at the top shows the result. This repo has no web page, so instead of a live site, a passing test run is how it shows it works.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-23** on the branch `cleanup-and-ci`, checked by running the tests, and merged into `master`. Each is its own commit.

### 1. Fixed missing spaces in `mySentence`, and added a test for it

**Why:** The sentence was glued together with `+` and no spaces, so it read **"My name isRickRiegerand my best friend isBrian"**. The assignment's test only checks `typeof mySentence === 'string'`, so this passed even though the output was wrong.

```js
// Before
let  mySentence =`My name is`+ myFirstName + myLastName + "and my best friend is" + myBestFriend;
// → "My name isRickRiegerand my best friend isBrian"

// After
let mySentence = `My name is ${myFirstName} ${myLastName} and my best friend is ${myBestFriend}.`;
// → "My name is Rick Rieger and my best friend is Brian."
```

The template literal (`${...}`) makes the spacing visible in the code, so it's hard to get wrong.

I added [`sentence.test.js`](sentence.test.js) so this can't come back. It checks that all three names appear in the sentence, with a space between first and last name and no letters stuck to the names. I confirmed it **fails on the old code** (2 of 3 checks) and passes on the fix.

### 2. Tidied the variable declarations

**Why:** Spacing and quote style were inconsistent: double spaces after `let`, no space after `=`, and backticks used for plain strings. That makes the code harder to read. The values didn't change.

```js
// Before
let myFirstName = `Rick`;
let  myLastName =`Rieger`;
let  myBestFriend =`Brian`;

// After
let myFirstName = 'Rick';
let myLastName = 'Rieger';
let myBestFriend = 'Brian';
```

Rule used: single quotes for plain text, backticks only when inserting variables (`mySentence`).

### 3. Added a one-shot test command and automatic test runs on GitHub

**Why:** `npm test` starts Jest in *watch mode*, which keeps running until you press Ctrl+C. That's handy while working, but it can't give a single pass/fail answer, which an automated check needs.

```jsonc
// Before (package.json)
"scripts": {
  "test": "jest --watch-all"
}

// After
"scripts": {
  "test": "jest --watch-all",   // unchanged: watch mode while working
  "test:ci": "jest --ci"        // new: run once and exit
}
```

The new GitHub Actions workflow runs `npm run test:ci` on every push and pull request (see [How it's verified](#how-its-verified)).

### 4. Rewrote this README section

Added everything above. The instructor's original instructions are below, unchanged.

---

## Original assignment (from the instructor)

*The text below is the assignment README as written by the Code Immersives instructor, unchanged.*

### Make Variables Not War

Now you'll be making many many variables. You will be so very able! (Sorry about that.)

### Setup

Welcome to your first test-based assignment! You're gonna love it once you get the hang of it.

You'll:

- Fork and clone this repo.
- Navigate into the directory.
- Run `jest --watch-all`.
- Write your code in the section below "YOUR CODE BELOW" in `main.js`.
- Watch as your tests turn green.
- Add a link to your repo as your assignment submission when you're done!

### Guidelines

- If another variable is mentioned in a task's description, that variable needs to appear in your code for that task to be marked correct. In other words, if `x` is `5` and you're asked to set `y` in terms of `x` so that it's twice `x`, the following code is correct:

```javascript
y = x * 2;
```

While the following code is not:

```javascript
y = 10;
```

This is because in the first example, if `x` changed value, `y` would continue to be twice `x`, but in the second example, `y` would always be `10`.

### Tasks

- Create a variable called `myFirstName`. Assign `myFirstName` a string value that represents your first name.
- Create a variable called `myLastName`. Assign `myLastName` a string value that represents your last name.
- Create a variable called `myBestFriend`. Assign `myBestFriend` a string value that represents your best friend name.
- Create a variable called `mySentence`. Assign `mySentence` a string that includes the variables from the previous three tasks.
- Create another variable called `myFavoriteNum`. Assign `myFavoriteNum` a number value that represents your favorite number!
- Create another variable called `myMentalAge`. Assign `myMentalAge` a number value that represents your mental age!
- Create another variable called `myHeight`. Assign `myHeight` a number value that represents your height in inches or centimeters!
- Create another variable called `myFavoriteYear`. Assign `myFavoriteYear` a number value that represents your favorite year!

### Tasks that use MATH

- Create another variable called `mySum`. Set it equal to the result of three plus one thousand nine hundred eighteen plus twenty-four plus one. Calculate it in code!
- Create another variable called `myProduct`. Set it equal to the result of two hundred thirty-two times forty-three divided by two plus four (the operations should be written in that order!). Calculate it in code!
- Create another variable called `heightAndAge`. Set it equal to the sum of your mental age and height. Calculate it in code!
