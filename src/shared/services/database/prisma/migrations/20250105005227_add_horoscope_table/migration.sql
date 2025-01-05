-- CreateTable
CREATE TABLE "Horoscope" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Horoscope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HoroscopeDetail" (
    "id" INTEGER NOT NULL,
    "sign" VARCHAR NOT NULL,
    "horoscopeId" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "HoroscopeDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HoroscopeDetail" ADD CONSTRAINT "HoroscopeDetail_horoscopeId_fkey" FOREIGN KEY ("horoscopeId") REFERENCES "Horoscope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
