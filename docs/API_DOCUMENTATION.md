# 📡 EIRENE — REST API Specification

Base URL: `http://localhost:3000/api`

---

## 1. System & Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Returns server status, platform version, and uptime |
| `POST` | `/auth/login` | Public | Authenticates user; issues `auth_token` & `csrf_token` cookies |
| `POST` | `/auth/register` | Public | Registers a new family member account |
| `POST` | `/auth/logout` | Authenticated | Clears auth cookies and records `lastLogoutAt` |
| `GET` | `/auth/me` | Authenticated | Returns current authenticated user profile and active role |
| `POST` | `/auth/forgot-password`| Public | Initiates password reset email link |
| `POST` | `/auth/reset-password` | Public | Verifies token and updates account password |

---

## 2. Patients & Residents (`/api/patients`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/patients` | Admin, Doctor, Caregiver | Retrieves elderly residents directory |
| `POST` | `/patients` | Admin, Family | Registers a new resident profile |
| `GET` | `/patients/:id` | Authenticated (scoped) | Retrieves complete resident clinical summary |
| `PATCH` | `/patients/:id` | Admin | Updates resident personal details |
| `POST` | `/patients/:id/vitals` | Caregiver, Doctor | Records vital signs (BP, heart rate, temp, SpO2) |
| `GET` | `/patients/:id/vitals` | Doctor, Caregiver, Family | Historical vital signs timeline |

---

## 3. Prescriptions & Medication Logs (`/api/prescriptions`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/prescriptions` | Doctor | Issues structured digital prescription |
| `GET` | `/prescriptions/patient/:id` | Doctor, Caregiver, Family | Retrieves active and historical prescriptions |
| `POST` | `/prescriptions/:id/log` | Caregiver | Logs medication dose (`administered` / `missed`) |
| `GET` | `/prescriptions/logs/today` | Caregiver, Doctor | Daily dose administration schedule |

---

## 4. Channeling & Appointments (`/api/channeling-slots`, `/api/appointments`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/channeling-slots` | Admin | Creates doctor consultation session |
| `PATCH` | `/channeling-slots/:id/status` | Doctor | Doctor accepts or declines slot |
| `GET` | `/channeling-slots` | Authenticated | Lists available booking slots |
| `POST` | `/appointments` | Family | Books consultation slot and receives token number |
| `GET` | `/appointments/doctor/me` | Doctor | Lists scheduled appointments for logged-in physician |

---

## 5. Payments & Invoices (`/api/payments`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/payments/payhere/initiate` | Family | Generates PayHere signed checkout parameters |
| `POST` | `/payments/payhere/notify` | Public (Gateway) | PayHere server-to-server payment verification |
| `POST` | `/payments/bank-transfer` | Family | Submits bank transfer slip image for review |
| `PATCH` | `/payments/:id/approve` | Admin | Approves verified bank transfer deposit |
