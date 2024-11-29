# ShopYangu Admin Panel

An admin panel built with **Next.js 15** and **TypeScript** for managing shops and products for the e-commerce platform ShopYangu. The panel supports real-time metrics, CRUD operations, and interactive dashboards.

---

## Features

- Shop Management: Add, update, and delete shops.
- Product Management: Add, update, and delete products.
- Dashboard Metrics:
  - Overview of total shops, products, total product value, and stock levels.
  - Real-time updates for metrics and graphs.
- Visualizations:
  - Product stock distribution graph.
  - Top 5 shops by stock level.
- Modern Development Stack:
  - Built using Next.js app directory and routing conventions.
  - TypeScript for type safety.
  - Mock API for development and testing.
```
```
# Clone the repository:
git clone https://github.com/wilfredmanyara/shop-yangu-admin.git

# Navigate to the project directory:
cd shop-yangu-admin

# Install the required dependencies with legacy peer deps to handle recharts compatibility:
```
npm install --legacy-peer-deps
```

# Why `--legacy-peer-deps`?

The `--legacy-peer-deps` flag tells npm to bypass strict peer dependency resolution introduced in npm 7 and later.

- Recharts requires React 18 for compatibility, but the default installation may try to use React 19, causing conflicts.
- Using `--legacy-peer-deps` ensures the correct versions of dependencies are installed without errors.

# Start the development server:
```
npm run dev
```
# Open your browser and navigate to:
http://localhost:3000

# Mock API
The project uses JSON files as a mock API to simulate data. Ensure these files are present in the `public/mocks` directory:
- shops.json
- products.json

# Testing Features:
1. Dashboard Overview:
   - View real-time metrics like the total number of shops, products, total product value, and stock distribution.
2. Shop Management:
   - Add, update, or delete shop details using the provided forms.
3. Product Management:
   - Add, update, or delete product information and observe changes in real-time on the dashboard.
4. Graphs and Visualizations:
   - Check the product stock distribution graph and the top 5 shops by stock level.

# Tips:
- Use browser developer tools to inspect network requests to the mock API.
- Test CRUD operations by checking changes in the JSON files in the `data/` directory.

- Framework: Next.js 15
- Language: TypeScript
- Features:
  - Dynamic Routing: Leveraging the app directory and new routing conventions.
  - Real-time Updates: Efficient state management for dynamic updates.

# Future Enhancements:

- Integration with a live backend.
- Role-based access control.
- Additional metrics and visualizations.
- Improved test coverage.

# For any inquiries or support, reach out at:
- Email: info@wilfredmanyara.com
- GitHub: wilfredmanyara
