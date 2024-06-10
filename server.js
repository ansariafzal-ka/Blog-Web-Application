require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const connectDb = require("./config/mongodb");
const expressLayouts = require("express-ejs-layouts");
const blogRouter = require("./routes/blog.routes");
const app = express();

connectDb();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use("/api/v1/blog", blogRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`);
});
