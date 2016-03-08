
/**
 * Module dependencies.
 */

import { positions } from './constants';
import LineReader from 'n-readlines';

/**
 * Export UkModulusChecking.
 */

export default class UkModulusChecking {

  /**
   * Constructor.
   */

  constructor(sortCode = '', accountNumber = '') {
    this.accountNumber = this.sanitize(accountNumber);
    this.sortCode = this.sanitize(sortCode);
    this.sortCodeSubstitutes = this.loadScsubtab();
    this.weightTable = this.loadValacdos();
  }

  /**
   * Get check weight.
   */

  getCheckWeight(check, number) {
    if (check.exception === 2) {
      if (this.pickPosition(number, 'a') !== 0 && this.pickPosition(number, 'g') !== 9) {
        return [0, 0, 1, 2, 5, 3, 6, 4, 8, 7, 10, 9, 3, 1];
      }

      if (this.pickPosition(number, 'a') !== 0 && this.pickPosition(number, 'g') === 9) {
        return [0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 10, 9, 3, 1];
      }
    }

    if (check.exception === 7) {
      if (this.pickPosition(number, 'g') === 9) {
        return [0, 0, 0, 0, 0, 0, 0, 0, check.c, check.d, check.e, check.f, check.g, check.h];
      }
    }

    if (check.exception === 10) {
      const ab = number.charAt(positions.a) + number.charAt(positions.b);

      if (ab === '09' || ab === '99' && this.pickPosition(number, 'b') === 9) {
        return [0, 0, 0, 0, 0, 0, 0, 0, check.c, check.d, check.e, check.f, check.g, check.h];
      }
    }

    return [check.u, check.v, check.w, check.x, check.y, check.z, check.a, check.b, check.c, check.d, check.e, check.f, check.g, check.h];
  }

  /**
   * Get number to be used in validation process. (sorting code + account number).
   */

  getNumber(check, number) {
    let sortCode = this.sortCode;

    number = number || this.accountNumber;

    if (check.exception === 5) {
      sortCode = this.getSubstitute(sortCode) || sortCode;
    } else if (check.exception === 8) {
      sortCode = '090126';
    } else if (check.exception === 9) {
      sortCode = '309634';
    }

    return `${sortCode}${number}`;
  }

  /**
   * Get sorting code checks.
   */

  getSortCodeChecks() {
    const checks = [];
    const sortCode = parseInt(this.sortCode);

    for (let check of this.weightTable) {
      // All checks containing the sort code in the `weight range` can/must be performed.
      if (sortCode >= check.start && sortCode <= check.end) {
        checks.push(check);
      }

      // There may be one or two entries in the table for the sorting code,
      // depending on whether one or two modulus checks must be carried out.
      if (checks.length === 2) {
        return checks;
      }
    }

    return checks;
  }

  /**
   * Sorting code substitution.
   */

  getSubstitute(sortCode) {
    for (let substitute of this.sortCodeSubstitutes) {
      if (substitute.original === parseInt(sortCode)) {
        return parseInt(substitute.substitute);
      }
    }

    return parseInt(sortCode);
  }

  /**
   * Is check skippable.
   */

  isCheckSkippable(check, number) {
    if (check.exception === 3 && (this.pickPosition(number, 'c') === 6 || this.pickPosition(number, 'c') === 9)) {
      return true;
    }

    if (check.exception === 6 && this.pickPosition(number, 'a') >= 4 && this.pickPosition(number, 'a') <= 8 && this.pickPosition(number, 'g') === this.pickPosition(number, 'h')) {
      return true;
    }

    return false;
  }

  /**
   * Is check valid.
   */

  isCheckValid(check, number) {
    number = this.getNumber(check, number);

    if (this.isCheckSkippable(check, number)) {
      return true;
    }

    const module = check.mod === 'MOD11' ? 11 : 10;
    const weight = this.getCheckWeight(check, number);

    // Multiply each number in the sorting code and account number with the corresponding number in the weight.
    let weightedAccount = [];

    for (let i = 0; i < 14; i++) {
      weightedAccount[i] = parseInt(number.charAt(i)) * parseInt(weight[i]);
    }

    // Add all the results together.
    if (check.mod === 'DBLAL') {
      weightedAccount = weightedAccount.join('').split('');
    }

    let total = weightedAccount.reduce((previous, current) => parseInt(previous) + parseInt(current));

    // This effectively places a financial institution number (580149) before the sorting code and account
    // number which is subject to the alternate doubling as well.
    if (check.exception === 1) {
      total += 27;
    }

    // Calculate remainder.
    const remainder = total % module;

    // Exception handling.
    if (check.exception === 4) {
      return remainder === this.pickPosition(number, 'g') + this.pickPosition(number, 'h');
    }

    if (check.exception === 5) {
      if (check.mod === 'DBLAL') {
        if (remainder === 0 && this.pickPosition(number, 'h') === 0) {
          return true;
        }

        return this.pickPosition(number, 'h') === (10 - remainder);
      } else {
        if (remainder === 1) {
          return false;
        }

        if (remainder === 0 && this.pickPosition(number, 'g') === 0) {
          return true;
        }

        return this.pickPosition(number, 'g') === (11 - remainder);
      }
    }

    return remainder === 0;
  }

  /**
   * Is valid.
   */

   isValid() {
     const checks = this.getSortCodeChecks();

     // If no range is found that contains the sorting code, there is no modulus check that can be performed.
     // The sorting code and account number should be presumed valid unless other evidence implies otherwise.
     if (checks.length === 0) {
       return true;
     }

     const firstCheck = checks[0];

     if (this.isCheckValid(firstCheck)) {
       if (checks.length === 1 || [2, 9, 10, 11, 12, 13, 14].indexOf(firstCheck.exception) !== -1) {
         return true;
       }

       // Verify second check.
       return this.isCheckValid(checks[1]);
     } else {
       if (firstCheck.exception === 14) {
         if ([0, 1, 9].indexOf(parseInt(this.accountNumber.charAt(7))) === -1) {
           return false;
         }

         //  If the 8th digit is 0, 1 or 9, then remove the digit from the account number and insert a 0 as the 1st digit for check purposes only
         return this.isCheckValid(checks[0], `0${this.accountNumber.substring(7, 0)}`);
       }

       if (checks.length === 1 || [2, 9, 10, 11, 12, 13, 14].indexOf(firstCheck.exception) === -1) {
         return false;
       }

       // Verify second check.
       return this.isCheckValid(checks[1]);
     }
   }

  /**
   * Load scsubtab file.
   */

  loadScsubtab() {
    const reader = new LineReader(`${__dirname}/data/scsubtab.txt`);
    const scsubtab = [];
    let line;

    while (line = reader.next()) {
      const data = line.toString().split(/\s+/);

      scsubtab.push({
        original: parseInt(data[0]),
        substitute: parseInt(data[1])
      });
    }

    return scsubtab;
  }

  /**
   * Load Valacdos file.
   */

  loadValacdos() {
    const reader = new LineReader(`${__dirname}/data/valacdos-v370.txt`);
    const valacdos = [];
    let line;

    while (line = reader.next()) {
      const data = line.toString().split(/\s+/);

      /* jscs:disable validateOrderInObjectKeys */
      valacdos.push({
        start: parseInt(data[0]),
        end: parseInt(data[1]),
        mod: data[2],
        u: parseInt(data[3]),
        v: parseInt(data[4]),
        w: parseInt(data[5]),
        x: parseInt(data[6]),
        y: parseInt(data[7]),
        z: parseInt(data[8]),
        a: parseInt(data[9]),
        b: parseInt(data[10]),
        c: parseInt(data[11]),
        d: parseInt(data[12]),
        e: parseInt(data[13]),
        f: parseInt(data[14]),
        g: parseInt(data[15]),
        h: parseInt(data[16]),
        exception: parseInt(data[17]) || null
      });
    }
    /* jscs:enable validateOrderInObjectKeys */

    return valacdos;
  }

  /**
   * Pick position in number.
   */

   pickPosition(number, position) {
     return parseInt(number.charAt(positions[position]));
   }

  /**
   * Sanitize.
   */

  sanitize(value) {
    if (typeof value === 'string' || value instanceof String) {
      return value.replace(/-/g, '');
    }

    throw new Error('Invalid value');
  }
}
