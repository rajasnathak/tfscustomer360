/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Visualize from "views/visualize";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-red",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Manage",
    icon: "ni ni-planet text-red",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/visualize",
    name: "Visualize",
    icon: "ni ni-atom text-red",
    component: Visualize,
    layout: "/admin",
  },
];
export default routes;
