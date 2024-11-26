function checkSelection() {
    // Get the selected option value
    var selectedCate = document.getElementById("cate-select").value;
  
    // Use an if statement to check the selected value
    if (selectedCate == "fashion") {
      window.open("fashion/index.html", "_self");
    } else if (selectedCate == "geography") {
      window.open("geography/index.html", "_self");
      
    } else if (selectedCate == "art") {
      window.open("art/index.html","_self");
    } else if (selectedCate == "cars") {
        // Open the local file using a relative path
        window.open("cars/index.html", "_self");
    } else {
      alert("Please select a category!");
    }
}

  