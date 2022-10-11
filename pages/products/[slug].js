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
           name
           description
           price
       }
    }
    `
    )
        return {
            props: {
                // assets
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


// export function Description({products}) {
// products.map(({ id, name, description, price }) => (
//         < Fragment key = {id}>
//             <h1 >{name}</h1>
//             <div>{description}</div>
//             <div>{price}</div>
//         </Fragment>
//         )
//     )
// }


export default ({ assets }) =>
    assets.map(({ id, name, description, price, images, url }) => (
        < Fragment key = {id}>
            {/* <h1 >{name}</h1>
            <div>{description}</div>
            <div>{price}</div> */}
            {/* <div>{images.fileName}</div> */}
            {/* <div>{images.url}</div> */}
            <img src = {url} alt = {url}  />
        </Fragment>
        )
    )