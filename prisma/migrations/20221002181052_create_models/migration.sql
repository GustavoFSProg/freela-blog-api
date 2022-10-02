-- CreateTable
CREATE TABLE "Posts" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "image" TEXT,
    "autor" TEXT,
    "text" TEXT,
    "likes" INTEGER DEFAULT 0,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Coments" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "post_id" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "user_name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Users" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
