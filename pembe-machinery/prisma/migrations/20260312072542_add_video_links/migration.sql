-- AlterTable
ALTER TABLE "ShowcaseVideo" ADD COLUMN     "platform" TEXT NOT NULL DEFAULT 'direct',
ADD COLUMN     "videoType" TEXT NOT NULL DEFAULT 'upload';
