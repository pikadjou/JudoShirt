-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema JudoShirt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema JudoShirt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `JudoShirt` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `JudoShirt` ;

-- -----------------------------------------------------
-- Table `JudoShirt`.`designs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`designs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  `content` TEXT NULL COMMENT '',
  `thumbnail` VARCHAR(45) NULL COMMENT '',
  `header` VARCHAR(45) NULL COMMENT '',
  `idShop` VARCHAR(45) NULL COMMENT '',
  `idCustomShop` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `JudoShirt`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  `content` TEXT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `JudoShirt`.`categories_designs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`categories_designs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `categoriesId` INT UNSIGNED NOT NULL COMMENT '',
  `designsId` INT UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_categories_has_designs_designs1_idx` (`designsId` ASC)  COMMENT '',
  INDEX `fk_categories_has_designs_categories_idx` (`categoriesId` ASC)  COMMENT '',
  CONSTRAINT `fk_categories_has_designs_categories`
    FOREIGN KEY (`categoriesId`)
    REFERENCES `JudoShirt`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categories_has_designs_designs1`
    FOREIGN KEY (`designsId`)
    REFERENCES `JudoShirt`.`designs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `JudoShirt`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`tags` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `JudoShirt`.`tags_designs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`tags_designs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `tagsId` INT UNSIGNED NOT NULL COMMENT '',
  `designsId` INT UNSIGNED NOT NULL COMMENT '',
  INDEX `fk_tags_has_designs_designs1_idx` (`designsId` ASC)  COMMENT '',
  INDEX `fk_tags_has_designs_tags1_idx` (`tagsId` ASC)  COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  CONSTRAINT `fk_tags_has_designs_tags1`
    FOREIGN KEY (`tagsId`)
    REFERENCES `JudoShirt`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tags_has_designs_designs1`
    FOREIGN KEY (`designsId`)
    REFERENCES `JudoShirt`.`designs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `JudoShirt`.`promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`promotions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  `image` VARCHAR(45) NULL COMMENT '',
  `startDate` DATE NULL COMMENT '',
  `endDate` DATE NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `JudoShirt`.`configs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JudoShirt`.`configs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  `value` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
