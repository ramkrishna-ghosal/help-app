import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

// APNA
import { UserListComponent } from "../../pages/userList/userList.component";
import { PostListComponent } from "../../pages/postList/postList.component";
import { NGOListComponent } from "../../pages/ngoList/ngoList.component";
import { CategoryListComponent } from "../../pages/categoryList/categoryList.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/services/user.service";
import { PostService } from "src/app/services/post.service";

import { TypeFilterPipe } from '../../services/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    TypeFilterPipe,
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    // RtlComponent
    UserListComponent,
    PostListComponent,
    NGOListComponent,
    CategoryListComponent
  ],
  providers:[UserService, PostService]
})
export class AdminLayoutModule {}
