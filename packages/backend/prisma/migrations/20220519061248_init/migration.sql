-- CreateEnum
CREATE TYPE "BiddingType" AS ENUM ('OPEN_BID', 'OPEN_FIX', 'VERIFIED_BID', 'VERIFIED_FIX', 'WHITELIST_BID', 'WHITELIST_FIX');

-- CreateEnum
CREATE TYPE "JobState" AS ENUM ('DRAFT', 'TENDER', 'PROGRESS', 'FINISHED');

-- CreateEnum
CREATE TYPE "ApplicantState" AS ENUM ('ACCEPTED', 'PROGRESS', 'REJECTED');

-- CreateTable
CREATE TABLE "users_profile" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100),
    "wallet" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),

    CONSTRAINT "users_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_data" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3),
    "title" VARCHAR(200) NOT NULL,
    "body" TEXT NOT NULL,
    "link" TEXT,
    "bidding_type" "BiddingType" NOT NULL DEFAULT E'OPEN_BID',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "contract_address" TEXT,
    "state" "JobState" NOT NULL,
    "creatorID" UUID NOT NULL,

    CONSTRAINT "jobs_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_applicant" (
    "job_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bid_price" DOUBLE PRECISION NOT NULL,
    "state" "ApplicantState" NOT NULL,

    CONSTRAINT "jobs_applicant_pkey" PRIMARY KEY ("job_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_profile_wallet_key" ON "users_profile"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "users_profile_email_key" ON "users_profile"("email");

-- CreateIndex
CREATE INDEX "jobs_data_creatorID_idx" ON "jobs_data"("creatorID");

-- CreateIndex
CREATE INDEX "jobs_applicant_user_id_idx" ON "jobs_applicant"("user_id");

-- CreateIndex
CREATE INDEX "jobs_applicant_job_id_idx" ON "jobs_applicant"("job_id");

-- AddForeignKey
ALTER TABLE "jobs_data" ADD CONSTRAINT "jobs_data_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "users_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_applicant" ADD CONSTRAINT "jobs_applicant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_applicant" ADD CONSTRAINT "jobs_applicant_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
