# Database Setup Guide

This project uses Prisma ORM with PostgreSQL to manage user authentication.

## Prerequisites

- PostgreSQL database (local or cloud-hosted)
- Node.js and npm

## Setup Steps

### 1. Install Dependencies

```bash
npm install @prisma/client prisma bcryptjs
```

### 2. Configure Database Connection

Update `.env.local` with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
```

For **Supabase** (recommended for easy setup):

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Copy the connection string from Project Settings → Database
4. Paste it into `.env.local` as `DATABASE_URL`

For **Local PostgreSQL**:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db"
```

### 3. Run Migrations

Initialize the database schema:

```bash
npx prisma migrate dev --name init
```

This will:

- Create the database if it doesn't exist
- Create the `User` table
- Generate Prisma Client

### 4. Create Your First Admin User

Use the Prisma Studio to create a user manually:

```bash
npx prisma studio
```

Or run this Node.js script to create a user programmatically:

```javascript
// Create a file: scripts/seed.ts or scripts/create-user.js
import prisma from '@/lib/prisma'
import {hashPassword} from '@/utils/auth'

async function createAdminUser() {
  const hashedPassword = await hashPassword('your-secure-password')
  const user = await prisma.user.create({
    data: {
      username: 'AdminIsMe',
      password: hashedPassword,
    },
  })
  console.log('Admin user created:', user)
}

createAdminUser()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## Database Schema

### User Table

```
id          Int       @id @default(autoincrement())
username    String    @unique (unique constraint)
password    String    (hashed with bcryptjs)
createdAt   DateTime  @default(now())
updatedAt   DateTime  @updatedAt
```

## Key Files

- **`prisma/schema.prisma`** - Database schema definition
- **`src/lib/prisma.ts`** - Prisma client instance (handles development/production)
- **`src/utils/auth.ts`** - Authentication helper functions
- **`src/pages/api/auth/login.ts`** - Login API endpoint
- **`src/context/AuthContext.tsx`** - Auth state management

## Important Security Notes

⚠️ **Never commit `.env.local` to version control**

- Passwords are hashed using bcryptjs (10 salt rounds)
- Credentials are validated via API endpoint, not client-side
- Session storage is used for maintaining auth state during the session
- Always use HTTPS in production

## Common Commands

```bash
# Open Prisma Studio (GUI for database)
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration after schema changes
npx prisma migrate dev --name <name>

# View migration status
npx prisma migrate status

# Reset database (development only!)
npx prisma migrate reset
```

## Troubleshooting

**"Can't find @prisma/client"**

- Run: `npm install @prisma/client prisma`

**"Error connecting to database"**

- Check DATABASE_URL in `.env.local`
- Ensure PostgreSQL server is running
- Verify credentials and network access

**"Unique constraint failed on 'username'"**

- Username already exists in database
- Use a different username or delete the existing user via Prisma Studio
