use movie_db;

create table user_comment (

uuid_comment varchar(36) default(UUID()) primary key,
comment_conent varchar(1000) ,
uuid_users varchar(36) default(UUID()) not null,
uuid_post varchar(36) default(UUID()) not null,
foreign key(uuid_users) references users (uuid_users),
foreign key(uuid_post) references users_post (uuid_post)

);