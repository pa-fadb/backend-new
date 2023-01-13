/*
  Warnings:

  - You are about to drop the column `premissions_grant` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `premissions_revoke` on the `tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "premissions_grant",
DROP COLUMN "premissions_revoke",
ADD COLUMN     "permissions_grant" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "permissions_revoke" INTEGER NOT NULL DEFAULT 0;
