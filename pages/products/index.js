import { Fragment } from "react";
import ProductList from "../../components/ProductList";
import { getStaticProps, getStaticPaths } from "../../helpers/api-util";

const ProductsHome = () => {
    const allProducts = getStaticProps()
    console.log("PRODCUTS Home All Products: ", allProducts)
    const path = getStaticPaths()
    console.log("PATHS Home: ", path)

    return (
        <Fragment>
            <ProductList products={allProducts} path={path} />
        </Fragment>
    )
}
export default ProductsHome;