export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const allUser = () => {
  const query = `*[_type == "user"]`;
  return query;
};

export const productByUser = (userId) => {
  const query = `*[_type == 'product' && userId == '${userId}']`;
  return query;
};

export const orderByUser = (userId) => {
  const query = `*[_type == 'orders' && userId == '${userId}']{
    ...,
    product->{
      name,
      price
    }
  }`;
  return query;
};


export const productById = (productId) => {
  const query = `*[_type == "product" && _id == '${productId}']`;
  return query;
};
