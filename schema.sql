SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('''male''','''female''') NOT NULL,
  `born_in` varchar(50) NOT NULL,
  `about` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `author` (`id`, `name`, `age`, `gender`, `born_in`, `about`) VALUES
(1,	'test',	35,	'\'male\'',	'test',	'test');

DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `author_id` int(11) NOT NULL,
  `isbn` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO `book` (`id`, `title`, `author_id`, `isbn`, `description`) VALUES
(1,	'test-book',	1,	'2132165464',	'test description'),
(2,	'hello',	1,	'sadfsdfasf',	'test description'),
(3,	'lklk',	1,	'dsfasdfasdf',	'sdfasf');
