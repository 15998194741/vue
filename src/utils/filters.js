import Vue from 'vue';
import { parseSimpleTime, parseTime } from './index';

Vue.filter('parseSimpleTime', function(value) {
  if (value) {
    return parseSimpleTime(value);
  }
  return '';
});
Vue.filter('parseTime', function(value) {
  if (value) {
    return parseTime(value);
  }
  return '';
});
