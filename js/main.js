// Makes Dataset Globally Available
var dz;

// Load CSV Dataset and Create Table
function load_dataset(csv) {
  var data = d3.csv.parse(csv)
  create_table(data);
  create_chart(data)
}

// Creates Table with Column Headers, Types, and Data
function create_table(data) {
  // table stats
  var keys = d3.keys(data[0]);

  d3.select("#table")
    .html("")
    .append("tr")
    .attr("class","fixed")
    .selectAll("th")
    .data(keys)
    .enter().append("th")
      .text(function(d) { return d; });

  d3.select("#table")
    .selectAll("tr.row")
      .data(data)
    .enter().append("tr")
      .attr("class", "row")
      .selectAll("td")
      .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
      .enter().append("td")
        .text(function(d) { return d; });
}

function create_chart(data){
  var width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

  console.log('D', data)

  var color = d3.scale.ordinal()
    .range(["#0087DC", "#DC241f", "#FDBB30", "#D46A4C", "#FFFF00", "#326760", "#008142", "##528D6B", "#CCC"]);

  var arc = d3.svg.arc()
    .outerRadius(radius - 80)
    .innerRadius(0);

  var labelArc = d3.svg.arc()
    .outerRadius(0)
    .innerRadius(radius + 200);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d['Percentage of Vote']; });

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 1.95 + ")");

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .attr('stroke', 'black')
        .attr("fill", function(d) {
          return color(d.data['Political Party']);
        })

    var labelHeight = 18;

    console.log(pie(data)[0])

    var legend = svg
        .append('g')
        .attr('transform', `translate(${radius - 30}, -130)`);

    legend
        .selectAll(null)
        .data(pie(data))
        .enter()
        .append('rect')
        .attr('y', (d, i) => labelHeight * i * 1.8)
        .attr('width', labelHeight)
        .attr('height', labelHeight)
        .attr('fill', d => color(d.data['Political Party']))
        .attr('stroke', 'grey')
        .style('stroke-width', '1px');

    legend
        .selectAll(null)
        .data(pie(data))
        .enter()
        .append('text')
        .text(d => d.data['Political Party'])
        .attr('x', labelHeight * 1.2)
        .attr('y', (d, i) => labelHeight * i * 1.8 + labelHeight)
        .style('font-family', 'sans-serif')
        .style('font-size', `${labelHeight}px`);
}

function type(d) {
  d['Percentage of Vote'] = +d['Percentage of Vote'];
    return d;
}

// Upload Button Functionality
function upload_button(el, callback) {
  var uploader = document.getElementById(el);  
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    callback(contents);
  };

  uploader.addEventListener("change", handleFiles, false);  

  function handleFiles() {
    d3.select("#table").text("loading...");
    var file = this.files[0];
    reader.readAsText(file);
  };
};