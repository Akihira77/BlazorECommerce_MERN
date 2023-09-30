import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import productTypeModel from "../models/productType.model.js";
import productVariantModel from "../models/productVariant.model.js";
import userModel, {
    IUserModel,
    IUserRegisterDto,
    RoleType,
} from "../models/user.model.js";
import userService from "../services/user.service.js";

const seedDataUser = async () => {
    const userData: IUserRegisterDto[] = [
        {
            firstName: "User",
            lastName: "Test",
            email: "user@test.com",
            password: "user123",
            role: RoleType.user,
        },
        {
            firstName: "User",
            lastName: "operator",
            email: "user@operator.com",
            password: "user123",
            role: RoleType.operator,
        },
        {
            firstName: "User",
            lastName: "admin",
            email: "user@admin.com",
            password: "user123",
            role: RoleType.admin,
        },
    ];

    await userService.register(userData[0]);
    await userService.register(userData[1]);
    await userService.register(userData[2]);
};

const seedDataCategory = async () => {
    const categoryData = [
        {
            name: "Book",
            url: "books",
        },
        {
            name: "Electronic",
            url: "electronics",
        },
        {
            name: "Video Games",
            url: "video-games",
        },
    ];

    await categoryModel.insertMany(categoryData);
};

const seedDataProductType = async () => {
    const categories = await categoryModel.find();
    const productTypeData = [
        {
            name: "E-Book",
            category: categories[0].id,
        },
        {
            name: "Paperbag",
            category: categories[0].id,
        },
        {
            name: "Console",
            category: categories[2].id,
        },
    ];

    await productTypeModel.insertMany(productTypeData);
};

const seedDataProduct = async () => {
    const categories = await categoryModel.find();
    const productTypes = await productTypeModel.find();

    const variantData1 = [
        {
            productType: productTypes[0].id,
            price: 2.99,
            originalPrice: 4.99,
            visible: true,
            deleted: false,
        },
        {
            productType: productTypes[1].id,
            price: 3.99,
            originalPrice: 6.99,
            visible: true,
            deleted: false,
        },
    ];

    const variantData2 = [
        {
            productType: productTypes[0].id,
            price: 4.99,
            originalPrice: 7.99,
            visible: true,
            deleted: false,
        },
        {
            productType: productTypes[1].id,
            price: 7.99,
            originalPrice: 9.99,
            visible: true,
            deleted: false,
        },
    ];

    const productVariants1 = await productVariantModel.insertMany(variantData1);

    const productVariants2 = await productVariantModel.insertMany(variantData2);

    const productData = [
        {
            title: "Math 1",
            description: "This is Math Book",
            imageUrl:
                "https://m.media-amazon.com/images/I/81sZN3tmnTL._AC_UF1000,1000_QL80_.jpg",
            category: categories[0].id,
            variants: productVariants1,
            featured: false,
            visible: true,
            deleted: false,
        },
        {
            title: "Math 2",
            description: "This is Math Book",
            imageUrl:
                "https://www.shutterstock.com/shutterstock/photos/2109627368/display_1500/stock-vector-learning-mathematics-education-and-knowledge-poster-template-flat-illustration-editable-of-square-2109627368.jpg",
            category: categories[0].id,
            variants: productVariants2,
            featured: false,
            visible: true,
            deleted: false,
        },
    ];

    await productModel.insertMany(productData);
};

export { seedDataUser, seedDataCategory, seedDataProductType, seedDataProduct };
