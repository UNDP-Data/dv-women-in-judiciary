export interface DataType {
  GeoAreaName: string;
  Region: string;
  ISOalpha3: string;
  TimePeriod: number;
  court: 'high' | 'low' | 'supreme' | 'total';
  Typeofoccupation: 'Judges' | 'Registrars';
  SDG1671C_Female?: number;
  SDG1671C_Male?: number;
  male?: number;
  female?: number;
  total?: number;
  age_under_35?: number;
  between_35_44?: number;
  between_45_54?: number;
  between_55_64?: number;
  above_65?: number;
  not_disabled?: number;
  disabled?: number;
  group_a?: number;
  group_b?: number;
  group_c?: number;
}

export interface FormattedDataType extends DataType {
  malePercentage?: number;
  femalePercentage?: number;
  age_under_35Percentage?: number;
  between_35_44Percentage?: number;
  between_45_54Percentage?: number;
  between_55_64Percentage?: number;
  above_65Percentage?: number;
  disabledPercentage?: number;
  group_aPercentage?: number;
  group_bPercentage?: number;
  group_cPercentage?: number;
}
