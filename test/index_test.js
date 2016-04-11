
/**
 * Module dependencies.
 */

import UkModulusChecking from './../src';

const accounts = {
  invalid: [
    { accountNumber: '15763217', sortCode: '938063' },
    { accountNumber: '15764264', sortCode: '938063' },
    { accountNumber: '15764273', sortCode: '938063' },
    { accountNumber: '58716970', sortCode: '203099' },
    { accountNumber: '64371388', sortCode: '118765' },
    { accountNumber: '66374959', sortCode: '089999' },
    { accountNumber: '66831036', sortCode: '203099' },
    { accountNumber: '88837493', sortCode: '107999' }
  ],
  valid: [
    { accountNumber: '00000190', sortCode: '180002' },
    { accountNumber: '02355688', sortCode: '309070' },
    { accountNumber: '06774744', sortCode: '086090' },
    { accountNumber: '07806039', sortCode: '938611' },
    { accountNumber: '09123496', sortCode: '871427' },
    { accountNumber: '11104102', sortCode: '074456' },
    { accountNumber: '12345112', sortCode: '074456' },
    { accountNumber: '12345668', sortCode: '309070' },
    { accountNumber: '12345677', sortCode: '309070' },
    { accountNumber: '28748352', sortCode: '827101' },
    { accountNumber: '34012583', sortCode: '070116' },
    { accountNumber: '41011166', sortCode: '200915' },
    { accountNumber: '42368003', sortCode: '938600' },
    { accountNumber: '46238510', sortCode: '871427' },
    { accountNumber: '46238510', sortCode: '872427' },
    { accountNumber: '55065200', sortCode: '938063' },
    { accountNumber: '63748472', sortCode: '202959' },
    { accountNumber: '63849203', sortCode: '134020' },
    { accountNumber: '64371389', sortCode: '118765' },
    { accountNumber: '66374958', sortCode: '089999' },
    { accountNumber: '73688637', sortCode: '820000' },
    { accountNumber: '73988638', sortCode: '827999' },
    { accountNumber: '88837491', sortCode: '107999' },
    { accountNumber: '99123496', sortCode: '871427' },
    { accountNumber: '99345694', sortCode: '309070' },
    { accountNumber: '99345694', sortCode: '772798' }
  ]
};

/**
 * Test `UkModulusChecking`.
 */

describe('UkModulusChecking', () => {
  describe('isValid()', () => {
    accounts.invalid.forEach(account => {
      it(`should return false if sort code is ${account.sortCode} and account number is ${account.accountNumber}`, () => {
        new UkModulusChecking({ accountNumber: account.accountNumber, sortCode: account.sortCode }).isValid().should.be.false();
      });
    });

    accounts.valid.forEach(account => {
      it(`should return true if sort code is ${account.sortCode} and account number is ${account.accountNumber}`, () => {
        new UkModulusChecking({ accountNumber: account.accountNumber, sortCode: account.sortCode }).isValid().should.be.true();
      });
    });
  });
});
