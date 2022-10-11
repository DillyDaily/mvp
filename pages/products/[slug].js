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
           { images.length > 0 && <img src={images[0].url} />}
           { images.length > 1 && <img src={images[1].url} />}
           { images.length > 2 && <img src={images[2].url} />}
           { images.length > 3 && <img src={images[3].url} />}
           { images.length > 4 && <img src={images[4].url} />}
           { images.length > 5 && <img src={images[5].url} />}
           { images.length > 6 && <img src={images[6].url} />}
           { images.length > 7 && <img src={images[7].url} />}
           { images.length > 8 && <img src={images[8].url} />}
           { images.length > 9 && <img src={images[9].url} />}
        </Fragment>
        )
    ))
}