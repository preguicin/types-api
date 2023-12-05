-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_person_pet" (
    "personId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("personId", "petId"),
    CONSTRAINT "person_pet_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "person_pet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_person_pet" ("assignedAt", "personId", "petId") SELECT "assignedAt", "personId", "petId" FROM "person_pet";
DROP TABLE "person_pet";
ALTER TABLE "new_person_pet" RENAME TO "person_pet";
CREATE TABLE "new_contacts_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    CONSTRAINT "contacts_info_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contacts_info" ("email", "id", "number", "personId") SELECT "email", "id", "number", "personId" FROM "contacts_info";
DROP TABLE "contacts_info";
ALTER TABLE "new_contacts_info" RENAME TO "contacts_info";
CREATE UNIQUE INDEX "contacts_info_email_key" ON "contacts_info"("email");
CREATE UNIQUE INDEX "contacts_info_number_key" ON "contacts_info"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
