/* FEATURE NOTES */
- The application is designed to load CSV files showing UK General Election results (specifically voter share percentages for each main of the political parties), represented by a table, pie chart and bar graph
- The upload function is performed using FileReader, available at https://developer.mozilla.org/en-US/docs/DOM/FileReader. The CSV parse feature of D3 presents the CSV data as a table below the main heading.
- Some simple dummy CSV files were created from General Election results data available on Wikipedia.
- The upload function has been limited to only accept CSV files, though an error message has not been included (in case the user tries to upload a non-CSV format file, or incorrectly formatted CSV file) as of yet.

/* SHORTCOMINGS */
- The application is currently unable to load CSV data into the pie chart and bar graph from external files. There are possible issues related to using version 3 of D3, rather than version 4. 
- The Bootstrap template for the page is not included as of yet, due to interfering with the table's layout (though custom media queries have been included in the stylesheet to offer basic responsive design features)
- The limitation of displaying political data is that data within the table/CSV files cannot be altered – only subsituted for another election's data.

/* POTENTIAL DEVELOPMENT SUGGESTIONS FOR APPLICATION */
- Given the simplicity of the graphs and charts proposed for use here, instead of only uploading from a user's potential selection, a dropdown menu with sample CSV files could be included next to the upload button, in order to demonstrate the functions of the application.
- Scroll-over labels featuring each party's logo/a highlighting colour could be incorporated, either through D3 or potentially via React.
- The current chart/graph formats could be swapped out for a line graph to demonstrate growth/decline of respective voting shares for each political party, along with individual bar graphs for each party, displaying their vote share growth/decline.