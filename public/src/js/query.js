// class nElement extends {}

function query(el) {
  let qr = document.querySelectorAll(el);

  if (qr.length === 1) {
    return qr[0];
  } else {
    return qr;
  }
}

export default query;
