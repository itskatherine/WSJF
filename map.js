let jobs = [];
let maxDuration = 0;
let maxValue = 0;
let data = [];

function Job(
  jobName,
  jobDuration,
  userBusinessValue,
  timeCriticality,
  riskReduction
) {
  this.inputs = {};
  this.inputs.jobName = jobName;
  this.inputs.jobDuration = parseFloat(jobDuration);
  this.inputs.userBusinessValue = parseFloat(userBusinessValue);
  this.inputs.timeCriticality = parseFloat(timeCriticality);
  this.inputs.riskReduction = parseFloat(riskReduction);

  this.costOfDelay =
    parseFloat(riskReduction) +
    parseFloat(timeCriticality) +
    parseFloat(userBusinessValue);
  this.WSJF = this.costOfDelay / jobDuration;
  console.log("WSJF: ", this.WSJF);
}

function clickFunction() {
  let jobName = document.getElementById("jobName").value;
  let jobDuration = parseFloat(document.getElementById("jobDuration").value);
  let userBusinessValue = parseFloat(
    document.getElementById("userBusinessValue").value
  );
  let timeCriticality = parseFloat(
    document.getElementById("timeCriticality").value
  );
  let riskReduction = parseFloat(
    document.getElementById("riskReduction").value
  );

  jobs.push(
    new Job(
      jobName,
      jobDuration,
      userBusinessValue,
      timeCriticality,
      riskReduction
    )
  );

  if (jobDuration > maxDuration) {
    maxDuration = jobDuration;
  }
  if (userBusinessValue > maxValue) {
    maxValue = userBusinessValue;
  }

  const lowerDiv = document.getElementById("lowerDiv");
  const addedLabel = document.createElement("p");
  addedLabel.textContent = document.getElementById("jobName").value + " added";
  lowerDiv.appendChild(addedLabel);

  data = [];

  for (let key in jobs) {
    //make the data array
    data.push({
      x: jobs[key].inputs.jobDuration / parseFloat(maxDuration),
      y: jobs[key].inputs.userBusinessValue / parseFloat(maxValue),
      r: jobs[key].WSJF,
      name: jobs[key].inputs.jobName,
    });
  }

  renderData();
}
