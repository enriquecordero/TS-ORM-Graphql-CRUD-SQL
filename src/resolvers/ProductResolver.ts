
import { Query, Resolver, Mutation, Arg,Field, InputType,Int} from 'type-graphql'
import {Product} from '../entity/Products'

@InputType()
class ProductInput{
    @Field()
    name!: string;
    @Field()
    quantity!: number;
}

@InputType()
class ProductUpdateInput{
    @Field(()=> String , {nullable: true})
    name?: string;
    @Field(()=>Int, {nullable: true})
    quantity?: number;
}

@Resolver()
export class ProductResolver{ 
    @Mutation(() => Product)
    async createProduct(
        @Arg("producto", ()=> ProductInput) producto: ProductInput
     //   @Arg("name") name: string,
       // @Arg("quantity") quantity: number
    ){
        const newProduct = Product.create(producto);
        console.log(newProduct);
        return await newProduct.save();
        // await Product.insert({name,quantity})
       // console.log(name,quantity);
        
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id",()=> Int) id:number){
         await Product.delete(id);   
        //console.log(id);
            return true;
        }

    @Mutation(()=>Boolean) 
    async updateProduct(
        @Arg("id",()=> Int) id:number,
        @Arg("fields",()=> ProductUpdateInput) fields: ProductUpdateInput
        )  {
            Product.update({id},fields)
            //console.log(id , fields);
            return true;
        } 


    @Query(()=> [Product])
    products(){
        return Product.find()
    }

    }



