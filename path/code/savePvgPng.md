
# <center>保存SVG,保存PNG</center>
```javascript
//png
function downloadBase64PNGs() {
  document.querySelectorAll("img").forEach((img, index) => {
    if (img.src.startsWith("data:image/png;base64")) {
      const a = document.createElement("a");
      a.href = img.src;
      a.download = `icon-${index}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
}

downloadBase64PNGs();



///svg
function downloadSVGs() {
  document.querySelectorAll("svg").forEach((svg, index) => {
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `icon-${index}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
downloadSVGs();
```