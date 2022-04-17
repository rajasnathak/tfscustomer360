/*!


*/
import Index from "views/Index.js";
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
  // {
  //   path: "/icons",
  //   name: "Manage",
  //   icon: "ni ni-planet text-red",
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
    path: "/visualize",
    name: "Visualize",
    icon: "ni ni-atom text-red",
    component: Visualize,
    layout: "/admin",
  },
];
export default routes;
