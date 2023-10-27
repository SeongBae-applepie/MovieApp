use movie;

create table users2 (
uuid varchar(36) default(UUID()) primary key,
id char(10),
passwd char(10),
age int,
create_date date default(now())
);

