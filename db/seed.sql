\c capstone_backend;

-- INSERT INTO test (name) 
-- VALUES ('Carlos');

-- INSERT INTO user_events (user_id, event_id)
-- VALUES (1, 1);

INSERT INTO events (id, event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id, event_date) VALUES
(1, 'Birthday party', 'Come celebrate my birthday with me!', '123 Main St', 37.7749, -122.4194, 1, null, '5/21/2023'),
(2, 'Charity fundraiser', 'Help us raise money for a good cause!', '456 Oak St', 37.7749, -122.4194, 2, 1, '5/26/2023'),
(3, 'Music festival', 'A weekend of music and fun', '789 Maple St', 37.7749, -122.4194, 3, null, '5/28/2023'),
(4, 'Pursuit Demo Day', '9.2 Nights and Weekends Demo Day', '370 10th Ave', 40.753063,-74.000062, 3, null, '6/27/2023');

INSERT INTO users 
    (stytch_id, first_name, middle_name, last_name, username, about_me, interests, intra_extraversion, phone_number, profile_pic)
VALUES 
    ('id1', 'John', 'Doe', 'Smith', 'johnsmith', 'I love hiking and reading books', ARRAY ['hiking', 'reading'], 60, '1234567890', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id2', 'Jane', 'Ann', 'Doe', 'janedoe', 'I am a software engineer who loves painting', ARRAY ['coding', 'painting'], 40, '0987654321', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
    ('id3', 'Alice', 'L.', 'Green', 'alicegreen', 'Photography is my passion', ARRAY ['photography', 'travel'], 70, '1122334455', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
    ('id4', 'Bob', 'M.', 'Brown', 'bobbrown', 'I am a chef and a food lover', ARRAY ['cooking', 'eating'], 80, '2233445566', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id5', 'Charlie', NULL, 'Black', 'charlieblack', 'Music is my life', ARRAY ['singing', 'guitar'], 50, '3344556677', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id6', 'David', 'P.', 'White', 'davidwhite', 'I enjoy playing chess and solving puzzles', ARRAY ['chess', 'puzzles'], 30, '4455667788', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id7', 'Emily', NULL, 'Davis', 'emilydavis', 'I am a bookworm', ARRAY ['reading', 'writing'], 60, '5566778899', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
    ('id8', 'Frank', 'R.', 'Miller', 'frankmiller', 'I am a professional swimmer', ARRAY ['swimming', 'sports'], 70, '6677889900', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id9', 'Grace', NULL, 'Wilson', 'gracewilson', 'I love animals and nature', ARRAY ['animals', 'nature'], 80, '7788990011', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
    ('id10', 'Henry', 'T.', 'Moore', 'henrymoore', 'I am a movie enthusiast', ARRAY ['movies', 'theater'], 90, '8899001122', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png');

    INSERT INTO users_events
    (user_id, event_id, pinned, rsvp)
VALUES
    (1, 1, FALSE, TRUE),
    (2, 1, FALSE, TRUE),
    (3, 1, TRUE, TRUE),
    (4, 1, FALSE, FALSE),

    (1, 2, FALSE, TRUE),
    (2, 2, TRUE, TRUE),
    (3, 2, FALSE, TRUE),
    (4, 2, TRUE, FALSE),

    (1, 3, TRUE, TRUE),
    (2, 3, FALSE, TRUE),
    (3, 3, TRUE, TRUE),
    (4, 3, FALSE, FALSE),
    (5, 3, FALSE, FALSE),

    (1, 4, FALSE, TRUE),
    (2, 4, FALSE, TRUE);

