import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'roc-modeling-advanced-search-for-degree-program',
  templateUrl: './advanced-search-for-degree-program.component.html',
  styleUrls: ['./advanced-search-for-degree-program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchForDegreeProgramComponent implements OnInit {
  advancedSearchForDegreeProgramsForm: FormGroup;
  fakeDegreeDataProgram: any;
  filterDegreeProgram: any;
  degreeAlignmentWithCareer = [
    'Recommended Programs',
    'Closely Related Programs',
    'Programs in a Related Field',
    'Somewhat Related Field',
  ];

  displayedColumns: string[] = ['Degree Program', 'Online', 'Align', 'symbol'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.filterDegreeProgram.paginator = this.paginator;
  }
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdvancedSearchForDegreeProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createadvancedSearchForDegreeProgramsForm();
  }

  createadvancedSearchForDegreeProgramsForm() {
    this.advancedSearchForDegreeProgramsForm = this.fb.group({
      degreeAlignmentWithCareer: ['Recommended Programs'],
      degreePrograms: [''],
    });
  }
  ngOnInit(): void {
    this.fakeDegreeDataProgram = [
      {
        degreeId: '1',
        degreeProgram: 'Marine Boilogy',
        online: true,
        align: 'Recommended Programs',
      },
      {
        degreeId: '2',
        degreeProgram: 'Environmental Science',
        online: true,
        align: 'Closely Related Programs',
      },
      {
        degreeId: '3',
        degreeProgram: 'Marine Science',
        online: false,
        align: 'Programs in a Related Field',
      },
      {
        degreeId: '4',
        degreeProgram: 'Environmental Management',
        online: false,
        align: 'Somewhat Related Field',
      },
      {
        degreeId: '5',
        degreeProgram: 'Biochemistry',
        online: true,
        align: 'Any Programs Regardless of Alignment',
      },
      {
        degreeId: '6',
        degreeProgram: 'Ecology',
        online: false,
        align: 'Recommended Programs',
      },
      {
        degreeId: '7',
        degreeProgram: 'Microbiology',
        online: true,
        align: 'Closely Related Programs',
      },
      {
        degreeId: '8',
        degreeProgram: 'Zoology',
        online: false,
        align: 'Programs in a Related Field',
      },
    ];

    this.filterDegreeProgram = new MatTableDataSource<any>(
      this.fakeDegreeDataProgram
    );
  }

  // ON CLOSE DIALOG, VALUE SELECTED CAPTURED AFTER CLICK PLUS ICON
  captureDegreeProgram(value) {
    this.dialogRef.close(value);
    console.log('value captured', value);
  }

  // CLOSE DIALOG WITH CLOSE ICON
  close(): void {
    this.dialogRef.close();
  }

  // DEGREE ALIGNMENT WITH CAREER FILTER
  degreeAlignmentWithCareerSelected(selectedValue: MatSelectChange): void {
    this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
      (x) => x.align === selectedValue
    );
    console.log(this.filterDegreeProgram, 'filterDegreeProgram');
  }
}
