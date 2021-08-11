import { Component, OnInit } from "@angular/core";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  showChatList:boolean=false;
  allboxes:any=[];
  chatWindow:boolean=false;
  chatwindowname:string='';
  currentMsg:any='';
  lastchatmsg:any='';
  roomDetails:any=[];
  currentRoom:any='';
  allchatMsgs:any=[];
  currentUser:any='';
  sendingfailed:boolean=true;

  constructor(private services:DashboardService,private toastr: ToastrService) {}

  ngOnInit() {
    this.getDashData();
  }

  getDashData(){
    this.blockUI.start('Please Wait...');
    this.services.getDashboardCounts().subscribe(res=>{
      if(res['status']==1){
        this.allboxes=res['data'];
        // console.log(this.allboxes);
        this.blockUI.stop();
      }else{
        this.allboxes=[];
        this.blockUI.stop();
      }
    },err=>{
      console.log(err);
      this.blockUI.stop();
    })
  }

  retriveChats(){

    this.services.getchatRoom().subscribe(res=>{
      if(res['status']==1){
        this.roomDetails=res['data'];
        if(this.roomDetails.length>0){
          this.showChatList=!this.showChatList;
          this.blockUI.stop();
          console.log(this.roomDetails);
        }else{
          this.toastr.error('No Rooms Currently available', 'Error!');
        }
      }
    },err=>{
      console.log(err);
      this.blockUI.stop();
    });

  }

  openUserWindow(){
    this.blockUI.start('Please Wait...');
    this.retriveChats();
  }

  OpenChatWindow(user){
    this.blockUI.start('Please Wait...');
    // console.log(user);
    this.chatwindowname=user.userDetail.name;
    this.chatWindow=true;
    this.currentRoom=user.uuid;
    // this.showChatList=false;
    this.services.getchatsbyRoom(this.currentRoom).subscribe(res=>{
      this.currentUser=res['loggedUser'];
      this.allchatMsgs=res['data'];
      this.allchatMsgs.reverse();
      console.log(this.allchatMsgs);
      this.blockUI.stop();
    },err=>{
      console.log(err);
      this.blockUI.stop();
    })
  }

  closeChatwindow(){
    this.chatWindow=false;
  }

  sendChatmsg(){
    if(this.currentMsg!=''){
      this.lastchatmsg=this.currentMsg;
      let sentchats = { message: this.currentMsg, sentBy: this.currentUser, roomId: this.currentRoom}
      this.allchatMsgs.push(sentchats);
      this.currentMsg='';
      console.log(this.allchatMsgs);

      this.services.addChats(sentchats).subscribe(res=>{
        console.log(res);
        this.sendingfailed=false;
      },err=>{
        this.sendingfailed=true;
        console.log(err);
      })
    }else{
      this.currentMsg=this.lastchatmsg;
      this.sendChatmsg();
    }
  }
}
