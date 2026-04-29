// Invert the equation to solve for the missing operand(left)
const INVERSE_LEFT = { 
  '+': (r, b) => r - b, 
  '-': (r, b) => r + b, 
  '*': (r, b) => r / b, 
  '/': (r, b) => r / b, 
};
// Invert the equation to solve for the missing operand (right)
const INVERSE_RIGHT = { 
  '+': (r, a) => r - a, 
  '-': (r, a) => a - r, 
  '*': (r, a) => r / a, 
  '/': (r, a) => a / r, 
};

// Conventional equation (answer is after the '=', (result))
const FORWARD = { 
  '+': (a, b) => a + b, 
  '-': (a, b) => a - b, 
  '*': (a, b) => a * b, 
  '/': (a, b) => a / b,
};
// E.g. ? + 10 = 15 === 15 - 10 = 5
// E.g. 5 + ?  = 15 === 15 - 5  = 10
// E.g. 5 + 10 = ?  === 5  + 10 = 15

console.log("solveAlgebra Loaded.");

const solveAlgebra = ({ param1, param2, param3, param4 }) => {
  console.log("Values given to solveAlgebra", param1, param2, param3, param4);
  const operator = param2.value;

  // Evaluate the correct answer based on the hidden field's position
  let answer; 
  if (param1.hidden)      answer = INVERSE_LEFT[operator] (parseInt(param4.value), parseInt(param3.value));
  else if (param3.hidden) answer = INVERSE_RIGHT[operator](parseInt(param4.value), parseInt(param1.value));
  else if (param4.hidden) answer = FORWARD[operator]      (parseInt(param1.value), parseInt(param3.value));

  return {
    answer,
    missingField: param1.hidden ? 'param1' : param3.hidden ? 'param3' : 'param4'
  };
};

module.exports = { solveAlgebra };