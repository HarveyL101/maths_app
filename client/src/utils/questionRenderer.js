export const QUESTION_RENDERER = {
  // ******************* NUMBER *******************
  number_addition: ({ num0, num1 }) => {
    const a = num0?.value;
    const b = num1?.value;
    // Protects against crashing on load
    if (!a || !b) return "";

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) {
      return `
        \\begin{array}{c}
        \\text{Please use positive whole numbers only}
        \\end{array}
      `;
    }

    const aDigits = a.split("");
    const bDigits = b.split("");

    const maxDigits = Math.max(aDigits.length, bDigits.length); // allows for dynamic inputs independant of length
    const totalCols = maxDigits + 1; // extra column for  the operator (+)

    // Pads both numbers from the left to enforce H, T, U places
    const paddedA = Array(maxDigits - aDigits.length).fill("").concat(aDigits);
    const paddedB = Array(maxDigits - bDigits.length).fill("").concat(bDigits);

    // Row 1: clears first column before num1 starts
    const row1 = ["", ...paddedA].join(" & ");

    // Row 2: + in the first column before num2 starts
    const row2 = ["+"].concat(paddedB).join(" & ");

    return `
      \\begin{array}{${"c".repeat(totalCols)}}
        ${row1} \\\\
        ${row2} \\\\
        \\hline \\\\
        \\hline
      \\end{array}
    `;
  },

  number_subtraction: ({ num0, num1 }) => {
    const a = num0?.value;
    const b = num1?.value;
    // protects against crashing on load
    if (!a || !b) return "";

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) {
      return `
      \\begin{array}{c}
      \\text{Please use positive whole numbers only}
      \\end{array}
      `;
    }

    const aDigits = a.split("");
    const bDigits = b.split("");

    if (aDigits.length < bDigits.length) {
      return `
      \\begin{array}{c}
      \\text{The second input cannot be larger than the first}
      \\end{array}
      `;
    }
    
    const maxDigits = Math.max(aDigits.length, bDigits.length);
    const totalCols = maxDigits + 1;

    // pads both numbers from the left to enforce H, T, U places
    const paddedA = Array(maxDigits - aDigits.length).fill("").concat(aDigits);
    const paddedB = Array(maxDigits - bDigits.length).fill("").concat(bDigits);

    // Row1: clears first column before num1 starts
    const row1 = ["", ...paddedA].join(" & ");

    // Row2: preceds the second row with the relevant operator (-)
    const row2 = ["-"].concat(paddedB).join(" & ");

    return `
      \\begin{array}{${"c".repeat(totalCols)}}
        ${row1} \\\\
        ${row2} \\\\
        \\hline \\\\
        \\hline
      \\end{array}
    `;
  },

  number_multiplication: ({ num0, num1 }) => {
    const a = num0?.value;
    const b = num1?.value;
    // protects against crashing on load
    if (!a || !b) return "";

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) {
      return `
      \\begin{array}{c}
      \\text{Please use positive whole numbers only}
      \\end{array}
      `;
    }

    const aDigits = a.split("");
    const bDigits = b.split("");

    const maxDigits = Math.max(aDigits.length, bDigits.length); // alows for dynamic inputs independant of length
    const timesDigits = (parseInt(a) * parseInt(b)).toString().split("");
    const totalCols = Math.max(maxDigits + 1, timesDigits.length); // extra column is for the relevant operator (x)

    // pads both numbers from the left to enforce H, T, U places
    const paddedA = Array(maxDigits - aDigits.length).fill("").concat(aDigits);
    const paddedB = Array(maxDigits - bDigits.length).fill("").concat(bDigits);

    // Row1 clears first column before the start of num1
    const row1 = Array(totalCols - (paddedA.length + 1))
    .fill("")
    .concat("", ...paddedA)
    .join(" & ");
    // Row2 preceds num2 with the relevant operator (x)
    // Need to double check whether an `x` or KaTeX's `\times` will render correctly here
    const row2 = Array(totalCols - (paddedB.length + 1))
    .fill("")
    .concat("\\times", ...paddedB)
    .join(" & ");

    return `
      \\begin{array}{${"c".repeat(totalCols)}}
        ${row1} \\\\
        ${row2} \\\\
        \\hline \\\\
        \\hline
      \\end{array}
    `;
  },

  number_division: ({ num0, num1 }) => {
    const a = parseInt(num0?.value);
    const b = parseInt(num1?.value);
    // protects against crashing on load
    if (!a || !b) return "";

    if (isNaN(a) || isNaN(b)) return "";
    // Divide by zero protection
    if (b === 0) return `\\text{Cannot divide by zero}`;
    // Checking for bottom heavy divisions
    if (b > a) return `\\text{The second input cannot be larger than the first}`;

    return `${b} \\overline{)${a}}`;
  },

  // ******************* NUMBER -> FRACTIONS *******************
  fraction_addition: ({ param1, param2, param3, param4 }) => {
    const p1 = param1?.value;
    const p2 = param2?.value;
    const p3 = param3?.value;
    const p4 = param4?.value;
    
    // Protects against crashing on load
    if (!p1 || !p2 || !p3 || !p4) return "";

    if (
      !/^\d+$/.test(p1) ||
      !/^\d+$/.test(p2) ||
      !/^\d+$/.test(p3) ||
      !/^\d+$/.test(p4)
    ) return `\\text{Invalid input}`;

    const n1 = Number(p1);
    const d1 = Number(p2);
    const n2 = Number(p3);
    const d2 = Number(p4);

    // Protects against invalid fractions
    if (d1 === 0 || d2 === 0) {
      return `\\text{Denominator cannot be zero}`;
    }

    // Check if the denominators are the same (Year 3/4)
    if (d1 === d2) {
      return `
        \\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}
        =
      `;
    }

    // Check if a denominator is a multiple of the other (Year 5 Skill)
    if (d1 % d2 === 0 || d2 % d1 === 0) {
      const commonDenom = Math.max(d1, d2);

      const a = n1 * (commonDenom / d1);
      const b = n2 * (commonDenom / d2);

      const numerator = a + b;

      return `
        \\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}
        =
        \\frac{${a}}{${commonDenom}} + \\frac{${b}}{${commonDenom}}
        =
      `;
    }

    return `\\text{Unsuitable denominators for KS2 fraction addition}`;
  },

  fraction_subtraction: ({ param1, param2, param3, param4 }) => {
    const p1 = param1?.value;
    const p2 = param2?.value;
    const p3 = param3?.value;
    const p4 = param4?.value;

    // Protects against crashing on load
    if (!p1 || !p2 || !p3 || !p4) return "";

    if (
      !/^\d+$/.test(p1) ||
      !/^\d+$/.test(p2) ||
      !/^\d+$/.test(p3) ||
      !/^\d+$/.test(p4)
    ) return `\\text{Invalid Input}`;

    const n1 = Number(p1);
    const d1 = Number(p2);
    const n2 = Number(p3);
    const d2 = Number(p4);

    // Protects against invalid fractions
    if (d1 === 0 || d2 === 0) {
      return `
        \\text{Denominator cannot be zero}
      `;
    }

    // Check if the denominators are the same (Year 3/4)
    if (d1 === d2) {
      return `
        \\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}}
        = \\frac{${n1 - n2}}{${d1}}
      `;
    }

    // Check if a denominator is a multiple of the other (Year 5 Skill)
    if (d1 % d2 === 0 || d2 % d1 === 0) {
      const commonDenom = Math.max(d1, d2);

      const newA = n1 * (commonDenom / d1);
      const newC = n2 * (commonDenom / d2);

      const numerator = newA - newC;

      if (numerator < 0) {
        return `
          \\text{Negative fractions are not currently permitted :/}
        `;
      } else {
        return `
          \\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}}
          =
          \\frac{${newA}}{${commonDenom}} - \\frac{${newC}}{${commonDenom}}
          =
          \\frac{${numerator}}{${commonDenom}}
        `;
      }
    }

    return `\\text{Unsuitable denominators for KS2 fraction subtraction}`;
  },

  fraction_multiplication: ({ param1, param2, param3, param4 }) => {
    const p1 = param1?.value;
    const p2 = param2?.value;
    const p3 = param3?.value;
    const p4 = param4?.value;

    if (!p1 || !p2 || !p3 || !p4) return "";

    if ([p1, p2, p3, p4].some(p => !/^\d+$/.test(p))) return `\\text{Invalid input}`;

    if (parseInt(p2) === 0 || parseInt(p4) === 0) return `\\text{Denominator cannot be zero}`;

    const n1 = parseInt(p1);
    const d1 = parseInt(p2);
    const n2 = parseInt(p3);
    const d2 = parseInt(p4);

    const baseNumerator = n1 * n2;
    const baseDenominator = d1 * d2;

    const gcd = (x,y) => y ? gcd(y, x % y) : x;
    const divisor = gcd(baseNumerator, baseDenominator);

    return `
      \\frac{${p1}}{${p2}} \\times \\frac{${p3}}{${p4}}
      = \\frac{${baseNumerator}}{${baseDenominator}}
      = \\frac{${baseNumerator / divisor}}{${baseDenominator / divisor}}
    `;
  },

  fraction_division: ({ param1, param2, param3, param4 }) => {
    const p1 = param1?.value;
    const p2 = param2?.value;
    const p3 = param3?.value;
    const p4 = param4?.value;

    if (!p1 || !p2 || !p3 || !p4) return "";

    if ([p1, p2, p3, p4].some(p => !/^\d+$/.test(p)))
      return `\\text{Invalid input}`;

    if (parseInt(p2) === 0 || parseInt(p4) === 0)
      return `\\text{Denominator cannot be zero}`;

    const n1 = parseInt(p1);
    const d1 = parseInt(p2);
    const n2 = parseInt(p3);
    const d2 = parseInt(p4);

    // Follows Keep Change Flip method
    const baseNumerator = n1 * d2;
    const baseDenominator = d1 * n2;

    if (baseDenominator === 0) return `\\text{Invalid, cannot divide by zero}`;

    const gcd = (x,y) => y ? gcd(y, x % y) : x;
    const divisor = gcd(baseNumerator, baseDenominator);

    return `
      \\frac{${p1}}{${p2}} \\div \\frac{${p3}}{${p4}}
      = \\frac{${p1}}{${p2}} \\times \\frac{${p4}}{${p3}}
      = \\frac{${baseNumerator}}{${baseDenominator}}
      = \\frac{${baseNumerator / divisor}}{${baseDenominator / divisor}}
    `;
  },

  fraction_count_up: ({ param1, param2, param3, param4, param5 }) => {
    const p1 = param1?.value; // Starting numerator
    const p2 = param2?.value; // Starting denominator
    const p3 = param3?.value; // Step numerator
    const p4 = param4?.value; // Step denominator
    const p5 = param5?.value; // Number of steps to show

    if (!p1 || !p2 || !p3 ||!p4 || !p5) return "";

    if ([p1, p2, p3, p4, p5].some(p => !/^\d+$/.test(p))) return `\\text{Invalid input}`;

    const startN = Number(p1);
    const startD = Number(p2);
    const stepN = Number(p3);
    const stepD = Number(p4);
    const steps = Number(p5);

    if (startD === 0 || stepD === 0) return `\\text{Denominator cannot be zero}`;
    if (steps < 2 || steps > 8) return `\\text{Steps must be between 2 and 8}`;

    if (startD !== stepD) return `\\text{Start and step must share the same denominator}`;

    const sequence = [];
    for (let i = 0; i < steps; i++) {
        sequence.push(`\\frac{${startN + stepN * i}}{${startD}}`);
    }

    return sequence.join(" \\rightarrow ") + "  \\rightarrow \\ldots";
  },

  fraction_decimals: ({ param1, param2, param3 }) => {
    const p1 = param1?.value; // Numerator
    const p2 = param2?.value; // Denominator
    const p3 = param3?.value; // Decimal

    if (!p1 || !p2 || !p3) return "";

    // Is given value a whole number
    if (!/^\d+$/.test(p1) || !/^\d+$/.test(p2))
      return `\\text{Numerator and denominator must be whole numbers}`;

    // Does given value contain either 1 or 2 decimal places
    if (!/^\d+(\.\d{1,2})?$/.test(p3))
      return `\\text{Decimal must have 1 or 2 decimal places}`;

    const validDenominators = [2, 3, 4, 5, 8, 10, 100];
    if (!validDenominators.includes(parseInt(p2)))
      return `\\text{Denominator must be one of: 2, 3, 4, 5, 8, 10, 100}`;

    const fraction = params.param1?.hidden ? "?" : `\\frac{${p1}}{${p2}}`;
    const decimal  = params.param3?.hidden ? "?" : p3;

    return `${fraction} = ${decimal}`;
  },

  fractions_decimals_percentages: ({ param1, param2, param3, param4 }) => {
    const p1 = param1?.value; // Numerator
    const p2 = param2?.value; // Denominator
    const p3 = param3?.value; // Decimal
    const p4 = param4?.value; // Percentage

    if (!p1 || !p2 || !p3 || !p4) return "";
    
    // Is given value a whole number
    if (!/^\d+$/.test(p1) || !/^\d+$/.test(p2))
      return `\\text{Numerator and denominator must be whole numbers}`;

    // Does given value contain either 1 or 2 decimal places
    if (!/^\d+(\.\d{1,2})?$/.test(p3))
      return `\\text{Decimal must have 1 or 2 decimal places}`;
    
    // Is given value a whole number
    if (!/^\d+$/.test(p4))
      return `\\text{Percentage must be a whole number}`;

    const validDenominators = [2, 3, 4, 5, 8, 10, 100];
    if (!validDenominators.includes(parseInt(p2)))
      return `\\text{Denominator must be one of: 2, 3, 4, 5, 8, 10, 100}`;

    const fraction   = param1?.hidden ? "?" : `\\frac{${p1}}{${p2}}`;
    const decimal    = param3?.hidden ? "?" : p3;
    const percentage = param4?.hidden ? "?" : `${p4}\\%`;

    return `${fraction} = ${decimal} = ${percentage}`;
  }
}

export default QUESTION_RENDERER;