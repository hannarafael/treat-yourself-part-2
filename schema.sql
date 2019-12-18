/*DROP DATABASE IF EXISTS treatyourself_DB;*/

CREATE DATABASE treatyourself_DB;
USE treatyourself_DB;
CREATE TABLE treatyourself (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  dob DATE NOT NULL,
  email VARCHAR(45) NOT NULL,
  phone_number VARCHAR (15) NOT NULL
  PRIMARY KEY (id)
);

INSERT INTO treatyourself (username, first_name, last_name, dob, email, phone_number)
VALUES ("IamEli", "Eli", "Jackson", "1999-04-04", "iameli@class.edu", "9084444444"),

/*redo like above
("JennyGump55", "mrsgump55@random.com", "905A Dream St.", "7777777777", "Jennifer Gump"),
("Vinicius Sr", "noobmaster69@random.com", "7 Cosmic Rd.", "3056720000", "Vinicius Perez"); */
