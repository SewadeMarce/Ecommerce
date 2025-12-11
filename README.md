# E-commerce Platform

Une plateforme e-commerce full-stack moderne construite avec **Next.js**, **TypeScript**, **Tailwind CSS**, et **MongoDB**.

## 🚀 Caractéristiques

- ✅ Authentification utilisateur sécurisée
- ✅ Catalogue produits dynamique avec filtrage et recherche
- ✅ Panier d'achat interactif
- ✅ Processus de checkout complet (shipping, payment, confirmation)
- ✅ Gestion des commandes et historique
- ✅ Système de coupons de réduction
- ✅ Gestion des adresses clients
- ✅ Liste de favoris
- ✅ Système de catégories produits
- ✅ Responsive design mobile-first

## 📦 Technologie Stack

### Frontend
- **Next.js 14+** - Framework React avec SSR
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Shadcn/ui** - Composants UI accessibles

### Backend
- **Next.js API Routes** - Endpoints API
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB

### Outils
- **ESLint** - Linting
- **PostCSS** - Traitement CSS

## 📂 Structure du Projet

```
app/
├── layout.tsx          # Layout principal
├── page.tsx            # Page d'accueil
├── account/            # Espace utilisateur
├── catalog/            # Catalogue produits
├── checkout/           # Processus de paiement
├── detail/             # Détail produit
└── test/              # Pages de test

components/
├── Header.tsx          # En-tête principal
├── Footer.tsx          # Pied de page
├── CartSheet.tsx       # Panier latéral
├── Card.tsx            # Carte produit
├── ListProducts.tsx    # Liste produits
├── FormConnect.tsx     # Formulaire connexion
├── FormAdress.tsx      # Formulaire adresse
├── Payment.tsx         # Composant paiement
├── Shipping.tsx        # Composant livraison
├── Stepper.tsx         # Indicateur progression
└── ui/                 # Composants réutilisables

db/
├── models/             # Schémas Mongoose
│   ├── User.ts
│   ├── Product.ts
│   ├── Cart.ts
│   ├── Order.ts
│   ├── Coupon.ts
│   └── Category.ts
├── controllers/        # Logique métier
│   ├── user.controller.ts
│   ├── cart.controller.ts
│   ├── order.controller.ts
│   ├── coupon.controller.ts
│   └── ecommerce.controller.ts
└── connection/         # Configuration DB
    └── mongoose.ts

hooks/
└── useHook.ts          # Hooks personnalisés

utils/
└── index.ts            # Utilitaires

public/
├── images/             # Images statiques
├── img/                # Autres images
├── svg/                # Icônes SVG
└── video/              # Vidéos
```

## 🛠️ Installation

### Prérequis
- Node.js 18+
- MongoDB local ou cloud (MongoDB Atlas)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/SewadeMarce/Ecommerce.git
cd Ecommerce
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration d'environnement**

Créer un fichier `.env.local` à la racine du projet :

```env
# MongoDB
MONGODB_URI=mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/ecommerce

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Authentification (si nécessaire)
NEXTAUTH_SECRET=votre_secret_ici
NEXTAUTH_URL=http://localhost:3000
```

4. **Initialiser la base de données (seed)**
```bash
npm run seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible à `http://localhost:3000`

## 📝 Scripts Disponibles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Générer la production
npm start        # Lancer la production
npm run lint     # Lancer ESLint
npm run seed     # Initialiser la base de données
```

## 🔗 Pages Principales

| Route | Description |
|-------|-------------|
| `/` | Accueil avec hero et produits en avant |
| `/catalog` | Catalogue complet des produits |
| `/detail/[id]` | Détail d'un produit |
| `/checkout` | Panier et processus de paiement |
| `/checkout/shipping` | Sélection de l'adresse/livraison |
| `/checkout/payment` | Paiement |
| `/checkout/success/[id]` | Confirmation de commande |
| `/account` | Profil utilisateur |
| `/account/orders` | Historique commandes |
| `/account/addresses` | Gestion adresses |
| `/account/favorites` | Liste de favoris |
| `/account/settings` | Paramètres compte |

## 💳 Fonctionnalités Principales

### Authentification
- Inscription/Connexion utilisateurs
- Sessions sécurisées

### Produits
- Catalogue avec recherche et filtrage
- Catégorisation
- Détails enrichis
- Images en galerie

### Panier
- Ajout/suppression produits
- Modification quantités
- Coupons de réduction
- Persistance local storage

### Commandes
- Processus multi-étapes
- Suivi commandes
- Historique achat
- Confirmation email

### Utilisateur
- Profil personnalisé
- Gestion adresses
- Historique commandes
- Liste de favoris

## 🗂️ Modèles de Données

### User
```typescript
{
  name: string
  email: string
  password: string (hachée)
  addresses: ObjectId[]
  orders: ObjectId[]
  favorites: ObjectId[]
  createdAt: Date
}
```

### Product
```typescript
{
  name: string
  description: string
  price: number
  category: ObjectId
  images: string[]
  stock: number
  ratings: number
  createdAt: Date
}
```

### Order
```typescript
{
  user: ObjectId
  items: Array<{product: ObjectId, quantity: number, price: number}>
  shippingAddress: ObjectId
  paymentMethod: string
  status: string
  total: number
  createdAt: Date
}
```

## 🔐 Sécurité

- Mots de passe hachés avec bcrypt
- Validation des inputs serveur
- CORS configuré
- Variables sensibles en `.env.local`
- Authentification par sessions/JWT (selon implémentation)

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🚀 Déploiement

### Vercel (recommandé pour Next.js)

1. Pousser le code sur GitHub
2. Connecter le repository à [Vercel](https://vercel.com)
3. Ajouter les variables d'environnement
4. Déployer automatiquement

```bash
git push origin main
```

### Variables d'environnement en production
Définir dans le tableau de bord Vercel :
- `MONGODB_URI` - Chaîne de connexion MongoDB
- `NEXTAUTH_SECRET` - Clé secrète (générer avec `openssl rand -base64 32`)
- `NEXTAUTH_URL` - URL de production

## 🐛 Dépannage

### Problèmes MongoDB
- Vérifier la chaîne de connexion
- Vérifier les IP whitelist sur MongoDB Atlas
- Vérifier que la base de données existe

### Problèmes d'authentification
- Vérifier `NEXTAUTH_SECRET` est défini
- Vérifier les cookies sont activés
- Vérifier `NEXTAUTH_URL` correct

### Problèmes de build
```bash
npm install
npm run build
npm start
```

## 📚 Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Guide](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)

## 👨‍💻 Auteur

**SewadeMarce**

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour des questions ou des problèmes, ouvrir une issue sur GitHub.

---

**Dernière mise à jour:** 11 décembre 2025