CREATE TABLE `smart-traffic`.`user` (
  `id` VARCHAR(255) NOT NULL,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `type` VARCHAR(15) NOT NULL,
  `isOnline` BOOLEAN NOT NULL,
  `insertID` INT UNSIGNED AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `insertID_UNIQUE` (`insertID` ASC) VISIBLE
);