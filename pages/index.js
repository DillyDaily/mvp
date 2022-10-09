import Link from "next/link";
import { GraphQLClient } from "graphql-request";

export async function getStaticProps() {
  const hygraph = new GraphQLClient(
   'https://api-us-west-2.hygraph.com/v2/cl7pa961y455z01ukbiwy5qf2/master'
  );

  const { products } = await hygraph.request(
    `
      {
        products {
          slug
          name
          id
        }
      }
    `
  );
  return {
    props: {
      products,
    },
  };
}

export default ({ products }) =>
  products.map(({ id, slug, name }) => (
      <Link key={id} href={`/products/${slug}`}><a>{name}</a></Link>
  ));
