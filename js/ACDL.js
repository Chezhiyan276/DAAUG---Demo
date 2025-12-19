function findMostRecentProducts() {
  var adl = window.adobeDataLayer || [];
  for (var i = adl.length - 1; i >= 0; i--) {
    var item = adl[i];
    if (item && item.commerce && item.commerce.products !== undefined) {
      var p = item.commerce.products;
      if (Array.isArray(p)) { return p.slice(); }
      if (p && typeof p === 'object') { return [p]; }
      return [];
    }
  }
  return [];
}
function pushProductsAccumulative(input) {
  var items = [];

  if (Array.isArray(input)) {
    for (var i = 0; i < input.length; i++) {
      if (input[i] && typeof input[i] === 'object') {
        items.push(input[i]);
      }
    }
  } else if (input && typeof input === 'object') {
    items.push(input);
  } else {
    return;
  }

  var existing = findMostRecentProducts();

  for (var j = 0; j < items.length; j++) {
    existing.push(items[j]);
  }

  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    commerce: {
      products: existing
    }
  });
}
pushProductsAccumulative([
  { name: "Apple iPad Mini", model: "G2356", price: 2.99, quantity: 1, total: 2.99 }
]);
pushProductsAccumulative([
  { name: "Smart Camera", model: "SC5436", price: 10.99, quantity: 1, total: 10.99 }
]);

pushProductsAccumulative([
  { name: "EOS Rebel T7i Kit", model: "Rebel T7i", price: 899.00, quantity: 1, total: 899.00 }
]);
