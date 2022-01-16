export function generateArrayOfYears(goBack: number) {
  var max = new Date().getFullYear();
  var min = max - goBack;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push({ value: i, label: i.toString() });
  }
  return years;
}
