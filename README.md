# Frontend

# Backend

Tech stack yang digunakan NodeJS, ExpressJS, MongoDB, Mongoose, Dan Typescript

## Folder Structure

```MD
📦server
 ┣ 📂src
 ┃ ┣ 📂@types
 ┃ ┃ ┣ 📂express
 ┃ ┃ ┃ ┗ 📜index.d.ts
 ┃ ┃ ┗ 📜environment.d.ts
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜address.controller.ts
 ┃ ┃ ┣ 📜category.controller.ts
 ┃ ┃ ┣ 📜product.controller.ts
 ┃ ┃ ┣ 📜productType.controller.ts
 ┃ ┃ ┗ 📜user.controller.ts
 ┃ ┣ 📂data
 ┃ ┃ ┗ 📜connectDB.ts
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📜bad-request.ts
 ┃ ┃ ┣ 📜custom-error.ts
 ┃ ┃ ┣ 📜index.error.ts
 ┃ ┃ ┣ 📜not-found.ts
 ┃ ┃ ┗ 📜unauthenticated.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth.middleware.ts
 ┃ ┃ ┗ 📜error-handler.middleware.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜address.model.ts
 ┃ ┃ ┣ 📜category.model.ts
 ┃ ┃ ┣ 📜product.model.ts
 ┃ ┃ ┣ 📜productType.model.ts
 ┃ ┃ ┣ 📜productVariant.model.ts
 ┃ ┃ ┗ 📜user.model.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜address.route.ts
 ┃ ┃ ┣ 📜category.route.ts
 ┃ ┃ ┣ 📜product.route.ts
 ┃ ┃ ┣ 📜productType.route.ts
 ┃ ┃ ┗ 📜user.route.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜address.service.ts
 ┃ ┃ ┣ 📜base.service.ts
 ┃ ┃ ┣ 📜category.service.ts
 ┃ ┃ ┣ 📜product.service.ts
 ┃ ┃ ┣ 📜productType.service.ts
 ┃ ┃ ┣ 📜productVariant.service.ts
 ┃ ┃ ┗ 📜user.service.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜check-role.ts
 ┃ ┃ ┣ 📜constant.ts
 ┃ ┃ ┗ 📜express-extends.ts
 ┃ ┗ 📜index.ts
 ┣ 📂test
 ┣ 📜.gitignore
 ┣ 📜BlazorECommerce - MERN.postman_collection.json
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┗ 📜tsconfig.json
```

## Flow/Pattern

Flow dari API ini adalah
`Route/Endpoint` - `Controler` - `Service` - `Model`

## How To Run

Clone project ini, lalu buat file `.env` yang berisi `PORT`, `MONGO_URI`, dan `JWT_SECRET`.

Pada terminal jalankan pada root folder `pnpm install`, kemudian `cd src`, kemudian `pnpm run dev`.

Import file `BlazorECommerce - MERN.postman_collection.json` ke Postman, Insomnia atau yang lain.

Lalu jalankan request untuk `seeding-data` untuk mengisi database mongodb dengan mock data.

Pastikan setiap awal endpoint tambahkan `{{API_URL}}`

## Seeding Data

**POST /seeding-data**

---

Seeding data request

-   **URL Params**  
     None
-   **Data Params**  
     None
-   **Headers**  
     Content-Type: application/json

## User

-   User Object

```TS
{
  _id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  CreatesdAt: Date;
  updatedAt: Date;
}
```

-   User Register DTO

```TS
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleType;
}
```

### **GET /user**

---

Get All User

-   **URL Params**  
     None
-   **Data Params**  
     None
-   **Headers**  
     Content-Type: application/json

### **POST /user/register**

---

Register.

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

```TS
{
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  confirmPassword: string
}
```

### **POST /user/login**

---

Login.

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

```TS
{
  username: string,
  password: string
}
```

## Product

-   Product Object

```TS
  title: string;
  description: string;
  imageUrl: string;
  category: mongoose.Schema.Types.ObjectId;
  variants: [mongoose.Schema.Types.ObjectId];
  featured: boolean;
  visible: boolean;
  deleted: boolean;
```

### **GET /product**

---

Get All Product

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     None

### **GET /product/{id}**

---

Get Product By Id

-   **URL Params**  
     _Required:_ `productId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     None

### **POST /product**

---

Create Product

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

    ```TS
    {
      title: string;
      description: string;
      imageUrl: string;
      category: mongoose.Schema.Types.ObjectId;
      variants: [mongoose.Schema.Types.ObjectId];
      featured: boolean;
      visible: boolean;
      deleted: boolean;
    }
    ```

### **PUT /product/{id}**

---

Update Product

-   **URL Params**  
     _Required:_ `productId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

    ```TS
    {
      title: string;
      description: string;
      imageUrl: string;
      category: mongoose.Schema.Types.ObjectId;
      variants: [mongoose.Schema.Types.ObjectId];
      featured: boolean;
      visible: boolean;
      deleted: boolean;
    }
    ```

### **DELETE /product/{id}**

---

Delete Product

-   **URL Params**  
     _Required:_ `productId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     none

## Category

-   Category Object

```TS
  name: string;
  url: string;
  visible: boolean;
  deleted: boolean;
```

### **GET /category**

---

Get All Category

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     None

### **POST /category**

---

Create Category

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

    ```TS
    {
        name: string;
        url: string;
        visible: boolean;
        deleted: boolean;
    }
    ```

### **PUT /category/{id}**

---

Update Category

-   **URL Params**  
     _Required:_ `categoryId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

    ```TS
    {
        name: string;
        url: string;
        visible: boolean;
        deleted: boolean;
    }
    ```

### **DELETE /category/{id}**

---

Delete Category

-   **URL Params**  
     _Required:_ `categoryId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     none

## Product Type

-   Product Type Object

```TS
  name: string;
  category: mongoose.Schema.Types.ObjectId;
```

### **GET /product-type**

---

Get All Product Type

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     None

### **POST /product-type**

---

Create Product Type

-   **URL Params**  
     None
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

    ```TS
    {
      name: string;
      category: mongoose.Schema.Types.ObjectId;
    }
    ```

### **PUT /product-type/{id}**

---

Update Product Type

-   **URL Params**  
     _Required:_ `productTypeId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**

    ```TS
    {
      name: string;
    }
    ```

### **DELETE /product-type/{id}**

---

Delete Product Type

-   **URL Params**  
     _Required:_ `productTypeId=[string]`
-   **Headers**  
     Content-Type: application/json
-   **Data Params**  
     none
