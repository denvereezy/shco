
create table users (
  id int not null primary key auto_increment,
  username varchar(25) not null,
  password varchar(100) not null,
  role varchar(25) not null,
  identifier varchar(25) not null
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

create table attendance (
  id int not null primary key auto_increment,
  student_id int not null,
  lesson date not null,
  foreign key(student_id) references students(id)
);
