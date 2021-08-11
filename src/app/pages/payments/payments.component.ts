import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  allPayments:any=[];
  constructor(private service:PaymentsService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(){
    this.blockUI.start('Please Wait...');
    this.service.getPaymentsList().subscribe(res=>{
      console.log(res);
      this.allPayments=res['data'];
      this.blockUI.stop();
    },err=>{
      console.log(err);
      this.blockUI.stop();
      this.toastr.error('Server Error Please Try Again', 'Error!');
    })
  }

}
