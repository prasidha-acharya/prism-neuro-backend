-- CreateTable
CREATE TABLE "RequestResponseLogs" (
    "request_log_id" VARCHAR(40) NOT NULL,
    "method" TEXT,
    "url" TEXT,
    "request" JSONB,
    "user_id" TEXT,
    "status_code" INTEGER,
    "response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "RequestResponseLogs_pkey" PRIMARY KEY ("request_log_id")
);
