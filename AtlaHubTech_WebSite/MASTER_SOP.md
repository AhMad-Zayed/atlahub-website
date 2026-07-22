# Project: Atla Hub Tech Website (Production SOP v2.0 - Namecheap Optimized)

---

## 1. Project Overview

* **Brand:** Atla Hub Tech
* **Founder:** Ahmed Zayed
* **Goal:** Build a high-converting professional website that showcases real work, builds trust, and generates clients.

---

## 2. Core Strategy (IMPORTANT)

This is NOT just a website.

This system must:

* Build trust instantly
* Show real experience (projects, clients, training)
* Convert visitors into leads

---

## 3. Technical Stack (Namecheap Compatible)

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** MySQL (via phpMyAdmin)
* **DB Library:** mysql2
* **Hosting:** Namecheap (Node.js environment via cPanel)

---

## 4. Data Strategy (CRITICAL - BALANCED)

### Use MySQL ONLY for dynamic content:

* Portfolio items
* Clients
* Training programs
* Contact messages

### Use Static (code or JSON) for:

* Hero section
* About / Founder
* Vision
* Services description
* Why Us
* Process

### Rule:

Avoid unnecessary database usage to maintain performance and stability.

---

## 5. Environment Configuration

Create `.env.local`:

DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name

⚠️ Never expose these values in frontend code.

---

## 6. Database Structure (MySQL)

### Table: portfolio

* id (INT, PK, AUTO_INCREMENT)
* title (VARCHAR)
* type (VARCHAR) → (App / Marketing / Security / Media)
* description (TEXT)
* result (TEXT)
* image_url (VARCHAR)

---

### Table: clients

* id
* name
* logo_url

---

### Table: training

* id
* title
* description

---

### Table: contacts

* id
* name
* email
* service
* message
* created_at (TIMESTAMP)

---

## 7. Backend Rules (API Routes)

* Use `/app/api/.../route.js`
* Use `mysql2` with connection pool
* NEVER execute raw SQL directly from frontend
* Always validate inputs
* Use try/catch for all DB operations

---

## 8. Folder Structure

/src
├── app/
│    ├── api/
│    │     ├── portfolio/
│    │     ├── contact/
│    │     └── training/
│    ├── page.jsx
│    └── layout.jsx
├── components/
│    ├── Sections/
│    │     ├── Hero.jsx
│    │     ├── Services.jsx
│    │     ├── Portfolio.jsx
│    │     ├── Clients.jsx
│    │     ├── Academy.jsx
│    │     ├── About.jsx
│    │     ├── Founder.jsx
│    │     ├── Process.jsx
│    │     ├── WhyUs.jsx
│    │     └── Contact.jsx
│    ├── UI/
│    │     ├── Button.jsx
│    │     └── Input.jsx
├── lib/
│    └── db.js
├── styles/
│    └── globals.css
├── data/
│    └── content.json
├── assets/

---

## 9. Key Sections (Business-Focused)

### Hero

* Clear headline (what we do)
* Short supporting text
* 2 CTA buttons
* Goal: understood in 5 seconds

---

### Founder (CRITICAL)

* Ahmed Zayed personal section
* Human tone (not corporate)
* Include:

  * experience
  * projects
  * leadership
* Add photo

---

### Services

Group into:

* Programming
* Marketing & Production
* Cybersecurity (highlight emergency response)
* Training
* Field Media Production

👉 Each service must show RESULT, not description

---

### Portfolio (CRITICAL)

* Real projects only
* Each includes:

  * title
  * type
  * result
* Must include images

---

### Clients

* Show logos or names

---

### Training

* Emphasize:

  * practical training
  * real-world skills

---

### Process

Steps:

1. Understand
2. Plan
3. Execute
4. Deliver
5. Support

---

### Why Us

* Real strengths only:

  * speed
  * experience
  * full solutions
  * confidentiality

---

### Contact

* Form connected to DB
* Fields:
  name, email, service, message
* Add WhatsApp / phone

---

## 10. UX & Conversion Rules (VERY IMPORTANT)

* User understands value within 5 seconds
* Use short text, strong headings
* Avoid long paragraphs
* Add CTA every 1–2 sections
* Mobile-first design
* Portfolio must be visual

---

## 11. Code Quality Rules

* Clean, readable code
* Reusable components
* No unnecessary complexity
* Proper naming conventions

---

## 12. Deployment (Namecheap)

* Run:
  npm run build
* Ensure Node.js app is configured in cPanel
* Upload project files
* Connect to MySQL database via credentials

---

## 13. Final Goal

This is:

* A professional brand presence
* A trust-building system
* A lead generation machine

Every decision must support this goal.
