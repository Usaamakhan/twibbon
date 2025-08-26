module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss'
  ],
  rules: {
    // Allow unknown at-rules like @tailwind
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'screen', 'layer']
      }
    ],
    // Personal preference adjustments
    'no-descending-specificity': null
  }
};
