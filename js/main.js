/**
 * reads the input textarea and returns the input text.
 * @returns {string} - tex format string
 */
const readInput = () => {
  const mode = getMode();
  const input = document.getElementById("input").value.trim();
  if (mode !== "inline") {
    return `\\begin{${mode}}${input}\\end{${mode}}`;
  } else {
    return input;
  }
};

/**
 * @returns {string} - mode (align, cases, inline);
 */
const getMode = () => {
  const modeNode = document.getElementById("mode-menu").getElementsByClassName("is-active")[0];
  return modeNode.textContent.trim();
};


/**
 * reset node.innerHTML and node.value.
 * @param {string} id - id name of html 
 */
const resetById = (id) => {
  const node = document.getElementById(id);
  node.value = "";
  node.innerHTML = "";
};

/**
 * @param {string} input - tex-style string
 * @returns {Promise} - MathJax promise
 */
const getTex2SvgPromise = (input, outputNode) => {
  const options = MathJax.getMetricsFor(outputNode);
  const currentMode = getMode();
  options.display = (currentMode !== "inline");
  return MathJax.tex2svgPromise(input, options);
};



const getSvgNode = () => {
  const svgNode = document.getElementById("output")
                          .getElementsByTagName("svg")[0];
  if (svgNode === undefined) {
    return null;
  }
  return svgNode;
}


const getTSFilename = (ext) => {
  return `test.${ext}`
};


const download = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


/**
 * onclick function of the Download SVG button
 */
const downloadSVG = () => {
  const svg = getSvgNode();
  if (svg === null) {
    console.error("failed download svg");
    return;
  }
  console.log(svg);
  const svgText = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const filename = getTSFilename("svg");
  download(svgBlob, filename);
};


/**
 * onclick function of the Download JPG button
 */
const downloadJPG = () => {
  console.log("download jpg is called");
};


/**
 * onclick function of the GENERATE button. 
 */
const generate = () => {
  // reset output area
  resetById("output");

  // read input textare
  const input = readInput();

  // reset mathjax
  MathJax.texReset();

  const outputNode = document.getElementById("output");
  const promise = getTex2SvgPromise(input, outputNode);
  // reference: https://mathjax.github.io/MathJax-demos-web/input-tex2svg.html.html
  promise.then((node) => {
    const svgNode = node.getElementsByTagName("svg")[0];
    if (svgNode === undefined) {
      throw new Error("Uncatch svg element");
    }
    outputNode.appendChild(svgNode);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  }).catch((err) => {
    console.log(err.message);
  });
};


/**
 * onclick function of RESET button.
 */
const reset = () => {
  // reset input textarea
  resetById("input");

  // reset output area
  resetById("output");
};

/**
 * onclick function of copy to clipboard
 */
const copyToClipboard = () => {
  const svgNode = document.getElementById("output")
                          .getElementsByTagName("svg")[0];
  if (svgNode === undefined) {
    throw new Error("Uncatch svg node");
  }
  const png = svg2png(svgNode);
};

/**
 * onclick function of dropdown menu
 */
const setMode = (mode) => {
  // change dropdown items
  const modeList = document.getElementById("mode-menu").getElementsByClassName("dropdown-item");
  for (const item of modeList) {
    item.classList.remove("is-active");
    if (item.textContent === mode) {
      item.classList.add("is-active");
    }
  }
  // change dropdown button
  const selectButton = document.getElementById("select-mode").getElementsByTagName("span")[1];
  selectButton.textContent = mode;
};


// const autoCompleteJs = new autoComplete({
//   selector: "#input",
//   data: {
//     src: ["\\frac{}{}", "\\alpha", "\\beta", "hello"],
//     cache: true
//   }
// })
