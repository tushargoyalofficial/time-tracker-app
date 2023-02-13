import moment from 'moment';

const onlyDate = (d: Date): number => {
  if (!d) {
    d = new Date();
  } // current date/time
  return Number(moment(d).format('YYYYMMDD'));
};

export default onlyDate;
