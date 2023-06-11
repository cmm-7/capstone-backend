DROP DATABASE IF EXISTS capstone_backend;
CREATE DATABASE capstone_backend;

\c capstone_backend;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    stytch_id TEXT NOT NULL, 
    first_name TEXT NOT NULL,
    middle_name TEXT, 
    last_name TEXT NOT NULL, 
    username TEXT NOT NULL,
    about_me TEXT,
    interests TEXT ARRAY,
    intra_extraversion INT DEFAULT 50,
    phone_number TEXT DEFAULT '0000000000',
    profile_pic TEXT,
    cover_photo TEXT
);

CREATE TABLE events (
    id INT PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_description TEXT NOT NULL,
    event_address TEXT NOT NULL, 
    latitude INT,
    longitude INT,
    organizer_user_id INT,
    group_id INT,
    event_date TEXT NOT NULL
    );

CREATE TABLE users_events (
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    event_id INT REFERENCES events (id) ON DELETE CASCADE,
    pinned BOOLEAN DEFAULT FALSE,
    rsvp BOOLEAN DEFAULT FALSE
    );

-- CREATE TABLE user_events (
--     user_id INT NOT NULL,
--     event_id INT NOT NULL,
--     PRIMARY KEY (user_id, event_id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (event_id) REFERENCES events(id)
-- );
