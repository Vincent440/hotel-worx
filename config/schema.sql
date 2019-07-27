DROP DATABASE IF EXISTS hotel_worx_db;
CREATE DATABASE hotel_worx_db;
USE hotel_worx_db;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE users (
    user_id int(6) NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    access_id int(3) NOT NULL,
    FOREIGN KEY (access_id) REFERENCES access_levels(access_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    active boolean DEFAULT 1,
    PRIMARY KEY (user_id)
);

-- --------------------------------------------------------

CREATE TABLE access_levels (
    access_id int(3) NOT NULL AUTO_INCREMENT,
    type varchar(30) NOT NULL,
    PRIMARY KEY (access_id)
);

-- --------------------------------------------------------

CREATE TABLE rooms (
    room_id int(6) NOT NULL AUTO_INCREMENT,
    room_num varchar(20) NOT NULL UNIQUE,
    room_type_id int(3) NOT NULL,
    FOREIGN KEY (room_type_id) REFERENCES room_types(room_type_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    description varchar(255),
    num_beds int(3) NOT NULL,
    clean boolean DEFAULT 0,
    occupied boolean DEFAULT 0,
    active boolean DEFAULT 1,
    PRIMARY KEY (room_id)
);

-- --------------------------------------------------------

CREATE TABLE room_types (
    room_type_id int(3) NOT NULL AUTO_INCREMENT,
    type varchar(30) NOT NULL,
    rate decimal(5,2) NOT NULL,
    PRIMARY KEY (room_type_id)
);

-- --------------------------------------------------------

CREATE TABLE customers (
    customer_id int(6) NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(30) NOT NULL,
    zip varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    phone varchar(20) NOT NULL,
    credit_card_num varchar(30) NOT NULL,
    cc_expiration varchar(10) NOT NULL,
    PRIMARY KEY (customer_id)
);

-- --------------------------------------------------------

CREATE TABLE reservations (
    reservation_id int(10) NOT NULL AUTO_INCREMENT,
    customer_id int(6) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    user_id int(6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    comments varchar(255),
    active boolean DEFAULT 1,
    PRIMARY KEY (reservation_id)
);

-- --------------------------------------------------------

CREATE TABLE res_rooms (
    res_room_id int(10) NOT NULL AUTO_INCREMENT,
    reservation_id int(10) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE CASCADE ON UPDATE CASCADE,
    room_type_id int(6) NOT NULL,
    FOREIGN KEY (room_type_id) REFERENCES room_types(room_type_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    check_in_date date NOT NULL,
    check_out_date date NOT NULL,
    checked_in boolean DEFAULT 0,
    checked_out boolean DEFAULT 0,
    adults int(3) NOT NULL,
    room_id int(6),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    rate decimal(5,2) NOT NULL,
    confirmation_code varchar(20) NULL,
    comments varchar(255),
    active boolean DEFAULT 1,
    PRIMARY KEY (res_room_id)
);

-- --------------------------------------------------------

CREATE TABLE tax_rates (
    tax_rate_id int(3) NOT NULL AUTO_INCREMENT,
    county_tax_rate decimal(4,3) DEFAULT 0,
    city_tax_rate decimal(4,3) DEFAULT 0,
    state_tax_rate decimal(4,3) DEFAULT 0,
    PRIMARY KEY (tax_rate_id)
);

-- --------------------------------------------------------

CREATE TABLE invoices (
    invoice_id int(10) NOT NULL AUTO_INCREMENT,
    res_room_id int(10) NOT NULL,
    FOREIGN KEY (res_room_id) REFERENCES res_rooms(res_room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    num_days int(3) NOT NULL,
    rate decimal(5,2) NOT NULL,
    phone_charges decimal(5,2) DEFAULT 0,
    laundry_charges decimal(5,2) DEFAULT 0,
    room_service_charges decimal(5,2) DEFAULT 0,
    misc_charges decimal(5,2) DEFAULT 0,
    county_tax decimal(5,2) NOT NULL,
    city_tax decimal(5,2) NOT NULL,
    state_tax decimal(5,2) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id)
);

-- --------------------------------------------------------

CREATE TABLE hotel_info (
    hotel_info_id int(6) NOT NULL AUTO_INCREMENT,
    hotel_name varchar(30) NOT NULL,
    address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(30) NOT NULL,
    zip varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    phone varchar(20) NOT NULL,
    image_url varchar(60) NOT NULL,
    active boolean DEFAULT 1,
    PRIMARY KEY (hotel_info_id)
);

-- --------------------------------------------------------

CREATE TABLE sessions (
    session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
    expires int(11) unsigned NOT NULL,
    data mediumtext COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);

-- --------------------------------------------------------

CREATE TABLE room_issues (
    room_issue_id int(10) NOT NULL AUTO_INCREMENT,
    room_id int(6),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    issue text NOT NULL,
    user_id int(6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    start_date date NOT NULL,
    end_date date NOT NULL,
    fixed boolean DEFAULT 0,
    PRIMARY KEY (room_issue_id)
);

-- --------------------------------------------------------

set foreign_key_checks=1;