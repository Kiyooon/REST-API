import crypto from 'crypto';

// Secret key used for hashing
const SECRET = 'KIYOON-REST-API';

// Generates a random string of 128 bytes encoded in base64
export const random = () => crypto.randomBytes(128).toString('base64');

// Hashes the password using HMAC with SHA-256 algorithm
// The hash is generated using a combination of the salt and password,
// and the result is further hashed with a secret key.
export const authentication = (salt: string, password: string) => {
    // Create HMAC (Hash-based Message Authentication Code) using SHA-256
    // The input is a combination of the salt and password joined by a '/'.
    // The SECRET is used to create the final hash.
    return crypto.createHmac('sha256', [salt, password].join('/'))
        .update(SECRET) // Add the SECRET to the HMAC hash
        .digest('hex'); // Output the hash as a hexadecimal string
};
