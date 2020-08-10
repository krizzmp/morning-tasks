import crypto from "crypto";

export function hashPassword(
    password,
    salt,
    iterations = 10000,
    keyLength = 512,
    digest = "sha512"
): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keyLength, digest, function (
            err,
            dk
        ) {
            if (err) {
                return reject(err);
            }
            resolve(dk);
        });
    });
}
