const fillNumberPad = (number: number, length: number, pad = "0") => {
  let numString = number.toString();
  const lackOfDigit = length - numString.length;
  if (!lackOfDigit) return numString;
  for (let i = 0; i < lackOfDigit; i++) {
    numString = pad + numString;
  }
  return numString;
};
const separateNumber = (
  number: number,
  separateBy: string = " ",
  separateAt: number = 3
) => {
  const array = number.toString().split("");
  const length = array.length;
  return array
    .map((digit, index) =>
      (length - 1 - index) % separateAt == 0 ? digit + separateBy : digit
    )
    .join("");
};
export { fillNumberPad, separateNumber };
