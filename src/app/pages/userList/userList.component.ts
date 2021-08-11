import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { UserService } from "src/app/services/user.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-userList",
  templateUrl: "userList.component.html",
  styleUrls: ['./userList.component.scss'],
})
export class UserListComponent implements OnInit {
  allUsers: any;
  pageNo: number =1;
  pageSize = 0;
  totalPages: number;
  userView: any;
  search: string;
  totalUsers=0;
  canload = false;
  filtereduser;
  editUserListPanel: boolean = false;
  userListToEdit={};
  userid;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private userService: UserService,private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  loadMoreData(){
    this.pageNo+=1;
    
    if(this.pageNo<=this.pageSize){
      this.allUsers = this.userView.slice(0,10*this.pageNo);
      this.canload=false;
      if(this.pageNo===this.pageSize){
        this.canload = true;
      }
    }
  }

  getAllUsers(){
    this.blockUI.start('Please Wait...');
    this.userService.getUsersList().subscribe((res:any)=>{
      this.userView = res.data;
      this.allUsers = this.userView.slice(0,10*this.pageNo);
      this.totalUsers = this.allUsers.length;
      if(this.userView%10==0){
        this.pageSize = this.userView.length/10;
      } else{
        this.pageSize = Math.ceil(this.userView.length/10);
      }
      this.blockUI.stop();
      // this.totalPages = this.userView.length / 10 ;
      // this.allUsers = this.userView.slice(10*this.pageNo, 10);
      // console.log(this.allUsers, this.pageSize);
    }, err=>{
          this.blockUI.stop();
      this.allUsers = [];
      let thiserror = err.error.message;
      console.log(thiserror);
      if(thiserror){
        this.toastr.error(thiserror, 'Error!');
      }else{
        // this.toastr.success('Hello world!', 'Toastr fun!');
        this.toastr.error('Server Error Please Try Again', 'Error!');
      }
    });
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

  filterUser(){
    let newUsers = this.userView.filter(x=>x.email?.includes(this.search)||x.mobile?.includes(this.search));
    this.allUsers = newUsers;
    this.canload = true;
  }

  alterMe(user){
    // console.log(user);
    this.editUserListPanel = true;
    this.userid=user.id;
    this.userListToEdit={
      name:user.name,
      email:user.email,
      phone:user.phone,
      profileType:user.profileType==null?"":user.profileType,
      profession:user.profession
    }
    window.scrollTo(0,0);
  }
  updateUserListData(){

    if(this.userListToEdit['profileType']==""){
      this.toastr.error("Please select one Profile Type", 'Error!');
    }else{
      this.closePanel();
      this.blockUI.start('Please Wait...');
      this.userService.editUser(this.userListToEdit,this.userid).subscribe(res=>{
        console.log(res);
        if(res['status']==1){
          this.blockUI.stop();
          this.toastr.success(res['message'], 'Success!');
          this.getAllUsers();
        }else{
          this.blockUI.stop();
          this.toastr.error(res['message'], 'Error!');
        }
      },err=>{
        this.blockUI.stop();
        console.log(err);
      })
    }

    // console.log(this.userListToEdit);
  
  }
  
  closePanel(){
    this.editUserListPanel = false;
  }
}
