# PEMBE MACHINERY WEBSITE

Commercial machinery catalogue and lead generation platform for **Pembe Machinery**.

The system combines a public product marketplace with an **admin CMS and inquiry CRM**, allowing the company to manage products, videos, and customer inquiries efficiently.

---

# Project Overview

Pembe Machinery supplies agricultural and industrial machinery, fabrication services, and spare parts.

This platform provides:

• Machinery catalogue  
• WhatsApp quotation system  
• Admin product management  
• Video showcase system  
• Customer inquiry CRM  
• Email notification system

The website is designed for **real commercial use** and optimized for **lead generation and product discovery**.

---

# Technology Stack

Framework  
Next.js (App Router)

Language  
TypeScript

Database  
PostgreSQL

ORM  
Prisma

Authentication  
JWT (JOSE)

Styling  
Tailwind CSS

Email Notifications  
Resend API

Deployment Target  
Linux VPS / Ubuntu server

Media Storage  
Local storage (`public/uploads`)

---

# Core Features

## Public Website

Homepage includes

• Hero section  
• Machinery highlights  
• Categories overview  
• Featured products  
• Video previews  
• WhatsApp contact

---

## Product Marketplace

Routes
/products
/products/[slug]


Features

• Category filtering  
• Product specifications  
• Image gallery  
• Pricing / price-on-request  
• WhatsApp quotation button  
• Customer inquiry form

---

## Services Page
/services

Displays

• Machinery supply  
• Fabrication  
• Spare parts  
• Equipment consultation  
• Maintenance support

---

## Projects Page
/projects

Displays

• Machinery installations  
• Fabrication work  
• Industrial solutions

---

## Showcase Videos
/videos

Supports

• Uploaded videos  
• YouTube embeds  
• Facebook video links  
• Vimeo videos

---

## Contact Page

Includes

• Business contact details  
• Two contact persons  
• WhatsApp integration  
• Email contact  
• Map placeholder

---

# Admin CMS

Route
/admin

Protected by JWT authentication.

Admin can manage

• Products  
• Categories  
• Showcase videos  
• Customer inquiries

---

# Admin Features

## Product Management

Admin can

• Create products  
• Upload images  
• Reorder images  
• Assign categories  
• Set pricing  
• Mark featured products  
• Manage stock availability

Images stored in

public/uploads/products


---

## Category Management

Admin can

• Create categories  
• View category list  
• Assign products

---

## Video Management

Admin can

• Upload videos  
• Add YouTube / Facebook / Vimeo links  
• Set featured videos  
• Delete videos

Videos stored in

public/uploads/videos


---

# Inquiry CRM System

Customers can submit product inquiries.

Admin dashboard allows

• View inquiries  
• Search customers  
• Filter by status  
• Update status (new / contacted / closed)

Quick actions

• Call customer  
• Email customer  
• WhatsApp customer

---

# Email Notification System

When an inquiry is submitted:

The system automatically sends a notification email to the company.

Example notification:

*New Inquiry Received

Customer: John Mwangi
Phone: 0721xxxx
Product: Grain Thresher
Message: I need a quotation*


---

# Project Structure

src
├ app
│ ├ (auth)
│ │ └ admin/login
│ ├ (public)
│ │ ├ about
│ │ ├ contact
│ │ ├ products
│ │ ├ projects
│ │ ├ services
│ │ └ videos
│ ├ admin
│ │ ├ categories
│ │ ├ products
│ │ ├ videos
│ │ ├ inquiries
│ │ └ dashboard
│ └ api
│ ├ admin
│ ├ inquiries
│ └ auth
│
├ components
│ ├ Navbar
│ ├ Footer
│ ├ HeroSection
│ ├ CategoryGrid
│ ├ FeaturedProducts
│ ├ HomeGallery
│ ├ HomeVideos
│ ├ FloatingWhatsApp
│ └ AdminShell
│
└ lib
├ prisma.ts
├ admin-session.ts
├ public-data.ts
├ email.ts
└ slug.ts


---

# Installation

Clone repository


Install dependencies

npm install/yarn install


---

# Environment Variables

Create `.env`

DATABASE_URL=postgresql://user:password@localhost:5432/pembe

JWT_SECRET=your-secret

RESEND_API_KEY=re_xxxxxx
EMAIL_FROM=Pembe Machinery notifications@yourdomain.com

NOTIFY_EMAIL=info@pembemachinery.com


---

# Database Setup

Run migrations
 npx prisma migrate dev


---

# Development

Run development server
 npm run dev

Open


http://localhost:3000


Admin panel


http://localhost:3000/admin


---

# Production Deployment

Recommended stack

• Ubuntu VPS  
• Node.js  
• Nginx reverse proxy  
• PostgreSQL database  
• PM2 process manager

---

# Future Improvements

Potential upgrades

• Image compression pipeline  
• SEO metadata system  
• OpenGraph preview images  
• Google Maps integration  
• Product comparison  
• Inventory tracking  
• Analytics dashboard

---

# License

Internal / Commercial use.

---

# Author

Developed by

**Paul Wamaria**

Full-stack developer specializing in

• Next.js platforms  
• Commercial product systems  
• Marketplace applications  
• CRM integrations





