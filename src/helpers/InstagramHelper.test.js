import InstagramHelper from './InstagramHelper';

describe('Instagram Helper removeNonAlphanumericChars', () => {
  test('it should remove non-alphanumeric characters', () => {
    const input = 'f(2321A_1';

    expect(InstagramHelper.removeNonAlphanumericChars(input)).toEqual(
      'f2321A_1',
    );
  });
});
