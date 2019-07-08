# Hotel Worx
Project 3 repository. Hotel Employee booking software.

---
[HotelWorx Wiki](https://github.com/Vincent440/hotel-worx/wiki)
---

## How users can get started with the project:

To use this project, you'll need to do the following:

* clone this repository onto your computer or upload it to a web server of your choice

* if you're running it locally on your pc, also perform these steps:

    * run 'npm i' from the terminal (this will install the npm modules)
    * create a mysql database using the schema in: **config/schema.sql**
    * populate the newly created database with the data in: **config/seeds.sql**
    * create a **config/pwd.js** file with the following contents (since this was excluded from being sent to guthub in the .gitignore file):

```
var pwd = <your_password>;

module.exports = pwd;
```

---

## About the code in this project:

One of the more difficult queries was in returning detailed room availability for the next n-number of days. In our case, we decided on 14 days to display on that page.
 * We passed the date to be used into MySQL and saved it to a variable (SET @input_date=?;)... with ? being used as a placeholder until it's set in 'connection.query'. This made it easy to iterate through the days included in the query using a loop... allowing us to use the loop iterator to increment the date interval for each row to return.
 * The next task was to make a pivot table, since the number of available rooms of each type needed to be displayed on a row... with each row being a single days total of available rooms.
 * The inner most subquery checks each room_id to make sure it's not included in any of the check_in_date or check_out_date ranges of the already reserved rooms.
 * Once that is accomplished, that result is pivoted and used as a derived table for the SUM of each available room type is made.
 * As our loop iterates through the days, it includes a ' UNION ALL ' between all iterations after the first one. It then closes the query string with a semicolon on the final iteration.
 * And finally, we needed to use COALESCE to set the total to 0... if no rooms are available, since (in that case) that field would have returned null.

```
selectAvailable: (date, cb) => {
    const preQueryString = "SET @input_date=?;";
    const days_to_show = 14;
    let queryString = "";
    for (let i=0; i<days_to_show; i++) {
        i>0 ? queryString += " UNION ALL " : "";
        queryString += "SELECT rm3.date, COALESCE(SUM(rm3.rt1), 0) AS RoomType1, COALESCE(SUM(rm3.rt2), 0) AS RoomType2, COALESCE(SUM(rm3.rt3), 0) AS RoomType3, (COALESCE(SUM(rm3.rt1), 0) + COALESCE(SUM(rm3.rt2), 0) + COALESCE(SUM(rm3.rt3), 0)) AS TotalRooms FROM (SELECT (DATE_ADD(@input_date, INTERVAL " + i + " DAY)) AS date, CASE WHEN rm2.room_type_id=1 THEN rm2.total END AS rt1, CASE WHEN rm2.room_type_id=2 THEN rm2.total END AS rt2, CASE WHEN rm2.room_type_id=3 THEN rm2.total END AS rt3 FROM (SELECT COUNT(*) AS total, rm1.room_type_id FROM (SELECT rm.room_type_id FROM rooms AS rm WHERE rm.active=1 && rm.room_id NOT IN (SELECT rr.room_id FROM res_rooms AS rr WHERE rr.active=1 && rr.check_in_date<=DATE_ADD(@input_date, INTERVAL " + i + " DAY) && rr.check_out_date>DATE_ADD(@input_date, INTERVAL " + i + " DAY))) AS rm1 GROUP BY rm1.room_type_id) AS rm2) AS rm3 GROUP BY rm3.date";
        i===days_to_show-1 ? queryString += ";" : "";
    }
    connection.query(preQueryString + queryString, [date], (err, results) => {
        if (err) throw err;
        cb(results);
    });
}
```

---

## Contributers

* [Sibel Baslamisli](https://sialbul.github.io/sibel-portfolio/)
* [Mike Gullo](https://mike14747.github.io/)
* [Vincent Shury](https://vincent440.github.io/)
