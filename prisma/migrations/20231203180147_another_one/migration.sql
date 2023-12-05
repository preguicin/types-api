/*
  Warnings:

  - A unique constraint covering the columns `[personId]` on the table `contacts_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_info_personId_key" ON "contacts_info"("personId");
