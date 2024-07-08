export default {
    name: 'frontUser',
    title: 'FrontUser',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'emailId',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string',
        },
        {
          name: 'cart',
          title: 'Cart',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'products',
                  title: 'Products',
                  type: 'reference',
                  to: [{ type: 'product' }]
                },
                {
                  name: 'quantity',
                  title: 'Quantity',
                  type: 'number',
                  validation: Rule => Rule.min(1).max(99) // Example validation
                }
              ]
            }
          ]
        }
    ]
}
