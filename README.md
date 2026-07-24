### 1. Project Overview

## Project Name: Internal Team Portal

Purpose:
A secure portal where authenticated employees can log in and access company announcements. Team members can create new announcements and view previously posted announcements.

Chosen Content Section: Announcements Feed

### 2. Tech Stack

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- ShadCN UI
- React Hook Form
- Zod

## Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- Clerk Auth
- Image Kit

## Deployment

- Vercel
- Prisma PostgreSQL

### 3. Features

## Authentication

- Login
- Email
- Password
- Secure session
- Logout

## Protected Portal

Only authenticated users can access: `/dashboard`

Unauthenticated users are redirected to: `/sign-in`

## Announcements

- Create
  - Fields
    - Title
    - Description
    - Image

- Validation
  - Required
  - Max length

- View

- Display
  - Latest first
  - Created date
  - Title
  - Description
  - Image

- Update & Delete
  - Only created user can update or delete the announcement

### 4. How to run

- Clone the repo
- Create `.env` file
- Set enviroment variables
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  - CLERK_SECRET_KEY=
  - IMAGEKIT_PRIVATE_KEY =
  - IMAGEKIT_PUBLIC_KEY =
  - DATABASE_URL=
- Install dependencies `npm install`
- Generate prisma client `npx prisma generate`
- Run the project `npm run dev`
