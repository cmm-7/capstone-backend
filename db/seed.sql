\c capstone_backend;

-- INSERT INTO test (name) 
-- VALUES ('Carlos');

-- INSERT INTO user_events (user_id, event_id)
-- VALUES (1, 1);

INSERT INTO events (id, event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id, event_date) VALUES
(1, 'Birthday Party', 'Come celebrate my birthday with me!', '123 Main St, Brooklyn, NY 11235', 37.7749, -122.4194, 1, null, '5/21/2023'),
(2, 'Charity Fundraiser', 'Help us raise money for a good cause!', '456 Oak St, New York, NY 10001', 37.7749, -122.4194, 2, 1, '5/26/2023'),
(3, 'Music Festival', 'A weekend of music and fun', '789 Maple St, Astoria, NY 11106', 37.7749, -122.4194, 3, null, '5/28/2023'),
(4, 'Pursuit Demo Day', '9.2 Nights and Weekends Demo Day', '370 10th Ave, Long Island City, NY 11101', 40.753063,-74.000062, 3, null, '6/27/2023');

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
    ('id10', 'Henry', 'T.', 'Moore', 'henrymoore', 'I am a movie enthusiast', ARRAY ['movies', 'theater'], 90, '8899001122', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id10', 'Henry', 'T.', 'Moore', 'henrymoore', 'I am a movie enthusiast', ARRAY['movies', 'theater'], 90, '8899001122', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'),
    ('id11', 'John', 'D.', 'Smith', 'johnsmith', 'I love traveling and photography', ARRAY['travel', 'photography'], 70, '1122334455', 'https://cdn-icons-png.flaticon.com/512/3135/3135723.png'),
    ('id12', 'Emily', 'J.', 'Johnson', 'emilyjohnson', 'Passionate about cooking and baking', ARRAY['cooking', 'baking'], 80, '2233445566', 'https://cdn-icons-png.flaticon.com/512/3135/3135714.png'),
    ('id13', 'Michael', 'R.', 'Brown', 'michaelbrown', 'Fitness enthusiast and sports lover', ARRAY['fitness', 'sports'], 60, '3344556677', 'https://cdn-icons-png.flaticon.com/512/3135/3135716.png'),
    ('id14', 'Sophia', 'E.', 'Davis', 'sophiadavis', 'Nature lover and hiker', ARRAY['nature', 'hiking'], 75, '4455667788', 'https://cdn-icons-png.flaticon.com/512/3135/3135717.png'),
    ('id15', 'Matthew', 'L.', 'Wilson', 'matthewwilson', 'Musician and guitar player', ARRAY['music', 'guitar'], 85, '5566778899', 'https://cdn-icons-png.flaticon.com/512/3135/3135718.png'),
    ('id16', 'Olivia', 'M.', 'Taylor', 'oliviataylor', 'Bookworm and avid reader', ARRAY['books', 'reading'], 70, '6677889900', 'https://cdn-icons-png.flaticon.com/512/3135/3135719.png'),
    ('id17', 'Ethan', 'S.', 'Anderson', 'ethananderson', 'Tech enthusiast and programmer', ARRAY['technology', 'programming'], 80, '7788990011', 'https://cdn-icons-png.flaticon.com/512/3135/3135720.png'),
    ('id18', 'Ava', 'N.', 'Thomas', 'avathomas', 'Animal lover and pet owner', ARRAY['animals', 'pets'], 65, '8899001122', 'https://cdn-icons-png.flaticon.com/512/3135/3135721.png'),
    ('id19', 'William', 'K.', 'Jackson', 'williamjackson', 'Sports fan and basketball player', ARRAY['sports', 'basketball'], 75, '9900112233', 'https://cdn-icons-png.flaticon.com/512/3135/3135722.png');

    INSERT INTO users_events
    (user_id, event_id, pinned, rsvp)
VALUES
    (1, 1, FALSE, TRUE),
    (2, 1, FALSE, TRUE),
    (3, 1, TRUE, TRUE),
    (4, 1, FALSE, FALSE),
    (19, 1, FALSE, TRUE),
    (18, 1, FALSE, TRUE),
    (12, 1, FALSE, TRUE),

    (18, 2, FALSE, TRUE),
    (14, 2, TRUE, TRUE),
    (3, 2, FALSE, TRUE),
    (4, 2, TRUE, FALSE),

    (1, 3, TRUE, TRUE),
    (2, 3, FALSE, TRUE),
    (3, 3, TRUE, TRUE),
    (4, 3, FALSE, FALSE),
    (5, 3, FALSE, FALSE),
    (18, 3, FALSE, TRUE),
    (12, 3, FALSE, TRUE),

    (1, 4, FALSE, TRUE),
    (2, 4, FALSE, TRUE),
    (18, 4, FALSE, TRUE);

