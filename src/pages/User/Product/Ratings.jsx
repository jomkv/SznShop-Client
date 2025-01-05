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
  }, [isSuccess]);

  useEffect(() => {
    if (!isSuccess || !data) return;

    let updatedRatings = [];

    switch (filter) {
      case "all":
        updatedRatings = data.ratings;
        break;
      case "1":
        updatedRatings = data.ratings.filter((rating) => rating.stars === 1);
        break;
      case "2":
        updatedRatings = data.ratings.filter((rating) => rating.stars === 2);
        break;
      case "3":
        updatedRatings = data.ratings.filter((rating) => rating.stars === 3);
        break;
      case "4":
        updatedRatings = data.ratings.filter((rating) => rating.stars === 4);
        break;
      case "5":
        updatedRatings = data.ratings.filter((rating) => rating.stars === 5);
        break;
      case "comments":
        updatedRatings = data.ratings.filter(
          (rating) => rating.comment && rating.comment !== ""
        );
        break;
      default:
        break;
    }

    setRatings(updatedRatings);
  }, [filter]);

  return (
    <>
      {isLoading && <Spinner large />}
      {isSuccess && (
        <Card>
          <Card.Header>
            <Card.Title className="fs-3 fw-bold">Product Rating</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={2}>
                    <Card.Title className=" fs-3 fw-bold">
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
                  <Col sm={10}>
                    <Button
                      variant={filter === "all" ? `dark` : "light"}
                      className="me-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === "5" ? `dark` : "light"}
                      className="me-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("5")}
                    >
                      5 Stars
                    </Button>
                    <Button
                      variant={filter === "4" ? `dark` : "light"}
                      className="me-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("4")}
                    >
                      4 Stars
                    </Button>
                    <Button
                      variant={filter === "3" ? `dark` : "light"}
                      className="me-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("3")}
                    >
                      3 Stars
                    </Button>
                    <Button
                      variant={filter === "2" ? `dark` : "light"}
                      className="me-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("2")}
                    >
                      2 Stars
                    </Button>
                    <Button
                      variant={filter === "1" ? `dark` : "light"}
                      className="me-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("1")}
                    >
                      1 Star
                    </Button>
                    <Button
                      variant={filter === "comments" ? `dark` : "light"}
                      className="mt-2"
                      style={{ width: "150px" }}
                      onClick={() => setFilter("comments")}
                    >
                      With Comments
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Body>
                {ratings.map((rating, index) => (
                  <Row key={index}>
                    <Col sm={1} className="text-end">
                      <img
                        src={rating.userId.image}
                        style={{
                          height: "3rem",
                          width: "3rem",
                        }}
                      />
                    </Col>
                    <Col sm={11}>
                      <Card.Title className="fw-bold">
                        {rating.userId.username}
                      </Card.Title>
                      <div>
                        {[1, 2, 3, 4, 5].map((star, index) => (
                          <i
                            className={`bi ${
                              star <= rating.stars ? "bi-star-fill" : "bi-star"
                            }`}
                            key={index}
                          />
                        ))}
                      </div>
                      {/* Date */}
                      <Card.Text>{formatDate(rating.createdAt)}</Card.Text>{" "}
                      {/* Comment */}
                      <Card.Text>{rating.comment}</Card.Text>
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
