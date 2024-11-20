const crypto = require('crypto');

function bruteForcePin(targetHash) {
  for (let i = 0; i <= 9999; i++) {
    // Format the number to 4 digits (e.g., 1 -> "0001")
    const pin = i.toString().padStart(4, '0');
    const hash = crypto.createHash('md5').update(pin).digest('hex');

    if (hash === targetHash) {
      return pin; // PIN found
    }
  }
  return null; // PIN not found
}

const targetHash = '5531a5834816222280f20d1ef9e95f69';
const pin = bruteForcePin(targetHash);

if (pin) {
  console.log(`Alice's PIN is: ${pin}`);
} else {
  console.log('PIN not found.');
}
