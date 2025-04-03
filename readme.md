create a .env file based on the .example_env file included

after installing connect-pgsimple, run `psql mydatabase < node_modules/connect-pg-simple/table.sql`

create a users table as below
```
CREATE TABLE users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   email VARCHAR ( 255 ),
   name VARCHAR ( 255 ),
   hash VARCHAR ( 255 ),
   salt VARCHAR ( 255 ),
   member boolean,
   admin boolean
);
```

create table posts (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   subject varchar (255),
   content text,
   date_time timestamp with time zone,
   poster int references users(id)
);