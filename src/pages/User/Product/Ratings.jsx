import { Button, Card, Col, Row } from "react-bootstrap";
import { useGetProductRatingsQuery } from "../../../libs/rtk/api/ratingApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { formatDate } from "../../../utils/helper";

function Ratings({ productId }) {
  const { data, isLoading, isError, isSuccess } =
    useGetProductRatingsQuery(productId);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isError) {
      toast.warn("Something went wrong, please try again later");
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (isSuccess) {
      setRatings(data.ratings);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!isSuccess || !data) return;

    let updatedRatings = [];

    switch (filter) {
      case "all":
        updatedRatings = data.ratings;
        break;
      case "comments":
        updatedRatings = data.ratings.filter(
          (rating) => rating.comment && rating.comment.trim() !== ""
        );
        break;
      default:
        updatedRatings = data.ratings.filter(
          (rating) => rating.stars === Number(filter)
        );
        break;
    }

    setRatings(updatedRatings);
  }, [filter, isSuccess, data]);

  return (
    <>
      {isLoading && <Spinner large />}
      {isSuccess && (
        <Card>
          <Card.Header>
            <Card.Title className="fs-3 fw-bold">Product Rating</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col sm={3} md={2}>
                    <Card.Title className="fs-3 fw-bold">
                      {data.average} out of 5
                    </Card.Title>
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <i
                        className={`bi ${
                          star <= data.average ? "bi-star-fill" : "bi-star"
                        } fs-3`}
                        key={index}
                      />
                    ))}
                  </Col>
                  <Col sm={9} md={10}>
                    {["all", "5", "4", "3", "2", "1", "comments"].map(
                      (value) => (
                        <Button
                          key={value}
                          variant={filter === value ? "dark" : "light"}
                          className="me-2 mb-2"
                          onClick={() => setFilter(value)}
                        >
                          {value === "all"
                            ? "All"
                            : value === "comments"
                            ? "With Comments"
                            : `${value} Star${value > 1 ? "s" : ""}`}
                        </Button>
                      )
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                {ratings.map((rating, index) => (
                  <Row key={index} className="mb-3">
                    <Col xs={2} md={1} className="text-center">
                      <img
                        src={rating.userId.image}
                        alt="User"
                        className="rounded-circle"
                        style={{
                          height: "3rem",
                          width: "3rem",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col xs={10} md={11}>
                      <Card.Title className="fw-bold">
                        {rating.userId.username}
                      </Card.Title>
                      <div>
                        {[1, 2, 3, 4, 5].map((star, idx) => (
                          <i
                            className={`bi ${
                              star <= rating.stars ? "bi-star-fill" : "bi-star"
                            }`}
                            key={idx}
                          />
                        ))}
                      </div>
                      <Card.Text className="text-muted mb-1">
                        {formatDate(rating.createdAt)}
                      </Card.Text>
                      {rating.comment && (
                        <Card.Text>{rating.comment}</Card.Text>
                      )}
                      <hr />
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Ratings;
