const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const app = express();

require("dotenv").config();
require("./passport");

//available port number assign
const PORT = process.env.PORT || 8070;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

//connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Open the connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Succesfull");
});

//import routes file(add user)
const userRouter = require("./routes/user/userdetails.js");
app.use("/user", userRouter);

const router = require("./routes/user/loyaltypoints");
app.use("/points", router);

const marketplaceRouter = require("./routes/marketplace/requestpools");
app.use("/marketplace", marketplaceRouter);

const orderRouter = require("./routes/marketplace/orders");
app.use("/order", orderRouter);

const routereqRouter = require("./routes/pickup/routerequests");
app.use("/routeReq", routereqRouter);

const routeOrderRouter = require("./routes/pickup/routeorders");
app.use("/routeOrder", routeOrderRouter);

const received = require("./routes/pickup/receiveditems");
app.use("/receivedItem", received);

//Import Routes (Freelance Driver)
const driverRouter = require("./routes/delivery/freelancedrivers");
app.use("/driver", driverRouter);

//(TripDetails)
const tripDetailsRouter = require("./routes/delivery/ongoingdeliverys");
app.use("/trip", tripDetailsRouter);

//(DeliveryDetails)
const deliveryDetailsRouter = require("./routes/delivery/deliverydetails");
app.use("/delivery", deliveryDetailsRouter);

//Import Routes(Item)
const item = require("./routes/recyclefacility/items");
app.use("/item",item);

//Import Routes(company)
const Company = require("./routes/recyclefacility/recyclecompanies");
app.use("/Company",Company);

//Import Routes(company item)
const CompanyItem = require("./routes/recyclefacility/companyitems");
app.use("/CompanyItem",CompanyItem);

//import routes
const postRoutes = require('./routes/staff/posts');
//route middleware
app.use(postRoutes);

//import routes
const recordRoutes = require('./routes/staff/records');
//route middleware
app.use(recordRoutes);

//import routes
const attendRoutes = require('./routes/staff/attends');
//route middleware
app.use(attendRoutes);

const vehicleRouter = require("./routes/vehicle/vehicleregisters");
app.use("/vehicle",vehicleRouter);

const repairRouter = require("./routes/vehicle/vehiclerepairs")
app.use("/repair",repairRouter);

//import routes file(add Second Test).
const frmRouter = require("./routes/payment/formcards");
app.use("/formcards",frmRouter);

const upRouter = require("./routes/payment/userpayments.js");
app.use("/userpayments",upRouter);

const salRouter = require("./routes/payment/salarys.js");
app.use("/salarys",salRouter);

const comRouter = require("./routes/payment/companybuys.js");
app.use("/companybuys",comRouter);

const eWastePickupRouter = require("./routes/ewaste/pickups");
app.use("/ewaste/pickups", eWastePickupRouter);

const eWasteRecyclerRouter = require("./routes/ewaste/recyclers");
app.use("/ewaste/recyclers", eWasteRecyclerRouter);

const eWasteNotificationRouter = require("./routes/ewaste/notifications");
app.use("/ewaste/notifications", eWasteNotificationRouter);

const eWasteAwarenessRouter = require("./routes/ewaste/awareness");
app.use("/ewaste/awareness", eWasteAwarenessRouter);

const eWasteCentreRouter = require("./routes/ewaste/centres");
app.use("/ewaste/centres", eWasteCentreRouter);

const eWasteChatbotRouter = require("./routes/ewaste/chatbot");
app.use("/ewaste/chatbot", eWasteChatbotRouter);

//const marketplaceRouter = require("./Routes/marketplace/requestpools");
//app.use("/marketplace", marketplaceRouter);

//const routereqRouter = require("./Routes/pickup/routerequests");
//app.use("/route", routereqRouter);

//const loyaltyRouter = require("./Routes/loyaltypoints.js");

//app.use("/points", loyaltyRouter);

//Models
//require("./model/Post");
//require("./model/Comment");

//app.use("/posts", require("./routes/posts"));

//run in port
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
