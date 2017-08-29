// Makes Dataset Globally Available
var dz;

// Load CSV Dataset and Create Table
function load_dataset(csv) {
  var data = d3.csv.parse(csv)
  create_table(data);
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

// Currently Incomplete Function that Creates Bar Graph with Axis, Labels, and Data
function create_graph(data){
    var width = 960,
        height = 500;

    var y = d3.scale.linear()
        .range([height, 0]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height);

    d3.tsv("data.tsv", type, function(error, data) {
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      var barWidth = width / data.length;

      var bar = chart.selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .attr("width", barWidth - 1);

      bar.append("text")
          .attr("x", barWidth / 2)
          .attr("y", function(d) { return y(d.value) + 3; })
          .attr("dy", ".75em")
          .text(function(d) { return d.value; });
    });

    function type(d) {
      d.value = +d.value; // coerce to number
      return d;
    }
}

// Currently Incomplete Function that Creates Pie Chart with Key and Data
function create_chart(data){
      var width = 360;
      var height = 360;
      var radius = Math.min(width, height) / 2;
      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;
      var color = d3.scale.category20b();
      var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function(d) {
          return d.count;
        })
        .sort(null);

      d3.csv(url, function(error, dataset) { // NEW
        dataset.forEach(function(d) { // NEW
          d.count = +d.count; // NEW
        }); // NEW
        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) {
            return color(d.data.label);
          });

        var legend = svg.selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
          });
        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', color)
          .style('stroke', color);

        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) {
            return d;
          });
      });
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