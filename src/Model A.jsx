import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Star, ArrowLeft } from "lucide-react";

const cuisines = [
  { id: 1, name: "Italian", icon: "🍝" },
  { id: 2, name: "Mexican", icon: "🌮" },
  // Add more cuisines here
];

const restaurants = [
  {
    id: 1,
    name: "Luigi's",
    cuisine: "Italian",
    price: "$$",
    rating: 4.5,
    image: "/api/placeholder/400/300",
    favorite: false,
  },
  {
    id: 2,
    name: "Taco Town",
    cuisine: "Mexican",
    price: "$",
    rating: 4.0,
    image: "/api/placeholder/400/300",
    favorite: true,
  },
  // More restaurant data...
];

const RestaurantCard = ({ restaurant, onToggleFavorite }) => (
  <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
    <CardHeader>
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="h-40 w-full object-cover"
      />
    </CardHeader>
    <CardContent>
      <CardTitle>{restaurant.name}</CardTitle>
      <p>Price: {restaurant.price}</p>
      <div className="flex items-center">
        Rating: {restaurant.rating} <Star className="ml-1" size={16} />
      </div>
    </CardContent>
    <CardFooter>
      <Button onClick={() => onToggleFavorite(restaurant.id)}>
        <Heart
          className={restaurant.favorite ? "text-red-500" : ""}
          size={16}
        />
      </Button>
    </CardFooter>
  </Card>
);

export default function App() {
  const [currentCuisine, setCurrentCuisine] = useState(null);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoritesFilter, setFavoritesFilter] = useState(false);

  useEffect(() => {
    if (currentCuisine) {
      setDisplayedRestaurants(
        restaurants.filter((r) => r.cuisine === currentCuisine)
      );
    }
  }, [currentCuisine]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    let results = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(event.target.value.toLowerCase()) &&
        (!currentCuisine || r.cuisine === currentCuisine)
    );
    if (favoritesFilter) results = results.filter((r) => r.favorite);
    setDisplayedRestaurants(results);
  };

  const toggleFavorite = (id) => {
    setDisplayedRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
    );
  };

  return (
    <div className="container mx-auto p-4">
      {currentCuisine ? (
        <>
          <Button variant="outline" onClick={() => setCurrentCuisine(null)}>
            <ArrowLeft size={16} className="mr-2" /> Back to Cuisines
          </Button>
          <div className="mt-4 flex space-x-2">
            <Input
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-grow"
            />
            <Button onClick={() => setFavoritesFilter(!favoritesFilter)}>
              {favoritesFilter ? "Show All" : "Show Favorites"}
            </Button>
          </div>
          <div className="flex flex-wrap mt-4">
            {displayedRestaurants.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {cuisines.map((cuisine) => (
            <Button
              key={cuisine.id}
              onClick={() => setCurrentCuisine(cuisine.name)}
              className="text-lg"
            >
              {cuisine.icon} {cuisine.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
