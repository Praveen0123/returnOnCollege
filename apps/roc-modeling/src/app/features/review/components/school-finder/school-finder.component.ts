import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { startWith, map, find, debounceTime, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'roc-modeling-school-finder',
  templateUrl: './school-finder.component.html',
  styleUrls: ['./school-finder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolFinderComponent implements OnInit {
  schoolFinderForm: FormGroup;
  fakeDegreeDataProgram: any;
  filterDegreeProgram: any;

  uniqueSchoolName: any;
  schoolNameArray: any;
  filteredSchoolName: any;
  uniqueDistance: any;
  distanceArray: any;
  filteredDistance: any;
  entranceSelectedValue: any;
  degreeAlignmentWithCareer = [
    'Recommended Programs',
    'Closely Related Programs',
    'Programs in a Related Field',
    'Somewhat Related Field',
    'Any Programs Regardless of Alignment',
  ];
  entranceExams = ['Open Admission', 'SAT Score', 'ACT Score', 'None'];
  SATcombinedScores = ['400-600', '600-800', '800-1000'];
  displayedColumns: string[] = [
    'College Name',
    'Open Admission',
    'Online',
    'Distance',
    'Align',
    'Graduation Rate',
    'SAT',
    'ACT',
    'symbol',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.filterDegreeProgram.paginator = this.paginator;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SchoolFinderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createschoolFinderForm();
  }

  createschoolFinderForm() {
    this.schoolFinderForm = this.fb.group({
      degreeAlignmentWithCareer: [''],
      schoolName: new FormControl(undefined, [
        Validators.required,
        this.requireMatchSchoolName.bind(this),
      ]),
      location: [''],

      distance: new FormControl(undefined, [
        Validators.required,
        this.requireMatchDistance.bind(this),
      ]),
      AvailableOnline: false,
      satCombinedScore: [''],
      actCombinedScore: [''],
      graduationRate: ['0'],
      entranceExam: [''],
      SATcombinedScore: [''],
    });
  }
  ngOnInit(): void {
    this.fakeDegreeDataProgram = [
      {
        degreeId: '1',
        degreeProgram: 'Marine Boilogy',
        online: true,
        align: 'Recommended Programs',
        collegeName: 'Arkansas State University',
        distance: '40 mi.',
        graduationRate: 80,
        openAdmission: false,
        sat: {
          start: 400,
          end: 600,
        },
        act: {
          start: 24,
          end: 30,
        },
      },
      {
        degreeId: '2',
        degreeProgram: 'Environmental Science',
        online: true,
        align: 'Closely Related Programs',
        collegeName: 'Newport North Central Missouri College',
        distance: '40 mi.',
        graduationRate: 80,
        openAdmission: false,
        sat: {
          start: 600,
          end: 800,
        },
        act: {
          start: 20,
          end: 24,
        },
      },
      {
        degreeId: '3',
        degreeProgram: 'Marine Science',
        online: true,
        align: 'Programs in a Related Field',
        collegeName: 'South Piedmont Community College',
        distance: '40 mi.',
        graduationRate: 67,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '4',
        degreeProgram: 'Environmental Management',
        online: true,
        align: 'Somewhat Related Field',
        collegeName: 'Allan Hancock College',
        distance: '45 mi.',
        graduationRate: 66,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '5',
        degreeProgram: 'Biochemistry',
        online: true,
        align: 'Any Programs Regardless of Alignment',
        collegeName: 'Albany Technical College',
        distance: '47 mi.',
        graduationRate: 66,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '6',
        degreeProgram: 'Ecology',
        online: false,
        align: 'Recommended Programs',
        collegeName: 'Alexandria Technical and Community College',
        distance: '48 mi.',
        graduationRate: 65,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '7',
        degreeProgram: 'Microbiology',
        online: true,
        align: 'Closely Related Programs',
        collegeName: 'Alvin Community College',
        distance: '50 mi.',
        graduationRate: 60,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '8',
        degreeProgram: 'Zoology',
        online: false,
        align: 'Programs in a Related Field',
        collegeName: 'Amarillo College',
        distance: '50 mi.',
        graduationRate: 60,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '9',
        degreeProgram: 'Zoology',
        online: true,
        align: 'Programs in a Related Field',
        collegeName: 'Anne Arundel Community College',
        distance: '50 mi.',
        graduationRate: 60,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '10',
        degreeProgram: 'Zoology',
        online: false,
        align: 'Programs in a Related Field',
        collegeName: 'Anoka Technical College',
        distance: '50 mi.',
        graduationRate: 60,
        openAdmission: true,
        sat: {
          start: 0,
          end: 0,
        },
        act: {
          start: 0,
          end: 0,
        },
      },
      {
        degreeId: '11',
        degreeProgram: 'Zoology',
        online: false,
        align: 'Programs in a Related Field',
        collegeName: 'Amarillo College',
        distance: '50 mi.',
        graduationRate: 60,
        openAdmission: false,
        sat: {
          start: 800,
          end: 1000,
        },
        act: {
          start: 28,
          end: 32,
        },
      },
    ];

    this.filterDegreeProgram = new MatTableDataSource<any>(
      this.fakeDegreeDataProgram
    );

    /***************** SCHOOL NAME FILTER *********************************************/
    this.uniqueSchoolName = _.uniqBy(this.fakeDegreeDataProgram, 'collegeName');

    this.schoolNameArray = _.map(this.uniqueSchoolName, 'collegeName');

    this.filteredSchoolName = this.schoolFinderForm.controls.schoolName.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSchoolName(value))
    );

    /***************************************************************************************/

    /************************* DISTANCE FILTER ***************************************************/

    this.uniqueDistance = _.uniqBy(this.fakeDegreeDataProgram, 'distance');

    this.distanceArray = _.map(this.uniqueDistance, 'distance');

    this.filteredDistance = this.schoolFinderForm.controls.distance.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDistance(value))
    );

    /*********************************************************************************************/
  }

  /***************** SCHOOL NAME FILTER *********************************************/
  private requireMatchSchoolName(
    control: FormControl
  ): ValidationErrors | null {
    const selection: any = control.value;
    if (this.schoolNameArray && this.schoolNameArray.indexOf(selection) < 0) {
      return { requireMatchSchoolName: true };
    }
    return null;
  }

  private _filterSchoolName(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.schoolNameArray.filter((optionSchoolName) =>
      optionSchoolName.toLowerCase().includes(filterValue)
    );
  }

  displayWithSchoolName(obj?: any): string | undefined {
    return obj ? obj : undefined;
  }

  onschoolNameSelected(
    matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent
  ): void {
    const SchoolName = matAutocompleteSelectedEvent.option.value;
    this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
      (x) => x.collegeName === SchoolName
    );
  }

  // CLEAR BUTTON FOR SEARCH SCHOOL NAME
  clearSearchFieldSchoolName() {
    this.schoolFinderForm.controls.schoolName.patchValue('');
    this.filterDegreeProgram = this.fakeDegreeDataProgram;
  }
  /*********************************************************************************************/

  /************************* DISTANCE FILTER ***************************************************/
  private requireMatchDistance(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.distanceArray && this.distanceArray.indexOf(selection) < 0) {
      return { requireMatchDistance: true };
    }
    return null;
  }

  private _filterDistance(value: string): string[] {
    const filterValuedistance = value.toLowerCase();

    return this.distanceArray.filter((optionDistance) =>
      optionDistance.toLowerCase().includes(filterValuedistance)
    );
  }

  displayWithDistance(obj?: any): string | undefined {
    return obj ? obj : undefined;
  }

  ondistanceSelected(
    matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent
  ): void {
    const Distance = matAutocompleteSelectedEvent.option.value;
    this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
      (x) => x.distance === Distance
    );
  }

  // CLEAR BUTTON FOR DISTANCE
  clearSearchFieldDistance() {
    this.schoolFinderForm.controls.distance.patchValue('');
    this.filterDegreeProgram = this.fakeDegreeDataProgram;
  }
  /*******************************************************************************************************/

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
  }

  //ENTRANCE FILTER
  entranceSelected(selectedValue: MatSelectChange): void {
    console.log('selectedvaluesentrance', selectedValue);
    this.entranceSelectedValue = selectedValue;

    if (this.entranceSelectedValue == 'Open Admission') {
      this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
        (x) => x.openAdmission === true
      );
    } else {
      this.filterDegreeProgram = this.fakeDegreeDataProgram;
    }
  }

  // AVAILABLE ONLINE FILTER
  addFilterAvailableOnline() {
    if (this.schoolFinderForm.value.AvailableOnline === true) {
      this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
        (x) => x.online === true
      );
    } else {
      this.filterDegreeProgram = this.fakeDegreeDataProgram;
    }
  }

  // Graduation Rate FILTER
  filterGraduationRate(event) {
    this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
      (x) => x.graduationRate >= event
    );
  }

  // SAT COMBINED SCORE EXAMS FILTER
  filterSatScore(event) {
    this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
      (x) => x.sat.start <= event && x.sat.end >= event
    );
  }

  // ACT COMBINED SCORE EXAMS FILTER
  filterACTScore(event) {
    this.filterDegreeProgram = this.fakeDegreeDataProgram.filter(
      (x) => x.act.start <= event && event <= x.act.end
    );
  }
}
