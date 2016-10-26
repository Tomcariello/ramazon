CREATE DATABASE ramazon2;

USE ramazon2;

CREATE TABLE product(
  ItemID INT(10) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(100) NOT NULL,
    Price FLOAT(7,2),
    StockQuantity INT(10),
    primary key(ItemID)
);

select * from product;

INSERT INTO product(ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Cutlery","home",29.99,47),
    ("laptop","electronics",799.99,14),
    ("Whiskey","booze",39.99,17),
    ("Candle","home",14.99,25),
    ("iPad","electronics",499.99,18),
    ("Television","electronics",399.99,18),
    ("Final Fantasy ","games",59.99,8),
    ("Underpants","clothes",17.99,40),
    ("Hat","clothes",13.99,15),
    ("Chess","games",16.99,3),
    ("Beer","booze",8.99,28),
    ("Vodka","booze",28.99,6),
    ("Pumpkin","garden",8.99,6),
    ("Clock","home",29.99,7),
    ("Universal Remote Control","electronics",99.99,6),
    ("Jigsaw Puzzle","games",14.99,6);



CREATE TABLE Departments(
  DepartmentID INT(10) AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(100) NOT NULL,
    OverheadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    primary key(DepartmentID)
);


INSERT INTO departments (DepartmentName,OverheadCosts,TotalSales) VALUES ('booze',1000,2000);
INSERT INTO departments (DepartmentName,OverheadCosts,TotalSales) VALUES ('clothes',2000,4300);
INSERT INTO departments (DepartmentName,OverheadCosts,TotalSales) VALUES ('garden',1000,6);
INSERT INTO departments (DepartmentName,OverheadCosts,TotalSales) VALUES ('electronics',2200,300);
INSERT INTO departments (DepartmentName,OverheadCosts,TotalSales) VALUES ('games',600,365);
INSERT INTO departments (DepartmentName,OverheadCosts,TotalSales) VALUES ('home',8200,12300);





