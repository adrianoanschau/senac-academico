ALTER TABLE "schedule_rules"
ALTER COLUMN "totalHours" SET DATA TYPE DOUBLE PRECISION USING "totalHours"::double precision;
