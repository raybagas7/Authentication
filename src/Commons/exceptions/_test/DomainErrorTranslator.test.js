const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('', () => {
  it('should thanslate error correctly', () => {
    expect(
      DomainErrorTranslator.translate(
        new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
      )
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
      )
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena tipe data tidak sesuai'
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')
      )
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena karakter username melebihi batas limit'
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
      )
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena username mengandung karakter terlarang'
      )
    );
  });
});
