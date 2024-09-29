-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,

    CONSTRAINT "customer_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,

    CONSTRAINT "address_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_relation" (
    "id" UUID NOT NULL,

    CONSTRAINT "customer_relation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL,

    CONSTRAINT "company_pk" PRIMARY KEY ("id")
);
