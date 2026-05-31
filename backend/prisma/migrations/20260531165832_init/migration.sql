-- CreateTable
CREATE TABLE `Projeto` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `desc` TEXT NOT NULL,
    `stack` VARCHAR(191) NOT NULL,
    `github` VARCHAR(191) NULL,
    `hospedagem` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formacao` (
    `id` VARCHAR(191) NOT NULL,
    `curso` VARCHAR(191) NOT NULL,
    `inst` VARCHAR(191) NOT NULL,
    `ano` VARCHAR(191) NOT NULL,
    `carga` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `desc` TEXT NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `conteudo` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habilidade` (
    `id` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nivel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
