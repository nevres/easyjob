// /*eslint-disable*/
// import React from "react";
// import Link from "next/link";
// // @material-ui/core components
// import { makeStyles } from "@mui/styles";
// import Drawer from "@mui/material/Drawer";
// import Hidden from "@mui/material/Hidden";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Icon from "@mui/material/Icon";
// import Dashboard from "@mui/icons-material/Dashboard";
// // core components
// import sidebarStyle from "./sidebarStyle";
// import classNames from "classnames";

// export default function Sidebar() {
//   // creates styles for this component
//   const useStyles = makeStyles(sidebarStyle as any);
//   const classes = useStyles();
//   let routes = [
//     {
//       path: "/dashboard",
//       name: "Dashboard",
//       icon: Dashboard,
//       layout: "/admin",
//     },
//   ];
//   var links = (
//     <List className={classes.list}>
//       {routes.map((prop, key) => {
//         var activePro = " ";
//         var listItemClasses;
//         return (
//           <Link href={prop.layout + prop.path} key={key}>
//             <a className={activePro + classes.item}>
//               <ListItem button className={classes.itemLink + listItemClasses}>
//                 {typeof prop.icon === "string" ? (
//                   <Icon className={classNames(classes.itemIcon)}>
//                     {prop.icon}
//                   </Icon>
//                 ) : (
//                   <prop.icon className={classNames(classes.itemIcon)} />
//                 )}
//                 <ListItemText
//                   primary={prop.name}
//                   className={classNames(classes.itemText)}
//                   disableTypography={true}
//                 />
//               </ListItem>
//             </a>
//           </Link>
//         );
//       })}
//     </List>
//   );

//   return (
//     <div>
//       <Hidden mdUp implementation="css">
//         <Drawer
//           variant="temporary"
//           anchor={"right"}
//           open={true}
//           classes={{
//             paper: classNames(classes.drawerPaperr),
//           }}
//           // onClose={props.handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//         >
//           <div className={classes.sidebarWrapper}>{links}</div>
//         </Drawer>
//       </Hidden>
//       <Hidden smDown implementation="css">
//         <Drawer
//           anchor={"left"}
//           variant="permanent"
//           open
//           classes={{
//             paper: classNames(classes.drawerPaperr),
//           }}
//         >
//           <div className={classes.sidebarWrapper}>{links}</div>
//         </Drawer>
//       </Hidden>
//     </div>
//   );
// }
