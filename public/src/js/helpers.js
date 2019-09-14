export const isInView = (el, pc = 0) => {
  let bounding = el.getBoundingClientRect();
  // bound;
  console.log(bounding.top, bounding.height * pc, el.id);
  if (Math.abs(bounding.top) <= bounding.height * pc) {
    return true;
  } else {
    return false;
  }
};
