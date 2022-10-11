import { Fragment } from 'react'
import { GraphQLClient } from 'graphql-request'

const hygraph = new GraphQLClient(
  'https://api-us-west-2.hygraph.com/v2/cl7pa961y455z01ukbiwy5qf2/master'
)

// GET ALL Products & info:
export async function getStaticProps () {
  const { products } = await hygraph.request(
    `
      {
        products {
            id
            images {
                fileName
                url(transformation: {
                    image: {
                        resize: {
                            width: 200,
                            height: 200,
                            fit: crop
                        }
                    },
                    document: {
                        output: {
                            format: png
                        }
                    }
                })
            }
            description
            price
            name
            slug
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
            id
            images {
                fileName
                url(transformation: {
                    image: {
                        resize: {
                            width: 200,
                            height: 200,
                            fit: crop
                        }
                    },
                    document: {
                        output: {
                            format: png
                        }
                    }
                })
            }
            description
            price
            name
            slug
        }
        }
    `)

  return {
    paths: products.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: false
  }
}

export default ({ products }) =>
  products.map(({ id, slug, name, description, price, images }) => (
    <Fragment key={id}>
      <h1> {name} </h1> <div> {description} </div> <div> {price} </div>{' '}
      <div> {images.fileName} </div> <div> {images.url} </div>{' '}
      <img src={images.url} alt={images.url} width='100%' height='auto' />
    </Fragment>
  ))
