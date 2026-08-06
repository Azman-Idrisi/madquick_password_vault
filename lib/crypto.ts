import "server-only";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.CRYPTO_KEY;
if (!SECRET_KEY) throw new Error("Missing CRYPTO_KEY");

export const encryptData = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
