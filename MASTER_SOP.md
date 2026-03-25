# Atla Hub Tech: Master Production SOP v2.1 (The "Pro" Edition)

## 1. Project Overview & Identity
* **Brand:** Atla Hub Tech (Founder: Ahmed Zayed).
* **Visuals:** Blue Gradients, Cairo/Tajawal fonts, Tech-Square patterns.
* **Goal:** High-conversion, result-driven "Expensive-looking" portfolio.

## 2. Technical Stack
* Next.js (App Router), Tailwind CSS, MySQL (mysql2), Namecheap Hosting.

## 3. Data & Dashboard Strategy
* **Dynamic (MySQL):** Portfolio, Clients, Training, Contacts.
* **Dashboard:** Secure /admin route to manage dynamic data without coding.
* **Static (JSON/Code):** Hero, About, Services, Why Us (for max speed).

## 4. Folder Structure (Corrected)
/src
├── app/
│    ├── admin/ (Dashboard & Login)
│    ├── api/ (Database Routes)
│    ├── layout.jsx (Root Layout)
│    └── page.jsx (Main Page)
├── components/
│    ├── Layout/ (Navbar, Footer)
│    ├── Sections/ (Hero, Services, Portfolio, etc.)
│    └── UI/ (Reusable Buttons, Inputs)
├── lib/ (db.js connection)
├── middleware.js (Security layer)
├── data/ (content.json)
└── assets/ (Images/Fonts)

## 5. Database Tables (MySQL)
* **portfolio, clients, training, contacts, users (for admin login).**

## 6. Business Logic (The Ahmed Zayed Standard)
* Focus on Results, not features.
* Cybersecurity: Highlight "Emergency/Breach Response".
* Media: Highlight "Field Interactive Production".