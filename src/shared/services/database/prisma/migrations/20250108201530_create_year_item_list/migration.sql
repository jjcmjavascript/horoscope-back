-- CreateTable
CREATE TABLE "YearListItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "YearListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YearListItem_userId_key" ON "YearListItem"("userId");

-- AddForeignKey
ALTER TABLE "YearListItem" ADD CONSTRAINT "YearListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
