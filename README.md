# E-AGLE Trento Racing Team - Shop Anniversary

This project is a showcase/pre-order site for the team's merchandise.

## Requirements
- Node.js (v18+)
- pnpm
- Un database PostgreSQL

## Setup and Installation

1. Install the dependencies:
   ```bash
   pnpm install
   ```

2. Configure the database:
   Copy the `.env.example` file to `.env` and enter the URL of your PostgreSQL database:
   ```bash
   cp .env.example .env
   ```
   Edit the `DATABASE_URL` variable in the `.env` file.

3. Initialize the database and apply the schema:
   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev
   ```

4. Populate the database with products (optional; use tsx or run the compiled seed file):
   ```bash
   pnpm add -D tsx
   npx tsx prisma/seed.ts
   ```

5. Start the development environment:
   ```bash
   pnpm dev
   ```

## Development Notes
- Product images must be uploaded to a publicly accessible folder (e.g., in `public/` or to a cloud bucket). The `imageNeutral` and `imageLifestyle` fields in the database products must contain the image URL/path.
- The site is designed to collect **pre-orders** (fundraising) and does not process online transactions. Orders saved in the database have a default status of `PENDING`.
