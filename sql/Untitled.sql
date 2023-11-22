use movie_db;

create table user_post (
uuid varchar(36) default(UUID()) primary key,
post_title varchar(1000)  not null,
post_conent varchar(1000) ,
post_debate bool not null,
uuid_usersusers varchar(36) default(UUID()) not null,
foreign key(uuid_post) references users (uuid)
);