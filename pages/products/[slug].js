import { Fragment } from 'react'
import { GraphQLClient } from 'graphql-request'


export async function getStaticProps () {
  const hygraph = new GraphQLClient(
    'https://api-us-west-2.hygraph.com/v2/cl7pa961y455z01ukbiwy5qf2/master'
  )

  const { products } = await hygraph.request(
      `
      {
          products {
              slug
              name
              id
              description
              price
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
    const hygraph = new GraphQLClient(
        'https://api-us-west-2.hygraph.com/v2/cl7pa961y455z01ukbiwy5qf2/master'
    )            
            const { products } = await hygraph.request(`
            {
                products {
                    slug
                    name
                    description
                    price
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
                    
            export default ({ products }) =>
              products.map(({ id, slug, name, description, price, image }) => (
                < Fragment key = {id}>
                    <h1 >{name}</h1>
                    <div>{description}</div>
                    <div>{price}</div>
                    {/* <img src={image}></img> */}
                </Fragment>
              ))