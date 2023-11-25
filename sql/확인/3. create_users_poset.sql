use movie_db;

create table users_post (
uuid_post varchar(36) default(UUID()) primary key,
post_title varchar(1000)  not null,
post_content varchar(1000) ,
post_debate bool ,
post_movie_id varchar(1000) not null,
post_movie_name varchar(1000) not null,
post_create_date date default(now()) not null,
post_movie_poster varchar(1000) ,
post_views int,
uuid_users varchar(36) default(UUID()) not null,
foreign key(uuid_users) references users (uuid_users)
);