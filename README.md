# SmartDrop

SmartDrop is a secure file-sharing web app built with Next.js. It lets users upload files, protect them with a password, set an expiration time, and share a private link that is only accessible after verification. The app uses MongoDB for metadata storage, Redis for rate limiting and temporary access tracking, Cloudinary for file delivery, and email-based OTP verification for registration.

## Features

- User registration with email verification using OTP
- Secure login with NextAuth + credentials provider
- File upload via Cloudinary signed upload flow
- Password-protected shared drops
- Expiration options for drops (5 minutes to 7 days)
- Redis-based failed-attempt tracking and access control
- MongoDB-backed persistence for users and drop metadata
- Docker setup for MongoDB and Redis local development
- Responsive landing page and share flow

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- MongoDB
- Redis
- Cloudinary
- NextAuth
- Nodemailer
- Docker Compose

## Project Structure

```bash
smartdrop/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── cloudinary/
│   │   │   └── drop/
│   │   ├── drop/
│   │   ├── login/
│   │   ├── registration/
│   │   ├── verify-email/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── types/
├── docker-compose.yml
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── README.md
└── public/
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 20+ recommended
- npm or pnpm
- Docker Desktop (for MongoDB and Redis)
- A Cloudinary account
- An SMTP provider for OTP emails

## Getting Started

1. Clone the repository

```bash
git clone <https://github.com/Shuhel15/SmartDrop.git>
cd smartdrop
```

2. Install dependencies

```bash
npm install
```

3. Start local infrastructure

```bash
docker compose up -d
```

This starts:

- MongoDB on port 27017
- Redis on port 6379

4. Create an environment file

```bash
copy .env.example .env.local
```

If you do not have a .env.example file, create a `.env.local` file manually with the values below.

5. Run the app in development mode

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Environment Variables

Add the following variables to `.env.local`:

```env
# App
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-auth-secret
NEXTAUTH_SECRET=your-auth-secret

# MongoDB
MONGODB_URI=mongodb://localhost:27017/smartdrop

# Redis
REDIS_URL=redis://localhost:6379

# SMTP / Email OTP
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-smtp-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional cron protection
CRON_SECRET=your-secret-token
```

> For a production deployment, use secure values and set `NEXTAUTH_URL` to your production domain.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## How It Works

### Registration flow

- A user registers with name, email, and password.
- The app hashes the password and inserts the user into MongoDB.
- An OTP is generated and stored in Redis.
- The OTP is sent using Nodemailer.
- The user verifies the OTP before being marked as active.

### Sharing a file

- A user uploads a file through a Cloudinary signed upload flow.
- A secure drop is created with a password and expiry duration.
- The drop metadata is saved in MongoDB.
- A shareable link is generated for the file.

### Accessing a drop

- A recipient opens the private link.
- They must enter the drop password.
- The backend verifies the password and checks Redis-based failed-attempt counters.
- If valid, the file is revealed and access is granted only while the drop is valid.

## Docker Setup

The project includes a local development environment via Docker Compose:

```bash
docker compose up -d
```

Services:

- MongoDB: `localhost:27017`
- Redis: `localhost:6379`

## Notes

- Drop passwords are hashed before storage.
- Expired or invalid drops are rejected on access.
- Failed password attempts are rate-limited using Redis.
- Cloudinary is used for secure file hosting and signed uploads.

## License

This project is currently unlicensed unless you add a license file for your own deployment.

## Contributing

Pull requests and improvements are welcome. For major changes, open an issue first to discuss what you would like to change.
