// A RESOLVER object containing the logic to validate, 
// solve and render each question_type of the application
// Checks if the value passed contains only numbers
const isValidNumber = (v) => v?.value && /^\d+$/.test(v.value.trim());

// Greatest Common Divisor util (GCD)
const gcd = (x,y) => y ? gcd(y, x % y) : x;

// Lowest Common Multiple util (LCM) 
const lcm = (x,y) => (x * y) / gcd(x,y);

export const RESOLVER = {
  // ******************* NUMBER *******************
  number_addition: {
    validate: ({ num0, num1 }) => [num0, num1].every(isValidNumber),

    solve: ({ num0, num1 }) => parseInt(num0.value) + parseInt(num1.value),

    render: ({ num0, num1 }) => `${num0.value} + ${num1.value}`
  },

  number_subtraction: {
    validate: ({ num0, num1 }) => 
      [num0, num1].every(isValidNumber)
      && parseInt(num0.value) >= parseInt(num1.value),

    solve: ({ num0, num1 }) => parseInt(num0.value) - parseInt(num1.value),

    render: ({ num0, num1 }) => `${num0.value} - ${num1.value}`
  },

  number_multiplication: {
    validate: ({ num0, num1 }) =>
      [num0, num1].every(isValidNumber),
    solve: ({ num0, num1 }) =>
      parseInt(num0.value) * parseInt(num1.value),
    render: ({ num0, num1 }) =>
      `${num0.value} \\times ${num1.value}`
  },

  number_division: {
    validate: ({ num0, num1 }) =>
      [num0, num1].every(isValidNumber)
      && parseInt(num1.value) !== 0
      && parseInt(num0.value) >= parseInt(num1.value),
    solve: ({ num0, num1 }) => ({
      quotient: Math.floor(parseInt(num0.value) / parseInt(num1.value)),
      remainder: parseInt(num0.value) % parseInt(num1.value)
    }),
    render: ({ num0, num1 }) =>
      `${num0.value} \\div ${num1.value}`
  },
  // ********************************************************************************* //

  // ******************* NUMBER -> FRACTIONS *******************
  fraction_addition: {
    validate: ({ param1, param2, param3, param4 }) =>
      [param1, param2, param3, param4].every(isValidNumber)
      && parseInt(param2.value) !== 0
      && parseInt(param4.value) !== 0,

    solve: ({ param1, param2, param3, param4 }) => {
      const n1 = parseInt(param1.value.trim());
      const d1 = parseInt(param2.value.trim());
      const n2 = parseInt(param3.value.trim());
      const d2 = parseInt(param4.value.trim());

      const common = lcm(d1,d2);

      const numerator = n1 * (common / d1) + n2 * (common / d2);

      const divisor = gcd(numerator, common);

      return {
        numerator: numerator / divisor,
        denominator: common / divisor
      }
    },

    render: ({ param1, param2, param3, param4 }) => 
      `\\frac{${param1.value}}{${param2.value}} + \\frac{${param3.value}}{${param4.value}}`
  },

  fraction_subtraction: {
    validate: ({ param1, param2, param3, param4 }) =>
      [param1, param2, param3, param4].every(isValidNumber)
      && parseInt(param2.value) !== 0
      && parseInt(param4.value) !== 0,

    solve: ({ param1, param2, param3, param4 }) => {
      const n1 = parseInt(param1.value.trim());
      const d1 = parseInt(param2.value.trim());
      const n2 = parseInt(param3.value.trim());
      const d2 = parseInt(param4.value.trim());

      const common = lcm(d1,d2);

      const numerator = n1 * (common / d1) - n2 * (common / d2);

      const divisor = gcd(Math.abs(numerator), common);

      return {
        numerator: numerator / divisor,
        denominator: common / divisor
      }
    },

    render: ({ param1, param2, param3, param4 }) => 
      `\\frac{${param1.value}}{${param2.value}} - \\frac{${param3.value}}{${param4.value}}`
  },

  fraction_multiplication: {
    validate: ({ param1, param2, param3, param4 }) =>
    [param1, param2, param3, param4].every(isValidNumber)
    && parseInt(param2.value) !== 0
    && parseInt(param4.value) !== 0,

    solve: ({ param1, param2, param3, param4 }) => {
      const n1 = parseInt(param1.value.trim());
      const d1 = parseInt(param2.value.trim());
      const n2 = parseInt(param3.value.trim());
      const d2 = parseInt(param4.value.trim());

      // Multiply opposite values
      let numerator = n1 * n2;
      let denominator = d1 * d2;

      // Simplify down
      const divisor = gcd(numerator, denominator);

      return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
      };
    },

    render: ({ param1, param2, param3, param4 }) => 
      `\\frac{${param1.value}}{${param2.value}} \\times \\frac{${param3.value}}{${param4.value}}`
  },

  fraction_division: {
    validate: ({ param1, param2, param3, param4 }) =>
      [param1, param2, param3, param4].every(isValidNumber)
      && parseInt(param2.value) !== 0
      && parseInt(param4.value) !== 0,
    solve: ({ param1, param2, param3, param4 }) => {
      const n1 = parseInt(param1.value.trim());
      const d1 = parseInt(param2.value.trim());
      const n2 = parseInt(param3.value.trim());
      const d2 = parseInt(param4.value.trim());

      // Follows Keep, Change, Flip method
      let numerator = n1 * d2;
      let denominator = d1 * n2;

      if (denominator === 0) throw new Error ("Invalid fraction (division by zero)");

      // Simplify the result
      const divisor = gcd(numerator, denominator);

      return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
      };
    },

    render: ({ param1, param2, param3, param4 }) =>
      `\\frac{${param1.value}}{${param2.value}} \\div \\frac{${param3.value}}{${param4.value}}`
  },

  fraction_count_up: {
    validate: ({ param1, param2, param3, param4, param5 }) =>
      [param1, param2, param3, param4, param5].every(isValidNumber)
      && parseInt(param2.value) !== 0
      && parseInt(param4.value) !== 0,

    solve: ({ param1, param2, param3, param4, param5 }) => {
      const startN = parseInt(param1.value.trim());
      const startD = parseInt(param2.value.trim());
      const stepN  = parseInt(param3.value.trim());
      const stepD  = parseInt(param4.value.trim());
      const steps  = parseInt(param5.value.trim());

      const common = lcm(startD, stepD);

      const sequence = [];
      let currentN = startN * (common / startD);
      const stepNormalised = stepN * (common / stepD);

      for (let i = 0; i < steps; i++) {
        const divisor = gcd(currentN, common);
        sequence.push({
          numerator: currentN / divisor,
          denominator: common / divisor
        });
        currentN += stepNormalised;
      }
      return { sequence, stepNumerator: stepN, stepDenominator: stepD };
    },

    render: ({ param1, param2, param3, param4 }) =>
    `\\frac{${param1.value}}{${param2.value}}, \\frac{${param3.value}}{${param4.value}}, \\ldots`
  },

  fraction_decimals: {
    validate: ({ param1, param2, param3 }) => {
      if (![param1, param2].every(isValidNumber)) return false;
      // Checks for whole number and up to two decimal places
      if (!/^\d+(\.\d{1,2})?$/.test(param3?.value)) return false;

      const validDenominators = [2, 3, 4, 5, 8, 10, 100];
      return validDenominators.includes(parseInt(param2.value));
    },

    solve: ({ param1, param2, param3 }) => ({
      fraction: { numerator: parseInt(param1.value), denominator: parseInt(param2.value) },
      decimal: parseFloat(param3.value)
    }),

    render: ({ param1, param2, param3 }) =>
      `\\frac{${param1.value}}{${param2.value}} = ${param3.value}`
  },

  fraction_decimals_percentages: {
    validate: ({ param1, param2, param3, param4 }) => {
      if (![param1, param2].every(isValidNumber)) return false;
      // Checks for whole number and up to two decimal places
      if (!/^\d+(\.\d{1,2})?$/.test(param3?.value)) return false;
      if (!/^\d+$/.test(param4?.value)) return false;

      const validDenominators = [2, 3, 4, 5, 8, 10, 100];
      return validDenominators.includes(parseInt(param2.value));
    },

    solve: ({ param1, param2, param3, param4 }) => ({
      fraction: { numerator: parseInt(param1.value), denominator: parseInt(param2.value) },
      decimal: parseFloat(param3.value),
      percentage: parseInt(param4.value)
    }),

    render: ({ param1, param2, param3, param4 }) =>
      `\\frac{${param1.value}}{${param2.value}} = ${param3.value} = ${param4.value}\\%`
  },

  // ******************* Algebra *******************
  algebra_missing_number: {
    validate: ({ param1, param2, param3, param4 }) => {
      if (![param1, param3, param4].every(isValidNumber)) return false;
      const validOperators = ['+', '-', '*', '/'];
      if (!validOperators.includes(param2?.value)) return false;

      const operators = { '+': (a,b) => a+b, '-': (a,b) => a-b, '*': (a,b) => a*b, '/': (a,b) => a/b };
      const computed = operators[param2.value](parseInt(param1.value), parseInt(param3.value));
      return computed === parseInt(param4.value);
    },

    solve: ({ param1, param2, param3, param4 }) => {
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
    },

    render: ({ param1, param2, param3, param4 }) => {
      let operator;
      
      switch (param2.value) {
        case '+':
          operator = '+';
          break;
        case '-':
          operator = '-';
          break;
        case '*':
          operator = `\\times`
          break;
        case '/':
          operator = `\\div`
          break;
        default:
          break;
      }

      return `${param1.hidden ? `\\square` : param1.value} ${operator} ${param3.hidden ? `\\square` : param3.value} = ${param4.hidden ? `\\square` : param4.value}`;
    }
  }
};

export default RESOLVER;