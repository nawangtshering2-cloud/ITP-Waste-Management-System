import "./App1.css";
import React from "react";
import Navbar from "./UserManagement/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./UserManagement/Login";
import Register from "./UserManagement/Register";
import PrivateRoute from "./hocomponents/privateRoute";
import UnPrivateRoute from "./hocomponents/unPrivateRoute";
import Admin from "./UserManagement/Admin";
import Profile from "./UserManagement/Profile";
import UserProfile from "./UserManagement/Userprofile";
import EditProfile from "./UserManagement/EditProfile";
import DeleteProfile from "./UserManagement/DeleteProfile";
import UserProfileclient from "./UserManagement/UserProfileclient";

// Marketplace
import AddRequest from "./MarketPlaceManagement/AddRequest";
import UpdateRequest from "./MarketPlaceManagement/UpdateRequest";
import Dashboard from "./MarketPlaceManagement/Dashboard";
import ItemList from "./MarketPlaceManagement/ItemList";
import DeleteRequest from "./MarketPlaceManagement/DeleteRequest";
import Checkout from "./MarketPlaceManagement/Checkout";

// Pickup
import DisplayReq from "./PickupFunction/DisplayReq";
import DisplayOrder from "./PickupFunction/DisplayOrder";
import RouteOrderAdd from "./PickupFunction/RouteOrderAdd";
import EditRouteOrder from "./PickupFunction/EditRouteOrder";
import DeleteRouteOrder from "./PickupFunction/DeleteRouteOrder";
import DisplayRouterOrder from "./PickupFunction/DisplayRouteOrder";
import RouteReqAdd from "./PickupFunction/RouteReqAdd";
import DisplayRouteRequest from "./PickupFunction/DisplayRouteRequest";
import EditRouteRequest from "./PickupFunction/EditRouteRequest";
import DeleteRouteRequest from "./PickupFunction/DeleteRouteRequest";
import CollectDisplay from "./PickupFunction/CollectDisplay";
import CollectDelete from "./PickupFunction/CollectDelete";

// Delivery
import DriverProfile from "./DeliveryManagement/DriverProfile";
import DriverRegister from "./DeliveryManagement/DriverRegister";
import View from "./DeliveryManagement/View";
import CollectItem from "./DeliveryManagement/CollectItem";
import SelectDriver from "./DeliveryManagement/SelectDriver";
import CheckDrivers from "./DeliveryManagement/CheckDrivers";

// Recycle Facility
import home from "./RecycleFacilityManagement/home";
import discompanies from "./RecycleFacilityManagement/discompanies";
import insertcompany from "./RecycleFacilityManagement/insertcompany";
import insertitem from "./RecycleFacilityManagement/insertitem";
import upcompany from "./RecycleFacilityManagement/upcompany";
import update from "./RecycleFacilityManagement/updateitem";
import additemscapacity from "./RecycleFacilityManagement/additemscapacity";

// Staff
import CreatePost from "./staffmanage/CreatePost";
import EditPost from "./staffmanage/EditPost";
import Itemdis from "./staffmanage/Home";
import PostDetails from "./staffmanage/PostDetails";
import CreateRecord from "./staffmanage/CreateRecord";
import EditRecord from "./staffmanage/EditRecord";
import Record from "./staffmanage/Record";
import RecordDetails from "./staffmanage/RecordDetails";
import Attend from "./staffmanage/Attend";
import AttendDetails from "./staffmanage/AttendDetails";
import CreateAttend from "./staffmanage/CreateAttend";

// Vehicle
import AddVehicle from "./vehicle/AddVehicle";
import AllVehicles from "./vehicle/AllVehicles";
import RepairVehicle from "./vehicle/RepairVehicle";
import VehicleDetails from "./vehicle/UpdateVehicleDetails";
import DeleteVehicle from "./vehicle/DeleteVehicle";
import SideBar from "./vehicle/SideBar";
import HomePage from "./vehicle/HomePage";

// Payment
import CreditCardForm from "./Payment/CreditCardForm";
import Header2 from "./Payment/Header2";
import Header3 from "./Payment/Header3";
import Myearning from "./Payment/Myearning";
import PaymentData from "./Payment/PaymentData";
import UserPayForm from "./Payment/UserPayForm";
import AddSalary from "./Payment/AddSalary";
import SalaryData from "./Payment/SalaryData";
import EditCard from "./Payment/editCard";

function App() {
  return (
    <Router>
      <SideBar />
      <Navbar />

      {/* User */}
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />

      <PrivateRoute
        path="/admin"
        roles={["admin"]}
        component={Admin}
      />

      <PrivateRoute
        path="/profiles"
        roles={["admin"]}
        component={Profile}
      />

      <PrivateRoute
        path="/profile/:id"
        roles={["admin", "User"]}
        component={UserProfile}
      />

      <PrivateRoute
        path="/editprofile/:id"
        roles={["admin", "User"]}
        component={EditProfile}
      />

      <PrivateRoute
        path="/deleteprofile/:id"
        roles={["admin", "User"]}
        component={DeleteProfile}
      />

      <PrivateRoute
        path="/clientprofile/:id"
        roles={["admin", "User"]}
        component={UserProfileclient}
      />

      {/* Marketplace */}
      <PrivateRoute
        path="/addRequest"
        roles={["admin", "User"]}
        exact
        component={AddRequest}
      />

      <PrivateRoute
        path="/UpdateRequest"
        roles={["admin", "User"]}
        exact
        component={UpdateRequest}
      />

      <PrivateRoute
        path="/dashboard"
        roles={["admin", "User"]}
        exact
        component={Dashboard}
      />

      <PrivateRoute
        path="/deleteRequest"
        roles={["admin", "User"]}
        exact
        component={DeleteRequest}
      />

      <PrivateRoute
        path="/checkout"
        roles={["admin", "User"]}
        exact
        component={Checkout}
      />

      <PrivateRoute
        path="/itemlist"
        roles={["admin", "User"]}
        exact
        component={ItemList}
      />

      {/* Pickup */}
      <Route path="/req" exact component={DisplayReq} />

      <PrivateRoute
        path="/addOrder/route"
        roles={["admin"]}
        exact
        component={RouteOrderAdd}
      />

      <PrivateRoute
        path="/order"
        roles={["admin"]}
        exact
        component={DisplayOrder}
      />

      <PrivateRoute
        path="/addReq/route"
        roles={["admin"]}
        exact
        component={RouteReqAdd}
      />

      <PrivateRoute
        path="/routeReq"
        roles={["admin"]}
        exact
        component={DisplayRouteRequest}
      />

      <PrivateRoute
        path="/editReq/route"
        roles={["admin"]}
        exact
        component={EditRouteRequest}
      />

      <PrivateRoute
        path="/deeleteRe/route"
        roles={["admin"]}
        exact
        component={DeleteRouteRequest}
      />

      <PrivateRoute
        path="/routeOrder"
        roles={["admin"]}
        exact
        component={DisplayRouterOrder}
      />

      <PrivateRoute
        path="/editOrder/route"
        roles={["admin"]}
        exact
        component={EditRouteOrder}
      />

      <PrivateRoute
        path="/deleteOrder/route"
        roles={["admin"]}
        exact
        component={DeleteRouteOrder}
      />

      <PrivateRoute
        path="/collect"
        roles={["admin"]}
        exact
        component={CollectItem}
      />

      <PrivateRoute
        path="/collect/dis"
        roles={["admin"]}
        exact
        component={CollectDisplay}
      />

      <PrivateRoute
        path="/collect/delete"
        roles={["admin"]}
        exact
        component={CollectDelete}
      />

      {/* Delivery */}
      <PrivateRoute
        path="/driver/:dId/reg"
        roles={["User"]}
        exact
        component={DriverRegister}
      />

      <PrivateRoute
        path="/driver/prof/:id"
        roles={["User"]}
        exact
        component={DriverProfile}
      />

      <PrivateRoute
        path="/routeReq/allRouteReq"
        roles={["admin"]}
        exact
        component={CheckDrivers}
      />

      <PrivateRoute
        path="/driver/allprof"
        roles={["admin"]}
        exact
        component={SelectDriver}
      />

      <PrivateRoute
        path="/delivery/display"
        roles={["User"]}
        exact
        component={View}
      />

      <PrivateRoute
        path="/driver/collect"
        roles={["User"]}
        exact
        component={CollectItem}
      />

      {/* Recycle Facility */}
      <PrivateRoute
        path="/itemdisp"
        roles={["admin"]}
        exact
        component={home}
      />

      <PrivateRoute
        path="/add"
        roles={["admin"]}
        component={insertitem}
      />

      <PrivateRoute
        path="/update/:id"
        roles={["admin"]}
        component={update}
      />

      <PrivateRoute
        path="/addcompany"
        roles={["admin"]}
        component={insertcompany}
      />

      <PrivateRoute
        path="/discompanies"
        roles={["admin"]}
        component={discompanies}
      />

      <PrivateRoute
        path="/upcompany/:id"
        roles={["admin"]}
        component={upcompany}
      />

      <PrivateRoute
        path="/addcompanyitems"
        roles={["admin"]}
        component={additemscapacity}
      />

      {/* Staff */}
      <PrivateRoute
        path="/staffdisp"
        roles={["admin"]}
        exact
        component={Itemdis}
      />

      <PrivateRoute
        path="/addpost"
        roles={["admin"]}
        component={CreatePost}
      />

      <PrivateRoute
        path="/edit/:id"
        roles={["admin"]}
        component={EditPost}
      />

      <PrivateRoute
        path="/post/:id"
        roles={["admin"]}
        component={PostDetails}
      />

      <PrivateRoute
        path="/srecord"
        roles={["admin"]}
        exact
        component={Record}
      />

      <PrivateRoute
        path="/addrecord"
        roles={["admin"]}
        component={CreateRecord}
      />

      <PrivateRoute
        path="/editrecord/:id"
        roles={["admin"]}
        component={EditRecord}
      />

      <PrivateRoute
        path="/record/:id"
        roles={["admin"]}
        component={RecordDetails}
      />

      <PrivateRoute
        path="/staffattend"
        roles={["admin", "User"]}
        exact
        component={Attend}
      />

      <PrivateRoute
        path="/addattend"
        roles={["admin", "User"]}
        component={CreateAttend}
      />

      <PrivateRoute
        path="/attend/:id"
        roles={["admin", "User"]}
        component={AttendDetails}
      />

      {/* Vehicle */}
      <div className="container" ms-5>
        <Route path="/" exact component={HomePage} />

        <PrivateRoute
          path="/addvehicle"
          roles={["admin"]}
          exact
          component={AddVehicle}
        />

        <PrivateRoute
          path="/all"
          roles={["admin"]}
          exact
          component={AllVehicles}
        />

        <PrivateRoute
          path="/details"
          roles={["admin"]}
          component={VehicleDetails}
        />

        <PrivateRoute
          path="/delete"
          roles={["admin"]}
          component={DeleteVehicle}
        />

        <PrivateRoute
          path="/addrepair"
          roles={["admin"]}
          exact
          component={RepairVehicle}
        />
      </div>

      {/* Payment */}
      <div className="App">
        <EditCard />

        <PrivateRoute
          path="/credit-card-validation/MyEarning"
          roles={["admin", "User"]}
          component={Myearning}
        />

        <PrivateRoute
          path="/credit-card-validation/addSalary"
          roles={["admin"]}
          component={AddSalary}
        />

        <PrivateRoute
          path="/credit-card-validation/SalaryData"
          roles={["admin"]}
          component={SalaryData}
        />

        <PrivateRoute
          path="/credit-card-validation/UserPayForm"
          roles={["admin", "User"]}
          component={UserPayForm}
        />

        <PrivateRoute
          path="/credit-card-validation/PaymentData"
          roles={["admin", "User"]}
          component={PaymentData}
        />

        <PrivateRoute
          path="/credit-card-validation/addcard"
          roles={["admin", "User"]}
          component={CreditCardForm}
        />

        <PrivateRoute
          path="/credit-card-validation/editCard"
          roles={["admin", "User"]}
          component={Header3}
        />

        <PrivateRoute
          path="/credit-card-validation/allCards"
          roles={["admin", "User"]}
          component={Header2}
        />
      </div>
    </Router>
  );
}

export default App;