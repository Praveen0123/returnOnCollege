import { RoiCalculatorOutputQueryVariables } from '@gql';
import { InstitutionsEntity } from '@state/institutions/institutions.models';

export interface UserProfile {
  currentInformation: CurrentInformation;
  careerGoal: CareerGoal;
  educationCost: EducationCost;
  educationFinancing: EducationFinancing;

  userProfileSnapshots: UserProfileSnapshot[];
}

export interface CurrentInformation {
  currentAge: number;
  currentOnetCode: string;
  isNotCurrentlyWorking: boolean;
  currentZipCode: number;
  currentDegreeLevel: number; // emsi education levels
  radiusInMiles: number;
}

export interface CareerGoal {
  goalOnetCode: string;
  goalCipCode: string;
  goalDegreeLevel: number; // emsi education levels
  yearsToCompleteDegree: number;
  isGoalDegreeUndecided: boolean;
  goalZipCode: number;
  retirementAge: number;
}

export interface EducationCost {
  institutionUnitId: number;
  institutionStartYear: number;
  isTaxDependent: boolean;
  incomeRange: IncomeRangeEnum;
  institutionStateResidency: InstitutionStateResidencyEnum;
  anyScholarships: boolean;
  scholarshipAmount: number;
  hasPost911GiBill: boolean;
  dodTuitionAssistance: boolean;
  eligibleForPellGrants: boolean;
  institutionCampusResidency: InstitutionCampusResidencyEnum;
}

export interface EducationFinancing {
  outOfPocketCosts: number[];
  yearsToPayOffFederalLoan: number;
  yearsToPayOffPrivateLoan: number;
}

export interface UserProfileSnapshot
  extends Omit<UserProfile, 'userProfileSnapshots'> {}

export enum IncomeRangeEnum {
  Unknown = 'UNKNOWN',
  From_0_To_30000 = 'FROM_0_TO_30000',
  From_30001_To_48000 = 'FROM_30001_TO_48000',
  From_48001_To_75000 = 'FROM_48001_TO_75000',
  From_75001_To_110000 = 'FROM_75001_TO_110000',
  From_110001_Or_More = 'FROM_110001_OR_MORE'
}

export enum InstitutionStateResidencyEnum {
  Unknown = 'UNKNOWN',
  InState = 'IN_STATE',
  OutState = 'OUT_STATE'
}

export enum InstitutionCampusResidencyEnum {
  Unknown = 'UNKNOWN',
  OnCampus = 'ON_CAMPUS',
  OffCampusWithFamily = 'OFF_CAMPUS_WITH_FAMILY',
  OffCampusNotWithFamily = 'OFF_CAMPUS_NOT_WITH_FAMILY'
}

export function deepEqual(object1, object2): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object): boolean {
  return object != null && typeof object === 'object';
}

export function ConvertUserProfileSnaphsotToRoiCalculatorInputs(
  userProfileSnapshot: UserProfileSnapshot,
  institution: InstitutionsEntity
): RoiCalculatorOutputQueryVariables {
  return {
    currentZipCode: userProfileSnapshot.currentInformation.currentZipCode,
    goalZipCode: userProfileSnapshot.careerGoal.goalZipCode
      ? userProfileSnapshot.careerGoal.goalZipCode
      : userProfileSnapshot.currentInformation.currentZipCode,
    distance: userProfileSnapshot.currentInformation.radiusInMiles,
    currentStateOnetCode: userProfileSnapshot.currentInformation.currentOnetCode
      ? [userProfileSnapshot.currentInformation.currentOnetCode]
      : [],
    goalStateOnetCode: userProfileSnapshot.careerGoal.goalOnetCode
      ? [userProfileSnapshot.careerGoal.goalOnetCode]
      : [],
    startDegreeLevel: userProfileSnapshot.currentInformation.currentDegreeLevel,
    endDegreeLevel: userProfileSnapshot.careerGoal.goalDegreeLevel,
    yearsToRetirement: Math.max(
      userProfileSnapshot.careerGoal.retirementAge -
        userProfileSnapshot.currentInformation.currentAge,
      1
    ),
    avgNetPrice: institution?.avgNetPriceWithGrantScholarshipAid ?? 0,
    monthsToPayoffFederalLoan:
      userProfileSnapshot.educationFinancing.yearsToPayOffFederalLoan * 12,
    monthsToPayoffPrivateLoan:
      userProfileSnapshot.educationFinancing.yearsToPayOffPrivateLoan * 12,
    annualExpenseFromSavings:
      userProfileSnapshot.educationFinancing.outOfPocketCosts
  } as RoiCalculatorOutputQueryVariables;
}
