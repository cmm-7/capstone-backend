\c capstone_backend;

-- INSERT INTO test (name) 
-- VALUES ('Carlos');

-- INSERT INTO user_events (user_id, event_id)
-- VALUES (1, 1);

INSERT INTO events (id, event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id) VALUES
(1, 'Birthday party', 'Come celebrate my birthday with me!', '123 Main St', 37.7749, -122.4194, 1, null),
(2, 'Charity fundraiser', 'Help us raise money for a good cause!', '456 Oak St', 37.7749, -122.4194, 2, 1),
(3, 'Music festival', 'A weekend of music and fun', '789 Maple St', 37.7749, -122.4194, 3, null);
