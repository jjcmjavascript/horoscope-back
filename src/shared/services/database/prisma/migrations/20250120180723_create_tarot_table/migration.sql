-- CreateTable
CREATE TABLE "Tarot" (
    "id" SERIAL NOT NULL,
    "pushNotificationTokenId" INTEGER NOT NULL,
    "name" VARCHAR,
    "bithDate" VARCHAR,
    "reading" TEXT NOT NULL,

    CONSTRAINT "Tarot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tarot" ADD CONSTRAINT "Tarot_pushNotificationTokenId_fkey" FOREIGN KEY ("pushNotificationTokenId") REFERENCES "PushNotificationToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
