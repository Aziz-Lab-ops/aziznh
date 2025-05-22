function calculate() {
  let f = math.compile(document.getElementById("function").value);
  let a = parseFloat(document.getElementById("lower").value);
  let b = parseFloat(document.getElementById("upper").value);
  let n = parseInt(document.getElementById("segments").value);
  let method = document.getElementById("method").value;
  let result;

  if (method === "trapezoid") {
    result = trapezoidalRule(f, a, b, n);
  } else if (method === "gaussian") {
    result = gaussianQuadrature(f, a, b);
  }

  document.getElementById(
    "results"
  ).innerHTML = `<h3 class="alert alert-success">Nilai Perkiraan: ${result.toFixed(
    6
  )}</h3>`;
}

function trapezoidalRule(f, a, b, n) {
  let h = (b - a) / n;
  let sum = f.evaluate({ x: a }) + f.evaluate({ x: b });

  for (let i = 1; i < n; i++) {
    let x = a + i * h;
    sum += 2 * f.evaluate({ x: x });
  }

  return (h / 2) * sum;
}

function gaussianQuadrature(f, a, b) {
  let x1 = -1 / Math.sqrt(3);
  let x2 = 1 / Math.sqrt(3);
  let w1 = 1,
    w2 = 1;

  let transformX1 = ((b - a) / 2) * x1 + (a + b) / 2;
  let transformX2 = ((b - a) / 2) * x2 + (a + b) / 2;

  let integral =
    ((b - a) / 2) *
    (w1 * f.evaluate({ x: transformX1 }) + w2 * f.evaluate({ x: transformX2 }));
  return integral;
}
