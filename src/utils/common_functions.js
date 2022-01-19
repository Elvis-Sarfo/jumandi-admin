export const calcPercentage = (value, total) => {
  let percent = ((value / total) * 100).toFixed(2);
  if ( Number(percent)) {
    return percent;
  } else {
    return 0;
  }
}