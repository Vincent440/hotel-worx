# Hotel Worx
A [Property management system](https://en.wikipedia.org/wiki/Property_management_system) used by Employees, & Managers.

A React.js client making axios requests to an Express.js/Node.js server connected to a MySQL database for persistent storage.

This application is a simple and easy to use React web-based Property Management System.
Allowing employees and managers to supervise the day-to-day operations of their properties.

---
Nav:
 * [View Hotel Worx](https://hotelworx.herokuapp.com/)
 * [HotelWorx Wiki](https://github.com/Vincent440/hotel-worx/wiki)
---


## Getting started:

To use this project, you'll need to do the following:
* View on heroku here [Hotel Worx](https://hotelworx.herokuapp.com/)

* Clone this repository:
```bash
git clone https://github.com/Vincent440/hotel-worx.git
```
* Upload it to a web server of your choice (Heroku, Aws, Azure, ETC.)

* If you're running it locally on your pc, also perform these steps:

    * run 'npm i' from the terminal (this will install the npm modules)
    * create a mysql database using the schema in: **config/schema.sql**
    * populate the newly created database with the data in: **config/seeds.sql**
    * create a `.env` file with the following contents (since this was excluded from being sent to guthub in the .gitignore file):

```
# Port to host application on.
PORT=3001

# Name of the mysql database you will be connecting to.
DB_NAME=DatabaseName

# Host name for connecting to MySQL database
DB_HOST=hostname

#Port to connect to MySQL database
DB_PORT=DatabasePort

# User for connecting to MySQL database
DB_USER=userstringhere

# Password for connecting to MySQL database
DB_PASSWORD=passwordstringhere
```
This allows `server.js` && `config/connection.js` to use Node.js `process.env` variables set on runtime to connect to either the local database or the hosted database.

---

## Example of the complexity of Hotel Worx's Data Structure

One of the more difficult queries was in returning detailed room availability for the next n-number of days. In our case, we decided on 14 days to display on that page.
 * We passed the date to be used into MySQL and saved it to a variable **(SET @input_date=?;)**... with **?** being used as a placeholder until it's set in 'connection.query'. This made it easy to iterate through the days included in the query using a loop... allowing us to use the loop iterator to increment the date interval for each row to return.
 * The next task was to make a pivot table, since the number of available rooms of each type needed to be displayed on a row... with each row being a single days total of available rooms.
 * The number of available rooms for a certain day is determined via a subquery... outputting that total for each room type on its own row
 * Once that is accomplished, those resulting row are pivoted and used as a derived table for the SUM of each available room type.
 * As our loop iterates through the days, it includes a ' UNION ALL ' between all iterations after the first one. It then closes the query string with a semicolon on the final iteration.
 * And finally, we needed to use COALESCE to set the total to 0... if no rooms are available, since (in that case) that field would have returned null.

```js
selectAvailable: (date, cb) => {
        const preQueryString = "SET @input_date=?;";
        const days_to_show = 14;
        let queryString = "";
        for ( let i = 0 ; i < days_to_show ; i++ ) {
            i > 0 ? queryString += " UNION ALL " : "";
            queryString += "SELECT rm3.date, COALESCE(SUM(rm3.rt1), 0) AS RoomType1, COALESCE(SUM(rm3.rt2), 0) AS RoomType2, COALESCE(SUM(rm3.rt3), 0) AS RoomType3, (COALESCE(SUM(rm3.rt1), 0) + COALESCE(SUM(rm3.rt2), 0) + COALESCE(SUM(rm3.rt3), 0)) AS TotalRooms FROM (SELECT (DATE_ADD(@input_date, INTERVAL " + i + " DAY)) AS date, CASE WHEN rm2.room_type_id=1 THEN rm2.available_types END AS rt1, CASE WHEN rm2.room_type_id=2 THEN rm2.available_types END AS rt2, CASE WHEN rm2.room_type_id=3 THEN rm2.available_types END AS rt3 FROM (SELECT rm1.room_type_id, COALESCE(rm1.total_types, 0)-COALESCE(rr1.used_types, 0) AS available_types FROM room_types AS rt LEFT JOIN (SELECT rr.room_type_id, COUNT(*) AS used_types FROM res_rooms AS rr WHERE rr.active=1 && rr.check_in_date<=DATE_ADD(@input_date, INTERVAL " + i + " DAY) && rr.check_out_date>DATE_ADD(@input_date, INTERVAL " + i + " DAY) GROUP BY rr.room_type_id) AS rr1 ON rt.room_type_id=rr1.room_type_id LEFT JOIN (SELECT rm.room_type_id, COUNT(*) AS total_types FROM rooms AS rm WHERE rm.active=1 GROUP BY rm.room_type_id) AS rm1 ON rt.room_type_id=rm1.room_type_id GROUP BY rt.room_type_id ORDER BY rt.room_type_id ASC) AS rm2) AS rm3 GROUP BY rm3.date";
            i === days_to_show - 1 ? queryString += ";" : "";
        }
        connection.query(preQueryString + queryString, [date], (err, results) => {
            if (err) throw err;
            cb(results);
        });
    }
```

---

## Contributers
Project 3 Of _*Case Western Reserve University Coding Bootcamp*_

_**Created June, 2019**_ By:
* [Sibel Baslamisli](https://sialbul.github.io/sibel-portfolio/)
* [Mike Gullo](https://mike14747.github.io/)
* [Vincent Shury](https://vincent440.github.io/)
