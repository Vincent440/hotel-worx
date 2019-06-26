const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}.`);
});