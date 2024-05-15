CREATE TABLE `smart-traffic`.`user` (
  `id` INT NOT NULL,
  `username` VARCHAR(24) NOT NULL,
  `password` VARCHAR(8) NOT NULL,
  `type` INT ZEROFILL NULL,
  `isOnline` INT ZEROFILL NULL,
  `insertId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `insertId`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `insertId_UNIQUE` (`insertId` ASC) VISIBLE);
