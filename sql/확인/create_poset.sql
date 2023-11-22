use movie_db;

create table users_post (
uuid_post varchar(36) default(UUID()) primary key,
post_title varchar(1000)  not null,
post_conent varchar(1000) ,
post_debate bool not null,
uuid_users varchar(36) default(UUID()) not null,
foreign key(uuid_users) references users (uuid_users)
);