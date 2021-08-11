import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-catList",
  templateUrl: "categoryList.component.html",
})
export class CategoryListComponent implements OnInit {
  allUsers: any;
  addPanel: boolean = false;
  type:string = '';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.userService.categoryListService().subscribe(
      (res: any) => {
        console.log(res.data);

        this.allUsers = res.data;
      },
      (err) => console.log(err)
    );
  }

  toggleVerify(obj) {
    const data = {
      id:obj.id,
      isActive: !obj.isActive
    }
    this.userService.removeCategory(data).subscribe(
      (res: any) => {
        console.log(res);
        if(res.status===1){
          this.allUsers = this.allUsers.filter(x=>x.id!==obj.id);
        }
      },
      (err) => console.log(err)
    );
  }

  openPanel(){
    this.addPanel = !this.addPanel;
  }

  addCategory(data) {
    console.log(data);
    this.userService.addCategory(data).subscribe((res: any) => {
      console.log(res);
      if(res.status===1){
        this.addPanel = false;
        this.getAllCategories();
      } else{

      }
    }, (err)=>{
      console.log(err)
    });
  }
}
