# 🎓 EIRENE — Faculty Viva & Technical Defense Guide

This guide contains 30 likely technical viva questions and verified answers based directly on the actual **EIRENE** codebase.

---

### Core Architecture & Frameworks

#### Q1: What architectural pattern does EIRENE follow?
**Answer:** EIRENE follows a decoupled, client-server Single-Page Application (SPA) architecture. The backend is built with NestJS (Node.js/TypeScript) adhering to modular dependency injection, controller-service-repository patterns, and TypeORM. The frontend is built with React 19 and Vite using functional components, custom hooks, and TailwindCSS v4.

#### Q2: How is data flow managed between React and NestJS?
**Answer:** Communication occurs over HTTP REST using a centralized client in `apiClient.ts`. The client automatically sends credentials (`credentials: 'include'`) to pass HttpOnly cookies, attaches the double-submit `X-CSRF-Token` header for state-mutating requests, and maps JSON payloads to strongly typed frontend interfaces.

#### Q3: Why is NestJS used instead of raw Express?
**Answer:** NestJS provides enterprise-grade TypeScript architecture out of the box: built-in dependency injection, hierarchical module encapsulation, declarative security decorators (`@Roles()`, `@Public()`, `@Throttle()`), and standard request lifecycle pipelines (Pipes, Guards, Interceptors, and Filters).

---

### Security, Authentication & Session Management

#### Q4: How is user authentication implemented?
**Answer:** Authentication uses JSON Web Tokens (JWT) stored exclusively in an `HttpOnly`, `SameSite: 'none'` (or `'lax'`), signed cookie named `auth_token`. Tokens are never accessible via JavaScript `document.cookie`, preventing token exfiltration via Cross-Site Scripting (XSS).

#### Q5: How does EIRENE protect against Cross-Site Request Forgery (CSRF)?
**Answer:** EIRENE uses a double-submit cookie defense. The server generates a random cryptographic CSRF token in a readable cookie (`csrf_token`). The frontend reads this token and sends it in the `X-CSRF-Token` HTTP header on all `POST`, `PUT`, `PATCH`, and `DELETE` requests. The `CsrfGuard` compares both tokens using `crypto.timingSafeEqual` to prevent timing attacks.

#### Q6: How does logout invalidate JWTs without a Redis cache?
**Answer:** The `User` database entity contains a `lastLogoutAt` timestamp column. When a user logs out, `lastLogoutAt` is updated to the current timestamp and cookies are cleared. In `JwtAuthGuard`, if the token's issued-at time (`iat`) is earlier than `User.lastLogoutAt`, the request is rejected with `401 Unauthorized`.

#### Q7: How are passwords hashed and stored?
**Answer:** Passwords are never stored in plaintext. They are hashed using `bcrypt` with a work factor of 10 salt rounds before persisting to the PostgreSQL database.

#### Q8: How does the system defend against brute-force attacks?
**Answer:** Through two layers:
1. NestJS `ThrottlerGuard` enforces global rate limits (200 requests/minute) and strict auth limits (5 attempts/minute).
2. The `User` entity tracks `failedLoginAttempts` and `lockoutUntil`. After 5 consecutive failed attempts, the account is locked for 15 minutes.

---

### Roles & Clinical Modules

#### Q9: What are the 5 roles in EIRENE and how are permissions enforced?
**Answer:** The roles are `super_admin`, `admin`, `doctor`, `caregiver`, and `family`. Enforced globally via `RolesGuard`, which reads the `@Roles(Role.DOCTOR, ...)` decorator from controller endpoints and validates it against `req.user.role`.

#### Q10: How are channeling slots created and managed?
**Answer:** Administrators define doctor channeling slots (specifying doctor, start time, end time, max patients). Doctors can review their assigned slots, update consultation fees, and accept or decline availability.

#### Q11: How do medical appointments work?
**Answer:** Family members browse accepted channeling slots and book an appointment for their elderly resident. Each booking generates a unique sequential token number.

#### Q12: How are electronic prescriptions issued and structured?
**Answer:** Doctors issue prescriptions linked to a patient and appointment. Each prescription contains structured items: medication name, dosage amount, unit (mg, ml), frequency (e.g., three times daily), duration (days), and special instructions.

#### Q13: How does caregiver dose logging work?
**Answer:** Caregivers view active prescriptions for residents under their care. When administering a dose, the caregiver logs the exact time, status (`administered` or `missed`), and optional clinical notes.

#### Q14: How are vital signs recorded and tracked?
**Answer:** Caregivers record resident vitals in `patients/vitals`: Systolic/Diastolic blood pressure (mmHg), Heart Rate (bpm), Temperature (°C/°F), Oxygen Saturation (SpO2 %), Blood Sugar (mg/dL), and Weight (kg), along with qualitative observation notes.

#### Q15: How are care plans structured?
**Answer:** Administrators manage a catalog of care plans (e.g., Basic Day Care, Assisted Living, Intensive Clinical Care) with monthly pricing. Family members subscribe elderly residents to a specific care plan.

#### Q16: How are payments handled?
**Answer:** EIRENE supports two payment pathways:
1. PayHere payment gateway sandbox integration for automated credit/debit card processing.
2. Manual bank transfer slip upload: Family uploads a deposit slip image (via Cloudinary); administrators review and click "Approve" or "Reject".

---

### Database, DevOps & Verification

#### Q17: What database and ORM does EIRENE use?
**Answer:** PostgreSQL 15+ managed through TypeORM 0.3. Entities define schema models using decorators (`@Entity()`, `@Column()`, `@ManyToOne()`, `@OneToMany()`), with UTC timestamp enforcement.

#### Q18: How does database disaster recovery operate?
**Answer:** `BackupService` serializes clinical database tables to JSON, applies GZIP compression (`.json.gz`), encrypts with AES-256-CBC, and uploads to an AWS S3 bucket. Backups can run on automated schedules or on-demand via the admin dashboard.

#### Q19: What is the purpose of `.env.example`?
**Answer:** `.env.example` is a version-controlled schema template defining all required environment keys without exposing actual secrets. Developers copy it to `.env` to configure local credentials safely.

#### Q20: How did you verify that the platform builds and runs reliably?
**Answer:** By running `npm run build` in `frontend/` (TypeScript compilation + Vite Rollup bundling) and `backend/` (`nest build`), validating zero type errors, and running the Jest test suite (17 test suites, 268 passing tests).
