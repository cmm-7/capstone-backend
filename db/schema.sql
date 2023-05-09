DROP DATABASE IF EXISTS capstone_backend;
CREATE DATABASE capstone_backend;

\c capstone_backend;
CREATE TABLE test (name TEXT);

CREATE TABLE events (
    id INT PRIMARY KEY,
    event_name VARCHAR(50) NOT NULL,
    event_description VARCHAR(50) NOT NULL,
    event_address VARCHAR(50) NOT NULL, 
    latitude INT,
    longitude INT,
    organizer_id INT,
    group_id INT,
    CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES users (id),
    CONSTRAINT fk_events_group FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE SET NULL
);

CREATE TABLE user_events (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);