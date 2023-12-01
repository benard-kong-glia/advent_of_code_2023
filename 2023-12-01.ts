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

function transferDigitsStringsToNums(digitsArr: string[]) {
    return digitsArr.map((digit) => Number(digit));
}

function sumArr(digitsArr: number[]) {
    return digitsArr.reduce((acc, curr) => acc + curr, 0);
}

const digitsStrings = getAllDigitsAsStrings(inputData);
const digitsNums = transferDigitsStringsToNums(digitsStrings);
const sum = sumArr(digitsNums);
console.log({sum})