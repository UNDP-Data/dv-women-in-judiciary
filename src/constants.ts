export const INDICATORS_OPTIONS = [
  {
    label: 'Sex representation',
    options: [
      {
        label: 'Female representation in judicial positions (%)',
        value: 'femalePercentage',
      },
      {
        label: 'Male representation in judicial positions (%)',
        value: 'malePercentage',
      },
      {
        label:
          'Proportion of female judges with respect to the female population',
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
