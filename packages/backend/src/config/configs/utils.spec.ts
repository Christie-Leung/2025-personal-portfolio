import * as utils from '~/config/configs/utils';

describe('utils', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = { ...OLD_ENV };
  });

  describe('getRequiredEnv', () => {
    it('should fetch required parameter', () => {
      const test = 'test value';
      process.env.FOO = test;
      const value = utils.getRequiredEnv<string>('FOO');

      expect(value).toEqual(test);
    });

    it('should throw an exception because variable is not found', (done) => {
      try {
        utils.getRequiredEnv<string>('FOO');
      } catch (e) {
        expect(e.message).toContain('not found');
        done();
      }
    });
  });

  describe('getOptionalEnv', () => {
    it('should fetch parameter', () => {
      const test = 'test value';
      process.env.FOO = test;
      const value = utils.getOptionalEnv<string>('FOO');

      expect(value).toEqual(test);
    });

    it('should not throw even if not found', () => {
      const value = utils.getOptionalEnv<string>('FOO');
      expect(value).toBeNull();
    });
  });
});
