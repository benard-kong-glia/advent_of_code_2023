import { inputData } from "./2023-12-01_input";

function getAllDigitsAsStrings(input: string): string[] {
    const digits = "0123456789";
    const digitsMap = digits.split("").reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
    }, {})
    const lines = input.split("\n");
    const digitsArr = lines.map((line) => {
        let firstDigit = "";
        let lastDigit = "";
        let i = 0;
        while (i < line.length && (!firstDigit || !lastDigit)) {
            const frontChar = line[i];
            const backChar = line[line.length - 1 - i];

            if (!firstDigit && digitsMap[frontChar]) {
                firstDigit = frontChar;
            }
            if (!lastDigit && digitsMap[backChar]) {
                lastDigit = backChar;
            }
            i++;
        }
        return `${firstDigit}${lastDigit}`;
    })

    // // Test
    // digitsArr.forEach((digit, i) => {
    //     if (digit.length !== 2) {
    //         console.log({digit, i})
    //     }
    // })
    
    return digitsArr;
}

type FirstAndLastAll = { [digit: string]: { first: number, last: number } };

function findFirstAndLastOfAllDigits({ digits, digitWords, line }: { digits: string[], digitWords: string[], line: string }) {
    const response: FirstAndLastAll = {};

    const allDigits = [...digits, ...digitWords];

    for (const digit of allDigits) {
        const first = line.indexOf(digit);
        const last = line.lastIndexOf(digit);
        if (first >= 0 || last >= 0) {
            response[digit] = { first, last }
        }
    }
    return response;
}

function findFirstAndLast({ firstAndLastAll, digitsMap }: { firstAndLastAll: FirstAndLastAll, digitsMap: { [digit: string]: string } }) {
    const foundDigits = Object.keys(firstAndLastAll);
    let ultimateFirst = Infinity;
    let ultimateLast = -1;
    let firstDigitValue = "";
    let lastDigitValue = "";

    for (const digit of foundDigits) {
        const { first, last } = firstAndLastAll[digit];
        if (first < ultimateFirst) {
            ultimateFirst = first;
            firstDigitValue = digit;
        }
        if (last > ultimateLast) {
            ultimateLast = last;
            lastDigitValue = digit;
        }
    }
    return { first: digitsMap[firstDigitValue], last: digitsMap[lastDigitValue] };
}

function getallDigitsAsStringsPartTwo(input: string): string[] {
    const digits = "0123456789".split("");
    let digitsMap = digits.reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});
    const digitWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    digitsMap = digitWords.reduce((acc, curr, i) => {
        acc[curr] = String(i);
        return acc;
    }, digitsMap);

    const lines = input.split("\n");
    const digitsArr = lines.map((line) => {
        const firstAndLastAll = findFirstAndLastOfAllDigits({ digits, digitWords, line });
        const { first, last } = findFirstAndLast({ firstAndLastAll, digitsMap });

        return `${first}${last}`;
    })

    // // Test
    // digitsArr.forEach((digit, i) => {
    //     if (digit.length !== 2) {
    //         console.log({digit, i})
    //     }
    // })
    
    return digitsArr;
}

function transferDigitsStringsToNums(digitsArr: string[]) {
    return digitsArr.map((digit) => Number(digit));
}

function sumArr(digitsArr: number[]) {
    return digitsArr.reduce((acc, curr) => acc + curr, 0);
}

const digitsStrings = getallDigitsAsStringsPartTwo(inputData);
const digitsNums = transferDigitsStringsToNums(digitsStrings);
const sum = sumArr(digitsNums);
console.log({sum})