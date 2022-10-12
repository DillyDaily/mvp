
const ProductItem = (props) => {
console.log('ProductItem PROPS: ', props);
    return (
        <div>
            <h1>PRODUCT ITEM</h1>
            <h1 >{props.name}</h1>
            <div>{props.description}</div>
            <div>{props.price}</div>
            {/* <div>
                <img src={props.image.url} />
            </div> */}
        </div>
    )
};

export default ProductItem;