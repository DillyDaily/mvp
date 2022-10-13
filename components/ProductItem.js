
const ProductItem = (props) => {
console.log('ProductItem PROPS: ', props);
    const { name, description, price, slug } = props;
    const productLink = `${slug}`
    return (
        <div>
            <h1>PRODUCT ITEM</h1>
            <h1 >{name}</h1>
            <div>{description}</div>
            <div>{price}</div>
            {/* <div>
                <img src={props.image.url} />
            </div> */}
        </div>
    )
};

export default ProductItem;