import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, ArrowLeft, Search, Heart, Utensils } from "lucide-react";

const initialCuisines = [
  {
    id: 1,
    name: "Italian",
    icon: "🍝",
    restaurants: [
      {
        id: 1,
        name: "Pasta Paradise",
        price: "$$",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&q=80",
        menu: ["Spaghetti Carbonara", "Margherita Pizza", "Tiramisu"],
        address: "123 Italian St, Foodville",
        reviews: [
          { id: 1, rating: 5, comment: "Delicious pasta!" },
          { id: 2, rating: 4, comment: "Great atmosphere" },
        ],
      },
      {
        id: 2,
        name: "Pizza Heaven",
        price: "$",
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
        menu: ["Pepperoni Pizza", "Calzone", "Garlic Bread"],
        address: "456 Pizza Ave, Foodville",
        reviews: [
          { id: 3, rating: 4, comment: "Best pizza in town!" },
          { id: 4, rating: 5, comment: "Love the crispy crust" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Chinese",
    icon: "🥢",
    restaurants: [
      {
        id: 3,
        name: "Dragon Wok",
        price: "$",
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300&q=80",
        menu: ["Kung Pao Chicken", "Dim Sum", "Fried Rice"],
        address: "789 Chinese Ave, Foodville",
        reviews: [
          { id: 5, rating: 4, comment: "Authentic flavors" },
          { id: 6, rating: 5, comment: "Best dim sum in town!" },
        ],
      },
      {
        id: 4,
        name: "Sichuan Spice",
        price: "$$",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80",
        menu: ["Mapo Tofu", "Dan Dan Noodles", "Hot Pot"],
        address: "101 Spicy St, Foodville",
        reviews: [
          { id: 7, rating: 5, comment: "Incredibly flavorful!" },
          { id: 8, rating: 4, comment: "Spicy but delicious" },
        ],
      },
    ],
  },
];

const CuisineList = ({ onSelectCuisine }) => (
  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
    {initialCuisines.map((cuisine) => (
      <Button
        key={cuisine.id}
        onClick={() => onSelectCuisine(cuisine)}
        className="w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl mb-2">{cuisine.icon}</span>
          <span className="text-xl">{cuisine.name}</span>
        </div>
      </Button>
    ))}
  </div>
);

const RestaurantCard = ({
  restaurant,
  onClick,
  onToggleFavorite,
  isFavorite,
}) => (
  <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <Button
        className="absolute top-2 right-2 bg-white/80 text-red-500 rounded-full p-2 hover:bg-white/100 transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(restaurant.id);
        }}
      >
        <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
      </Button>
    </div>
    <CardContent className="p-4 cursor-pointer" onClick={onClick}>
      <h3 className="font-bold text-xl mb-2 text-gray-800">
        {restaurant.name}
      </h3>
      <p className="text-gray-600 mb-2">Price: {restaurant.price}</p>
      <div className="flex items-center">
        <Star className="text-yellow-400 mr-1" />
        <span className="font-semibold text-gray-700">
          {restaurant.rating.toFixed(1)}
        </span>
      </div>
    </CardContent>
  </Card>
);

const RestaurantList = ({
  restaurants,
  onSelectRestaurant,
  onToggleFavorite,
  favorites,
}) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {restaurants.map((restaurant) => (
      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        onClick={() => onSelectRestaurant(restaurant)}
        onToggleFavorite={onToggleFavorite}
        isFavorite={favorites.includes(restaurant.id)}
      />
    ))}
  </div>
);

const ReviewForm = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={32}
            onClick={() => setRating(star)}
            className={`cursor-pointer transition-colors duration-200 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        Submit Review
      </Button>
    </form>
  );
};

const RestaurantDetail = ({ restaurant, onBack, onAddReview }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleAddReview = (review) => {
    onAddReview(restaurant.id, review);
    setIsReviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        className="mb-4 flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200 rounded-lg px-4 py-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="overflow-hidden rounded-xl shadow-xl">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-72 object-cover"
        />
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {restaurant.name}
          </h2>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-2" />
            <span className="text-2xl font-semibold text-gray-800">
              {restaurant.rating.toFixed(1)}
            </span>
            <span className="ml-2 text-gray-600">
              ({restaurant.reviews.length} reviews)
            </span>
          </div>
          <p className="text-gray-600 mb-2">Price: {restaurant.price}</p>
          <p className="text-gray-600 mb-4">{restaurant.address}</p>
          <h3 className="font-bold text-xl mt-6 mb-3 text-gray-800">Menu</h3>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            {restaurant.menu.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
          <h3 className="font-bold text-xl mt-8 mb-4 text-gray-800">Reviews</h3>
          {restaurant.reviews.map((review) => (
            <div key={review.id} className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 mr-1" />
                <span className="font-semibold text-gray-800">
                  {review.rating}/5
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
          <Button
            onClick={() => setIsReviewModalOpen(true)}
            className="mt-8 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Add Review
          </Button>
        </CardContent>
      </Card>
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Add a Review
            </DialogTitle>
          </DialogHeader>
          <ReviewForm
            onSubmit={handleAddReview}
            onClose={() => setIsReviewModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function App() {
  const [cuisinesData, setCuisinesData] = useState(initialCuisines);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleSelectCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    setSelectedRestaurant(null);
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBack = () => {
    if (selectedRestaurant) {
      setSelectedRestaurant(null);
    } else {
      setSelectedCuisine(null);
    }
  };

  const handleAddReview = (restaurantId, review) => {
    setCuisinesData((prevData) =>
      prevData.map((cuisine) => ({
        ...cuisine,
        restaurants: cuisine.restaurants.map((restaurant) => {
          if (restaurant.id === restaurantId) {
            const newReviews = [
              ...restaurant.reviews,
              { ...review, id: Date.now() },
            ];
            const newRating =
              newReviews.reduce((sum, r) => sum + r.rating, 0) /
              newReviews.length;
            return {
              ...restaurant,
              reviews: newReviews,
              rating: newRating,
            };
          }
          return restaurant;
        }),
      }))
    );

    if (selectedRestaurant && selectedRestaurant.id === restaurantId) {
      setSelectedRestaurant((prevRestaurant) => {
        const newReviews = [
          ...prevRestaurant.reviews,
          { ...review, id: Date.now() },
        ];
        const newRating =
          newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
        return {
          ...prevRestaurant,
          reviews: newReviews,
          rating: newRating,
        };
      });
    }
  };

  const handleToggleFavorite = (restaurantId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(restaurantId)
        ? prevFavorites.filter((id) => id !== restaurantId)
        : [...prevFavorites, restaurantId]
    );
  };

  const filteredRestaurants = selectedCuisine
    ? selectedCuisine.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const displayedRestaurants = showFavoritesOnly
    ? filteredRestaurants.filter((restaurant) =>
        favorites.includes(restaurant.id)
      )
    : filteredRestaurants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-800 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Foodie
          </span>{" "}
          Review
        </h1>
        {!selectedCuisine && (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
              Choose Your Cuisine
            </h2>
            <CuisineList onSelectCuisine={handleSelectCuisine} />
          </>
        )}
        {selectedCuisine && !selectedRestaurant && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
                {selectedCuisine.name} Restaurants
              </h2>
              <Button
                onClick={handleBack}
                className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition-colors duration-200 rounded-lg px-4 py-2"
              >
                Back to Cuisines
              </Button>
            </div>
            <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <Button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`${
                  showFavoritesOnly
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                } transition-colors duration-200 rounded-lg px-4 py-2 flex items-center`}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${
                    showFavoritesOnly ? "text-white" : "text-red-500"
                  }`}
                />
                {showFavoritesOnly ? "Show All" : "Favorites"}
              </Button>
            </div>
            {displayedRestaurants.length > 0 ? (
              <RestaurantList
                restaurants={displayedRestaurants}
                onSelectRestaurant={handleSelectRestaurant}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
            ) : (
              <div className="text-center py-10">
                <Utensils className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No restaurants found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            )}
          </>
        )}
        {selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onBack={handleBack}
            onAddReview={handleAddReview}
          />
        )}
      </div>
    </div>
  );
}