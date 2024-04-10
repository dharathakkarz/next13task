import React from 'react';

const Home = ({ products }) => {
  if (!products) {
    // Handle case where products is undefined
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {/* Render product details here */}
            <p>{product.id}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const productsResponse = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json", {
      cache: "no-store"
    });
    const productsData = await productsResponse.json();

    return {
      props: {
        products: productsData
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
}
