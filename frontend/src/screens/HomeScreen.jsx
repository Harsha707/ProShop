import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useGetProductsQuery } from "../slices/productsApiSlice";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  let display;

  if (isLoading) {
    display = <Loader />;
  } else if (error) {
    display = (
      <Message variant='danger'>{error?.data.message || error.error}</Message>
    );
  } else {
    display = (
      <>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to='/' className='btn btn-light'>
            Go back
          </Link>
        )}
        <>
          <h1>Latest Product</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      </>
    );
  }

  return display;
};

export default HomeScreen;
