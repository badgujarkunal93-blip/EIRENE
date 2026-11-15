# 🗄️ EIRENE — Database Configuration & Entity Guide

## 1. Quick Setup (PostgreSQL)

### Using Docker Compose (Recommended)
```bash
docker compose up -d
```
This automatically boots a PostgreSQL 16 container with `eirene_db` database, exposed on `localhost:5432`.

### Manual PostgreSQL Installation
```sql
CREATE USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE eirene_db OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE eirene_db TO postgres;
```

---

## 2. TypeORM Entity Architecture

All database tables are mapped via TypeORM entities under `backend/src/`:

| Entity | Table Name | Purpose |
| :--- | :--- | :--- |
| `User` | `users` | Accounts, hashed credentials, role, lockout status, `lastLogoutAt` |
| `Patient` | `patients` | Elderly resident demographic and medical profile |
| `DoctorProfile` | `doctor_profiles` | Specialization, medical license number, consultation charges |
| `CaregiverProfile` | `caregiver_profiles` | Shift schedule, qualifications, assigned wards |
| `ChannelingSlot` | `channeling_slots` | Doctor consultation sessions (date, start/end time, status) |
| `Appointment` | `appointments` | Booked patient consultation session with token number |
| `Prescription` | `prescriptions` | Medical prescription issued by attending physician |
| `PrescriptionItem` | `prescription_items` | Individual medications, dosages, frequency, duration |
| `MedicationLog` | `medication_logs` | Caregiver dosage administration tracking (`administered` / `missed`) |
| `VitalSign` | `vital_signs` | Blood pressure, heart rate, temperature, SpO2, glucose logs |
| `CarePlan` | `care_plans` | Facility care packages and pricing tiers |
| `Booking` | `bookings` | Resident care plan subscriptions |
| `Payment` | `payments` | Transactions, PayHere status, bank transfer deposit receipts |
| `BackupRecord` | `backup_records` | S3 database snapshot metadata, status, checksum, encryption key hash |

---

## 3. Schema Synchronization

* **Development (`NODE_ENV=development`):**  
  TypeORM runs with `synchronize: true`, automatically creating and updating relational schema tables matching TypeScript entity models upon server startup.
* **Production (`NODE_ENV=production`):**  
  Schema modifications must be applied via TypeORM migration scripts to prevent accidental data loss.
* **Timezone Safety:**  
  TypeORM enforces `timezone: 'Z'`, ensuring all timestamps are persisted and retrieved as standardized UTC ISO strings.
