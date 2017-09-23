CREATE DATABASE shco;
CREATE USER user@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON shco.* TO user@localhost;
FLUSH PRIVILEGES;

use shco;

create table users (
  id int not null primary key auto_increment,
  username varchar(25) not null,
  password varchar(100) not null,
  role varchar(25) not null,
  identifier varchar(25) not null,
  email varchar(50) unique not null
);

create table teachers (
  id int not null primary key auto_increment,
  name varchar(25) not null,
  surname varchar(25) not null
);

create table payments (
  id int not null primary key auto_increment,
  month varchar(25) not null,
  payment_date date not null,
  amount int not null,
  status varchar(25) not null,
  teacher_id int not null,
  foreign key(teacher_id) references teachers(id)
);

create table extras (
  id int not null primary key auto_increment,
  month varchar(25) not null,
  payment_date date not null,
  amount int not null,
  comments varchar(100) not null
);

create table students (
  id int not null primary key auto_increment,
  name varchar(25) not null,
  surname varchar(25) not null
);

create table subjects (
  id int not null primary key auto_increment,
  subject varchar(100),
  deleted int not null default 0
);

create table attendance (
  id int not null primary key auto_increment,
  student_id int not null,
  lesson date not null,
  subject_id int not null,
  foreign key(subject_id) references subjects(id),
  foreign key(student_id) references students(id)
);
