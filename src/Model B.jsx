import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for cuisines and restaurants
const cuisines = [
  { id: 1, name: "Italian", icon: "🍝" },
  { id: 2, name: "Japanese", icon: "🍣" },
  { id: 3, name: "Indian", icon: "🍛" },
  // Add more as needed
];

const restaurants = [
  {
    id: 1,
    name: "Mama Mia",
    cuisineId: 1,
    price: "$$",
    rating: 4.5,
    image: "italian.jpg",
    isFavorite: false,
    menu: ["Pizza", "Pasta"],
    reviews: [{ rating: 5, comment: "Delicious!" }],
  },
  {
    id: 2,
    name: "Sushi Zen",
    cuisineId: 2,
    price: "$$$",
    rating: 4.8,
    image: "sushi.jpg",
    isFavorite: true,
    menu: ["Sushi", "Sashimi"],
    reviews: [{ rating: 4, comment: "Fresh fish!" }],
  },
  // Add more restaurants here
];

function RestaurantCard({ restaurant, onToggleFavorite, onSelect }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-40 w-full object-cover"
        />
      </CardHeader>
      <CardContent>
        <p>Price: {restaurant.price}</p>
        <p>Rating: {restaurant.rating}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => onSelect(restaurant)}>View Details</Button>
        <Button
          onClick={() => onToggleFavorite(restaurant.id)}
          variant={restaurant.isFavorite ? "secondary" : "default"}
        >
          {restaurant.isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function CuisineButton({ cuisine, onClick }) {
  return (
    <Button onClick={() => onClick(cuisine.id)} className="m-2">
      {cuisine.icon} {cuisine.name}
    </Button>
  );
}

function RestaurantDetail({ restaurant, onClose, onAddReview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{restaurant.name}</CardTitle>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-60 w-full object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p>Price: {restaurant.price}</p>
            <p>Rating: {restaurant.rating}</p>
            <h3 className="font-bold mt-2">Menu:</h3>
            <ul>
              {restaurant.menu.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="font-bold mt-2">Reviews:</h3>
            {restaurant.reviews.map((rev, idx) => (
              <div key={idx}>
                <p>Rating: {rev.rating}</p>
                <p>{rev.comment}</p>
              </div>
            ))}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsOpen(true)}>Add Review</Button>
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Label>Rating</Label>
            <Input
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={(e) =>
                setReview({ ...review, rating: parseInt(e.target.value) })
              }
            />
            <Label>Comment</Label>
            <Textarea
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                onAddReview(review);
                setIsOpen(false);
                setReview({ rating: 0, comment: "" });
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default function App() {
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [data, setData] = useState(restaurants);

  const handleCuisineSelect = (cuisineId) => {
    setSelectedCuisine(cuisineId);
  };

  const handleBackToCuisines = () => {
    setSelectedCuisine(null);
    setSelectedRestaurant(null);
  };

  const handleToggleFavorite = (id) => {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddReview = (newReview) => {
    if (selectedRestaurant) {
      setData((prev) =>
        prev.map((r) =>
          r.id === selectedRestaurant.id
            ? {
                ...r,
                reviews: [...r.reviews, newReview],
                rating: (
                  (r.rating * r.reviews.length + newReview.rating) /
                  (r.reviews.length + 1)
                ).toFixed(1),
              }
            : r
        )
      );
    }
  };

  const filteredRestaurants = data.filter(
    (restaurant) =>
      (!selectedCuisine || restaurant.cuisineId === selectedCuisine) &&
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showFavorites || restaurant.isFavorite)
  );

  return (
    <div className="p-4 sm:p-8">
      {selectedRestaurant ? (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onAddReview={handleAddReview}
        />
      ) : (
        <>
          {selectedCuisine ? (
            <div>
              <Button onClick={handleBackToCuisines} className="mb-4">
                Back to Categories
              </Button>
              <Input
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4"
              />
              <Button
                onClick={() => setShowFavorites(!showFavorites)}
                className="mb-4"
              >
                {showFavorites ? "Show All" : "Show Favorites"}
              </Button>
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onToggleFavorite={handleToggleFavorite}
                  onSelect={setSelectedRestaurant}
                />
              ))}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl mb-4">Choose a Cuisine</h1>
              {cuisines.map((cuisine) => (
                <CuisineButton
                  key={cuisine.id}
                  cuisine={cuisine}
                  onClick={handleCuisineSelect}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
