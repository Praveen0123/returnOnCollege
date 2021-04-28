import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type ComputeLoanAmountOutput = {
  __typename?: 'ComputeLoanAmountOutput';
  federalLoan?: Maybe<Array<Maybe<Scalars['Int']>>>;
  privateLoan?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type RoiCalculatorOutput = {
  __typename?: 'RoiCalculatorOutput';
  yearsInCollege?: Maybe<Scalars['Float']>;
  yearsToRoiBreakEven25?: Maybe<Scalars['Float']>;
  yearsToRoiBreakEven50?: Maybe<Scalars['Float']>;
  yearsToRoiBreakEven75?: Maybe<Scalars['Float']>;
  earningCumulativeProb25?: Maybe<Array<Maybe<Scalars['Float']>>>;
  earningCumulativeProb50?: Maybe<Array<Maybe<Scalars['Float']>>>;
  earningCumulativeProb75?: Maybe<Array<Maybe<Scalars['Float']>>>;
  monthlySalary25?: Maybe<Array<Maybe<Scalars['Float']>>>;
  monthlySalary50?: Maybe<Array<Maybe<Scalars['Float']>>>;
  monthlySalary75?: Maybe<Array<Maybe<Scalars['Float']>>>;
  monthlyLoanPayment25?: Maybe<Array<Maybe<Scalars['Float']>>>;
  monthlyLoanPayment50?: Maybe<Array<Maybe<Scalars['Float']>>>;
  monthlyLoanPayment75?: Maybe<Array<Maybe<Scalars['Float']>>>;
  roi25?: Maybe<Array<Maybe<Scalars['Float']>>>;
  roi50?: Maybe<Array<Maybe<Scalars['Float']>>>;
  roi75?: Maybe<Array<Maybe<Scalars['Float']>>>;
  outOfPocket25?: Maybe<Array<Maybe<Scalars['Float']>>>;
  outOfPocket50?: Maybe<Array<Maybe<Scalars['Float']>>>;
  outOfPocket75?: Maybe<Array<Maybe<Scalars['Float']>>>;
  federalLoanAveraged?: Maybe<Array<Maybe<Scalars['Float']>>>;
  privateLoanAveraged?: Maybe<Array<Maybe<Scalars['Float']>>>;
  time?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type Ethnicity = {
  __typename?: 'Ethnicity';
  type: Scalars['ID'];
  name: Scalars['String'];
  percent?: Maybe<Scalars['Int']>;
  graduationRate?: Maybe<Scalars['Int']>;
};

export type Institution = {
  __typename?: 'Institution';
  unitId: Scalars['ID'];
  opeId: Scalars['String'];
  name: Scalars['String'];
  city: Scalars['String'];
  stateAbbr: Scalars['String'];
  zipCode: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  url?: Maybe<Scalars['String']>;
  levelTypeId: Scalars['Int'];
  levelTypeName: Scalars['String'];
  controlTypeId: Scalars['Int'];
  controlTypeName: Scalars['String'];
  studentBody: StudentBody;
  avgNetPriceWithGrantScholarshipAid?: Maybe<Scalars['String']>;
  gr100RiskTypeName?: Maybe<Scalars['String']>;
  gr150DefaultRiskTypeName?: Maybe<Scalars['String']>;
  gr200RiskTypeName?: Maybe<Scalars['String']>;
  gr100?: Maybe<Scalars['Int']>;
  gr150Default?: Maybe<Scalars['Int']>;
  gr150An?: Maybe<Scalars['Int']>;
  gr150Ap?: Maybe<Scalars['Int']>;
  gr150As?: Maybe<Scalars['Int']>;
  gr150Nh?: Maybe<Scalars['Int']>;
  gr150Bk?: Maybe<Scalars['Int']>;
  gr150Hs?: Maybe<Scalars['Int']>;
  gr150Wh?: Maybe<Scalars['Int']>;
  gr1502m?: Maybe<Scalars['Int']>;
  gr150Un?: Maybe<Scalars['Int']>;
  gr150M?: Maybe<Scalars['Int']>;
  gr150W?: Maybe<Scalars['Int']>;
  gr150Nr?: Maybe<Scalars['Int']>;
  gr150Pg?: Maybe<Scalars['Int']>;
  gr150SslNoPg?: Maybe<Scalars['Int']>;
  gr150BaDefault?: Maybe<Scalars['Int']>;
  gr150BaAn?: Maybe<Scalars['Int']>;
  gr150BaAp?: Maybe<Scalars['Int']>;
  gr150BaAs?: Maybe<Scalars['Int']>;
  gr150BaNh?: Maybe<Scalars['Int']>;
  gr150BaBk?: Maybe<Scalars['Int']>;
  gr150BaHs?: Maybe<Scalars['Int']>;
  gr150BaWh?: Maybe<Scalars['Int']>;
  gr150Ba2m?: Maybe<Scalars['Int']>;
  gr150BaUn?: Maybe<Scalars['Int']>;
  gr150BaM?: Maybe<Scalars['Int']>;
  gr150BaW?: Maybe<Scalars['Int']>;
  gr150BaNr?: Maybe<Scalars['Int']>;
  gr150BaPg?: Maybe<Scalars['Int']>;
  gr150BaSslNoPg?: Maybe<Scalars['Int']>;
  gr200?: Maybe<Scalars['Int']>;
  admissionRate?: Maybe<Scalars['Int']>;
  admissionSelectivity?: Maybe<Scalars['String']>;
  ethnicityList: Array<Ethnicity>;
  testScoresList: Array<TestScores>;
  institutionPrograms: Array<InstitutionProgram>;
};

export type InstitutionProgram = {
  __typename?: 'InstitutionProgram';
  unitId: Scalars['Int'];
  cipCode: Scalars['String'];
  ipedsDegreeLevelOfferings: Array<IpedsDegreeLevelOffering>;
  institution: Institution;
  instructionalProgram: InstructionalProgram;
};

export type InstructionalProgram = {
  __typename?: 'InstructionalProgram';
  cipCode: Scalars['String'];
  cipTitle: Scalars['String'];
  cipDefinition: Scalars['String'];
  institutionPrograms: Array<InstitutionProgram>;
};

export type IpedsDegreeLevelOffering = {
  __typename?: 'IpedsDegreeLevelOffering';
  type: Scalars['Int'];
  name: Scalars['String'];
  onSite: Scalars['Boolean'];
  distance: Scalars['Boolean'];
};

export type StudentBody = {
  __typename?: 'StudentBody';
  studentBodySize?: Maybe<Scalars['String']>;
  totalCount?: Maybe<Scalars['Int']>;
  fullTimePercent?: Maybe<Scalars['Float']>;
  partTimePercent?: Maybe<Scalars['Float']>;
};

export type TestScores = {
  __typename?: 'TestScores';
  type: Scalars['String'];
  section: Scalars['String'];
  percentileScore25?: Maybe<Scalars['Int']>;
  percentileScore75?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  roiCalculatorOutput?: Maybe<RoiCalculatorOutput>;
  computeLoanAmountOutput?: Maybe<ComputeLoanAmountOutput>;
  institutions: Array<Institution>;
  instructionalPrograms: Array<InstructionalProgram>;
  institutionPrograms: Array<InstitutionProgram>;
};


export type QueryRoiCalculatorOutputArgs = {
  currentZipCode?: Maybe<Scalars['Int']>;
  goalZipCode?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Int']>;
  currentStateOnetCode: Array<Maybe<Scalars['String']>>;
  goalStateOnetCode: Array<Maybe<Scalars['String']>>;
  startDegreeLevel?: Maybe<Scalars['Int']>;
  endDegreeLevel?: Maybe<Scalars['Int']>;
  yearsToRetirement?: Maybe<Scalars['Int']>;
  avgNetPrice?: Maybe<Scalars['Float']>;
  monthsToPayoffFederalLoan?: Maybe<Scalars['Int']>;
  monthsToPayoffPrivateLoan?: Maybe<Scalars['Int']>;
  annualExpenseFromSavings?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryComputeLoanAmountOutputArgs = {
  tuitionFee?: Maybe<Scalars['Int']>;
  outOfPocket?: Maybe<Array<Maybe<Scalars['Int']>>>;
  numYears?: Maybe<Scalars['Int']>;
  independent?: Maybe<Scalars['Boolean']>;
};


export type QueryInstitutionsArgs = {
  searchTerm?: Maybe<Scalars['String']>;
};


export type QueryInstructionalProgramsArgs = {
  socCode?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
};


export type QueryInstitutionProgramsArgs = {
  cipCode?: Maybe<Scalars['String']>;
  unitId?: Maybe<Scalars['Int']>;
};

export type ComputeLoanAmountOutputQueryVariables = Exact<{
  tuitionFee?: Maybe<Scalars['Int']>;
  outOfPocket?: Maybe<Array<Maybe<Scalars['Int']>>>;
  numYears?: Maybe<Scalars['Int']>;
  independent?: Maybe<Scalars['Boolean']>;
}>;


export type ComputeLoanAmountOutputQuery = (
  { __typename?: 'Query' }
  & { computeLoanAmountOutput?: Maybe<(
    { __typename?: 'ComputeLoanAmountOutput' }
    & Pick<ComputeLoanAmountOutput, 'federalLoan' | 'privateLoan'>
  )> }
);

export type RoiCalculatorOutputQueryVariables = Exact<{
  currentZipCode?: Maybe<Scalars['Int']>;
  goalZipCode?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Int']>;
  currentStateOnetCode: Array<Maybe<Scalars['String']>>;
  goalStateOnetCode: Array<Maybe<Scalars['String']>>;
  startDegreeLevel?: Maybe<Scalars['Int']>;
  endDegreeLevel?: Maybe<Scalars['Int']>;
  yearsToRetirement?: Maybe<Scalars['Int']>;
  avgNetPrice?: Maybe<Scalars['Float']>;
  monthsToPayoffFederalLoan?: Maybe<Scalars['Int']>;
  monthsToPayoffPrivateLoan?: Maybe<Scalars['Int']>;
  annualExpenseFromSavings?: Maybe<Array<Maybe<Scalars['Int']>>>;
}>;


export type RoiCalculatorOutputQuery = (
  { __typename?: 'Query' }
  & { goalState?: Maybe<(
    { __typename?: 'RoiCalculatorOutput' }
    & Pick<RoiCalculatorOutput, 'yearsInCollege' | 'yearsToRoiBreakEven25' | 'yearsToRoiBreakEven50' | 'yearsToRoiBreakEven75' | 'earningCumulativeProb25' | 'earningCumulativeProb50' | 'earningCumulativeProb75' | 'monthlySalary25' | 'monthlySalary50' | 'monthlySalary75' | 'monthlyLoanPayment25' | 'monthlyLoanPayment50' | 'monthlyLoanPayment75' | 'roi25' | 'roi50' | 'roi75' | 'outOfPocket25' | 'outOfPocket50' | 'outOfPocket75' | 'federalLoanAveraged' | 'privateLoanAveraged' | 'time'>
  )>, currentState?: Maybe<(
    { __typename?: 'RoiCalculatorOutput' }
    & Pick<RoiCalculatorOutput, 'earningCumulativeProb25' | 'earningCumulativeProb50' | 'earningCumulativeProb75' | 'monthlySalary25' | 'monthlySalary50' | 'monthlySalary75' | 'time'>
  )> }
);

export const ComputeLoanAmountOutputDocument = gql`
    query computeLoanAmountOutput($tuitionFee: Int, $outOfPocket: [Int], $numYears: Int, $independent: Boolean) {
  computeLoanAmountOutput(tuitionFee: $tuitionFee, outOfPocket: $outOfPocket, numYears: $numYears, independent: $independent) {
    federalLoan
    privateLoan
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ComputeLoanAmountOutputGQL extends Apollo.Query<ComputeLoanAmountOutputQuery, ComputeLoanAmountOutputQueryVariables> {
    document = ComputeLoanAmountOutputDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RoiCalculatorOutputDocument = gql`
    query roiCalculatorOutput($currentZipCode: Int, $goalZipCode: Int, $distance: Int, $currentStateOnetCode: [String]!, $goalStateOnetCode: [String]!, $startDegreeLevel: Int, $endDegreeLevel: Int, $yearsToRetirement: Int, $avgNetPrice: Float, $monthsToPayoffFederalLoan: Int, $monthsToPayoffPrivateLoan: Int, $annualExpenseFromSavings: [Int]) {
  goalState: roiCalculatorOutput(currentZipCode: $currentZipCode, goalZipCode: $goalZipCode, distance: $distance, currentStateOnetCode: $currentStateOnetCode, goalStateOnetCode: $goalStateOnetCode, startDegreeLevel: $startDegreeLevel, endDegreeLevel: $endDegreeLevel, yearsToRetirement: $yearsToRetirement, avgNetPrice: $avgNetPrice, monthsToPayoffFederalLoan: $monthsToPayoffFederalLoan, monthsToPayoffPrivateLoan: $monthsToPayoffPrivateLoan, annualExpenseFromSavings: $annualExpenseFromSavings) {
    yearsInCollege
    yearsToRoiBreakEven25
    yearsToRoiBreakEven50
    yearsToRoiBreakEven75
    earningCumulativeProb25
    earningCumulativeProb50
    earningCumulativeProb75
    monthlySalary25
    monthlySalary50
    monthlySalary75
    monthlyLoanPayment25
    monthlyLoanPayment50
    monthlyLoanPayment75
    roi25
    roi50
    roi75
    outOfPocket25
    outOfPocket50
    outOfPocket75
    federalLoanAveraged
    privateLoanAveraged
    time
  }
  currentState: roiCalculatorOutput(currentZipCode: $currentZipCode, goalZipCode: $currentZipCode, distance: $distance, currentStateOnetCode: $currentStateOnetCode, goalStateOnetCode: $currentStateOnetCode, startDegreeLevel: $startDegreeLevel, endDegreeLevel: $startDegreeLevel, yearsToRetirement: $yearsToRetirement, avgNetPrice: 0, monthsToPayoffFederalLoan: 0, monthsToPayoffPrivateLoan: 0, annualExpenseFromSavings: [0]) {
    earningCumulativeProb25
    earningCumulativeProb50
    earningCumulativeProb75
    monthlySalary25
    monthlySalary50
    monthlySalary75
    time
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoiCalculatorOutputGQL extends Apollo.Query<RoiCalculatorOutputQuery, RoiCalculatorOutputQueryVariables> {
    document = RoiCalculatorOutputDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }