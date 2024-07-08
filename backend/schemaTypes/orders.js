export default {
    name: 'orders',
    title: 'Orders',
    type: 'document',
    fields: [
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: [{ type: 'product' }],
      },{
        name:'emailId',
        title:'EmailId',
        type:'string'
      },{
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
      },
      {
        name: 'createdAt',
        title: 'CreatedAt',
        type: 'datetime',
      },
    ],
  };
  