use movie_db;

create table post_like_list (
num int auto_increment not null primary key,
uuid_post varchar(36) default(UUID()) not null,
uuid_users varchar(36) default(UUID()) not null,
foreign key(uuid_users) references users (uuid_users),
foreign key(uuid_post) references users_post (uuid_post)
);