import { Fragment } from 'react'
import { GraphQLClient } from 'graphql-request'


const hygraph = new GraphQLClient(
      'https://api-us-west-2.hygraph.com/v2/cl7pa961y455z01ukbiwy5qf2/master'
  )

// GET ALL assets & info:
export async function getStaticProps () {
  const { products } = await hygraph.request(
      `
      {
       products {
           id
           name
           description
           price
           images {
                id
                url(
                    transformation: {
                        document: {
                            output: {
                                format: png
                            }
                        },
                        image: {
                            resize: {
                                fit: crop,
                                height: 100,
                                width: 100
                            }
                        }
                    }
                )
           }
       }
    }
    `
    )
        return {
            props: {
                products
            }
        }
}


export async function getStaticPaths () {
    const { products } = await hygraph.request(`
    {
        products {
            slug
        }
    }
    `)

return {
    paths: products.map(({ slug }) => ({
            params: { slug }
        })),
        fallback: false
    }
}


const ProductSlug = (props) => {
    const { products } = props;
    return (products.map(({ id, name, description, price, images }) => (
        < Fragment key = {id}>
            <h1 >{name}</h1>
            <div>{description}</div>
            <div>{price}</div>
           { 
            images.map(image => {
               return (<img key={image.id} src={image.url} />)
           })
           }
        </Fragment>
        )
    ))
}

export default ProductSlug;
