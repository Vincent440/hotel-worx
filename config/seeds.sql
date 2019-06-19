set foreign_key_checks=0;

-- --------------------------------------------------------

--
-- Seed data for table users
--

TRUNCATE TABLE users;

INSERT INTO users (username, password, access_id) VALUES
('mike', '111111', 2),
('sibel', '111111', 1),
('vince', '111111', 1);

-- --------------------------------------------------------

--
-- Seed data for table access_levels
--

TRUNCATE TABLE access_levels;

INSERT INTO access_levels (access_id, type) VALUES
(1, 'Employee'),
(2, 'Manager'),
(3, 'Administrator');

-- --------------------------------------------------------

set foreign_key_checks=1;