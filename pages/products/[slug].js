import { Fragment } from 'react'
import { GraphQLClient } from 'graphql-request'


const hygraph = new GraphQLClient(
      'https://api-us-west-2.hygraph.com/v2/cl7pa961y455z01ukbiwy5qf2/master'
  )

// GET ALL assets & info:
export async function getStaticProps () {
  const { assets, products } = await hygraph.request(
      `
      {
       assets {
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
       },
       products {
           slug
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
                // assets,
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


export default ({ products }) => {
    console.log("PRODUCTS: ", products)
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