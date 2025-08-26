module.exports = {
  extends: [
    'stylelint-config-standard'
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
    'no-descending-specificity': null,
    
    // Disable strict formatting rules for better compatibility
    'color-hex-length': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'font-family-name-quotes': null,
    'property-no-vendor-prefix': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'media-feature-range-notation': null,
    'keyframes-name-pattern': null,
    'rule-empty-line-before': null,
    'length-zero-no-unit': null,
    'value-keyword-case': null
  }
};
