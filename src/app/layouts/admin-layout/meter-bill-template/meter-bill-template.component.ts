import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'meter-bill-template',
  templateUrl: './meter-bill-template.component.html',
  styleUrls: ['./meter-bill-template.component.css']
})
export class MeterBillTemplateComponent implements OnInit {

  public billDetails: any;
  public oldDate: any;
  public consumptionCharges: any;
  public sewerageCharge: any;
  public waterCess: any;
  public serviceCharge: any = 1317;
  public subTotal: number;
  public billDate: Date;
  public billDueDate: Date;
  public billNo = Math.floor(Math.random() * (731075810990 - 7310751000));

  constructor(public dialogRef: MatDialogRef<MeterBillTemplateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.billDetails = data.bill;
     }

  ngOnInit(): void {
    const {receiveTime, billNo} = this.billDetails;
    this.oldDate = new Date();
    this.oldDate.setMonth(this.oldDate.getMonth() - 1); 

    this.billDate = receiveTime;
    this.billDueDate = new Date();
    this.billDueDate.setDate(this.billDueDate.getDate() + 10 );

    this.consumptionCharges = (this.billDetails.currentLiters - this.billDetails.prevLiters) * 3;
    this.sewerageCharge = (this.consumptionCharges * 60) / 100;
    this.waterCess =  ((this.billDetails.currentLiters - this.billDetails.prevLiters) * 2) / 100;
    this.subTotal = this.consumptionCharges + this.sewerageCharge + this.waterCess + this.serviceCharge;
    console.log('meter bill', this.billDueDate);
  }

}
