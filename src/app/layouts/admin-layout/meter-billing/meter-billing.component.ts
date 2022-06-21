import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MeterBillTemplateComponent } from '../meter-bill-template/meter-bill-template.component';

@Component({
  selector: 'app-meter-billing',
  templateUrl: './meter-billing.component.html',
  styleUrls: ['./meter-billing.component.css'],
  providers: [ { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {float: 'always'} }]
})
export class MeterBillingComponent implements OnInit {

public billForm: FormGroup;
public submitted = false;
public sequenceData = [];

exportSequence = {
 number: 76509779,
 meterType: 'flowIQ 21xx',
 deviceType: 'Cold Water',
 volumeV1:  (Math.random() * (1000 - 500) + 500) / 1000,
 currentLiters: 0,
 prevLiters: 0,
 receiveTime: Date.now(),
 volumeH: 0,
 operatingHourCounter: Math.floor(Math.random() * (30000 - 27000) + 27000),
 minimumFlowTemp: '127 °C',
 minExternalTempH: '26 °C',
 info: 0,
 infoCodeType: 'Original',
}


  constructor( private fb: FormBuilder, private dialog: MatDialog ) { }


  ngOnInit(): void {
    console.log('exportSequence', this.exportSequence);
    this.billForm = this.fb.group({
      meterNo: [null, [Validators.required]]
      });

      this.billForm.controls['meterNo'].valueChanges.subscribe((res: any) => {
        if (res) {
          const numberLength = res.toString().length;
          if (numberLength < 5) {
            this.billForm.controls.meterNo.setErrors({errors : true});
          } else {
            this.billForm.controls.meterNo.setErrors(null);
          }

        }
      });

  }


/**
*
* @param isValid
* @param formValue
* to save billForm
*/
save(isValid, formValue) {
  this.submitted = true;
  console.log(`${isValid}, ${formValue}`);
  if (!isValid) { return; }
  this.exportSequence.number = formValue.meterNo;
  this.exportSequence.prevLiters = this.exportSequence.volumeV1 * 1000;
  this.exportSequence.volumeH = ((Math.random() * (2000 - 500) + 500 ) / 1000) + this.exportSequence.volumeV1;
  this.exportSequence.currentLiters = this.exportSequence.volumeH * 1000;
  console.log('formObj', this.exportSequence);
  this.generateBill(this.exportSequence);
}

public generateBill(exportSequence: any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.position = { top: '3rem' },
  // dialogConfig.width = '720px',
  dialogConfig.height = '92vh',
  dialogConfig.maxWidth = '98vw',
  dialogConfig.autoFocus = true;
  dialogConfig.data = { bill: exportSequence };
  const dialogRef = this.dialog.open(MeterBillTemplateComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((res: any) => {
    console.log('modal back res', res);
  });
}

}
