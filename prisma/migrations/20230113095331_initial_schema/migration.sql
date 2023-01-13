-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('ALLOWED', 'DISALLOWED', 'VARIES', 'UNKNOWN');

-- CreateTable
CREATE TABLE "albums" (
    "id" SERIAL NOT NULL,
    "artistMetadataId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "romanizedTitle" TEXT,
    "contributors" TEXT[],
    "availability" "Availability" NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "musicLabelId" INTEGER,
    "name" TEXT NOT NULL,
    "availability" "Availability" NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rights" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "isAllowed" BOOLEAN NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "rights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist_metadatas" (
    "id" SERIAL NOT NULL,
    "artistAliases" TEXT[],
    "description" TEXT,
    "notes" TEXT,
    "genre" TEXT,
    "socials" TEXT[],
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "artist_metadatas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "music_labels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "availability" "Availability" NOT NULL,

    CONSTRAINT "music_labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "premissions_grant" INTEGER NOT NULL DEFAULT 0,
    "premissions_revoke" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artist_metadatas_artistId_key" ON "artist_metadatas"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artistMetadataId_fkey" FOREIGN KEY ("artistMetadataId") REFERENCES "artist_metadatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_musicLabelId_fkey" FOREIGN KEY ("musicLabelId") REFERENCES "music_labels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rights" ADD CONSTRAINT "rights_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_metadatas" ADD CONSTRAINT "artist_metadatas_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
