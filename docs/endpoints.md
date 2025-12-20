Authentication (/api/auth)
POST /register: Create new user.
POST /login: Login and receive JWT.
Users (/api/users)
GET /me: Get profile.
PUT /me: Update profile (name, photo, preferences).
Places (/api/lugares)
GET /: List places (filters: zona, tipo, keyword).
GET /:id: Get place details.
POST /: Create place (Admin only).
PUT /:id: Update place (Admin only).
DELETE /:id: Close place (Admin only).
POST /sugerencias: Suggest new place (User).
Nested Resources
GET /api/lugares/:id/platos: Get menu.
POST /api/lugares/:id/platos: Add dish.
GET /api/lugares/:id/resenas: Get reviews.
POST /api/lugares/:id/resenas: Add review.
GET /api/lugares/:id/promociones: Get promotions.
Global Resources
PUT /api/platos/:id: Update dish.
POST /api/resenas/:id/util: Mark review as helpful.
GET /api/promociones/activas: Get active promotions.
Testing
Ensure your 
.env
 file has MONGO_URI and JWT_SECRET.