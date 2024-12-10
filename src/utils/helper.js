export function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, "0");
  const day = String(date?.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}

export function getOrderTotal(products) {
  let total = 0;

  products.forEach((prod) => {
    total += prod.price * prod.quantity;
  });

  console.log(total);

  return total;
}
