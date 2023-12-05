/*
  Warnings:

  - The primary key for the `contacts_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `contacts_info` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts_info" (
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "personId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "contacts_info_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contacts_info" ("email", "number", "personId") SELECT "email", "number", "personId" FROM "contacts_info";
DROP TABLE "contacts_info";
ALTER TABLE "new_contacts_info" RENAME TO "contacts_info";
CREATE UNIQUE INDEX "contacts_info_email_key" ON "contacts_info"("email");
CREATE UNIQUE INDEX "contacts_info_number_key" ON "contacts_info"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
