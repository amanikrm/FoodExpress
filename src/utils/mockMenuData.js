export const MOCK_MENU_DATA = {
  cards: [
    {
      card: {
        card: {
          info: {
            name: "Demo Restaurant (Mock Data)",
            cuisines: ["North Indian", "Biryani", "Desserts"],
            costForTwo: 35000,
            avgRating: 4.5,
            sla: {
              deliveryTime: 30,
            },
          },
        },
      },
    },
    {
      groupedCard: {
        cardGroupMap: {
          REGULAR: {
            cards: [
              {
                card: {
                  card: {
                    "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                    title: "Recommended",
                    itemCards: [
                      {
                        card: {
                          info: {
                            id: "101",
                            name: "Paneer Butter Masala",
                            price: 24000,
                            description: "Rich and creamy paneer curry cooked with butter and spices.",
                            imageId: "v1695133679/badges/Pure_Veg111.png",
                          },
                        },
                      },
                      {
                        card: {
                          info: {
                            id: "102",
                            name: "Chicken Biryani",
                            price: 32000,
                            description: "Flavorful basmati rice cooked with tender chicken pieces and aromatic spices.",
                            imageId: "v1695133679/badges/Pure_Veg111.png",
                          },
                        },
                      },
                    ],
                  },
                },
              },
              {
                card: {
                  card: {
                    "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                    title: "Breads",
                    itemCards: [
                      {
                        card: {
                          info: {
                            id: "201",
                            name: "Butter Naan",
                            price: 4500,
                            description: "Soft and fluffy leavened bread topped with butter.",
                            imageId: "",
                          },
                        },
                      },
                      {
                        card: {
                          info: {
                            id: "202",
                            name: "Garlic Naan",
                            price: 5500,
                            description: "Naan bread topped with minced garlic and coriander.",
                            imageId: "",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    },
  ],
};
