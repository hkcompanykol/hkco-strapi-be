'use strict';

const { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require('../constants/catalog');

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const resolvePageSize = (input) => {
  const value = Number.parseInt(input || DEFAULT_PAGE_SIZE, 10);
  if (Number.isNaN(value)) return DEFAULT_PAGE_SIZE;
  return clamp(value, 1, MAX_PAGE_SIZE);
};

module.exports = {
  clamp,
  resolvePageSize,
};
