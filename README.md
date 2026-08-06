## TreePass PassVault

A minimal, privacy-first password manager MVP built with Next.js (App Router), TypeScript, and MongoDB. Users can generate strong passwords, save them to a personal vault, and manage entries securely. This README follows the “Assignment: Password Generator + Secure Vault (MVP)” brief.

### Features
- Strong password generator with options: length, uppercase/lowercase, numbers, symbols, exclude look‑alikes
- Simple auth (email + password) with JWT sessions
- Vault items: title, username, password, URL, notes
- Client-side encryption of passwords before they hit the server
- Copy to clipboard with auto-clear after ~15s
- Basic search/filter on vault list

### Nice-to-haves (partially covered)
- Dark UI theme
- Editable items with created/updated timestamps

---

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- MongoDB + Mongoose
- Styling with Tailwind classes
- Crypto: `crypto-js` AES for server-side encryption
- Auth: JWT (signed with `JWT_SECRET`)

---

## Security Model (Short Note on Crypto Choice)
- We use AES via `crypto-js` to encrypt the password field **server‑side** using a key from `CRYPTO_KEY` (server-only, never sent to the browser). The client sends/receives plaintext over HTTPS; the DB only ever stores ciphertext.
- Rationale: `crypto-js` is simple and widely used. In production, prefer per‑item IVs and authenticated encryption (AES-GCM) over a static key.

---

## Project Structure
```text
app/
  api/
    auth/
      register/route.tsx       # POST /api/auth/register
      login/route.tsx          # POST /api/auth/login
      change-password/route.ts # PUT  /api/auth/change-password
    vault/
      create/route.ts          # POST /api/vault/create
      list/route.ts            # GET  /api/vault/list
      update/[id]/route.ts     # PUT  /api/vault/update/:id
      delete/[id]/route.ts     # DELETE /api/vault/delete/:id
components/                    # UI: auth, vault list/detail, generator
lib/
  db.ts                        # Mongo connection helper
  crypto.ts                    # AES encrypt/decrypt helpers (client)
models/
  Users.ts                     # User model (email, hashed password)
  VaultItem.ts                 # Vault item model
types.d.ts                     # Shared types and env declarations
```

---

## Setup
### Prerequisites
- Node.js 18+
- MongoDB connection string

### Environment Variables
Create a `.env.local` file at the project root:

```env
MONGO_URI="YOUR_MONGODB_URI"
JWT_SECRET="a-long-random-secret"
CRYPTO_KEY="a-long-random-secret"
```

Notes:
- `CRYPTO_KEY` is used server‑side only (in API routes) to encrypt/decrypt vault passwords. It is never exposed to the client bundle.

### Install & Run
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Build & Start
```bash
npm run build
npm start
```

---

## API Reference
All routes are under Next.js App Router API and return JSON.


---

## Server-Side Encryption
Location: `lib/crypto.ts` (marked `server-only`, imported only by API routes)

```ts
import "server-only";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.CRYPTO_KEY;

export const encryptData = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
```

Usage: UI encrypts before POST/PUT; UI decrypts after GET to display.

---

## User Flow (Acceptance)
1. Register → Login to receive JWT
2. Generate a password in the modal/component (copy auto‑clears after ~15s)
3. Create a vault item; password is encrypted client‑side
4. List shows items with search; select to view details
5. Edit or Delete existing items

---


### Demo Video
- Demo video: <https://youtu.be/fFkwWO-2OBs>

---

## Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start"
}
```

---

