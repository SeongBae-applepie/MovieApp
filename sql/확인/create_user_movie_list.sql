use movie_db;

create table users_movie_list (
num int auto_increment not null primary key,
movie_id varchar(200) not null,
movie_name varchar(200) not null,
movie_star int(5) ,
uuid_users varchar(36) default(UUID()) not null,
foreign key(uuid_users) references users (uuid_users)
);