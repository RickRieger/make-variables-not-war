// Extra test added during the 2026 cleanup (not part of the original assignment).
// The original tests only check that mySentence is a string, which let a
// sentence with no spaces between the words pass.
const { myFirstName, myLastName, myBestFriend, mySentence } = require('./main.js');

describe('mySentence (readability)', () => {
  it('uses all three name variables', () => {
    expect(mySentence).toContain(myFirstName);
    expect(mySentence).toContain(myLastName);
    expect(mySentence).toContain(myBestFriend);
  });

  it('puts a space between the first and last name', () => {
    expect(mySentence).toContain(`${myFirstName} ${myLastName}`);
  });

  it('has no words run together around the names', () => {
    expect(mySentence).not.toMatch(new RegExp(`\\w${myFirstName}|${myLastName}\\w|\\w${myBestFriend}`));
  });
});
