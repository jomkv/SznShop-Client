const mockProducts = [
  {
    _id: "60c72b2f9b1d8b001c8e4b8a",
    name: "Product 1",
    description: "Description for Product 1",
    price: 29.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image1",
      },
      { url: "https://example.com/image2.jpg", publicId: "image2" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b8b",
    name: "Product 2",
    description: "Description for Product 2",
    price: 49.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image3",
      },
      { url: "https://example.com/image4.jpg", publicId: "image4" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b8c",
    name: "Product 3",
    description: "Description for Product 3",
    price: 19.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image5",
      },
      { url: "https://example.com/image6.jpg", publicId: "image6" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b8d",
    name: "Product 4",
    description: "Description for Product 4",
    price: 99.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image7",
      },
      { url: "https://example.com/image8.jpg", publicId: "image8" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b8e",
    name: "Product 5",
    description: "Description for Product 5",
    price: 39.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image9",
      },
      { url: "https://example.com/image10.jpg", publicId: "image10" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b8f",
    name: "Product 6",
    description: "Description for Product 6",
    price: 59.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image11",
      },
      { url: "https://example.com/image12.jpg", publicId: "image12" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b90",
    name: "Product 7",
    description: "Description for Product 7",
    price: 79.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image13",
      },
      { url: "https://example.com/image14.jpg", publicId: "image14" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b91",
    name: "Product 8",
    description: "Description for Product 8",
    price: 89.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image15",
      },
      { url: "https://example.com/image16.jpg", publicId: "image16" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b92",
    name: "Product 9",
    description: "Description for Product 9",
    price: 25.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image17",
      },
      { url: "https://example.com/image18.jpg", publicId: "image18" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    _id: "60c72b2f9b1d8b001c8e4b93",
    name: "Product 10",
    description: "Description for Product 10",
    price: 45.99,
    images: [
      {
        url: "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90",
        publicId: "image19",
      },
      { url: "https://example.com/image20.jpg", publicId: "image20" },
    ],
    active: true,
    isDeleted: false,
    deletedAt: null,
  },
];

export default mockProducts;
