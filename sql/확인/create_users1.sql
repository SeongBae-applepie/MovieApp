use movie_db;

create table users (
uuid_users varchar(36) default(UUID()) primary key,
id varchar(20),
passwd varchar(20),
name varchar(25),
create_date date default(now())
);
