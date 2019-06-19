const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}.`);
});