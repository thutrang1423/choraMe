import type { Locale } from 'date-fns';
import { enGB, vi } from 'date-fns/locale';
import { default as baseDayjs, default as dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

baseDayjs.extend(utc);
baseDayjs.extend(timezone);
baseDayjs.extend(customParseFormat);
baseDayjs.tz.setDefault('Asia/Ho_Chi_Minh');

export const dayjsFormat = baseDayjs;

export const dayjsLocal = baseDayjs.tz;

export const locales: Record<string, Locale> = {
  vi,
  en: enGB
};

export const initLocaleForDayJs = (localeCode = 'vi') => {
  dayjs.locale(localeCode);
};
