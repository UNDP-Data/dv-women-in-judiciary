import { DisaggregationConfig, DisaggregationType } from './types';

export const INDICATORS_OPTIONS = [
  {
    label: 'Sex representation',
    options: [
      {
        label: 'Women representation in judicial positions (%)',
        value: 'femalePercentage',
      },
      {
        label: 'Men representation in judicial positions (%)',
        value: 'malePercentage',
      },
      {
        label:
          'Proportion of women judges with respect to the female population',
        value: 'SDG1671C_Female',
      },
    ],
  },
  {
    label: 'Age structure',
    options: [
      {
        label: 'Share of personnel aged under 35 (%)',
        value: 'age_under_35Percentage',
      },
      {
        label: 'Share of personnel aged 35-44 (%)',
        value: 'between_35_44Percentage',
      },
      {
        label: 'Share of personnel aged 45-54 (%)',
        value: 'between_45_54Percentage',
      },
      {
        label: 'Share of personnel aged 55-64 (%)',
        value: 'between_55_64Percentage',
      },
      {
        label: 'Share of personnel aged 65+ (%)',
        value: 'above_65Percentage',
      },
    ],
  },
];

export const DISAGGREGATION_CONFIG: Record<
  DisaggregationType,
  DisaggregationConfig
> = {
  gender: {
    labels: ['Men', 'Women'],
    colors: ['#296DDF', '#04BAAB'],
    showNA: false,
  },
  age: {
    labels: ['Age under 35', 'Age 35-44', 'Age 45-54', 'Age 55-64', 'Age 65+'],
    colors: ['#296DDF', '#04BAAB', '#934DB0', '#F96445', '#c4c4c4'],
    showNA: true,
  },
};
