# 🍔 Food Ordering App

A modern, feature-rich food ordering application built with **React 19**, **Redux Toolkit**, and **Tailwind CSS**. This project demonstrates advanced React concepts, efficient state management, and performance optimization techniques.

## ✨ Features

*   **🚀 Live Search**: Real-time restaurant search with debouncing.
*   **⚡ High Performance**: Built with Vite for lightning-fast development and HMR.
*   **🛒 Cart Management**: Fully functional cart powered by Redux Toolkit.
*   **✨ Shimmer UI**: Better user experience with loading skeleton screens.
*   **📦 Lazy Loading**: Code splitting for optimized bundle size (Grocery & About pages).
*   **📡 Offline Status**: Detects and notifies users when they lose internet connection.
*   **🛣️ Dynamic Routing**: Seamless navigation using React Router v7.
*   **🎭 Class Components**: Demonstrates legacy React patterns alongside modern Hooks.
*   **🧪 Testing**: Unit testing setup with Jest and React Testing Library.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **Bundler**: [Parcel](https://parceljs.org/) (as a dependency)
*   **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory**
    ```bash
    cd Foodapp
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

5.  **Open in Browser**
    Visit `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Header, Body, RestaurantCard, etc.)
├── ReduxStore/       # Redux store configuration and slices
├── utils/            # Helper functions, constants, and custom hooks
├── assets/           # Static assets
├── __tests__/        # Test files
├── App.jsx           # Main application component and routing setup
└── main.jsx          # Entry point
```

## 🧠 Key Concepts Demonstrated

*   **Custom Hooks**: `useOnlineStatus`, `useRestaurantMenu` for logic reuse.
*   **Context API**: Used for managing logged-in user state.
*   **Redux Toolkit**: `createSlice`, `configureStore` for complex state management (Cart).
*   **React Fiber & Reconciliation**: Understanding the core of React's rendering.
*   **Higher-Order Components**: Enhancing components with additional functionality.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Made with ❤️ by **Harendra Sharma**
