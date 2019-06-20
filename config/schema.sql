DROP DATABASE IF EXISTS hotel_worx_db;
CREATE DATABASE hotel_worx_db;
USE hotel_worx_db;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE users (
    user_id int(6) NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL,
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
    credit_card_num varchar(30),
    active boolean DEFAULT 1,
    PRIMARY KEY (customer_id)
);

-- --------------------------------------------------------

CREATE TABLE reservations (
    reservation_id int(10) NOT NULL AUTO_INCREMENT,
    customer_id int(6),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    room_id int(6) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    checked_in boolean DEFAULT 0,
    checked_out boolean DEFAULT 0,
    PRIMARY KEY (reservation_id)
);

-- --------------------------------------------------------

CREATE TABLE tax_rates (
    tax_rate_id int(3) NOT NULL AUTO_INCREMENT,
    sales_tax_rate DECIMAL(4,3) DEFAULT 0,
    local_tax_rate DECIMAL(4,3) DEFAULT 0,
    misc_tax_rate DECIMAL(4,3) DEFAULT 0,
    PRIMARY KEY (tax_rate_id)
);

-- --------------------------------------------------------

set foreign_key_checks=1;