-- AlterTable
ALTER TABLE "User" ADD COLUMN "email" TEXT;

-- Update existing users with emails
UPDATE "User" SET email = 'admin@example.com' WHERE username = 'AdminIsMe';
UPDATE "User" SET email = 'bill@example.com' WHERE username = 'Bill';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");