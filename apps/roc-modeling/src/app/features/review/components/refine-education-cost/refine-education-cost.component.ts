import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { formatNumber } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { valueFromAST } from 'graphql';
@Component({
  selector: 'roc-modeling-refine-education-cost',
  templateUrl: './refine-education-cost.component.html',
  styleUrls: ['./refine-education-cost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefineEducationCostComponent implements OnInit {
  refineEducationCostForm: FormGroup;
  costToggle: boolean;
  grantsToggle: boolean;

  disableTuitionFees: boolean = true;
  disableBooksSupplies: boolean = true;
  disableRoomBoard: boolean = true;
  disableOtherExpenses: boolean = true;
  disableFederalPellGrant: boolean = true;
  disableotherFederalGrant: boolean = true;
  disablestateLocalGrants: boolean = true;
  disableInstitutionalGrants: boolean = true;
  disableOtherGrantsScholarships: boolean = true;
  disablePostBenefits: boolean = true;
  disableDodTuitionAssistance: boolean = true;

  tuitionFeesUpdate: string;
  booksSuppliesUpdate: string;
  roomBoardUpdate: string;
  otherExpensesUpdate: string;
  federalPellGrantUpdate: string;
  otherFederalGrantUpdate: string;
  stateLocalGrantsUpdate: string;
  institutionalGrantsUpdate: string;
  otherGrantsScholarshipsupdate: string;
  postBenefitsUpdate: string;
  dodTuitionAssistanceUpdate: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RefineEducationCostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createEditeableForm();
  }

  createEditeableForm() {
    this.refineEducationCostForm = this.fb.group({
      state: [0],
      campus: 0,
      tuitionFees: ['11,931'],
      booksSupplies: ['1,125'],
      roomBoard: ['11,450'],
      otherExpenses: ['2,356'],
      federalPellGrant: ['4,441'],
      otherFederalGrant: ['1,033'],
      stateLocalGrants: ['2,170'],
      institutionalGrants: ['6,957'],
      otherGrantsScholarships: ['0'],
      postBenefits: ['0'],
      dodTuitionAssistance: ['0'],
    });
  }

  update(value: string) {
    console.log(
      formatNumber(
        Number(this.refineEducationCostForm.get('tuitionFees').value),
        'en-US',
        '1.0-0'
      ),
      'klklkl'
    );
    this.tuitionFeesUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('tuitionFees').value),
      'en-US',
      '1.0-0'
    );
    this.booksSuppliesUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('booksSupplies').value),
      'en-US',
      '1.0-0'
    );
    this.roomBoardUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('roomBoard').value),
      'en-US',
      '1.0-0'
    );
    this.otherExpensesUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('otherExpenses').value),
      'en-US',
      '1.0-0'
    );
    this.federalPellGrantUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('federalPellGrant').value),
      'en-US',
      '1.0-0'
    );

    this.otherFederalGrantUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('otherFederalGrant').value),
      'en-US',
      '1.0-0'
    );
    this.stateLocalGrantsUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('stateLocalGrants').value),
      'en-US',
      '1.0-0'
    );

    this.institutionalGrantsUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('institutionalGrants').value),
      'en-US',
      '1.0-0'
    );
    this.otherGrantsScholarshipsupdate = formatNumber(
      Number(this.refineEducationCostForm.get('otherGrantsScholarships').value),
      'en-US',
      '1.0-0'
    );
    this.postBenefitsUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('postBenefits').value),
      'en-US',
      '1.0-0'
    );
    this.dodTuitionAssistanceUpdate = formatNumber(
      Number(this.refineEducationCostForm.get('dodTuitionAssistance').value),
      'en-US',
      '1.0-0'
    );
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
  tuitionFees() {
    this.disableTuitionFees = false;
  }

  onlyNumber(event) {
    let x;
    x = event.charCode;
    return x > 47 && x < 58;
  }

  booksSupplies() {
    this.disableBooksSupplies = false;
  }
  roomBoard() {
    this.disableRoomBoard = false;
  }
  otherExpenses() {
    this.disableOtherExpenses = false;
  }
  federalPellGrant() {
    this.disableFederalPellGrant = false;
  }
  otherFederalGrant() {
    this.disableotherFederalGrant = false;
  }
  stateLocalGrants() {
    this.disablestateLocalGrants = false;
  }
  institutionalGrants() {
    this.disableInstitutionalGrants = false;
  }
  otherGrantsScholarships() {
    this.disableOtherGrantsScholarships = false;
  }
  postBenefits() {
    this.disablePostBenefits = false;
  }
  dodTuitionAssistance() {
    this.disableDodTuitionAssistance = false;
  }

  campusSelected(matSelectChange: MatSelectChange): void {}
}
