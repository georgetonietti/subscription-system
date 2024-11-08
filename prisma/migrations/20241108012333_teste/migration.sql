-- CreateTable
CREATE TABLE "aplicativos" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "custo_mensal" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "clientes" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "inicio_vigencia" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim_vigencia" DATETIME NOT NULL,
    "codApp" TEXT NOT NULL,
    "codCli" TEXT NOT NULL,
    "status" TEXT,
    CONSTRAINT "assinaturas_codApp_fkey" FOREIGN KEY ("codApp") REFERENCES "aplicativos" ("codigo") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "assinaturas_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "clientes" ("codigo") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "aplicativos_nome_key" ON "aplicativos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
