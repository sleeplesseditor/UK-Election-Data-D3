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

// Currently Incomplete Function that Creates Pie Chart with Key and Data
function create_chart(data){
  var width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
    .range(["#0087DC", "#DC241f", "#FDBB30", "#D46A4C", "#FFFF00", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d['Percentage of Vote']; });

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
        // .attr("fill", function(d) { return color(d['Percentage of Vote']); })
        .attr("fill", function(d) {
          return color(d.data['Political Party']);
        })

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data['Political Party']; });
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