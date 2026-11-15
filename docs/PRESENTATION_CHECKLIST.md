# 📋 EIRENE — Final Project Presentation & Defense Checklist

## 1. 5-Minute Live Presentation Script

### Slide 1: Introduction & Motivation (1 minute)
* "Good morning/afternoon, professors. Today I am presenting **EIRENE**, a comprehensive elderly care and medication management platform designed for residential care homes."
* "The motivation is addressing the high risk of medication errors, fragmented communication between doctors and caregivers, and anxiety experienced by family members who cannot physically be present."

### Slide 2: Architectural Foundation & Tech Stack (1 minute)
* "The platform is engineered using modern enterprise standards: a **React 19** Single-Page Application paired with a **NestJS 10** REST API and **PostgreSQL 15** with TypeORM."
* "Security is built directly into the request pipeline using **HttpOnly JWT cookies**, **Double-Submit CSRF protection**, **bcrypt password hashing**, and **global rate limiting**."

### Slide 3: 5 Key Role Workflows (1.5 minutes)
1. **Super Admin & Facility Admin:** Facility accounts, doctor channeling slot creation, care package management, and S3 database backups.
2. **Doctor:** Channeling slot management, consultation fee configuration, and issuing structured digital prescriptions.
3. **Caregiver:** Viewing care-plan residents, recording real-time vital signs (blood pressure, SpO2, heart rate), and logging administered vs. missed medication doses.
4. **Family:** Registering elderly relatives, booking doctor consultation slots, subscribing to care plans, and making payments online or via bank deposit slips.

### Slide 4: Verification & Engineering Rigor (1 minute)
* "All 17 test suites (268 unit tests) pass without errors."
* "Production builds pass cleanly across Vite and NestJS."
* "Environment isolation is enforced via `.env` pipelines and containerized PostgreSQL."

### Slide 5: Conclusion & Q&A (30 seconds)
* "EIRENE delivers peace of mind for families and clinical clarity for care homes. I am now open to your questions."

---

## 2. Live Demo Path (2-3 Minutes)

1. **Step 1:** Open `http://localhost:5173/` — show the polished **EIRENE** landing page, brand mission, and navigation.
2. **Step 2:** Log in as **Doctor** — show the consultation dashboard, doctor channeling slots, and digital prescription creation.
3. **Step 3:** Log in as **Caregiver** — open the medication administration board and log a dose as "administered". Show vital signs entry.
4. **Step 4:** Log in as **Family Member** — show registered elderly parent profile, view latest vital signs chart, and view the care plan invoice.
5. **Step 5:** Log in as **Admin** — show user management, bank transfer approval queue, and the database backup controls.

---

## 3. High-Impact Technical Keywords to Use in Answers
* *Dependency Injection & Modular Architecture*
* *Double-Submit CSRF Defense with timingSafeEqual*
* *HttpOnly & SameSite Cookie Session Storage*
* *TypeORM Synchronize vs Migrations*
* *Rate Limiting with Throttler Guard*
* *AES-256 Server-Side S3 Backup Encryption*
