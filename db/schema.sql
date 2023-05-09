DROP DATABASE IF EXISTS capstone_backend;
CREATE DATABASE capstone_backend;

\c capstone_backend;
CREATE TABLE test (name TEXT);

CREATE TABLE user_events (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);