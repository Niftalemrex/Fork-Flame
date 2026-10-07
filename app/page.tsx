"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import {
  CakeSlice,
  ChefHat,
  ChevronRight,
  Coffee,
  Flame,
  Home,
  Leaf,
  Menu as MenuIcon,
  Pizza,
  Search,
  Sandwich,
  Sparkles,
  Utensils,
  ArrowUpRight,
  Play,
  X,
} from "lucide-react";

type MenuProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  special?: boolean;
  plantBased?: boolean;
};

const featuredProducts: MenuProduct[] = [
  { id: "house-burger", name: "Fork & Flame Burger", description: "Flame-seared beef, aged cheddar, house sauce, brioche.", category: "burgers", price: 480, image: "photo-1550547660-d9450f859349", special: true },
  { id: "double-stack", name: "Addis Double Stack", description: "Two beef patties, melted cheddar, pickles, smoky sauce.", category: "burgers", price: 799, image: "photo-1568901346375-23c9450c58cd", special: true },
  { id: "cheeseburger", name: "Classic Cheeseburger", description: "Grilled beef, cheddar, crisp lettuce, tomato, soft bun.", category: "burgers", price: 390, image: "photo-1571091718767-18b5b1457add" },
  { id: "chicken-burger", name: "Crispy Chicken Burger", description: "Golden chicken, slaw, pepper mayo, toasted brioche.", category: "chicken", price: 380, image: "photo-1606755962773-d324e0a13086" },
  { id: "margherita", name: "Stone-Oven Margherita", description: "Slow tomato, mozzarella, basil, blistered sourdough crust.", category: "pizza", price: 380, image: "photo-1513104890138-7c749659a591", special: true },
  { id: "beef-pizza", name: "Beef & Pepper Pizza", description: "Stone-baked crust, spiced beef, sweet pepper, mozzarella.", category: "pizza", price: 460, image: "photo-1571407970349-bc81e7e96d47" },
  { id: "chicken-pizza", name: "Smoky BBQ Chicken Pizza", description: "Charred chicken, smoky barbecue, red onion, herbs.", category: "pizza", price: 480, image: "photo-1579751626657-72bc17010498" },
  { id: "club", name: "Triple-Decker Club", description: "Grilled chicken, egg, garden greens, toasted bread.", category: "sandwiches", price: 400, image: "photo-1528735602780-2552fd46c7af" },
  { id: "wrap", name: "Fire-Roasted Chicken Wrap", description: "Warm flatbread, spiced chicken, crunchy greens, tahini.", category: "wraps", price: 420, image: "photo-1626700051175-6818013e1d4f" },
  { id: "pasta", name: "Creamy Chicken Pasta", description: "Silky cream sauce, parmesan, grilled chicken, fresh herbs.", category: "pasta", price: 480, image: "photo-1621996346565-e3dbc646d9a9" },
  { id: "shiro", name: "Shiro Tagabino", description: "Slow-cooked chickpea stew, berbere, served with injera.", category: "fasting", price: 240, image: "photo-1512058564366-18510be2db19" },
  { id: "fasting-platter", name: "Fasting Platter", description: "A generous mix of lentils, greens, shiro, and injera.", category: "fasting", price: 420, image: "photo-1546069901-ba9599a7e63c", special: true },
  { id: "tilapia", name: "Grilled Tilapia & Chips", description: "Lemon-herb grilled fish, crisp chips, house slaw.", category: "fish", price: 360, image: "photo-1519708227418-c8fd9a32b7a2" },
  { id: "macchiato", name: "Addis Macchiato", description: "A short, rich shot with silky steamed milk.", category: "drinks", price: 100, image: "photo-1509042239860-f550ce710b93" },
  { id: "iced-latte", name: "Iced Caramel Latte", description: "Double espresso, chilled milk, house caramel, plenty of ice.", category: "drinks", price: 160, image: "photo-1461023058943-07fcbe16d735", special: true },
  { id: "mango-spris", name: "Mango & Date Spris", description: "Ripe mango, date, lime, blended bright and fresh.", category: "drinks", price: 200, image: "photo-1600271886742-f049cd451bba" },
  { id: "torte", name: "Chocolate Torte", description: "Dark chocolate sponge, soft cream, cocoa finish.", category: "bakery", price: 150, image: "photo-1578985545062-69928b1d9587" },
  { id: "crispy-wings", name: "Crispy Fire Wings", description: "Spiced wings, charred lemon, cool house dip.", category: "chicken", price: 420, image: "photo-1562967914-608f82629710", special: true },
  { id: "chicken-plate", name: "Grilled Chicken Plate", description: "Herb-marinated chicken, seasoned potatoes, fresh salad.", category: "chicken", price: 520, image: "photo-1532550907401-a500c9a57435" },
  { id: "garden-salad", name: "Market Garden Salad", description: "Seasonal greens, tomato, avocado, bright lemon dressing.", category: "salads", price: 260, image: "photo-1512621776951-a57141f2eefd", plantBased: true },
  { id: "veggie-wrap", name: "Garden Veggie Wrap", description: "Warm flatbread, grilled vegetables, hummus, herbs.", category: "wraps", price: 250, image: "photo-1540420773420-3366772f4999", plantBased: true },
  { id: "misir-wat", name: "Misir Wat & Injera", description: "Red lentils simmered in berbere with soft injera.", category: "fasting", price: 220, image: "photo-1512058564366-18510be2db19", plantBased: true },
  { id: "beyaynetu", name: "Beyaynetu Platter", description: "A colorful fasting spread of lentils, greens, and injera.", category: "fasting", price: 380, image: "photo-1546069901-ba9599a7e63c", plantBased: true },
  { id: "beef-tibs", name: "Sizzling Beef Tibs", description: "Tender beef, onion, rosemary, and warm injera.", category: "ethiopian", price: 540, image: "photo-1544025162-d76694265947" },
  { id: "classic-fries", name: "Golden Skin-On Fries", description: "Crisp potatoes, house spice, garlic dip.", category: "sides", price: 150, image: "photo-1573080496219-bb080dd4f877", plantBased: true },
  { id: "loaded-fries", name: "Loaded Flame Fries", description: "Golden fries, melted cheese, smoky house sauce.", category: "sides", price: 280, image: "photo-1630384060421-cb20d0e0649d" },
  { id: "cafe-latte", name: "Cafe Latte", description: "Smooth espresso with a soft pour of steamed milk.", category: "drinks", price: 90, image: "photo-1495474472287-4d71bcdd2085" },
  { id: "hot-chocolate", name: "Hot Chocolate", description: "Rich cocoa, steamed milk, a little comfort.", category: "drinks", price: 120, image: "https://res.cloudinary.com/dzni6h38z/image/upload/w_1200,q_auto,f_auto,c_limit/amore/products/drinks/hot-chocolate" },
  { id: "strawberry-shake", name: "Strawberry Cream Shake", description: "Strawberry, cold milk, and a thick scoop of cream.", category: "drinks", price: 230, image: "photo-1572490122747-3968b75cc699" },
  { id: "tiramisu", name: "Cafe Tiramisu", description: "Coffee-soaked sponge, mascarpone cream, cocoa dust.", category: "bakery", price: 180, image: "photo-1571877227200-a0d98ea607e9" },
  { id: "brownie", name: "Warm Chocolate Brownie", description: "Deep cocoa, soft center, baked fresh each day.", category: "bakery", price: 110, image: "photo-1541288097308-7b8e3f58c4c6" },
];

const additionalProducts: MenuProduct[] = [
  { id: "mighty-stack", name: "Mighty Stack Burger", description: "Double beef, cheddar, crisp pickles, and smoky house sauce.", category: "burgers", price: 799, image: "amore/products/food/amore-special-burger", special: true },
  { id: "beef-burger", name: "Classic Beef Burger", description: "Flame-grilled beef, sesame brioche, garden lettuce.", category: "burgers", price: 350, image: "amore/products/food/beef-burger" },
  { id: "cheese-burger", name: "Cheese Burger", description: "Prime beef patty, melted cheddar, and house dressing.", category: "burgers", price: 390, image: "amore/products/food/cheese-burger" },
  { id: "fasting-burger", name: "Fasting Burger", description: "Chickpea-lentil patty, fresh greens, sesame bun.", category: "burgers", price: 280, image: "amore/products/fasting/fasting-burger", plantBased: true },
  { id: "tuna-pizza", name: "Tuna & Herb Pizza", description: "Stone-oven crust, tuna, tomato, herbs, and mozzarella.", category: "pizza", price: 420, image: "amore/products/food/tuna-pizza" },
  { id: "vegetable-pizza", name: "Garden Vegetable Pizza", description: "Tomato, sweet peppers, olives, and basil on hand-stretched dough.", category: "pizza", price: 360, image: "photo-1513104890138-7c749659a591", plantBased: true },
  { id: "full-fried-chicken", name: "Full Fried Chicken", description: "Crisp golden chicken, marinated with garlic and herbs.", category: "chicken", price: 1800, image: "amore/products/food/full-fried-chicken" },
  { id: "half-fried-chicken", name: "Half Fried Chicken", description: "A shareable half bird with a crunchy herb crust.", category: "chicken", price: 900, image: "amore/products/food/half-fried-chicken" },
  { id: "full-roasted-chicken", name: "Full Roasted Chicken", description: "Slow-roasted whole chicken with lemon and warm spices.", category: "chicken", price: 1800, image: "photo-1598103442097-8b74394b95c6" },
  { id: "half-roasted-chicken", name: "Half Roasted Chicken", description: "Tender roast chicken, finished with garlic and herbs.", category: "chicken", price: 900, image: "amore/products/food/half-roasted-chicken" },
  { id: "chicken-cutlet", name: "Chicken Cutlet", description: "Golden-crusted chicken with lemon and a fresh side salad.", category: "chicken", price: 360, image: "amore/products/food/chicken-cutlet" },
  { id: "special-sandwich", name: "Special Garden Sandwich", description: "Freshly baked bread, crisp greens, tomato, and house spread.", category: "sandwiches", price: 360, image: "amore/products/food/special-sandwich" },
  { id: "tuna-sandwich", name: "Tuna Sandwich", description: "Seasoned tuna, crunchy greens, and toasted farmhouse bread.", category: "sandwiches", price: 350, image: "amore/products/food/tuna-sandwich" },
  { id: "egg-sandwich", name: "Egg & Garden Sandwich", description: "Soft egg, tomato, lettuce, and lightly toasted bread.", category: "sandwiches", price: 260, image: "amore/products/food/egg-sandwich" },
  { id: "vegetable-sandwich", name: "Vegetable Sandwich", description: "Grilled seasonal vegetables, greens, and herbed dressing.", category: "sandwiches", price: 250, image: "photo-1528735602780-2552fd46c7af", plantBased: true },
  { id: "chicken-wrap", name: "Chicken Garden Wrap", description: "Warm flatbread, grilled chicken, lettuce, tomato, and tahini.", category: "wraps", price: 400, image: "amore/products/food/chicken-wrap" },
  { id: "tuna-wrap", name: "Tuna & Greens Wrap", description: "Tuna, crisp vegetables, herbs, and lemon dressing.", category: "wraps", price: 380, image: "amore/products/food/tuna-wrap" },
  { id: "beef-wrap", name: "Beef & Pepper Wrap", description: "Sliced beef, sweet peppers, lettuce, and smoky sauce.", category: "wraps", price: 330, image: "amore/products/food/beef-wrap" },
  { id: "veggie-wrap", name: "Veggie Fasting Wrap", description: "Warm flatbread with seasonal vegetables and hummus.", category: "wraps", price: 220, image: "photo-1540420773420-3366772f4999", plantBased: true },
  { id: "amore-lasagna", name: "Baked Beef Lasagna", description: "Layered pasta, slow tomato sauce, and a bubbling cheese top.", category: "pasta", price: 500, image: "amore/products/food/amore-lasagna" },
  { id: "tuna-pasta", name: "Pasta with Tuna", description: "Durum wheat pasta, tuna, tomato, and fresh parsley.", category: "pasta", price: 280, image: "amore/products/food/pasta-with-tuna" },
  { id: "tuna-rice", name: "Rice with Tuna", description: "Fluffy rice, tuna, tomato, and a bright herb finish.", category: "pasta", price: 280, image: "amore/products/food/rice-with-tuna" },
  { id: "tuna-salad", name: "Tuna Garden Salad", description: "Fresh romaine, cherry tomato, tuna, and citrus dressing.", category: "salads", price: 250, image: "amore/products/food/tuna-salad" },
  { id: "mixed-salad", name: "Mixed Garden Salad", description: "Crisp greens, tomato, cucumber, and a lemon-herb dressing.", category: "salads", price: 200, image: "photo-1512621776951-a57141f2eefd", plantBased: true },
  { id: "mixed-fasting", name: "Mixed Fasting Platter", description: "A generous spread of lentils, greens, shiro, and injera.", category: "fasting", price: 280, image: "photo-1512058564366-18510be2db19", plantBased: true },
  { id: "shiro-tuna", name: "Shiro with Tuna", description: "Slow-simmered chickpea shiro with tuna and injera.", category: "fasting", price: 270, image: "amore/products/fasting/shiro-with-tuna" },
  { id: "shiro-mentwab", name: "Shiro Mentwab", description: "Silky chickpea stew, berbere, and warm injera.", category: "fasting", price: 220, image: "amore/products/fasting/shiro-mentwab", plantBased: true },
  { id: "shiro-fitfit", name: "Shiro Fitfit", description: "Torn injera folded through gently spiced shiro.", category: "fasting", price: 220, image: "amore/products/fasting/shiro-fitfit", plantBased: true },
  { id: "split-pea-firfir", name: "Split Pea Firfir", description: "Teff injera, split peas, and a slow berbere reduction.", category: "fasting", price: 220, image: "amore/products/fasting/dry-split-pea-firfir", plantBased: true },
  { id: "tomato-lablab", name: "Tomato Lablab", description: "Tender lablab beans simmered with tomato and warming spices.", category: "fasting", price: 220, image: "amore/products/fasting/tomato-lablab", plantBased: true },
  { id: "shiro-lentils", name: "Shiro & Lentils", description: "A hearty pairing of chickpea stew and seasoned lentils.", category: "fasting", price: 200, image: "amore/products/fasting/shiro-lentils", plantBased: true },
  { id: "fasting-minchet", name: "Fasting Minchet", description: "Rich plant-based minchet with berbere and injera.", category: "fasting", price: 200, image: "amore/products/fasting/fasting-minchet", plantBased: true },
  { id: "gomen-tibs", name: "Gomen Tibs", description: "Greens tossed with onion, garlic, and Ethiopian spices.", category: "fasting", price: 200, image: "amore/products/fasting/gomen-tibs", plantBased: true },
  { id: "sunflower-fitfit", name: "Sunflower Fitfit", description: "Soft injera, sunflower seed sauce, and berbere.", category: "fasting", price: 180, image: "photo-1604908176997-125f25cc6f3d", plantBased: true },
  { id: "social-fish-platter", name: "Social Fish Platter", description: "Lake fish, garlic-lemon rub, greens, and crisp sides.", category: "fish", price: 490, image: "amore/products/food/amore-social-fish-platter", special: true },
  { id: "special-fish", name: "House Special Fish", description: "Grilled lake fish with lemon, herbs, and a fresh side.", category: "fish", price: 360, image: "amore/products/food/amore-special-fish" },
  { id: "fish-and-chips", name: "Fish & Chips", description: "Crisp fish, golden potatoes, and lemon dipping sauce.", category: "fish", price: 300, image: "amore/products/food/fish-and-chips" },
  { id: "fish-cutlet", name: "Fish Cutlet", description: "Lightly crumbed fish with lemon and crunchy greens.", category: "fish", price: 300, image: "amore/products/food/fish-cutlet" },
  { id: "fish-goulash", name: "Fish Goulash", description: "Tender fish in a warm tomato and pepper sauce.", category: "fish", price: 290, image: "photo-1534939561126-855b8675edd7" },
  { id: "fish-pasta", name: "Pasta with Lake Fish", description: "Pasta, flaky fish, tomato, and a light herb sauce.", category: "fish", price: 280, image: "photo-1580476262798-bddd9f4b7369" },
  { id: "fish-stew", name: "Fish Stew", description: "Slow-cooked fish stew with berbere and warm injera.", category: "fish", price: 270, image: "amore/products/food/fish-stew" },
  { id: "grilled-fish", name: "Grilled Lemon Fish", description: "Char-grilled lake fish, lemon, herbs, and seasonal greens.", category: "fish", price: 250, image: "amore/products/food/grilled-fish" },
  { id: "fish-firfir", name: "Injera Firfir with Fish", description: "Soft injera tossed with spiced fish and fresh herbs.", category: "fish", price: 250, image: "amore/products/food/injera-firfir-with-fish" },
  { id: "fried-fish", name: "Crispy Fried Fish", description: "Golden fried fish with lemon and house-made dip.", category: "fish", price: 220, image: "amore/products/food/fried-fish" },
  { id: "fasting-latte", name: "Fasting Latte", description: "A smooth, plant-based espresso with a gentle finish.", category: "drinks", price: 130, image: "amore/products/drinks/fasting-latte", plantBased: true },
  { id: "special-tea", name: "Special Spiced Tea", description: "Highland black tea with cinnamon and warming spice.", category: "drinks", price: 100, image: "photo-1495474472287-4d71bcdd2085" },
  { id: "mocha", name: "Mocha", description: "Espresso, steamed milk, and a little dark chocolate.", category: "drinks", price: 100, image: "photo-1509042239860-f550ce710b93" },
  { id: "caramel-macchiato", name: "Caramel Macchiato", description: "Espresso, soft milk foam, and house caramel.", category: "drinks", price: 100, image: "amore/products/drinks/caramel-macchiato" },
  { id: "cappuccino", name: "Cappuccino", description: "A balanced espresso with rich steamed milk foam.", category: "drinks", price: 100, image: "amore/products/drinks/cappuccino" },
  { id: "espresso", name: "Espresso", description: "A short, lively shot of Ethiopian coffee.", category: "drinks", price: 80, image: "amore/products/drinks/espresso" },
  { id: "fasting-macchiato", name: "Fasting Macchiato", description: "A bold coffee with a light, dairy-free finish.", category: "drinks", price: 80, image: "amore/products/drinks/fasting-macchiato", plantBased: true },
  { id: "clove-tea", name: "Clove Tea", description: "Black tea steeped with aromatic clove and cinnamon.", category: "drinks", price: 70, image: "amore/products/drinks/clove-tea" },
  { id: "macchiato", name: "Classic Macchiato", description: "Ethiopian espresso marked with a cloud of milk.", category: "drinks", price: 70, image: "amore/products/drinks/macchiato" },
  { id: "flavored-tea", name: "Flavored Tea", description: "A fragrant cup of highland tea with gentle spice.", category: "drinks", price: 60, image: "amore/products/drinks/flavored-tea" },
  { id: "moringa-tea", name: "Moringa Tea", description: "A light herbal infusion served warm.", category: "drinks", price: 60, image: "amore/products/drinks/moringa-tea", plantBased: true },
  { id: "spris", name: "Spris", description: "A layered pour of fresh fruit and seasonal juice.", category: "drinks", price: 60, image: "photo-1517701550927-30cf4ba1dba5", plantBased: true },
  { id: "fresh-milk", name: "Fresh Milk", description: "A chilled glass of fresh milk.", category: "drinks", price: 60, image: "amore/products/drinks/milk" },
  { id: "ginger-tea", name: "Ginger Tea", description: "Fresh ginger steeped into a bright, warming cup.", category: "drinks", price: 50, image: "amore/products/drinks/ginger-tea", plantBased: true },
  { id: "lemon-tea", name: "Lemon Tea", description: "Highland tea with a fresh squeeze of lemon.", category: "drinks", price: 50, image: "amore/products/drinks/lemon-tea", plantBased: true },
  { id: "green-tea", name: "Cinnamon Green Tea", description: "Green tea lifted with a cinnamon stick.", category: "drinks", price: 50, image: "amore/products/drinks/cinnamon-green-tea", plantBased: true },
  { id: "mint-tea", name: "Mint Tea", description: "A fresh, fragrant mint infusion.", category: "drinks", price: 50, image: "amore/products/drinks/mint-tea", plantBased: true },
  { id: "machine-coffee", name: "Machine Coffee", description: "A simple, warming cup of fresh coffee.", category: "drinks", price: 50, image: "photo-1509042239860-f550ce710b93" },
  { id: "normal-tea", name: "Black Tea", description: "A comforting cup of strong Ethiopian black tea.", category: "drinks", price: 40, image: "photo-1495474472287-4d71bcdd2085", plantBased: true },
  { id: "special-iced-latte", name: "Special Iced Latte", description: "Chilled espresso, cold milk, and a soft caramel finish.", category: "drinks", price: 200, image: "amore/products/drinks/amore-special-iced-latte", special: true },
  { id: "fasting-iced-caramel", name: "Fasting Iced Caramel Latte", description: "Cold espresso, oat milk, and caramel over ice.", category: "drinks", price: 180, image: "amore/products/drinks/fasting-iced-caramel-latte", plantBased: true },
  { id: "caramel-iced-special", name: "Caramel Iced Latte Special", description: "Double espresso, cold milk, and house caramel.", category: "drinks", price: 160, image: "amore/products/drinks/caramel-iced-latte-special" },
  { id: "fasting-iced-latte", name: "Fasting Iced Latte", description: "Chilled espresso with oat milk and plenty of ice.", category: "drinks", price: 160, image: "amore/products/drinks/fasting-iced-latte", plantBased: true },
  { id: "caramella-iced-tea", name: "Caramella Iced Tea", description: "Black tea, caramel, and a bright chilled finish.", category: "drinks", price: 150, image: "amore/products/drinks/caramella-iced-tea" },
  { id: "caramel-iced-latte", name: "Caramel Iced Latte", description: "Cold espresso and milk swirled with caramel.", category: "drinks", price: 150, image: "amore/products/drinks/caramel-iced-latte" },
  { id: "iced-coffee", name: "Iced Coffee", description: "Slow-cooled espresso, milk, and ice.", category: "drinks", price: 120, image: "amore/products/drinks/iced-coffee" },
  { id: "iced-tea", name: "Iced Tea", description: "Freshly brewed tea served cold with citrus.", category: "drinks", price: 100, image: "amore/products/drinks/iced-tea" },
  { id: "four-in-one", name: "Four-in-One Juice", description: "A bright blend of four seasonal fruits and lime.", category: "drinks", price: 450, image: "amore/products/drinks/amore-special-four-in-one", special: true },
  { id: "oreo-juice", name: "Oreo Cream Juice", description: "A thick, cool cookie-and-cream shake.", category: "drinks", price: 280, image: "amore/products/drinks/amore-special-oreo-juice" },
  { id: "still-water", name: "Still Water", description: "A chilled bottle of drinking water.", category: "drinks", price: 50, image: "photo-1548839140-29a749e1cf4d", plantBased: true },
  { id: "fruit-punch", name: "Fruit Punch", description: "A fresh mix of seasonal fruit juices.", category: "drinks", price: 230, image: "amore/products/drinks/fruit-punch", plantBased: true },
  { id: "strawberry-mojito", name: "Strawberry Mojito", description: "Strawberry, mint, lime, and sparkling refreshment.", category: "drinks", price: 210, image: "amore/products/drinks/strawberry-mojito", plantBased: true },
  { id: "papaya-burst", name: "Papaya Burst", description: "Fresh papaya blended bright with a squeeze of lime.", category: "drinks", price: 200, image: "amore/products/drinks/papaya-burst", plantBased: true },
  { id: "mango-date-spris", name: "Mango & Date Spris", description: "Ripe mango, sweet date, and a fresh lime splash.", category: "drinks", price: 200, image: "photo-1505252585461-04db1eb84625", plantBased: true },
  { id: "avocado-date-spris", name: "Avocado & Date Spris", description: "Creamy avocado and date blended into a cool spris.", category: "drinks", price: 200, image: "photo-1600271886742-f049cd451bba", plantBased: true },
  { id: "banana-date-spris", name: "Banana & Date Spris", description: "Ripe banana and date with a refreshing citrus lift.", category: "drinks", price: 200, image: "photo-1505252585461-04db1eb84625", plantBased: true },
  { id: "avocado-banana-date", name: "Avocado, Banana & Date", description: "A rich, naturally sweet blend of three fresh fruits.", category: "drinks", price: 200, image: "amore/products/drinks/avocado-banana-date-spris", plantBased: true },
  { id: "full-special-shake", name: "Full Special Shake", description: "A thick house shake made with fresh fruit and cold milk.", category: "drinks", price: 200, image: "amore/products/drinks/full-special-shake" },
  { id: "healthy-juice", name: "Garden Healthy Juice", description: "A fresh seasonal juice, pressed and served cold.", category: "drinks", price: 180, image: "amore/products/drinks/amore-healthy-juice", plantBased: true },
  { id: "watermelon-mojito", name: "Watermelon Mojito", description: "Watermelon, garden mint, and lime over ice.", category: "drinks", price: 180, image: "amore/products/drinks/watermelon-mojito", plantBased: true },
  { id: "avocado-date-jug", name: "Avocado & Date Milk Jug", description: "A generous jug of avocado, date, and chilled milk.", category: "drinks", price: 250, image: "photo-1572490122747-3968b75cc699" },
  { id: "chocolate-milk", name: "Chocolate with Milk", description: "Cold milk blended smooth with rich cocoa.", category: "drinks", price: 240, image: "amore/products/drinks/chocolate-with-milk" },
  { id: "avocado-date-milk", name: "Avocado & Date Milk", description: "Creamy avocado and date blended with fresh milk.", category: "drinks", price: 230, image: "amore/products/drinks/avocado-date-with-milk" },
  { id: "date-banana-avocado-milk", name: "Date, Banana & Avocado Milk", description: "A smooth, filling blend of fruit, date, and milk.", category: "drinks", price: 220, image: "photo-1541658016709-82535e94bc69" },
  { id: "date-milk", name: "Date Milk", description: "Sweet dates blended with chilled whole milk.", category: "drinks", price: 220, image: "amore/products/drinks/date-with-milk" },
  { id: "sport-shake", name: "Sport Shake", description: "Banana, dates, and milk blended into a rich shake.", category: "drinks", price: 200, image: "amore/products/drinks/sport-shek" },
  { id: "strawberry-milk", name: "Strawberry Milk", description: "Fresh strawberry blended smooth with cold milk.", category: "drinks", price: 200, image: "amore/products/drinks/strawberry-with-milk" },
  { id: "banana-milk", name: "Banana Milk", description: "Ripe banana and chilled milk blended to order.", category: "drinks", price: 200, image: "amore/products/drinks/banana-with-milk" },
  { id: "papaya-milk", name: "Papaya Milk", description: "Sweet papaya blended with cold whole milk.", category: "drinks", price: 190, image: "amore/products/drinks/papaya-with-milk" },
  { id: "mango-milk", name: "Mango Milk", description: "Ripe mango and milk, blended until silky.", category: "drinks", price: 160, image: "amore/products/drinks/mango-with-milk" },
  { id: "avocado-milk", name: "Avocado Milk", description: "Fresh avocado and cold milk with a soft, creamy finish.", category: "drinks", price: 160, image: "amore/products/drinks/avocado-with-milk" },
  { id: "milifoni", name: "Milifoni Pastry", description: "A delicate bakery favorite made with butter and eggs.", category: "bakery", price: 120, image: "amore/products/bakery/milifoni" },
  { id: "opera-cake", name: "Opera Chocolate Cake", description: "Chocolate custard and soft sponge finished with cocoa.", category: "bakery", price: 120, image: "amore/products/bakery/opera-chocolate-custard" },
  { id: "cappuccino-pastry", name: "Cappuccino Pastry", description: "A light, buttery pastry with a coffee-kissed finish.", category: "bakery", price: 120, image: "amore/products/bakery/cappuccino-pastry" },
  { id: "baklava", name: "Baklava", description: "Crisp layered pastry with nuts and a gentle honey finish.", category: "bakery", price: 110, image: "amore/products/bakery/baklava" },
  { id: "black-forest", name: "Black Forest Cake", description: "Chocolate sponge, soft cream, and dark cherry.", category: "bakery", price: 100, image: "amore/products/bakery/black-forest-cake" },
  { id: "white-cake", name: "White Celebration Cake", description: "Soft vanilla sponge with a light cream finish.", category: "bakery", price: 100, image: "amore/products/bakery/white-cake" },
];

const products = [...featuredProducts, ...additionalProducts];

const burgerBases: Array<{ id: string; name: string; price: number; description: string; plantBased?: boolean }> = [
  { id: "beef", name: "Beef", price: 350, description: "Flame-grilled beef patty" },
  { id: "double-beef", name: "Double Beef", price: 590, description: "Two stacked flame-grilled beef patties" },
  { id: "crispy-chicken", name: "Crispy Chicken", price: 380, description: "Golden-crisp chicken breast" },
  { id: "grilled-chicken", name: "Grilled Chicken", price: 400, description: "Herb-marinated grilled chicken" },
  { id: "garden", name: "Garden", price: 280, description: "A hearty plant-based patty", plantBased: true },
];

const burgerFinishes = [
  { id: "addis-berbere", name: "Addis Berbere", description: "with berbere butter and crisp onion", add: 40 },
  { id: "smoky-bbq", name: "Smoky BBQ", description: "with smoky barbecue glaze and slaw", add: 35 },
  { id: "pepper-jack", name: "Pepper Jack", description: "with pepper jack and roasted pepper", add: 55 },
  { id: "mushroom-swiss", name: "Mushroom Swiss", description: "with sauteed mushrooms and Swiss cheese", add: 65 },
  { id: "caramelized-onion", name: "Caramelized Onion", description: "with slow-cooked onion and sharp cheddar", add: 45 },
  { id: "garlic-aioli", name: "Garlic Aioli", description: "with roasted garlic aioli and garden greens", add: 30 },
  { id: "hot-honey", name: "Hot Honey", description: "with chili honey and cooling slaw", add: 40 },
  { id: "jalapeno-crunch", name: "Jalapeno Crunch", description: "with jalapeno, pickles, and crunchy onion", add: 35 },
  { id: "avocado-herb", name: "Avocado Herb", description: "with smashed avocado and green herb sauce", add: 70 },
  { id: "truffle-cheddar", name: "Truffle Cheddar", description: "with aged cheddar and truffle mayo", add: 85 },
  { id: "crispy-onion", name: "Crispy Onion", description: "with crisp onion strings and house sauce", add: 35 },
  { id: "green-chili-feta", name: "Green Chili Feta", description: "with green chili relish and salty feta", add: 55 },
  { id: "lemon-herb", name: "Lemon Herb", description: "with lemon herb sauce and crisp lettuce", add: 30 },
  { id: "spicy-tomato", name: "Spicy Tomato", description: "with slow tomato relish and chili", add: 35 },
  { id: "roasted-pepper", name: "Roasted Pepper", description: "with charred peppers and melted mozzarella", add: 50 },
  { id: "black-pepper", name: "Black Pepper", description: "with cracked pepper sauce and sharp cheese", add: 40 },
  { id: "sweet-chili", name: "Sweet Chili", description: "with sweet chili glaze and sesame slaw", add: 35 },
  { id: "fire-corn", name: "Fire-Roasted Corn", description: "with charred corn salsa and lime mayo", add: 45 },
  { id: "peri-peri", name: "Peri-Peri", description: "with peri-peri heat and cool herb yogurt", add: 40 },
  { id: "chipotle-crunch", name: "Chipotle Crunch", description: "with chipotle sauce and crunchy greens", add: 40 },
  { id: "ginger-soy", name: "Ginger Soy", description: "with ginger-soy glaze and fresh scallion", add: 45 },
  { id: "herb-garden", name: "Herb Garden", description: "with basil, parsley, and green herb dressing", add: 30 },
  { id: "cheddar-melt", name: "Cheddar Melt", description: "with double cheddar and tangy pickles", add: 60 },
  { id: "double-heat", name: "Double Heat", description: "with two chili sauces and fire-roasted jalapeno", add: 45 },
];

const pizzaBases: Array<{ id: string; name: string; price: number; description: string; plantBased?: boolean }> = [
  { id: "margherita", name: "Margherita", price: 340, description: "Stone-baked tomato and mozzarella" },
  { id: "beef", name: "Beef", price: 420, description: "Stone-baked crust topped with spiced beef" },
  { id: "chicken", name: "Chicken", price: 420, description: "Stone-oven chicken with house tomato sauce" },
  { id: "tuna", name: "Tuna", price: 390, description: "Stone-baked tuna with fresh tomato" },
  { id: "garden", name: "Garden Veggie", price: 320, description: "Hand-stretched crust with garden vegetables", plantBased: true },
];

const pizzaFinishes = [
  { id: "three-cheese", name: "Three Cheese", description: "finished with mozzarella, feta, and aged cheddar", add: 70 },
  { id: "berbere", name: "Berbere Fire", description: "finished with berbere oil and sweet pepper", add: 45 },
  { id: "roasted-garlic", name: "Roasted Garlic", description: "finished with roasted garlic and herbs", add: 35 },
  { id: "smoky-bbq", name: "Smoky BBQ", description: "finished with smoky barbecue and red onion", add: 45 },
  { id: "jalapeno-corn", name: "Jalapeno Corn", description: "finished with sweet corn and green jalapeno", add: 45 },
  { id: "mushroom-olive", name: "Mushroom Olive", description: "finished with sauteed mushroom and black olive", add: 55 },
  { id: "hot-honey", name: "Hot Honey", description: "finished with chili honey and fresh basil", add: 45 },
  { id: "red-onion-pepper", name: "Red Onion Pepper", description: "finished with red onion and fire-roasted pepper", add: 35 },
  { id: "spinach-feta", name: "Spinach Feta", description: "finished with spinach, feta, and lemon zest", add: 50 },
  { id: "extra-mozzarella", name: "Extra Mozzarella", description: "finished with an extra blanket of mozzarella", add: 60 },
  { id: "sweet-corn-chili", name: "Sweet Corn Chili", description: "finished with charred corn and green chili", add: 40 },
  { id: "roasted-eggplant", name: "Roasted Eggplant", description: "finished with smoky eggplant and parsley", add: 40, plantBased: true },
  { id: "pepper-onion", name: "Pepper Onion", description: "finished with sweet pepper and caramelized onion", add: 40, plantBased: true },
  { id: "pesto-garden", name: "Pesto Garden", description: "finished with basil pesto and seasonal greens", add: 55, plantBased: true },
  { id: "chipotle", name: "Chipotle Smoke", description: "finished with chipotle sauce and smoked paprika", add: 45 },
  { id: "lemon-herb", name: "Lemon Herb", description: "finished with lemon oil and garden herbs", add: 35 },
  { id: "caramelized-onion", name: "Caramelized Onion", description: "finished with slow-cooked onion and thyme", add: 40, plantBased: true },
  { id: "black-pepper", name: "Black Pepper", description: "finished with cracked pepper and aged cheese", add: 45 },
  { id: "tomato-basil", name: "Tomato Basil", description: "finished with fresh tomato and sweet basil", add: 35, plantBased: true },
  { id: "white-sauce", name: "Creamy White Sauce", description: "finished with garlic cream and soft herbs", add: 55 },
  { id: "chili-crunch", name: "Chili Crunch", description: "finished with house chili oil and crisp onion", add: 40 },
  { id: "fire-chicken", name: "Fire Chicken", description: "finished with grilled chicken and chili glaze", add: 65 },
  { id: "rosemary-potato", name: "Rosemary Potato", description: "finished with crisp potato, rosemary, and garlic", add: 45, plantBased: true },
  { id: "addis-tibs", name: "Addis Tibs", description: "finished with spiced beef tibs and roasted pepper", add: 90 },
];

const burgerPhotos = ["photo-1550547660-d9450f859349", "photo-1568901346375-23c9450c58cd", "photo-1571091718767-18b5b1457add", "photo-1606755962773-d324e0a13086", "photo-1562967914-608f82629710", "amore/products/food/beef-burger", "amore/products/food/cheese-burger", "amore/products/food/chicken-burger"];
const pizzaPhotos = ["photo-1513104890138-7c749659a591", "photo-1571407970349-bc81e7e96d47", "photo-1579751626657-72bc17010498", "amore/products/food/tuna-pizza", "amore/products/food/margarita-pizza"];

const combinationProducts: MenuProduct[] = [
  ...burgerBases.flatMap((base, baseIndex) =>
    burgerFinishes.map((finish, finishIndex) => ({
      id: `burger-${base.id}-${finish.id}`,
      name: `${finish.name} ${base.name} Burger`,
      description: `${base.description}, ${finish.description}.`,
      category: "burgers",
      price: base.price + finish.add,
      image: burgerPhotos[(baseIndex * 3 + finishIndex) % burgerPhotos.length],
      special: finishIndex % 12 === 0,
      plantBased: base.plantBased,
    })),
  ),
  ...pizzaBases.flatMap((base, baseIndex) =>
    pizzaFinishes.map((finish, finishIndex) => ({
      id: `pizza-${base.id}-${finish.id}`,
      name: `${finish.name} ${base.name} Pizza`,
      description: `${base.description}, ${finish.description}.`,
      category: "pizza",
      price: base.price + finish.add,
      image: pizzaPhotos[(baseIndex * 2 + finishIndex) % pizzaPhotos.length],
      special: finishIndex % 12 === 0,
      plantBased: base.plantBased || finish.plantBased,
    })),
  ),
];
const fullCatalog = [...products, ...combinationProducts];

const categories = [
  { id: "home", label: "Home", Icon: Home },
  { id: "all", label: "All dishes", Icon: Utensils },
  { id: "special", label: "Signatures", Icon: Flame },
  { id: "burgers", label: "Burgers", Icon: Utensils },
  { id: "pizza", label: "Pizza", Icon: Pizza },
  { id: "chicken", label: "Chicken", Icon: ChefHat },
  { id: "sandwiches", label: "Sandwiches", Icon: Sandwich },
  { id: "wraps", label: "Wraps", Icon: Sandwich },
  { id: "pasta", label: "Pasta", Icon: Utensils },
  { id: "fasting", label: "Fasting", Icon: Leaf },
  { id: "fish", label: "Fish", Icon: Utensils },
  { id: "ethiopian", label: "Ethiopian", Icon: Flame },
  { id: "salads", label: "Salads", Icon: Leaf },
  { id: "sides", label: "Sides", Icon: Utensils },
  { id: "drinks", label: "Drinks", Icon: Coffee },
  { id: "bakery", label: "Bakery", Icon: CakeSlice },
];

const quickFilters = [
  { id: "all", label: "All dishes" },
  { id: "popular", label: "House picks" },
  { id: "plant", label: "Plant-based" },
  { id: "under-300", label: "Under 300 ETB" },
];
const browseCategories = [
  { id: "burgers", label: "Burgers", image: "photo-1568901346375-23c9450c58cd" },
  { id: "pizza", label: "Pizza", image: "photo-1513104890138-7c749659a591" },
  { id: "chicken", label: "Chicken", image: "photo-1562967914-608f82629710" },
  { id: "ethiopian", label: "Ethiopian", image: "photo-1512058564366-18510be2db19" },
  { id: "drinks", label: "Coffee & drinks", image: "photo-1509042239860-f550ce710b93" },
  { id: "bakery", label: "Bakery", image: "photo-1578985545062-69928b1d9587" },
];
const photoUrl = (id: string, width = 1200) =>
  id.startsWith("https://")
    ? id
    : id.startsWith("amore/")
      ? `https://res.cloudinary.com/dzni6h38z/image/upload/w_${width},q_auto,f_auto,c_limit/${id}`
      : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=90`;

const mediaCards = [
  { platform: "YOUTUBE", title: "The sound of the grill", note: "A little kitchen-side inspiration", image: "photo-1547592166-23ac45744acd" },
  { platform: "TIKTOK", title: "Stacked, sauced, served", note: "Quick bites from the table", image: "photo-1525351484163-7529414344d8" },
  { platform: "YOUTUBE", title: "The last thing on the plate", note: "Coffee, cake, and a slow afternoon", image: "photo-1567620905732-2d1ec7ab7445" },
];

const socialSearch = {
  YOUTUBE: "https://www.youtube.com/results?search_query=Fork+%26+Flame+Addis+Ababa",
  TIKTOK: "https://www.tiktok.com/search?q=Fork%20%26%20Flame%20Addis%20Ababa",
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");
  const [shownCount, setShownCount] = useState(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof fullCatalog)[number] | null>(null);

  const matchingProducts = fullCatalog.filter((product) => {
    const matchesCategory =
      activeCategory === "home" || activeCategory === "all" ||
      (activeCategory === "special" ? product.special : product.category === activeCategory);
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuickFilter =
      quickFilter === "all" ||
      (quickFilter === "popular" && product.special) ||
      (quickFilter === "plant" && product.plantBased) ||
      (quickFilter === "under-300" && product.price < 300);
    return matchesCategory && matchesSearch && matchesQuickFilter;
  });
  const visibleProducts = matchingProducts.slice(0, shownCount);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setQuickFilter("all");
    setShownCount(24);
    setMenuOpen(false);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Fork and Flame home" onClick={() => selectCategory("home")}>
            <span className="brand-seal"><Flame size={22} strokeWidth={1.8} /></span>
            <span className="brand-type">
              <span className="brand-name">FORK <i>&</i> FLAME</span>
              <span className="brand-subtitle">KITCHEN · ADDIS ABABA</span>
            </span>
          </a>
          <div className="header-actions">
            <span className="location-tag"><span /> Addis Ababa</span>
            <button className={`icon-button${searchOpen ? " is-active" : ""}`} type="button" aria-label={searchOpen ? "Close search" : "Search menu"} onClick={() => setSearchOpen((open) => !open)}>
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <button className={`icon-button menu-toggle${menuOpen ? " is-active" : ""}`} type="button" aria-label={menuOpen ? "Close categories" : "Open categories"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={19} /> : <MenuIcon size={19} />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <form className="search-panel" onSubmit={(event) => event.preventDefault()}>
            <Search size={17} aria-hidden="true" />
            <input autoFocus aria-label="Search menu" placeholder="Find something delicious" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            {searchTerm && <button type="button" aria-label="Clear search" onClick={() => setSearchTerm("")}><X size={16} /></button>}
          </form>
        )}
        {menuOpen && (
          <div className="category-menu">
            {categories.map(({ id, label, Icon }) => (
              <button key={id} type="button" onClick={() => selectCategory(id)}><Icon size={17} /> {label} <ChevronRight size={16} /></button>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="page-content">
        <section className="feature-banner" aria-label="Welcome to Fork and Flame">
          <div className="feature-copy">
            <span className="eyebrow"><Sparkles size={13} /> FLAME-GRILLED · ADDIS ABABA</span>
            <p className="feature-kicker">Good food, made over fire</p>
            <h1>Fork <em>&</em><br />Flame.</h1>
            <p className="feature-description">Big, bold plates. Fresh from the grill, stone oven, and our Addis kitchen.</p>
            <a className="feature-link" href="#menu">Explore the menu <ChevronRight size={16} /></a>
          </div>
          <div className="feature-image">
            <Image src={photoUrl("photo-1550547660-d9450f859349", 1800)} alt="Juicy flame-grilled burger with fresh lettuce and melted cheese" fill priority sizes="(max-width: 700px) 100vw, 55vw" />
            <div className="feature-float feature-float-pizza"><Image src={photoUrl("photo-1513104890138-7c749659a591", 480)} alt="Freshly baked pizza" fill sizes="140px" /></div>
            <div className="feature-float feature-float-coffee"><Image src={photoUrl("photo-1461023058943-07fcbe16d735", 360)} alt="Iced coffee" fill sizes="100px" /></div>
            <div className="feature-float feature-float-fries"><Image src={photoUrl("photo-1573080496219-bb080dd4f877", 360)} alt="Golden fries" fill sizes="100px" /></div>
            <span className="feature-stamp"><span>FRESH</span><strong>Off the<br />flame</strong></span>
          </div>
          <div className="feature-index"><span>01</span><i /> THE HOUSE FAVORITES</div>
        </section>

        <section className="popular-section" aria-labelledby="popular-heading">
          <div className="popular-heading">
            <div>
              <span className="section-kicker">HANDCRAFTED PLATES & SIPS</span>
              <h2 id="popular-heading">Popular picks</h2>
            </div>
            <button type="button" onClick={() => selectCategory("all")}>View full menu <ArrowUpRight size={15} /></button>
          </div>
          <div className="popular-grid">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <article className="product-card popular-card" key={product.id} style={{ "--card-index": index } as CSSProperties}>
                <div className="product-image-wrap">
                  <Image src={photoUrl(product.image, 900)} alt={product.name} fill sizes="(max-width: 640px) 250px, 270px" />
                  <span className="product-badge">{product.special ? "HOUSE PICK" : "POPULAR"}</span>
                </div>
                <div className="product-copy">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer"><strong>{product.price} <span>ETB</span></strong><span className="details-label">{categories.find((category) => category.id === product.category)?.label}</span></div>
                  <button className="details-button" type="button" onClick={() => setSelectedProduct(product)}>View dish details <ChevronRight size={15} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-section" id="menu" aria-labelledby="menu-heading">
          <div className="section-heading">
            <div>
              <p className="section-kicker">GOOD THINGS, FRESH OFF THE FIRE</p>
              <h2 id="menu-heading">{activeCategory === "all" || activeCategory === "home" ? "The full menu" : activeCategory === "special" ? "House signatures" : categories.find((category) => category.id === activeCategory)?.label ?? "Our menu"}</h2>
              <p className="section-description">A little smoky, a little spicy, always made fresh.</p>
            </div>
            <span className="item-count"><strong>{matchingProducts.length}</strong> <span>dishes</span></span>
          </div>

          <div className="category-showcase" aria-label="Browse menu categories">
            {browseCategories.map((category) => (
              <button className="category-tile" key={category.id} type="button" onClick={() => selectCategory(category.id)}>
                <Image src={photoUrl(category.image, 420)} alt="" fill sizes="(max-width: 640px) 92px, 170px" />
                <span>{category.label}<ChevronRight size={14} /></span>
              </button>
            ))}
          </div>

          <div className="category-chips" aria-label="Menu categories">
            {categories.slice(3).map(({ id, label }) => (
              <button className={activeCategory === id ? "selected" : ""} key={id} type="button" aria-pressed={activeCategory === id} onClick={() => selectCategory(id)}>{label}</button>
            ))}
          </div>

          <div className="quick-filters" aria-label="Quick menu filters">
            {quickFilters.map((filter) => (
              <button className={quickFilter === filter.id ? "selected" : ""} key={filter.id} type="button" aria-pressed={quickFilter === filter.id} onClick={() => { setQuickFilter(filter.id); setShownCount(24); }}>{filter.label}</button>
            ))}
            <label className="menu-search"><Search size={15} /><input aria-label="Search dishes" placeholder="Search the menu" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></label>
          </div>

          {visibleProducts.length > 0 ? (
            <>
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <article className="product-card" key={product.id} style={{ "--card-index": index } as CSSProperties}>
                  <div className="product-image-wrap">
                    <Image src={photoUrl(product.image)} alt={product.name} fill sizes="(max-width: 540px) 46vw, (max-width: 900px) 30vw, 360px" />
                    {product.special && <span className="product-badge"><Flame size={12} /> HOUSE PICK</span>}
                  </div>
                  <div className="product-copy">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <strong>{product.price} <span>ETB</span></strong>
                      <span className="details-label">{categories.find((category) => category.id === product.category)?.label}</span>
                    </div>
                    <button className="details-button" type="button" onClick={() => setSelectedProduct(product)}>View dish details <ChevronRight size={15} /></button>
                  </div>
                </article>
              ))}
            </div>
            {visibleProducts.length < matchingProducts.length && (
              <button className="load-more" type="button" onClick={() => setShownCount((count) => count + 24)}>
                Show more dishes <span>{visibleProducts.length} of {matchingProducts.length}</span>
              </button>
            )}
            </>
          ) : (
            <div className="empty-state">
              <span><Utensils size={22} /></span>
              <h3>No dishes found</h3>
              <p>Try another search or choose a different category.</p>
              <button type="button" onClick={() => { setSearchTerm(""); setQuickFilter("all"); setActiveCategory("all"); }}>Show all dishes</button>
            </div>
          )}
        </section>

        <section className="offer-band" aria-labelledby="offer-heading">
          <div className="offer-copy">
            <span className="offer-kicker"><Sparkles size={14} /> THE FLAME SET · DINE-IN</span>
            <h2 id="offer-heading">A little more<br /><em>for the table.</em></h2>
            <p>House burger, golden fries, and an Addis macchiato. One good reason to stay a while.</p>
            <div className="offer-price"><strong>620 <small>ETB</small></strong><del>730 ETB</del><span>15% OFF</span></div>
            <a className="offer-link" href="#menu">Explore the menu <ArrowUpRight size={16} /></a>
            <p className="offer-disclaimer">Sample offer and pricing; confirm availability before publishing.</p>
          </div>
          <div className="offer-art" aria-label="Burger, fries, and coffee set">
            <Image src={photoUrl("photo-1550547660-d9450f859349", 1100)} alt="House burger" fill sizes="(max-width: 640px) 100vw, 55vw" />
            <span className="offer-art-label">BURGER<br />+ FRIES<br />+ MACCHIATO</span>
            <span className="offer-sticker"><strong>15%</strong><span>OFF</span></span>
          </div>
        </section>

        <section className="experience-section" id="experience" aria-labelledby="experience-heading">
          <div className="experience-visual">
            <Image src={photoUrl("photo-1512621776951-a57141f2eefd", 1200)} alt="A fresh market-style plate with greens and seasonal vegetables" fill sizes="(max-width: 700px) 100vw, 50vw" />
            <span className="experience-caption">THE GOOD PART IS TAKING YOUR TIME</span>
          </div>
          <div className="experience-copy">
            <span className="section-kicker">THE FORK & FLAME EXPERIENCE</span>
            <h2 id="experience-heading">Small details.<br /><em>Big appetite.</em></h2>
            <p>Come for the fire, stay for the table. We bring Addis coffee, market-fresh ingredients, and generous plates together in a room made for one more bite.</p>
            <div className="experience-points">
              <div><span>01</span><strong>Market fresh</strong><p>Seasonal ingredients, prepped in small batches.</p></div>
              <div><span>02</span><strong>Finished over fire</strong><p>Smoky edges, warm plates, made to order in our kitchen.</p></div>
              <div><span>03</span><strong>Stay for coffee</strong><p>Locally loved coffee and something sweet to finish.</p></div>
            </div>
          </div>
        </section>

        <section className="social-section" id="stories" aria-labelledby="social-heading">
          <div className="social-heading">
            <div>
              <span className="section-kicker">A LITTLE FOOD SCENE</span>
              <h2 id="social-heading">Around the table.</h2>
              <p>Kitchen moments, first bites, and the dishes worth sending to a friend.</p>
            </div>
            <div className="social-links">
              <a href={socialSearch.YOUTUBE} target="_blank" rel="noreferrer"><Play size={15} fill="currentColor" /> YouTube <ArrowUpRight size={14} /></a>
              <a href={socialSearch.TIKTOK} target="_blank" rel="noreferrer"><span className="tiktok-glyph">♪</span> TikTok <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className="media-grid">
            {mediaCards.map((card) => (
              <a className="media-card" key={card.title} href={socialSearch[card.platform as keyof typeof socialSearch]} target="_blank" rel="noreferrer">
                <div className="media-image">
                  <Image src={photoUrl(card.image, 850)} alt="" fill sizes="(max-width: 640px) 90vw, 360px" />
                  <span className="media-platform">{card.platform === "YOUTUBE" ? <Play size={12} fill="currentColor" /> : <span className="tiktok-glyph">♪</span>}{card.platform}</span>
                  <span className="media-play"><Play size={18} fill="currentColor" /></span>
                </div>
                <div className="media-copy"><div><h3>{card.title}</h3><p>{card.note}</p></div><ArrowUpRight size={17} /></div>
              </a>
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <a className="brand" href="#top" aria-label="Fork and Flame, back to top">
                <span className="brand-seal"><Flame size={20} /></span>
                <span className="brand-type"><span className="brand-name">FORK <i>&</i> FLAME</span><span className="brand-subtitle">KITCHEN · ADDIS ABABA</span></span>
              </a>
              <p>Good food, made over fire. Gather around in Addis Ababa.</p>
            </div>
            <div className="footer-column"><span>EXPLORE</span><a href="#menu">Full menu</a><a href="#experience">Our experience</a><a href="#stories">Food stories</a></div>
            <div className="footer-column"><span>FOLLOW THE FLAME</span><a href={socialSearch.YOUTUBE} target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={13} /></a><a href={socialSearch.TIKTOK} target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={13} /></a></div>
            <div className="footer-column"><span>FIND US</span><p>Addis Ababa<br />Ethiopia</p><span className="footer-hours">Menu for browsing · No online ordering</span></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Fork & Flame</span><a href="#top">Back to top ↑</a></div>
        </footer>
      </main>

      {selectedProduct && (
        <div className="detail-scrim" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(event) => event.stopPropagation()}>
            <button className="detail-close" type="button" aria-label="Close dish details" onClick={() => setSelectedProduct(null)}><X size={20} /></button>
            <div className="detail-photo"><Image src={photoUrl(selectedProduct.image, 1000)} alt={selectedProduct.name} fill sizes="(max-width: 640px) 100vw, 520px" /></div>
            <div className="detail-copy">
              <span className="detail-eyebrow">{categories.find((category) => category.id === selectedProduct.category)?.label} · ADDIS ABABA</span>
              <h2 id="detail-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <div className="detail-notes"><span><Flame size={15} /> Freshly prepared</span>{selectedProduct.plantBased && <span><Leaf size={15} /> Plant-based</span>}</div>
              <strong className="detail-price">{selectedProduct.price} <span>ETB</span></strong>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}