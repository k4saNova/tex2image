export default function f() {
  const y = g(3);
  console.log("hello");
  return y;
};

const g = (x) => {
  return x + 1;
};
