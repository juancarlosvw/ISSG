const crypto = require("crypto");

const alicePrivateKeyString = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNYHXRBEKtwBH8
6uRlK4Hxc0iWHO8JcqoVshraHZ5MaHoZIhHTRXzR7lcH7erdaJb1JZecUBOIilv2
CaiBjV4uSr1hQXteolYzJ/lTi5VNHD0LdKerUBIdQHuguC3vxffqO8gMi0L8O1a9
8HP/Sg6ZVOV4GprglbnLJhdCMOk9NrKlWUJhtAe3b4AVqU/VQupVRrWCiQkVCfOn
SmM24UQ6ivOn30bSM6pStdbZRU36yFpje11FaXbuecwmWsKKrcnYv4RvJD24BurI
Oh1F7gcV1uT9D+lRCreveQJfmJEQXlTMGG9bywYM3NHIdl+U94+eP7Q6h05IE6XF
8g87+3h/AgMBAAECggEADRfXtJrkoPNMRXpruiY80znp+3JeLBUf0i2rHmAVN483
k+k2OrWRrUglGA/Rnj25os8iBcI2V8kxiK0TJymhXF301qgk9Dw90GZ9gJdQmuLK
FedhFkzCAuEzOhe6PspS5LkP88csq5KHrdwQNEr/Ed5o/+NH7KAPAR9tPytWfnzx
ES6PFOD5Q/7xf/0edEFjEfJZfFjCU3+m83Z5LDWWKpkBBwiPrjJqE1O2pGckrqxV
6f963JeAwNKtkxg6AKB7KQllCnbmRjLOimK7ujQF2iZB+l9VVDdQdfFxZRO9EG8h
UoBMeRuVNXrmi5ZAEr2LezhKivoidd0OLA9JjfiZRQKBgQDs47Z4CQ5yaXQhLLYV
r5NkJ5swGa2nvW/kG/3IobxIxhcqy9iapar+eprlKovhSe6w2J+tiBlHjNfA/DKy
/r943TRVx3NLJaBQrw5HZ+ksamfUG3C1cu4iuZjk0+mrmA6N3PA3YkVYrMuFuzk4
8JyzDj7rNJ/SOUGkwMsT+HH3EwKBgQDd8fDofV6qGJU7FROy15RyT97p+0HYy1bt
n4R4J6269Hgrjc0Lpn1eSKAmqDyMGpkn8bjDlMDfoNn0T9tkM+JeffBpLzdKNYtf
+3+1rc0Rodmu9f58hVHm7ryviXHZQpnepP4KaZwIyf5pWkncdfJOUN7Gh/+AOXiA
gfDof7DKZQKBgEPrDdfgkNnQzlDsptAU5OdkS6RA2H8tWzVFqT+qz3b2BJJqm5HL
SfloYZyu1CglsF/X3AA+8zCGex2DsW2MiI04rtahNrcm9I3tguSKMFphr58qtufv
KcOe/u0srORb1mBqJh1a+ZLxB/ExurhOlD7qKLP7BI+bhuybsh3pr5MtAoGAdxQJ
5xLsqWJLHsnuKbQUh0hnFy6hY4mleBRv5G+VfIsRtnx8GNYYyW85zcPRyHG03oOI
WBcFbHZGuhfmY9qah4wWYrjcd0pHHxY2rOk071LhEkgVZAW7raVFQwEBPknHeHcZ
fciv2N9XSnsQyeHWQUKOZAIviUJMbtZIxNVNqykCgYBIA9fwOvegpzcCuWHO2ME0
psV2sj92WVtUXiEDK61eZTtmWpABVhN/H7ZOTxjVS0CQO/dSMTLk/mR/x0R4o3Is
f3rgTHmaHO9+W0TST59ajJ2iDw7i3+DbHB0KL1v7T6P+Q53GdZgRBwuAfiWvyJgm
RWzhSdY0+nU7iNYBQ0d5pw==
-----END PRIVATE KEY-----`;
const alicePublicKeyString = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWB10QRCrcAR/OrkZSuB
8XNIlhzvCXKqFbIa2h2eTGh6GSIR00V80e5XB+3q3WiW9SWXnFATiIpb9gmogY1e
Lkq9YUF7XqJWMyf5U4uVTRw9C3Snq1ASHUB7oLgt78X36jvIDItC/DtWvfBz/0oO
mVTleBqa4JW5yyYXQjDpPTaypVlCYbQHt2+AFalP1ULqVUa1gokJFQnzp0pjNuFE
Oorzp99G0jOqUrXW2UVN+shaY3tdRWl27nnMJlrCiq3J2L+EbyQ9uAbqyDodRe4H
Fdbk/Q/pUQq3r3kCX5iREF5UzBhvW8sGDNzRyHZflPePnj+0OodOSBOlxfIPO/t4
fwIDAQAB
-----END PUBLIC KEY-----`;
const bobPublicKeyString = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1EfJdrX+8+lxHJGcRyxe
YGN+cfIX7UoavvjhfoCC1QqRw7xNj0vOPGlvmLHJ9jDtF2ZwvTMrgYMMuIl+0aFQ
9auXOtIqulf9s2ixakf4GZdawL+UyJzPtC4MKrM6c4gQN3sbNDzQo6L2x//v576O
GGpPjFGVvbMw/h/DGDyqAaeLod9qZS67HBs3HtruoeVqMUNaIhsQ5Z58h20Jy+A6
+4AB5pxfkCm5etNDpMeRwmj//+aWYqYRLweXnsRcrtU8bK0aFrOa8RtYZ9z0Xh2Y
RTAn5NLoXQ0mhdO23wFbhcwuCnHoGFS7ObxOrbInhdpvMYFoNE/1fjr/Ea7pm5EH
7QIDAQAB
-----END PUBLIC KEY-----`;

const alicePrivateKey = crypto.createPrivateKey(alicePrivateKeyString);
const bobPublicKey = crypto.createPublicKey(bobPublicKeyString);
const alicePublicKey = crypto.createPublicKey(alicePublicKeyString);

const message = "I want some apples";
console.log("Message:", message);

const data = Buffer.from(message);
const signature = crypto.sign("sha256", data, alicePrivateKey);
console.log("Signature:", signature.toString("hex"));

const ciphertext = crypto.publicEncrypt(bobPublicKey, data);
console.log("Ciphertext:", ciphertext.toString("hex"));