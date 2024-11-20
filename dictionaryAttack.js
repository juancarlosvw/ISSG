const fs = require('fs');
const crypto = require('crypto');

function dictionaryAttack(targetHash, filePath) {
  try {
    const passwords = fs.readFileSync(filePath, 'utf-8').split('\n');

    for (const password of passwords) {
      const trimmedPassword = password.trim(); // Remove extra spaces/newlines
      const hash = crypto.createHash('md5').update(trimmedPassword).digest('hex');

      if (hash === targetHash) {
        return trimmedPassword; // Password found
      }
    }
    return null; // Password not found
  } catch (err) {
    console.error('Error reading the file:', err.message);
    return null;
  }
}

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';
const filePath = 'C:\\Users\\M.S.I\\DUMMYCHAT3\\500-worst-passwords.txt'; // Your file path

const password = dictionaryAttack(targetHash, filePath);

if (password) {
  console.log(`Bob's password is: ${password}`);
} else {
  console.log('Password not found in the dictionary.');
}
