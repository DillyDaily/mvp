import ProductItem from "./ProductItem";

const ProductList = (props) => {
    const { products } = props;
    console.log("ProductList Props: ", products)
    return (
        <ul>
            <div>PRODUCTLIST PAGE</div>
            {products.length > 0 && products.map((product) => (
                <ProductItem 
                    key={product.id}
                    slug={product.slug}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                />
            ))
            }
        </ul>
        
        // export default ({ products }) =>
        //   products.map(({ id, slug, name }) => (
        //       <Link key={id} href={`/products/${slug}`}><a>{name}</a></Link>
        //   ));
    )
};

export default ProductList;