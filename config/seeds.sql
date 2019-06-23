set foreign_key_checks=0;

-- --------------------------------------------------------

--
-- Seed data for users
--

TRUNCATE TABLE users;

INSERT INTO users (username, password, access_id) VALUES
('mike', '111111', 2),
('sibel', '111111', 1),
('vince', '111111', 1),
('test', '111111', 1);

-- --------------------------------------------------------

--
-- Seed data for access_levels
--

TRUNCATE TABLE access_levels;

INSERT INTO access_levels (access_id, type) VALUES
(1, 'Employee'),
(2, 'Manager'),
(3, 'Administrator');

-- --------------------------------------------------------

--
-- Seed data for customers
--

TRUNCATE TABLE customers;

INSERT INTO customers (customer_id, first_name,last_name, address, city, state, zip, email, phone, active) VALUES
(1, 'John', 'Doe', '123 Main St', 'Columbus', 'Ohio', '44000', 'some_email@test.com', '614-555-1212', 1),
(2, 'Mary', 'Smith', '456 Lusard Rd', 'Euclid', 'Ohio', '44000', 'mary_i_am@test.com', '216-555-1212', 1),
(3, 'Michelle', 'Williams', '21234 Nile Ave Apt 4', 'Cleveland', 'Ohio', '44000', 'michelle@test.com', '440-555-1212', 1);

-- --------------------------------------------------------

--
-- Seed data for rooms
--

TRUNCATE TABLE rooms;

INSERT INTO rooms (room_num, room_type_id, description, num_beds, clean, occupied, active) VALUES
('101', 1, 'microwave', 2, 1, 0, 1),
('102', 2, 'new carpet, refrigerator', 2, 1, 0, 1),
('103', 1, 'microwave', 2, 1, 0, 1),
('104', 3, '60" TV', 2, 1, 0, 1),
('105', 1, 'microwave, balcony', 2, 1, 0, 1),
('201', 1, 'microwave, courtyard view', 2, 1, 0, 1),
('202', 3, 'balcony, refrigerator', 2, 1, 0, 1),
('203', 1, 'courtyard view', 2, 1, 0, 1),
('204', 3, 'balcony', 2, 1, 0, 1),
('205', 2, 'microwave, courtyard view', 2, 1, 0, 1);

-- --------------------------------------------------------

--
-- Seed data for room_types
--

TRUNCATE TABLE room_types;

INSERT INTO room_types (room_type_id, type, rate) VALUES
(1, 'Double', 109.99),
(2, 'Queen', 119.99),
(3, 'King', 129.99);

-- --------------------------------------------------------

--
-- Seed data for reservations
--

TRUNCATE TABLE reservations;

INSERT INTO reservations (customer_id, user_id) VALUES
(1, 3),
(2, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Seed data for reservations
--

TRUNCATE TABLE res_rooms;

INSERT INTO res_rooms (reservation_id, room_type_id, check_in_date, check_out_date, adults) VALUES
(1, 3, '2019-08-23', '2019-08-26', 2),
(2, 1, '2019-10-02', '2019-10-03', 1),
(2, 1, '2019-10-02', '2019-10-05', 1),
(3, 2, '2019-09-26', '2019-09-30', 3);

-- --------------------------------------------------------

set foreign_key_checks=1;