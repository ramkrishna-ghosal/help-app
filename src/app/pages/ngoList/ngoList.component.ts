import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { UserService } from "src/app/services/user.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-ngoList",
  templateUrl: "ngoList.component.html"
})
export class NGOListComponent implements OnInit {
  allUsers: any;
  userType: any="NGO";
  allCategories: any;
  editNgoListPanel: boolean = false;
  userid;
  NgoListToEdit={};
  @BlockUI() blockUI: NgBlockUI;
  constructor(private userService: UserService,private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.userService.categoryListService().subscribe(
      (res: any) => {
        console.log(res.data);

        this.allCategories = res.data.filter(x=>x.type==='organization');
      },
      (err) => console.log(err)
    );
    this.getAllUsers();
  }


  getAllUsers(){
    this.userService.userListService(this.userType).subscribe((res:any)=>{
      console.log(res.data);
      this.allUsers = res.data;
    }, err=>console.log(err));
  }

  toggleVerify(user){
    this.userService.toggleUserStatus(user.id).subscribe(res=>{
      console.log(res);
      for(let d of this.allUsers){
        if(d.id===user.id){
          d.isEnable=!d.isEnable;
        }
      }
    }, err=> console.log(err));
  }

  alterMe(user){
    console.log(user);
    this.editNgoListPanel=true;
    this.userid=user.id;
    this.NgoListToEdit={
      name:user.name,
      email:user.email,
      phone:user.phone,
      profileType:user.profileType==null?"":user.profileType,
      profession:user.profession
    }
    window.scrollTo(0,0);
  }

  closePanel(){
    this.editNgoListPanel = false;
  }

  updateNgoListData(){
    if(this.NgoListToEdit['profileType']==""){
      this.toastr.error("Please select one Profile Type", 'Error!');
    }else{
      this.closePanel();
      this.blockUI.start('Please Wait...');
      this.userService.editUser(this.NgoListToEdit,this.userid).subscribe(res=>{
        console.log(res);
        if(res['status']==1){
          this.blockUI.stop();
          this.toastr.success(res['message'], 'Success!');
          this.getAllCategories();
        }else{
          this.blockUI.stop();
          this.toastr.error(res['message'], 'Error!');
        }
      },err=>{
        this.blockUI.stop();
        console.log(err);
      })
    }
  }
}
