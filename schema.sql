create table category(
	SubId int auto_increment primary key,
    category varchar(50) unique
);


CREATE TABLE subcategory (
    SubCatId INT PRIMARY KEY AUTO_INCREMENT,
    SubCategory varchar(100) unique,
    SubId INT NOT NULL,
    FOREIGN KEY(SubId) REFERENCES category(SubId)
);


create table questions(
	QnId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    qn LONGTEXT,
    opt1 VARCHAR(100),
    opt2 VARCHAR(100),
    opt3 VARCHAR(100),
    opt4 VARCHAR(100),
    correctAns VARCHAR(100),
    SubCatId INT NOT NULL,
    FOREIGN KEY(SubCatId) REFERENCES subcategory(SubCatId)
);