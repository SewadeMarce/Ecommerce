
const Colors = [["Black", "White", "Volt"],
["Navy", "Charcoal", "Sand"],
["Olive", "Black", "Umber"],
["Silver", "Black"],
]
const category = [
    "Shoes",
    "Apparel",
    "Bags",
    "Wearables",

]
const Size = [["39", "40", "41", "42", "43", "44"],
["S", "M", "L", "XL"],
["Silicone", "Leather"]
]
const Title = [
    "Sneakers Nova X",

    "Tee-shirt TechDry",

    "Sac à dos Metro 24L",

    "Montre Pulse Pro",
]

const Brand = [
    "Aether",
    "Aether",
    "Urbanite",
    "Helios",

]
const Bagdes = [
    ["Best Seller"],
    ["New"],
    ["Eco"],
    ["Limited"],

]
const Description = [
    "Baskets légères avec mousse réactive et empeigne respirante. Parfaites pour la ville et le running occasionnel.",
    "Tee technique à séchage rapide avec traitement anti-odeurs.",
    "Sac durable en matériaux recyclés avec poche laptop 16",
    "Suivi cardiaque avancé, GPS, 10 jours d'autonomie.",

]

const Images = [
    ['img-1.jpg', 'img-2.jpg', 'img-3.jpg', 'img-4.jpg'],
    ['img-5.jpg', 'img-6.jpg', 'img-7.jpg', 'img-8.jpg'],
    ['img-9.jpg', 'img-10.jpg', 'img-11.jpg', 'img-12.jpg'],
    ['img-13.jpg', 'img-14.jpg', 'img-15.jpg', 'img-16.jpg'],
    ['img-17.jpg', 'img-18.jpg', 'img-19.jpg', 'img-20.jpg'],
]
export const products = Array.from({ length: 100 }, (_, i) => {

    // 1. Déterminer la couleur principale pour ce produit
    const colors = Colors[i % Colors.length];
    const mainColor = colors[0]; // On prend la première couleur de la liste

    // 2. Formatage : Met la première lettre de la couleur en majuscule (ex: 'gold' -> 'Gold')
    const formattedColor = mainColor.charAt(0).toUpperCase() + mainColor.slice(1);

    // 3. Construction du nom final
    const baseName = Title[i % Title.length];
    const finalName = `${baseName} ${formattedColor}`;
    // ---------------------------------------------------------

    // 4. RATING/REVIEWS : Déterminés par i
    const rating = Math.round((i % 5) * 10) / 10 + 0.9; // Note fixe entre 3.0 et 4.9
    const price = (Math.round((i % 5) * 10) + 1) * 10; // Note fixe entre 3.0 et 4.9
    const reviews = (i % 10) * 100 + 50; // Avis fixes (50, 150, 250, etc.)
    const stock = (i % 10) * 10 + 50; // Avis fixes (50, 150, 250, etc.)
    return {
        title: finalName,
        brand: Brand[i % Brand.length],
        category: category[i % category.length],
        price: price,
        rating: rating,
        reviews: reviews,
        badges: Bagdes[i % Bagdes.length],
        images: Images[i % Images.length],
        variants: {
            color: colors,
            size: Size[i % Size.length],

        },
        stock: stock,
        description: Description[i % Description.length]
    }
})

