# TreePass Vault

A privacy-focused password vault built with **Next.js, React, TypeScript, MongoDB, and Mongoose**.

TreePass lets users create an account, sign in with JWT authentication, generate strong passwords, securely store credentials in a personal vault, and manage saved entries from a clean web interface.

> **Status:** MVP / Personal Project

## Features

### Authentication

* Email/password registration and login
* JWT-based authentication
* Persistent client-side session
* Logout
* Change account password with current-password verification

### Password Generator

* Configurable password length from **8–32 characters**
* Uppercase and lowercase characters
* Numbers and symbols
* Optional removal of look-alike characters such as `i`, `l`, `1`, `L`, `o`, `0`, and `O`
* Password strength estimation using `zxcvbn`
* Copy generated passwords to clipboard
* Automatically clears the generated password from the generator after approximately 15 seconds

### Password Vault

* Store:

  * Service / website name
  * Username
  * Password
  * URL
  * Notes
* Search and filter vault entries
* View saved credentials
* Create new entries
* Edit existing entries
* Delete entries
* Created and updated timestamps

### Security

* Account passwords hashed with `bcrypt`
* Vault passwords encrypted using AES before database storage
* JWT-protected vault API routes
* User-specific vault access
* Encryption key and JWT secret stored as server-side environment variables

### UI

* Responsive interface
* Light and dark themes
* Modal-based password generator
* Modal-based change-password flow
* Clean vault sidebar and detail views

---

## Tech Stack

| Layer             | Technology     |
| ----------------- | -------------- |
| Framework         | Next.js 15     |
| Frontend          | React 19       |
| Language          | TypeScript     |
| Styling           | Tailwind CSS 4 |
| Database          | MongoDB        |
| ODM               | Mongoose       |
| HTTP Client       | Axios          |
| Authentication    | JSON Web Token |
| Password Hashing  | bcrypt         |
| Vault Encryption  | crypto-js AES  |
| Password Strength | zxcvbn         |

---

## Architecture

```text
Browser
   │
   ├── Authentication
   │     ├── Register
   │     └── Login
   │
   ├── Vault Interface
   │     ├── List / Search
   │     ├── Create
   │     ├── View
   │     ├── Edit
   │     └── Delete
   │
   └── Password Generator
           │
           ▼
     Next.js API Routes
           │
           ├── JWT Verification
           ├── bcrypt Password Hashing
           ├── AES Encryption / Decryption
           └── MongoDB / Mongoose
```

---

## Project Structure

```text
app/
├── api/
│   ├── auth/
│   │   ├── register/route.tsx
│   │   ├── login/route.tsx
│   │   └── change-password/route.ts
│   │
│   └── vault/
│       ├── create/route.ts
│       ├── list/route.ts
│       ├── update/[id]/route.ts
│       └── delete/[id]/route.ts
│
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── AuthContext.tsx
├── LoginForm.tsx
├── RegisterForm.tsx
├── ChangePasswordModal.tsx
├── PasswordGenerator.tsx
├── PasswordGeneratorModal.tsx
├── Vault.tsx
├── VaultSidebar.tsx
├── VaultItemForm.tsx
├── VaultItemView.tsx
├── VaultDetailPanel.tsx
├── ThemeContext.tsx
└── ThemeToggle.tsx

lib/
├── crypto.ts
└── db.ts

models/
├── Users.ts
└── VaultItem.ts

types.d.ts
next.config.ts
package.json
```

---

## Security Model

### Account Passwords

User account passwords are never stored as plaintext.

They are hashed using `bcrypt` before being stored in MongoDB.

When changing a password, the application:

1. Verifies the JWT.
2. Finds the authenticated user.
3. Verifies the current password with `bcrypt`.
4. Hashes the new password.
5. Stores the new hash.

### Vault Passwords

Vault passwords are encrypted using AES through `crypto-js`.

The encryption helper is marked as server-only and reads the encryption key from:

```env
CRYPTO_KEY
```

Vault API requests are authenticated using JWT Bearer tokens, and vault records are associated with the authenticated user's ID.

```text
User Password
     │
     ▼
  bcrypt
     │
     ▼
MongoDB

Vault Password
     │
     ▼
AES Encryption
     │
     ▼
MongoDB
```

> **Security Notice:** This is an MVP security implementation and has not been professionally audited. The current implementation uses AES through `crypto-js` with an environment-provided secret. A production-grade password manager should additionally consider authenticated encryption such as AES-GCM, per-item nonces/IVs, stronger key-management practices, secure HTTP-only cookies, CSRF protection, rate limiting, secure headers, and independent security review.

---

## API Reference

All API routes are relative to the application origin.

For local development:

```text
http://localhost:3000
```

### Authentication

#### Register

```http
POST /api/auth/register
Content-Type: application/json
```

Request:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

---

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Request:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

The login endpoint returns a JWT token used to authenticate protected endpoints.

---

### Change Password

```http
PUT /api/auth/change-password
Authorization: Bearer <JWT>
Content-Type: application/json
```

Request:

```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

---

## Vault API

All vault endpoints require:

```http
Authorization: Bearer <JWT>
```

### Create Vault Entry

```http
POST /api/vault/create
Content-Type: application/json
```

Request:

```json
{
  "title": "GitHub",
  "username": "user@example.com",
  "password": "generated-password",
  "url": "https://github.com",
  "notes": "Personal account"
}
```

The password is encrypted before the vault document is stored.

---

### List Vault Entries

```http
GET /api/vault/list
Authorization: Bearer <JWT>
```

The API returns the authenticated user's vault entries sorted by creation time.

---

### Update Vault Entry

```http
PUT /api/vault/update/<id>
Authorization: Bearer <JWT>
Content-Type: application/json
```

---

### Delete Vault Entry

```http
DELETE /api/vault/delete/<id>
Authorization: Bearer <JWT>
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGO_URI="your-mongodb-connection-string"
JWT_SECRET="a-long-random-secret"
CRYPTO_KEY="a-long-random-secret"
```

### Variables

| Variable     | Purpose                                            |
| ------------ | -------------------------------------------------- |
| `MONGO_URI`  | MongoDB connection string                          |
| `JWT_SECRET` | Secret used to sign and verify JWTs                |
| `CRYPTO_KEY` | Server-side AES encryption key for vault passwords |

**Never commit `.env.local` or real secrets to Git.**

---

## Getting Started

### Prerequisites

Make sure you have:

* Node.js 18+
* npm
* MongoDB or MongoDB Atlas
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/Azman-Idrisi/madquick_password_vault.git
cd madquick_password_vault
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create:

```text
.env.local
```

and add:

```env
MONGO_URI="your-mongodb-connection-string"
JWT_SECRET="a-long-random-secret"
CRYPTO_KEY="a-long-random-secret"
```

### 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server with Turbopack.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server.

---

## User Flow

```text
Register
   │
   ▼
Login
   │
   ▼
Vault
   │
   ├── Generate Password
   │
   ├── Create Entry
   │
   ├── Search Entries
   │
   ├── View Entry
   │
   ├── Edit Entry
   │
   ├── Delete Entry
   │
   └── Change Account Password
```

---

## Password Generator

The built-in generator supports:

* Password length: **8–32 characters**
* Lowercase letters
* Uppercase letters
* Numbers
* Symbols
* Look-alike character exclusion
* Password strength estimation

Example generated password configuration:

```text
Length:              16
Uppercase:           ✓
Lowercase:           ✓
Numbers:             ✓
Symbols:             ✓
Exclude look-alikes: ✓
```

Password strength is evaluated using `zxcvbn`.

---

## Current Limitations

This project is currently an MVP and should not be considered a production-grade password manager.

Potential areas for future hardening include:

* Authenticated encryption such as AES-GCM
* Per-entry IV / nonce management
* Secure HTTP-only cookie-based sessions
* CSRF protection
* API rate limiting
* Stronger key-management infrastructure
* Security headers
* Password reset / account recovery
* Multi-factor authentication
* Security audit and penetration testing

---

## License

No license is currently specified for this repository.

If you plan to distribute TreePass as open-source software, add an appropriate `LICENSE` file.
