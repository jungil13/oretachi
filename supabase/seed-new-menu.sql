-- Optional: Clear existing menu items
-- DELETE FROM menu_items;

INSERT INTO menu_items (name, description, price, image_url, category, spice_level, featured) VALUES
-- CURRY RICE
('PORK CUTLET CURRY', 'ポークカツカレー', 0, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', 'CURRY RICE', 1, true),
('PLAIN CURRY', 'プレーンカレー', 0, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'CURRY RICE', 1, false),
('FRIED SHRIMP CURRY', 'エビフライカレー', 0, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', 'CURRY RICE', 1, false),
('SWEET AND SPICY BEEF CURRY', '甘辛いビーフカレー', 0, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', 'CURRY RICE', 2, false),
('CHICKEN CUTLET CURRY', 'チキンカツカレー', 0, 'https://images.unsplash.com/photo-1588166524941-3bf61a837559?w=800&q=80', 'CURRY RICE', 1, false),
('STEWED CHICKEN CURRY', '鶏肉の煮込みカレー', 0, 'https://images.unsplash.com/photo-1588166524941-3bf61a837559?w=800&q=80', 'CURRY RICE', 1, false),
('KYOTO GREEN ONION CURRY', '京都風青ネギカレー', 0, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'CURRY RICE', 1, false),
('BRAISED BEEF TENDON CURRY', '牛すじの煮込みカレー', 0, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', 'CURRY RICE', 2, false),
('EGGPLANT CURRY', 'ナスカレー', 0, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'CURRY RICE', 1, false),
('GRILLED CHEESE CURRY', 'グリルドチーズ カレー', 0, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', 'CURRY RICE', 1, false),
('SAUSAGE CURRY', 'ソーセージカレー', 0, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'CURRY RICE', 1, false),

-- RAMEN
('Shrimp Miso Curry Ramen', 'シュリモ味噌カレーラーメン', 0, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', 'RAMEN', 1, false),
('Chicken Cutlet Ramen', 'チキンカツ、半熟卵 ネギ、桜エビラーメン (Soft-boiled Egg, Green Onion, Sakura Shrimp)', 0, 'https://images.unsplash.com/photo-1588166524941-3bf61a837559?w=800&q=80', 'RAMEN', 1, false),
('Pork Cutlet Ramen', '豚カツ、半熟卵 ネギ、桜エビラーメン (Soft-boiled Egg, Green Onion, Sakura Shrimp)', 0, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', 'RAMEN', 1, false),

-- KIDS MENU
('KIDS SET 1', 'Rice 150g, Chicken karaage 110g, Fries 70g, Curry sauce', 0, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'KIDS MENU', 0, false),
('KIDS SET 2', 'Rice 150g, Minchi-katsu topped with curry sauce 110g, Fries 70g, Curry sauce', 0, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', 'KIDS MENU', 0, false),
('KIDS SET 3', 'Rice 150g, Arabiki sausage 2pcs, Fries 70g, Curry sauce', 0, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'KIDS MENU', 0, false),

-- TOPPINGS
('FRIED SHRIMP (Topping)', 'エビフライ', 100, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', 'TOPPINGS', 0, false),
('PORK CUTLET (Topping)', '豚カツ', 100, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', 'TOPPINGS', 0, false),
('CHICKEN CUTLET (Topping)', 'チキンカツ', 100, 'https://images.unsplash.com/photo-1588166524941-3bf61a837559?w=800&q=80', 'TOPPINGS', 0, false),
('SAUSAGE (Topping)', 'ソーセージ', 100, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'TOPPINGS', 0, false),
('EGGPLANT CURRY (Topping)', 'ナスカレー', 100, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'TOPPINGS', 0, false),
('GRILLED CHEESE (Topping)', 'グリルドチーズ', 100, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', 'TOPPINGS', 0, false),
('SOFT-BOILED EGG (Topping)', '半熟卵', 100, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80', 'TOPPINGS', 0, false),

-- DRINKS (Coffee)
('Brewed Coffee', 'COFFEE', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Americano', 'COFFEE', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Latte', 'COFFEE', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Spanish Latte', 'COFFEE', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Flat white', 'COFFEE', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),

-- DRINKS (Signature)
('Osaka Cream Cloud', 'AKA SIGNATURE DRINK', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, true),

-- DRINKS (Matcha)
('Matcha latte', 'MATCHA', 100, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', 'DRINKS', 0, false),
('Seasalt foam matcha', 'MATCHA', 100, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', 'DRINKS', 0, false),
('Earl grey matcha', 'MATCHA', 100, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', 'DRINKS', 0, false),

-- DRINKS (Non Coffee)
('Iced/hot chocolate', 'NON COFFEE', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),

-- DRINKS (Tea)
('Chamomile Tea', 'TEA (Twinnings)', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Earl grey Tea', 'TEA (Twinnings)', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Peach Tea', 'TEA (Twinnings)', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Lemon & Ginger Tea', 'TEA (Twinnings)', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Pure Green Tea', 'TEA (Twinnings)', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false),
('Peppermint Tea', 'TEA (Twinnings)', 100, 'https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80', 'DRINKS', 0, false);
