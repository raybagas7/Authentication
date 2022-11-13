/* eslint object-curly-newline: ["error", "never"] */

const UserRepository = require('../UserRepository');

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new UserRepository();

    // Action & Assert
    await expect(userRepository.addUser({})).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      userRepository.verifyAvailableUsername('')
    ).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
