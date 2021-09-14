import { cloneDeep } from 'lodash';
import { ToWords } from '../src/ToWords';
import knIn from '../src/locales/kn-IN';

const localeCode = 'kn-IN';
const toWords = new ToWords({
  localeCode,
});

describe('Test Locale', () => {
  test(`Locale Class: ${localeCode}`, () => {
    expect(toWords.getLocaleClass()).toBe(knIn);
  });

  const wrongLocaleCode = localeCode + '-wrong';
  test(`Wrong Locale: ${wrongLocaleCode}`, () => {
    const toWordsWrongLocale = new ToWords({
      localeCode: wrongLocaleCode,
    });
    expect(() => toWordsWrongLocale.convert(1)).toThrow(/Unknown Locale/);
  });
});

const testIntegers = [
  [0, 'ಸೊನ್ನೆ'],
  [137, 'ನೂರು ಮೂವತ್ಏಳು'],
  [700, 'ಏಳುನೂರು'],
  [1100, 'ಒಂದು ಸಾವಿರ ನೂರು'],
  [2100, 'ಎರಡು ಸಾವಿರ ನೂರು'],
  [4680, 'ನಾಲ್ಕು ಸಾವಿರ ಆರುನೂರು ಎಂಬತ್ತು'],
  [63892, 'ಅರವತ್ತ್ ಮೂರು ಸಾವಿರ ಎಂಟುನೂರು ತೊಂಬತ್ತೆರಡು'],
  [792581, 'ಏಳು ಲಕ್ಷ ತೊಂಬತ್ತೆರಡು ಸಾವಿರ ಐದುನೂರು ಎಂಬತ್ತೊಂದು'],
  [2741034, 'ಇಪ್ಪತ್ತ್’ಏಳು ಲಕ್ಷ ನಲವತ್ತೊಂದು ಸಾವಿರ ಮೂವತ್ತ್ ನಾಲ್ಕು'],
  [86429753, 'ಎಂಟು ಕೋಟಿ ಅರವತ್ತ್ ನಾಲ್ಕು ಲಕ್ಷ ಇಪ್ಪತ್ತ್’ಒಂಬತ್ತು ಸಾವಿರ ಏಳುನೂರು ಐವತ್ತಮೂರು'],
  [975310864, 'ತೊಂಬತ್ತೇಳು ಕೋಟಿ ಐವತ್ತಮೂರು ಲಕ್ಷ ಹತ್ತು ಸಾವಿರ ಎಂಟುನೂರು ಅರವತ್ತ್ ನಾಲ್ಕು'],
  [9876543210, 'ಒಂಬತ್ತುನೂರು ಎಂಬತ್ತೇಳು ಕೋಟಿ ಅರವತ್ತೈದು ಲಕ್ಷ ನಲವತ್ತ್ ಮೂರು ಸಾವಿರ ಎರಡುನೂರು ಹತ್ತು'],
  [98765432101, 'ಒಂಬತ್ತು ಸಾವಿರ ಎಂಟುನೂರು ಎಪ್ಪತ್ತಾರು ಕೋಟಿ ಐವತ್ತ್ನಾಲ್ಕು ಲಕ್ಷ ಮೂವತ್ತ್ಎರಡು ಸಾವಿರ ನೂರು ಒಂದು'],
  [987654321012, 'ತೊಂಬತ್ತೆಂಟು ಸಾವಿರ ಏಳುನೂರು ಅರವತ್ತೈದು ಕೋಟಿ ನಲವತ್ತ್ ಮೂರು ಲಕ್ಷ ಇಪ್ಪತ್ತ್’ಒಂದು ಸಾವಿರ ಹನ್ನೆರಡು'],
  [
    9876543210123,
    'ಒಂಬತ್ತು ಲಕ್ಷ ಎಂಬತ್ತೇಳು ಸಾವಿರ ಆರುನೂರು ಐವತ್ತ್ನಾಲ್ಕು ಕೋಟಿ ಮೂವತ್ತ್ಎರಡು ಲಕ್ಷ ಹತ್ತು ಸಾವಿರ ನೂರು ಇಪ್ಪತ್ತ್’ಮೂರು',
  ],
  [
    98765432101234,
    'ತೊಂಬತ್ತೆಂಟು ಲಕ್ಷ ಎಪ್ಪತ್ತಾರು ಸಾವಿರ ಐದುನೂರು ನಲವತ್ತ್ ಮೂರು ಕೋಟಿ ಇಪ್ಪತ್ತ್’ಒಂದು ಲಕ್ಷ ಒಂದು ಸಾವಿರ ಎರಡುನೂರು ಮೂವತ್ತ್ ನಾಲ್ಕು',
  ],
  // [98765432101234, 'अठ्ठ्याण्णव लाख शहात्तर हजार पाचशे त्रेचाळीस कोटी एकवीस लाख एक हजार दोनशे चौतीस'],
];

describe('Test Integers with options = {}', () => {
  test.each(testIntegers)('convert %d => %s', (input, expected) => {
    expect(toWords.convert(input as number)).toBe(expected);
  });
});

describe('Test Negative Integers with options = {}', () => {
  const testNegativeIntegers = cloneDeep(testIntegers);
  testNegativeIntegers.map((row, i) => {
    if (i === 0) {
      return;
    }
    row[0] = -row[0];
    row[1] = `ಮೈನಸ್ ${row[1]}`;
  });

  test.each(testNegativeIntegers)('convert %d => %s', (input, expected) => {
    expect(toWords.convert(input as number)).toBe(expected);
  });
});

describe('Test Integers with options = { currency: true }', () => {
  const testIntegersWithCurrency = cloneDeep(testIntegers);
  testIntegersWithCurrency.map((row) => {
    row[1] = `${row[1]} ರೂಪಾಯಿಗಳು ಮಾತ್ರ`;
  });

  test.each(testIntegersWithCurrency)('convert %d => %s', (input, expected) => {
    expect(toWords.convert(input as number, { currency: true })).toBe(expected);
  });
});

describe('Test Integers with options = { currency: true, doNotAddOnly: true }', () => {
  const testIntegersWithCurrency = cloneDeep(testIntegers);
  testIntegersWithCurrency.map((row) => {
    row[1] = `${row[1]} ರೂಪಾಯಿಗಳು`;
  });

  test.each(testIntegersWithCurrency)('convert %d => %s', (input, expected) => {
    expect(toWords.convert(input as number, { currency: true, doNotAddOnly: true })).toBe(expected);
  });
});

describe('Test Integers with options = { currency: true, ignoreZeroCurrency: true }', () => {
  const testIntegersWithCurrencyAndIgnoreZeroCurrency = cloneDeep(testIntegers);
  testIntegersWithCurrencyAndIgnoreZeroCurrency.map((row, i) => {
    row[1] = i === 0 ? '' : `${row[1]} ರೂಪಾಯಿಗಳು ಮಾತ್ರ`;
  });
  testIntegersWithCurrencyAndIgnoreZeroCurrency[0][1] = '';

  test.each(testIntegersWithCurrencyAndIgnoreZeroCurrency)('convert %d => %s', (input, expected) => {
    expect(
      toWords.convert(input as number, {
        currency: true,
        ignoreZeroCurrency: true,
      }),
    ).toBe(expected);
  });
});

const testFloats = [
  [0.0, 'ಸೊನ್ನೆ'],
  [0.04, 'ಸೊನ್ನೆ ಬಿಂದು ಸೊನ್ನೆ ನಾಲ್ಕು'],
  [0.0468, 'ಸೊನ್ನೆ ಬಿಂದು ಸೊನ್ನೆ ನಾಲ್ಕು ಆರು ಎಂಟು'],
  [0.4, 'ಸೊನ್ನೆ ಬಿಂದು ನಾಲ್ಕು'],
  [0.63, 'ಸೊನ್ನೆ ಬಿಂದು ಅರವತ್ತ್ ಮೂರು'],
  [0.973, 'ಸೊನ್ನೆ ಬಿಂದು ಒಂಬತ್ತುನೂರು ಎಪ್ಪತ್ತ್ ಮೂರು'],
  [0.999, 'ಸೊನ್ನೆ ಬಿಂದು ಒಂಬತ್ತುನೂರು ತೊಂಬತ್ತೊಂಬತ್ತು'],
  [37.06, 'ಮೂವತ್ಏಳು ಬಿಂದು ಸೊನ್ನೆ ಆರು'],
  [37.068, 'ಮೂವತ್ಏಳು ಬಿಂದು ಸೊನ್ನೆ ಆರು ಎಂಟು'],
  [37.68, 'ಮೂವತ್ಏಳು ಬಿಂದು ಅರವತ್ತೆಂಟು'],
  [37.683, 'ಮೂವತ್ಏಳು ಬಿಂದು ಆರುನೂರು ಎಂಬತ್ತ್ ಮೂರು'],
];

describe('Test Floats with options = {}', () => {
  test.each(testFloats)('convert %d => %s', (input, expected) => {
    expect(toWords.convert(input as number)).toBe(expected);
  });
});

const testFloatsWithCurrency = [
  [0.0, 'ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮಾತ್ರ'],
  [0.04, 'ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮತ್ತು ನಾಲ್ಕು ಪೈಸೆ ಮಾತ್ರ'],
  [0.0468, 'ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮತ್ತು ಐದು ಪೈಸೆ ಮಾತ್ರ'],
  [0.4, 'ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮತ್ತು ನಲವತ್ತು ಪೈಸೆ ಮಾತ್ರ'],
  [0.63, 'ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮತ್ತು ಅರವತ್ತ್ ಮೂರು ಪೈಸೆ ಮಾತ್ರ'],
  [0.973, 'ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮತ್ತು ತೊಂಬತ್ತೇಳು ಪೈಸೆ ಮಾತ್ರ'],
  [0.999, 'ಒಂದು ರೂಪಾಯಿಗಳು ಮಾತ್ರ'],
  [37.06, 'ಮೂವತ್ಏಳು ರೂಪಾಯಿಗಳು ಮತ್ತು ಆರು ಪೈಸೆ ಮಾತ್ರ'],
  [37.068, 'ಮೂವತ್ಏಳು ರೂಪಾಯಿಗಳು ಮತ್ತು ಏಳು ಪೈಸೆ ಮಾತ್ರ'],
  [37.68, 'ಮೂವತ್ಏಳು ರೂಪಾಯಿಗಳು ಮತ್ತು ಅರವತ್ತೆಂಟು ಪೈಸೆ ಮಾತ್ರ'],
  [37.683, 'ಮೂವತ್ಏಳು ರೂಪಾಯಿಗಳು ಮತ್ತು ಅರವತ್ತೆಂಟು ಪೈಸೆ ಮಾತ್ರ'],
];

describe('Test Floats with options = { currency: true }', () => {
  test.each(testFloatsWithCurrency)('convert %d => %s', (input, expected) => {
    expect(toWords.convert(input as number, { currency: true })).toBe(expected);
  });
});

describe('Test Floats with options = { currency: true, ignoreZeroCurrency: true }', () => {
  const testFloatsWithCurrencyAndIgnoreZeroCurrency = cloneDeep(testFloatsWithCurrency);
  testFloatsWithCurrencyAndIgnoreZeroCurrency[0][1] = '';
  testFloatsWithCurrencyAndIgnoreZeroCurrency.map((row, i) => {
    if (i === 0) {
      row[1] = '';
      return;
    }
    if (row[0] > 0 && row[0] < 1) {
      row[1] = (row[1] as string).replace(`ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮತ್ತು `, '');
    }
  });

  test.each(testFloatsWithCurrencyAndIgnoreZeroCurrency)('convert %d => %s', (input, expected) => {
    expect(
      toWords.convert(input as number, {
        currency: true,
        ignoreZeroCurrency: true,
      }),
    ).toBe(expected);
  });
});

describe('Test Floats with options = { currency: true, ignoreDecimal: true }', () => {
  const testFloatsWithCurrencyAndIgnoreDecimal = cloneDeep(testFloatsWithCurrency);
  testFloatsWithCurrencyAndIgnoreDecimal.map((row) => {
    if (row[0] === 0.999) {
      row[1] = `ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮಾತ್ರ`;
    } else {
      row[1] = (row[1] as string).replace(new RegExp(` ಮತ್ತು [\u0C80-\u0CFF ]+ ಪೈಸೆ`), '');
    }
  });

  test.each(testFloatsWithCurrencyAndIgnoreDecimal)('convert %d => %s', (input, expected) => {
    expect(
      toWords.convert(input as number, {
        currency: true,
        ignoreDecimal: true,
      }),
    ).toBe(expected);
  });
});

describe('Test Floats with options = { currency: true, ignoreZeroCurrency: true, ignoreDecimal: true }', () => {
  const testFloatsWithCurrencyAndIgnoreZeroCurrencyAndIgnoreDecimals = cloneDeep(testFloatsWithCurrency);
  testFloatsWithCurrencyAndIgnoreZeroCurrencyAndIgnoreDecimals[0][1] = '';
  testFloatsWithCurrencyAndIgnoreZeroCurrencyAndIgnoreDecimals.map((row) => {
    if (row[0] > 0 && row[0] < 1) {
      row[1] = '';
    }
    row[1] = (row[1] as string).replace(new RegExp(` ಮತ್ತು [\u0C80-\u0CFF ]+ ಪೈಸೆ`), '');
  });

  test.each(testFloatsWithCurrencyAndIgnoreZeroCurrencyAndIgnoreDecimals)('convert %d => %s', (input, expected) => {
    expect(
      toWords.convert(input as number, {
        currency: true,
        ignoreZeroCurrency: true,
        ignoreDecimal: true,
      }),
    ).toBe(expected);
  });
});
