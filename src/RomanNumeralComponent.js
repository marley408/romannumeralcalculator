import React, { useState } from 'react';

export default function RomanNumeralComponent() {
  const [calculatedAnswer, updateAnswer] = useState('Nulla');
  const [input, updateInput] = useState('');

  const SCALE_DEGREE = {
    //   scale of 1 (single digit)
    1: [
      { 1: 'I' },
      { 2: 'II' },
      { 3: 'III' },
      { 4: 'IV' },
      { 5: 'V' },
      { 6: 'VI' },
      { 7: 'VII' },
      { 8: 'VIII' },
      { 9: 'IX' }
    ],
    // scale of 10  (1 is 10, 2 is 20, etc)
    2: [
      { 1: 'X' },
      { 2: 'XX' },
      { 3: 'XXX' },
      { 4: 'XL' },
      { 5: 'L' },
      { 6: 'LX' },
      { 7: 'LXX' },
      { 8: 'LXXX' },
      { 9: 'XC' }
    ],
    // scale of 100 (1 is 100, 2 is 200, etc)
    3: [
      { 1: 'C' },
      { 2: 'CC' },
      { 3: 'CCC' },
      { 4: 'CD' },
      { 5: 'D' },
      { 6: 'DC' },
      { 7: 'DCC' },
      { 8: 'DCCC' },
      { 9: 'CM' }
    ]
  };

  //  we need the scale degree so we know which array to search in, digit will correspond to the appropriate roman numeral value
  const getRomanNumeralFromScaleDegree = (degree, digit) => {
    console.log(degree, digit);
    // convert digit back to number in order to use number as a key, and therefore capture its value, from the appropriate array
    const convertToNumber = parseInt(digit);

    // terminate early because there's no roman numeral for ZERO, so return nothing
    if (convertToNumber === 0) {
      return '';
    }

    // map through the correct "degree" array and return roman numeral
    return (
      SCALE_DEGREE[degree]
        .map(function(obj) {
          return obj[convertToNumber];
        })
        //  we filter out only truthy values because .map will return undefined for all objects regardless of if its the one we need (the value of the key equal to convertToNumber)
        .filter(Boolean)
        .join('')
    );
  };

  const addAndConvertToRomanNumerals = ints => {
    // here we add the integers of the numbers array
    const arrSum = ints.reduce((a, b) => a + b, 0);

    // check if arrSum is greater than 1000 in order to terminate early
    if (arrSum > 1000) {
      return alert('Numbers cannot add up to more than 1000');
    }

    if (arrSum === 1000) {
      return 'M';
    }

    // turn sum of user input numbers into array to grab specific digit according to its position
    const sumToDigits = arrSum.toString().split('');

    // we know scale is a single digit
    if (arrSum < 10) {
      return getRomanNumeralFromScaleDegree(1, arrSum);
    }

    // we know scale is a double digit
    if (arrSum < 100 && arrSum >= 10) {
      const firstRomanNumeral = getRomanNumeralFromScaleDegree(
        2,
        sumToDigits[0] // tenth position
      );
      const secondRomanNumeral = getRomanNumeralFromScaleDegree(
        1,
        sumToDigits[1] // first position
      );

      return firstRomanNumeral + secondRomanNumeral;
    }

    // we know scale is a triple digit
    if (arrSum >= 100) {
      const firstRomanNumeral = getRomanNumeralFromScaleDegree(
        3,
        sumToDigits[0] // hundredth position
      );
      const secondRomanNumeral = getRomanNumeralFromScaleDegree(
        2,
        sumToDigits[1] // tenth position
      );
      const tripleRomanNumeral = getRomanNumeralFromScaleDegree(
        1,
        sumToDigits[2] // first position
      );

      return firstRomanNumeral + secondRomanNumeral + tripleRomanNumeral;
    }
  };

  const addNumbers = inputString => {
    const numbersStringArray = inputString.split(',');
    const numbers = numbersStringArray.map(numberAsString => {
      return parseInt(numberAsString, 10);
    });

    /* numbers is an array of ints. E.g. [1, 2, 3] */
    const answer = addAndConvertToRomanNumerals(numbers);

    return answer;
  };

  const handleChange = event => {
    updateInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const answer = addNumbers(input);
    updateAnswer(answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ paddingRight: '10px' }}>
          <span style={{ paddingRight: '10px' }}>
            Numbers (separated by commas):
          </span>
          <input type='text' name='input-form' onChange={handleChange} />
        </label>
        <input type='submit' value='Add Numbers' />
      </form>
      <div>Answer in Roman Numerals: {calculatedAnswer}</div>
    </div>
  );
}
