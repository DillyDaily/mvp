import { Fragment } from "react";
import ProductList from "../../components/ProductList";
import { getStaticProps } from "../../helpers/api-util";

const ProductsHome = () => {
    const allProducts = getStaticProps()
    console.log("PRODCUTS Home All Products: ", allProducts)

    return (
        <Fragment>
            <ProductList products={allProducts} />
        </Fragment>
    )
}
export default ProductsHome;