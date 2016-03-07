
/**
 * Module dependencies.
 */

import UkModulusChecking from './../src';

const accounts = {
  invalid: [
    { number: '15763217', sortCode: '938063' },
    { number: '15764264', sortCode: '938063' },
    { number: '15764273', sortCode: '938063' },
    { number: '58716970', sortCode: '203099' },
    { number: '64371388', sortCode: '118765' },
    { number: '66374959', sortCode: '089999' },
    { number: '66831036', sortCode: '203099' },
    { number: '88837493', sortCode: '107999' }
  ],
  valid: [
    { number: '00000190', sortCode: '180002' },
    { number: '02355688', sortCode: '309070' },
    { number: '06774744', sortCode: '086090' },
    { number: '07806039', sortCode: '938611' },
    { number: '09123496', sortCode: '871427' },
    { number: '11104102', sortCode: '074456' },
    { number: '12345112', sortCode: '074456' },
    { number: '12345668', sortCode: '309070' },
    { number: '12345677', sortCode: '309070' },
    { number: '28748352', sortCode: '827101' },
    { number: '34012583', sortCode: '070116' },
    { number: '41011166', sortCode: '200915' },
    { number: '42368003', sortCode: '938600' },
    { number: '46238510', sortCode: '871427' },
    { number: '46238510', sortCode: '872427' },
    { number: '55065200', sortCode: '938063' },
    { number: '63748472', sortCode: '202959' },
    { number: '63849203', sortCode: '134020' },
    { number: '64371389', sortCode: '118765' },
    { number: '66374958', sortCode: '089999' },
    { number: '73688637', sortCode: '820000' },
    { number: '73988638', sortCode: '827999' },
    { number: '88837491', sortCode: '107999' },
    { number: '99123496', sortCode: '871427' },
    { number: '99345694', sortCode: '309070' },
    { number: '99345694', sortCode: '772798' }
  ]
};

/**
 * Test `UkModulusChecking`.
 */

describe('UkModulusChecking', () => {
  describe('isValid()', () => {
    accounts.invalid.forEach(function(account) {
      it(`should return false if sortCode is ${account.sortCode} and number is ${account.number}`, () => {
        const vocalink = new UkModulusChecking(account.sortCode, account.number);

        vocalink.isValid().should.be.false();
      });
    });

    accounts.valid.forEach(function(account) {
      it(`should return true if sortCode is ${account.sortCode} and number is ${account.number}`, () => {
        const vocalink = new UkModulusChecking(account.sortCode, account.number);

        vocalink.isValid().should.be.true();
      });
    });
  });
});
