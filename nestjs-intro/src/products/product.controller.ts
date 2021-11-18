import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { };

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generateId = await this.productService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generateId };
    }

    @Get()
    async getAllProduct() {
        const products = await this.productService.getAllProducts();
        return products;
    }

    @Get(':id')
    async  getSingleProduct(@Param('id') prodId: string) {
        const product = await this.productService.getSingleProduct(prodId);
        return product
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const product = await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return product;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        const deletedProduct = await this.productService.deleteProduct(prodId);
        return deletedProduct;
    }
}
