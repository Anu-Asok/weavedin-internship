SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `born_in` varchar(50) NOT NULL,
  `about` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `author` (`id`, `name`, `age`, `gender`, `born_in`, `about`) VALUES
(1,	'Arundhati Roy',	56,	'Female',	'Shillong',	'Suzanna Arundhati Roy is an Indian author best known for her novel The God of Small Things, which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author.'),
(2,	'Chetan Bhagat',	43,	'Male',	'New Delhi',	'Chetan Bhagat is an Indian author, columnist, screenwriter, television personality and motivational speaker, known for his English-language dramedy novels about young urban middle-class Indians'),
(3,	'Vikram Seth',	65,	'Male',	'Kolkata',	'Vikram Seth CBE is an Indian novelist and poet. He has written several novels and poetry books. He has received several awards including Padma Shri, Sahitya Academy Award, Pravasi Bharatiya Samman, WH Smith Literary Award and Crossword Book Award.');

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

INSERT INTO `book` (`id`, `title`, `author_id`, `isbn`, `description`) VALUES
(5,	'The God of Small Things',	1,	'9784887241244',	'The God of Small Things is the debut novel of Indian writer Arundhati Roy. It is a story about the childhood experiences of fraternal twins whose lives are destroyed by the \"Love Laws\" that lay down \"who should be loved, and how. And how much.\"'),
(6,	'Half Girlfriend',	2,	'9788129135728',	'Half Girlfriend is an Indian English coming of age, young adult romance novel by Indian author Chetan Bhagat. The novel, set in rural Bihar, New Delhi, Patna, and New York, is the story of a Bihari boy in quest of winning over the girl he loves'),
(7,	'A Suitable Boy',	3,	'9781785299605',	'A Suitable Boy is a novel by Vikram Seth, published in 1993. At 1,349 pages and 591,552 words, the book is one of the longest novels ever published in a single volume in the English language. '),
(19,	'2 States',	2,	'895945484978',	'2 States: The Story of My Marriage commonly known as 2 Statesis a 2009 novel written by Chetan Bhagat. It is the story about a couple coming from two different states in India, who face hardships in convincing their parents to approve of their marriage.');
