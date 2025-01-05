# 🚗 AutoParts Gear Cart - E-commerce Platform for Automobile Spare Parts

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/your-repo-url.svg)
![GitHub forks](https://img.shields.io/github/forks/github.com/ajaytainwala-dev/E-commerce-Gear-Cart-.svg)

![AutoParts Nexus Logo](https://via.placeholder.com/150x150.png?text=Logo)

## 📝 Mission
Our mission is to revolutionize the automobile spare parts industry by providing an easy-to-use, reliable, and efficient e-commerce platform that connects customers with the best quality spare parts from trusted suppliers.

## 🌟 Vision
We envision a world where automobile enthusiasts and professionals can seamlessly find and purchase spare parts online, ensuring their vehicles run smoothly and safely. Our platform aims to bridge the gap between supply and demand, offering a wide range of products and exceptional customer service.

## 💡 Reason for the Project Topic
The automobile spare parts industry is vast, and finding the right parts can be challenging for customers. This project aims to simplify the search and purchase process by creating a dedicated e-commerce platform that offers a comprehensive selection of spare parts with detailed information, making it easy for users to find what they need.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **Storage**: AWS S3 for images
- **Deployment**: Vercel (Frontend), Heroku (Backend)

## 🚀 What Will It Solve?
- **Ease of Access**: Users can easily find and purchase spare parts online.
- **Product Information**: Detailed descriptions, compatibility information, and images for each product.
- **Secure Transactions**: Secure payment gateway integration.
- **User-Friendly Interface**: Intuitive and responsive design for a seamless shopping experience.

## 📂 Project Directory

### Frontend
```plaintext
frontend/
│
├── components/
│   ├── Navbar.tsx
│   ├── Carousel.tsx
│   └── ...
├── pages/
│   ├── index.tsx
│   ├── product.tsx
│   └── ...
├── styles/
│   └── globals.css
├── public/
│   └── images/
├── next.config.js
└── tsconfig.json
```

### Backend
```plaintext
backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── purchaseController.ts
│   │   └── adminController.ts
│   ├── models/
│   │   ├── userModel.ts
│   │   ├── partModel.ts
│   │   └── purchaseModel.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── purchaseRoutes.ts
│   │   └── adminRoutes.ts
│   ├── utils/
│   │   ├── db.ts
│   │   └── ...
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── .gitignore
```

### Admin Frontend
```plaintext
admin-frontend/
│
├── components/
│   ├── Dashboard.tsx
│   └── ...
├── pages/
│   ├── index.tsx
│   ├── addProduct.tsx
│   └── ...
├── styles/
│   └── globals.css
├── public/
│   └── images/
├── next.config.js
└── tsconfig.json
```

## 🗂️ System Design

### User System Design
- **Microservices**: Authentication Service, Product Service, Order Service
- **Database**: MongoDB
- **Communication**: REST APIs

### Admin System Design
- **Microservices**: Admin Service, Product Management Service, Order Management Service
- **Database**: MongoDB
- **Communication**: REST APIs

## 📊 Stats

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## 📧 Contact
If you have any questions or feedback, feel free to reach out to us at ajaytainwala@gmail.com.
