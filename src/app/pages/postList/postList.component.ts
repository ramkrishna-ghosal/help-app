import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { PostService } from "src/app/services/post.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-postList",
  templateUrl: "postList.component.html",
  styleUrls: ["postList.component.css"]
})
export class PostListComponent implements OnInit {
  allPosts: any;
  editPostListPanel:boolean=false;
  postListToEdit={};
  @BlockUI() blockUI: NgBlockUI;
  postid;
  allcats:any=[];

  constructor(private postService: PostService,private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllposts();
  }

  getAllposts(){
    this.blockUI.start('Please Wait...');
    this.postService.getAllPosts().subscribe((res:any)=>{
      console.log(res.data); 
      let posts = res.data;
      for(let post of posts){
        post.images = JSON.parse(post.images);
      }
      this.allPosts = res.data;
      this.blockUI.stop();
    }, err=>{
      this.blockUI.stop();
      // console.log(err);
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

  alterMe(post){
    // console.log(post);
    this.postService.categoryListService().subscribe(res=>{
      console.log(res);
      if(res['status']==1){
        this.allcats=res['data'];
      }else{
        this.allcats=[];
      }
    },err=>{
      console.log(err);
    })
    this.postid=post.id;
    this.editPostListPanel = true;
    this.postListToEdit={
      caption:post.caption,
      category:post.category==null?"":post.category,
      location:post.location,
      postType:post.postType==null?"":post.postType,
      statusType:post.statusType==null?"":post.statusType,
      title:post.title
    }
    window.scrollTo(0,0);
  }
  updatePostListData(){

    if(this.postListToEdit['category']==""){
      this.toastr.error('Please select one category', 'Error!');
    }else if(this.postListToEdit['postType']==""){
      this.toastr.error('Please select one Post Type', 'Error!');

    }else if(this.postListToEdit['statusType']==""){
      this.toastr.error('Please select one Status Type', 'Error!');

    }else{
          // console.log(this.postListToEdit);
    this.closePanel();
    this.blockUI.start('Please Wait...');
    this.postService.editSocialPost(this.postListToEdit,this.postid).subscribe(res=>{
      console.log(res);
      if(res['status']==1){
        this.blockUI.stop();
        this.toastr.success(res['message'], 'Success!');
        this.getAllposts();
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
  
  closePanel(){
    this.editPostListPanel = false;
  }
  // toggleVerify(user){
  //   this.userService.toggleUserStatus(user.id).subscribe(res=>{
  //     console.log(res);
  //     for(let d of this.allUsers){
  //       if(d.id===user.id){
  //         d.isEnable=!d.isEnable;
  //       }
  //     }
  //   }, err=> console.log(err));
  // }
}
