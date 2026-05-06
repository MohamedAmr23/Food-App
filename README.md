# 🍽️ Food Recipe Dashboard

A full-featured **React.js** admin dashboard for managing a food recipe application — built with a clean, modern UI using Bootstrap 5, React Hook Form, and a RESTful API backend.

---

## 🚀 Live Demo

> Coming soon / Deploy link here

---

## 📸 Screenshots

| Dashboard | Recipes | Users |
|-----------|---------|-------|
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/686d49dc-1248-4b48-8925-700129d32009" />
| Recipes | 
 | <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/743879d7-a1b3-4a9c-b87f-d9767edf21dd" />
 | Users |
 | <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a5ca60ce-323f-40fc-87bb-4e3958db174c" />
 |

---

## ✨ Features

### 🔐 Authentication
- Login with email & password
- JWT token stored in localStorage
- Protected routes — redirect to login if not authenticated
- Forgot password flow
- Change password with old/new/confirm validation

### 🏠 Dashboard (Home)
- Welcome banner with logged-in username
- Live stats cards — Total Recipes, Categories, Registered Users
- Quick Actions panel for fast navigation
- Recent Recipes list with images, prices, and categories

### 🍜 Recipes Management
- View all recipes in a styled table with images, prices, tags, and categories
- Add new recipe — name, description, price, tag (dropdown), category (dropdown), image upload with live preview
- Edit existing recipe — pre-filled form, keep current image or upload new
- Delete recipe with confirmation modal
- Smart "nothing changed" detection on update — shows info toast instead of hitting API
- Stats: total recipes, unique categories, average price

### 📂 Categories Management
- View all categories in a styled table
- Add new category with validation
- Edit category — pre-filled modal
- Delete category with confirmation modal
- Stats: total count, latest added, last updated date

### 👥 Users Management
- View all users with paginated table (server-side pagination)
- Filter users by username, email, country, and group (Admin / System User)
- View user details in a modal — avatar, email, phone, country, join date
- Delete user with confirmation
- Group badge — Admin (green) vs System User (blue)
- Stats: total users, admins count, system users count

### ❤️ User Favourites *(Coming Soon)*
- Users can browse recipes and mark favourites
- View personal favourite recipes list
- Add to favourites via `POST /api/v1/userRecipe/`
- Remove from favourites via `DELETE /api/v1/userRecipe/{id}`

### 🔔 UX & Design
- Toast notifications for all actions (success / error / info)
- Delete confirmation modal with item name displayed
- Responsive Bootstrap 5 layout
- Consistent design language across all pages
- Empty state illustrations when no data found
- Custom 404 Not Found page with SVG illustration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React.js 18** | Frontend framework |
| **React Router v6** | Client-side routing & protected routes |
| **Bootstrap 5** | UI components & responsive grid |
| **React Bootstrap** | Bootstrap modals & components |
| **React Hook Form** | Form state & validation |
| **Axios** | HTTP client with interceptors |
| **React Toastify** | Toast notifications |
| **React Pro Sidebar** | Collapsible sidebar navigation |
| **Font Awesome** | Icons |

---

## 📁 Project Structure

```
src/
├── api/                    # Axios client + all API functions
│   ├── axiosClient.js      # Base axios instance with auth interceptor
│   ├── categoriesApi.js    # CRUD for categories
│   ├── recipesApi.js       # CRUD for recipes
│   ├── usersApi.js         # Users list, delete, change password
│   ├── tagsApi.js          # Fetch tags for recipe form
│   └── index.js            # Re-exports all APIs
│
├── assets/                 # Images and static files
│
├── component/              # Page-level components
│   ├── Dashboard.jsx       # Home page with stats
│   ├── RecipesList.jsx     # Recipes table + CRUD
│   ├── CategoriesList.jsx  # Categories table + CRUD
│   ├── UsersList.jsx       # Users table with pagination & filters
│   ├── Login.jsx           # Auth - login page
│   ├── Register.jsx        # Auth - register page
│   ├── ForgotPassword.jsx  # Auth - forgot password
│   ├── ChangePassword.jsx  # Change password (page + modal mode)
│   └── NotFound.jsx        # 404 page with SVG illustration
│
├── sharedComponent/        # Reusable components
│   ├── HeaderCard.jsx      # Green banner header used across pages
│   ├── DeleteConfirmation.jsx  # Reusable delete modal
│   ├── AddCategoryModal.jsx    # Add/Edit category modal
│   ├── AddRecipeModal.jsx      # Add/Edit recipe modal
│   └── NoData.jsx          # Empty state component
│
├── context/
│   └── UserContext.jsx     # Auth context — user data & token
│
└── App.jsx                 # Routes setup
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/food-recipe-dashboard.git

# 2. Navigate into the project
cd food-recipe-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🔑 Environment & API

The project connects to:

```
Base URL: https://upskilling-egypt.com:3006/api/v1
```

Authentication uses **JWT Bearer tokens** — the token is stored in `localStorage` and automatically attached to every request via an Axios interceptor.

### Key Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/Users/signIn` | Login |
| POST | `/Users/Register` | Register |
| PUT | `/Users/ChangePassword` | Change password |
| GET | `/Users/` | Get all users (paginated) |
| DELETE | `/Users/{id}` | Delete user |
| GET | `/Recipe/` | Get all recipes |
| POST | `/Recipe/` | Add recipe |
| PUT | `/Recipe/{id}` | Update recipe |
| DELETE | `/Recipe/{id}` | Delete recipe |
| GET | `/Category/` | Get all categories |
| POST | `/Category/` | Add category |
| PUT | `/Category/{id}` | Update category |
| DELETE | `/Category/{id}` | Delete category |
| GET | `/tag/` | Get all tags |
| GET | `/userRecipe/` | Get favourite recipes |
| POST | `/userRecipe/` | Add to favourites |
| DELETE | `/userRecipe/{id}` | Remove from favourites |

---

## 🔮 Upcoming Features

- [ ] **User Favourites Page** — Users can browse all recipes and heart ❤️ their favourites, view and manage their personal favourites list
- [ ] **Recipe Search & Filter** — Filter recipes by category, tag, and price range
- [ ] **User Profile Page** — View and edit profile info
- [ ] **Dark Mode** — Toggle between light and dark themes
- [ ] **Export to PDF** — Download recipe list as PDF

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature description"

# Push to your branch
git push origin feature/your-feature-name

# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ as part of the **Upskilling Egypt** training program.

> If you found this project helpful, please consider giving it a ⭐ on GitHub!
