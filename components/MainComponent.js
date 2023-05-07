import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterComponent from "./RegisterComponent";

import HomeComponent from "./HomeComponent";
import DishdetailComponent from "./DishdetailComponent";
import LoginComponent from "./LoginComponent";
import Comment from "../Pages/Comment/Comment";
import FeedbackBrand from "../Pages/FeedbackBrand/FeedbackBrand";
import Payment from "../Pages/Payment/Payment";
import Blog from "../Pages/Blog/Blog";
import DiscountBrand from "../Pages/DiscountBrand/DiscountBrand";
import DetailsBrandDiscount from "../Pages/DetailsDiscount/DetailsBrandDiscount";
import InvoiceComponent from "./InvoiceComponent";
import AdminComponent from "./AdminComponent";
import AdminStore from "../Pages/Admin/AdminStore/AdminStore";
import AdminDetails from "../Pages/Admin/AdminDetails/AdminDetails";
import AdminDiscount from "../Pages/Admin/AdminDiscount/AdminDiscount";
import DiscountDetails from "../Pages/Admin/AdminDiscount/DiscountDetails";
import InvoiceAdmin from "../Pages/Admin/Invoice/InvoiceAdmin";
import InvoiceDetails from "../Pages/Admin/Invoice/InvoiceDetails";
import AdminContact from "../Pages/Admin/ContactManager/AdminContact";
import MenuAdminDetails from "../Pages/Admin/MenuAdmin/MenuAdminDetails.js";
import MenuAdmin from "../Pages/Admin/MenuAdmin/MenuAdmin.js";
import DishDetails from "../Pages/Admin/MenuAdmin/DishDetails";
import InnvoiceUser from "../Pages/InvoiceUser/InnvoiceUser";
import Invoice1Month from "../Pages/Admin/Invoice/Invoice1Month";
import SupplierComponent from "./SupplierComponent";
import SupplierDetails from "../Pages/SupplierAdmin/SupplierDetails";
import InvoiceSupplier from "../Pages/Admin/InvoiceSupplier/InvoiceSupplier";
import UserDetails from "../Pages/UserDetails/UserDetails";
import ContactManagerSupplier from "../Pages/SupplierAdmin/ContactManagerSupplier";








function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName="login"
      screenOptions={{
        headerStyle: {
          height: 50,
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          textAlign: "right",
          alignItems: "center",
        },
      }}
    >
      {/* login */}
      <HomeNavigator.Screen
        name="login"
        component={LoginComponent}
        options={({ navigation }) => ({
          headerTitle: "login",
          headerMode: "screen",
          headerShown: false,
          headerRight: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      ></HomeNavigator.Screen>
      {/* register */}
      <HomeNavigator.Screen
        name="Register"
        component={RegisterComponent}
        options={{ headerTitle: "register", headerShown: false }}
      />
      {/* Home */}
      <HomeNavigator.Screen
        name="Home"
        component={HomeComponent}
        options={{ headerTitle: "Home", headerShown: false }}
      />
      {/* Menu chi tiết  */}
      <HomeNavigator.Screen
        name="Details"
        component={DishdetailComponent}
        options={{ headerTitle: "Dish Detail", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* cmt món */}
      <HomeNavigator.Screen
        name="Comment"
        component={Comment}
        options={{ headerTitle: "Đánh Giá", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* cmt quán */}
      <HomeNavigator.Screen
        name="FeedBackBrand"
        component={FeedbackBrand}
        options={{ headerTitle: "FeedBack", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* thanh toán */}
      <HomeNavigator.Screen
        name="Payment"
        component={Payment}
        options={{ headerTitle: "Payment", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* blog */}
      <HomeNavigator.Screen
        name="Blogs"
        component={Blog}
        options={{ headerTitle: "Blog", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* mã giảm giá */}
      <HomeNavigator.Screen
        name="DiscountBrand"
        component={DiscountBrand}
        options={{ headerTitle: "Quán Đang Áp Dụng Mã", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* chi tiết mã giảm */}
      <HomeNavigator.Screen
        name="DetailsDiscount"
        component={DetailsBrandDiscount}
        options={{ headerTitle: "Details", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* hóa đơn chi tiết */}
      <HomeNavigator.Screen
        name="Invoice"
        component={InvoiceComponent}
        options={{ headerTitle: "Details", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* hợp đồng chủ cửa hàng */}
      <HomeNavigator.Screen
        name="AdminContact"
        component={AdminContact}
        options={{ headerTitle: "Details", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* chủ cửa hàng */}
      <HomeNavigator.Screen
        name="Admin"
        component={AdminComponent}
        options={{ headerTitle: "Details", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* cửa hàng chủ sở hữu  */}
      <HomeNavigator.Screen
        name="AdminStore"
        component={AdminStore}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* chi tiết cửa hàng */}
      <HomeNavigator.Screen
        name="AdminDetails"
        component={AdminDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* admin discount */}
      <HomeNavigator.Screen
        name="AdminDiscount"
        component={AdminDiscount}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* chi tiết discount admin */}
      <HomeNavigator.Screen
        name="DiscountAdminDetails"
        component={DiscountDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* tài khoản admin */}
      <HomeNavigator.Screen
        name="AccountAdmin"
        component={MenuAdmin}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* menu admin */}
      <HomeNavigator.Screen
        name="MenuAdminDetails"
        component={MenuAdminDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* hóa đơn chi tiết admin */}
      <HomeNavigator.Screen
        name="InvoiceAdmin"
        component={InvoiceAdmin}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      <HomeNavigator.Screen
        name="InvoiceDetailsAdmin"
        component={InvoiceDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* chi tiết món admin */}
      <HomeNavigator.Screen
        name="DishDetails"
        component={DishDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* hóa đơn khách hàng tại trang home */}
      <HomeNavigator.Screen
        name="InvoiceUser"
        component={InnvoiceUser}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* hóa đơn 1 tháng của chủ cửa hàng */}
      <HomeNavigator.Screen
        name="Invoi1month"
        component={Invoice1Month}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* nhà cung cấp */}
      <HomeNavigator.Screen
        name="Supplier"
        component={SupplierComponent}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
    {/* chi tiết nhà cung cấp */}
      <HomeNavigator.Screen
        name="SupplierDetails"
        component={SupplierDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* hóa đơn nhà cung cấp */}
      <HomeNavigator.Screen
        name="IvoiceSupplier"
        component={InvoiceSupplier}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* thông tin khách hàng */}
      <HomeNavigator.Screen
        name="UserDetails"
        component={UserDetails}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      {/* hợp đồng nhà cung cấp */}
      <HomeNavigator.Screen
        name="ContactSupplier"
        component={ContactManagerSupplier}
        options={{ headerTitle: "Dish Detai", headerShown: false }}
      ></HomeNavigator.Screen>
      
    </HomeNavigator.Navigator>
  );
}



function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator
      initialRouteName="HomeScreen"
    >
      <MainNavigator.Screen
        name="HomeScreen"
        component={HomeNavigatorScreen}
        options={{
          title: "Home",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />

    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}

export default Main;
