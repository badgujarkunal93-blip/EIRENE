# 🌿 EIRENE — Peace of Mind, Better Care
### Elderly Care & Medication Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Node: >=18](https://img.shields.io/badge/Node-%3E%3D18-forestgreen.svg)](https://nodejs.org/)
[![React: 19](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![NestJS: 10](https://img.shields.io/badge/NestJS-10.4-red.svg)](https://nestjs.com/)
[![PostgreSQL: 15+](https://img.shields.io/badge/PostgreSQL-15%2B-blue.svg)](https://www.postgresql.org/)

**Project Maintainer & Developer:** Kunal Badgujar ([@badgujarkunal93-blip](https://github.com/badgujarkunal93-blip))  
**Repository Destination:** [https://github.com/badgujarkunal93-blip/EIRENE](https://github.com/badgujarkunal93-blip/EIRENE)  

---

## 👨‍💻 Project Adaptation & Student Contributions

This project is an advanced adaptation of an open-source clinical framework, engineered into the **EIRENE** platform:

1. **Brand Identity & UI Modernization:** Redesigned the application identity, navigation, color palettes (Forest & Sage Green), typography, dashboard headers, metadata, and transactional email templates into the cohesive **EIRENE** brand.
2. **Environment & DevOps Architecture:** Designed and implemented multi-tier environment schemas (`.env` and `.env.example`) across both NestJS backend and Vite frontend, isolating secrets and supporting seamless onboarding.
3. **Containerization & Tooling:** Configured local Docker Compose environments for PostgreSQL and created cross-platform automation scripts (`start-all.ps1`, `start-all.sh`) for rapid developer startup.
4. **Health Monitoring & System Verification:** Integrated system health check probes, audited all 17 test suites (268 passing tests), and verified end-to-end production builds for React 19 and NestJS 10.
5. **Technical Documentation & Defense Toolkit:** Authored comprehensive architectural specifications, REST API references, database synchronization guides, and a faculty viva defense guide.

---

**EIRENE** is a full-stack clinical and administrative platform designed for modern elderly care homes. It seamlessly connects **super administrators**, **facility administrators**, **attending doctors**, **on-duty caregivers**, and **family members** under one unified, secure platform to coordinate personalized resident care, medical appointments, structured electronic prescriptions, vital signs monitoring, dose administration logging, payments, and disaster recovery.

---

## 📁 Repository Structure

```
EIRENE/
├── backend/      # NestJS 10 REST API (TypeScript, TypeORM, PostgreSQL)
└── frontend/     # React 19 SPA (Vite, TailwindCSS v4, React Router v7)
```

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **NestJS** | `^10.4.22` | Enterprise TypeScript framework (Dependency injection, Guards, Pipes) |
| **TypeORM** | `^0.3.28` | Object-Relational Mapper with PostgreSQL driver |
| **PostgreSQL** | `15+` | Primary relational database |
| **JWT (`@nestjs/jwt`)** | `^10.2.0` | Cryptographic session tokens delivered via HttpOnly cookies |
| **Cookie-Parser** | `^1.4.7` | Express cookie middleware for secure session & CSRF extraction |
| **Bcrypt** | `^5.1.1` | Password hashing (10 salt rounds) |
| **Helmet** | `^8.2.0` | HTTP security headers (XSS, clickjacking, no-sniff, HSTS) |
| **NestJS Throttler** | `^6.5.0` | Multi-tier rate limiting for brute-force defense |
| **AWS SDK v3 (`@aws-sdk/client-s3`)** | `^3.1103.0` | Automated database snapshot storage with AES-256 encryption |
| **Cloudinary** | `^2.10.0` | Cloud CDN storage for user avatar profiles |
| **Nodemailer** | `^8.0.5` | Transactional email delivery (SMTP via Gmail) |
| **Firebase Admin SDK** | `^13.8.0` | Google OAuth token verification and account federation |

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.3` | User interface library |
| **React Router** | `^7.11.0` | Client-side routing and protected route guards |
| **Vite** | `^7.3.2` | High-speed frontend build tool and development server |
| **TailwindCSS** | `^4.1.18` | Modern utility-first responsive styling |
| **Firebase Web SDK** | `^12.11.0` | Client-side Google authentication |
| **Native Fetch Client** | Built-in | Centralized HTTP client in `apiClient.ts` with CSRF & cookie credentials |

---

## ✨ Features & Role-Based Access Control (RBAC)

The platform enforces strict role boundaries across 5 specialized access tiers:

| Role | Operational Scope & Permissions |
| :--- | :--- |
| `super_admin` | Master system control, administrator account creation, and admin deactivation. |
| `admin` | Doctor, caregiver, and family account management; channeling slot creation; care plan catalog CRUD; bank transfer approval; facility contact settings; automated and manual S3 database backup & recovery. |
| `doctor` | Management of assigned consultation slots (accept/reject/fee update); scheduled appointment reviews; consolidated patient medical history inspection; electronic prescription issuing with structured dosages. |
| `caregiver` | Access to registered care-plan residents; vital signs recording (blood pressure, heart rate, temperature, SpO2, weight); qualitative daily care observations; medication administration status logging. |
| `family` | Elderly resident registration; care plan package subscription; doctor appointment booking; digital prescription review; online payments (PayHere gateway) and bank transfer slip uploads. |

---

## 🔐 Security Architecture

EIRENE implements an enterprise defense-in-depth model:

1. **HttpOnly Cookie Sessions:** Signed JWT tokens are stored exclusively in an `auth_token` cookie configured with `HttpOnly: true` and `SameSite: 'none'` (with `secure: true` in production), preventing credential theft via Cross-Site Scripting (XSS).
2. **Double-Submit CSRF Defense:** A cryptographically random token (`csrf_token`) is verified on every state-mutating request (`POST`, `PATCH`, `DELETE`) via `CsrfGuard` using `crypto.timingSafeEqual`.
3. **Session Revocation on Logout:** The database tracks `User.lastLogoutAt`. Incoming JWT tokens issued prior to the user's latest logout timestamp are rejected with `401 Unauthorized`.
4. **Brute-Force & Rate Limiting:** Global rate limiting (200 req/min) paired with strict authentication limits (5 logins/min). Accounts automatically enter a 15-minute lockout state after 5 consecutive failed password attempts.
5. **Role-Based Guards:** A global guard pipeline (`GlobalSecurityGuard` -> `AuthThrottlerGuard` -> `JwtAuthGuard` -> `CsrfGuard` -> `RolesGuard`) protects all endpoints by default unless explicitly decorated with `@Public()`.
6. **Encrypted Disaster Recovery:** Backup snapshots serialize database tables to JSON, compress with GZIP, encrypt with AES-256-CBC, and verify integrity via SHA-256 checksums before uploading to AWS S3.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** `>= 18.x`
* **PostgreSQL** `15+` (local or hosted on AWS RDS / Render / Supabase)
* **SMTP Credentials** (e.g., Gmail App Password for transactional emails)
* **Firebase Project** (for Google OAuth sign-in)
* **AWS S3 Bucket & IAM Credentials** (optional, for backup/restore features)
* **Cloudinary Account** (for avatar uploads)
* **PayHere Merchant Credentials** (for online card payments)

---

### Backend Setup

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/`:
   ```env
   # Application Environment
   PORT=3000
   NODE_ENV=development
   SYSTEM_NAME=EIRENE Care Platform
   APP_URL=http://localhost:5173

   # PostgreSQL Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_postgres_password
   DB_NAME=eirene_db

   # JWT Security
   JWT_SECRET=your_super_secret_jwt_key_32_chars_min
   JWT_EXPIRATION=24h

   # CORS Whitelist (comma-separated for multiple origins)
   CORS_ORIGIN=http://localhost:5173,http://localhost:5174

   # SMTP Notification Configuration (Gmail)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   MAIL_FROM=EIRENE <noreply@carehome.com>

   # Firebase Admin SDK (Google OAuth)
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   # Cloudinary (Profile Pictures)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # AWS S3 (Disaster Recovery Backups)
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your_eirene_backups_bucket
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   BACKUP_ENCRYPTION_KEY=your_32_byte_hex_encryption_key

   # PayHere Payment Gateway
   PAYHERE_MERCHANT_ID=your_payhere_merchant_id
   PAYHERE_MERCHANT_SECRET=your_payhere_merchant_secret
   PAYHERE_MODE=sandbox
   ```

3. Start the backend in development watch mode:
   ```bash
   npm run start:dev
   ```
   The backend API will run at: `http://localhost:3000/api`

---

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file in `frontend/`:
   ```env
   VITE_API_URL=http://localhost:3000/api

   # Firebase Web SDK
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will run at: `http://localhost:5173`

---

## 🧪 Testing & Verification

```bash
# Run backend unit tests (17 test suites covering auth, appointments, payments, etc.)
cd backend
npm run test

# Run backend test coverage
npm run test:cov

# Production build compilation
cd backend && npm run build
cd ../frontend && npm run build
```

---

## ⚠️ System Limitations & Operational Notes

In the interest of full technical transparency, the following design characteristics should be noted:
1. **Medication Administration Tracking:** When a caregiver marks a scheduled dose as "Missed" or "Administered", the record is stored in PostgreSQL as a clinical audit row. The system does not dispatch real-time emergency push notifications or SMS alerts upon a missed dose.
2. **Pooled Caregiver Model:** Caregivers currently access all residents registered with an active care plan in a facility-wide pooled model; individual 1-to-1 caregiver-patient schedule assignments are not partitioned in the database.
3. **Caregiver Shift View:** The weekly shift calendar rendered in `CareSchedule.tsx` is computed dynamically on the client via round-robin distribution for visual demonstration.
4. **Database Restore Permissions:** The automated database restore utility executes `SET session_replication_role = replica` to facilitate bulk table repopulation. In cloud PostgreSQL instances (such as AWS RDS), this requires appropriate superuser or replication privileges.
5. **Notification Channels:** System notifications are delivered asynchronously via Gmail SMTP. In-app notification center bells, WebSockets, and SMS integrations are not included.

---

## 📜 Original Authorship, Provenance & Licensing

EIRENE is an enhanced and rebranded adaptation based upon the foundational **Elderly Care Management System (ECMS)** open-source codebase, originally developed and authored by:

* **Poorna Danushka** ([@Poorna-danushka](https://github.com/Poorna-danushka)) — Core Authentication & Security Foundation, Admin Module, AWS S3 Backup & Recovery, Contact Inquiries, Email Templates.
* **Chathuni Janadhi** ([@chathunijanadhi](https://github.com/chathunijanadhi)) — Doctor Dashboard, Channeling Slot Lifecycle, Prescription Management, Medical History.
* **Chamalka Heshani** ([@Chamalka-heshi](https://github.com/Chamalka-heshi)) — Caregiver Dashboard, Vital Records Tracking, Care Notes, Medication Updates.
* **Sachin Silva** ([@Sachin-Silva](https://github.com/sachinmaleesha62)) — Admin UI Layouts, Public Components, Footers, and Dashboard Navigation.
* **Lisitha Kularathna** ([@lisithakularathna](https://github.com/lisithakularathna)) — Family Member Dashboard, Elderly Resident Profile Registration, About Page.

**Upstream Repository:** [https://github.com/Chamalka-heshi/Elderly-Home-Care-Management-System.git](https://github.com/Chamalka-heshi/Elderly-Home-Care-Management-System.git)  
**License:** Licensed under the [MIT License](https://opensource.org/licenses/MIT). Original copyright notices, licensing conditions, and commit histories are preserved in full accordance with open-source standards.
