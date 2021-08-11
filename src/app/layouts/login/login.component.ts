import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  error: string;
  username: string;
  password: string;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.blockUI.start('Loading...');
 
    // setTimeout(() => {
    //   this.blockUI.stop();
    // }, 2000);
  }

  userLogin(f){
    this.blockUI.start('Please Wait...');
    // this.router.navigateByUrl('/dashbaord');
    // return;
    this.error = undefined;
    this.authService.userAuthentication(f).subscribe(res=>{
      console.log(res);
      this.blockUI.stop();
      localStorage.setItem('authkey',res['token']);
      this.router.navigateByUrl('/admin/dashboard');
    }, err=>{
      this.blockUI.stop();
      // console.log('Error', err);
      this.error = err.error.message;
      console.log(this.error);
      if(this.error){
        this.toastr.error(this.error, 'Error!');
      }else{
        // this.toastr.success('Hello world!', 'Toastr fun!');
        this.toastr.error('Server Error Please Try Again', 'Error!');
      }
    });
  }

}
