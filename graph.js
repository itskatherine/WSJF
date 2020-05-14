let width = 500;
let height = 500;

let svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let color = d3.scaleLinear().domain([0, 1]).range(["red", "blue"]);

renderData();

let xscale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, width - 100]);

let yscale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([height / 2, 0]);

let x_axis = d3.axisBottom().scale(xscale);

let y_axis = d3.axisLeft().scale(yscale);

svg.append("g").attr("transform", "translate(50, 10)").call(y_axis);

let xAxisTranslate = height / 2 + 10;

svg
  .append("g")
  .attr("transform", "translate(50, " + xAxisTranslate + ")")
  .call(x_axis);

function renderData() {
  svg.selectAll("circle").remove();
  svg.selectAll(".dataLabels").remove();

  let circles = svg
    .selectAll("circle") //returning empty selection atm, but we can connect it to data
    .data(data) //bound data to currently empty selection
    .enter() //returns a placehodler for each data element
    .append("circle") //append a rect to each placeholder
    .attr("r", (d) => 5 * d.r)
    .attr("cx", (d, i) => 50 + (width - 100) * d.x)
    .attr("cy", (d, i) => 10 + height / 2 - (d.y * height) / 2)
    .attr("fill", (d) => color(d.r));

  let datalabels = svg
    .selectAll(".dataLabels")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "dataLabels")
    .attr("x", (d) => 50 + (width - 100) * d.x)
    .attr("y", (d) => 10 + height / 2 - (d.y * height) / 2)
    .text((d) => d.name)
    .attr("fill", "black");
}
