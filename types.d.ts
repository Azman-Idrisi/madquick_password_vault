

/// <reference types="node" />


declare namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      JWT_SECRET: string;
      NEXT_PUBLIC_API_URL?: string;
      CRYPTO_KEY: string;
    }
  }
  

  interface IUser {
    _id?: string;
    email: string;
    password: string; 
  }
  

  interface IVaultItem {
    _id?: string;
    userId: string;
    title: string;
    username: string;
    password: string; 
    url?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
  }
  

  interface PasswordOptions {
    length: number;
    includeNumbers: boolean;
    includeSymbols: boolean;
    includeLowercase: boolean;
    includeUppercase: boolean;
    excludeLookAlike?: boolean; 
  }
  

  interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
  }
  

  interface EncryptedData {
    cipherText: string;
    iv?: string;
  }

  // Module declarations
  declare module 'zxcvbn';
  declare module 'crypto-js';
  