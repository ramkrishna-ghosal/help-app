import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { UserListComponent } from "../../pages/userList/userList.component";
import { PostListComponent } from "../../pages/postList/postList.component";
import { NGOListComponent } from "../../pages/ngoList/ngoList.component";
import { CategoryListComponent } from "../../pages/categoryList/categoryList.component";
import { PaymentsComponent } from "src/app/pages/payments/payments.component";

import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "userslist", component: UserListComponent },
  { path: "postlist", component: PostListComponent },
  { path: "orglist", component: NGOListComponent },
  { path: "categories", component: CategoryListComponent },
  { path: "payments", component: PaymentsComponent },

  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
