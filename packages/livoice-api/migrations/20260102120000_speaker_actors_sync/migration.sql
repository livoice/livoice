/*
  - Drop Transcript.language column.
  - Add many-to-many relations for Source.speakerActors and Transcript.speakerActors.
*/

-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "language";
ALTER TABLE "Transcript" DROP COLUMN "intervieweeName";

-- CreateTable
CREATE TABLE "_Source_speakerActors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Transcript_speakerActors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Source_speakerActors_AB_unique" ON "_Source_speakerActors"("A", "B");

-- CreateIndex
CREATE INDEX "_Source_speakerActors_B_index" ON "_Source_speakerActors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Transcript_speakerActors_AB_unique" ON "_Transcript_speakerActors"("A", "B");

-- CreateIndex
CREATE INDEX "_Transcript_speakerActors_B_index" ON "_Transcript_speakerActors"("B");

-- AddForeignKey
ALTER TABLE "_Source_speakerActors" ADD CONSTRAINT "_Source_speakerActors_A_fkey" FOREIGN KEY ("A") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Source_speakerActors" ADD CONSTRAINT "_Source_speakerActors_B_fkey" FOREIGN KEY ("B") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Transcript_speakerActors" ADD CONSTRAINT "_Transcript_speakerActors_A_fkey" FOREIGN KEY ("A") REFERENCES "Transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Transcript_speakerActors" ADD CONSTRAINT "_Transcript_speakerActors_B_fkey" FOREIGN KEY ("B") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;


