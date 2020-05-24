# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

province1 = Province.where(name: 'Pichincha').first_or_create!
province2 = Province.where(name: 'Esmeraldas').first_or_create!
province3 = Province.where(name: 'Imbabura').first_or_create!
province4 = Province.where(name: 'Carchi').first_or_create!
province5 = Province.where(name: 'Sucumbios').first_or_create!

quito = City.where(province: province1, name: 'Quito').first_or_create!
machachi = City.where(province: province1, name: 'Machachi').first_or_create!
chillos = City.where(province: province1, name: 'Los Chillos').first_or_create!
cumbaya = City.where(province: province1, name: 'Cumbaya').first_or_create!

atacames = City.where(province: province2, name: 'Atacames').first_or_create!
rioverde = City.where(province: province2, name: 'Rioverde').first_or_create!
valdez = City.where(province: province2, name: 'Valdez').first_or_create!

ibarra = City.where(province: province3, name: 'Ibarra').first_or_create!
otavalo = City.where(province: province3, name: 'Otavalo').first_or_create!
cotacachi = City.where(province: province3, name: 'Cotacachi').first_or_create!
atuntaqui = City.where(province: province3, name: 'Atuntaqui').first_or_create!

tulcan = City.where(province: province4, name: 'Tulcan').first_or_create!
angel = City.where(province: province4, name: 'El Ángel').first_or_create!
sangabriel = City.where(province: province4, name: 'San Gabriel').first_or_create!

cascales = City.where(province: province5, name: 'Cascales').first_or_create!
labonita = City.where(province: province5, name: 'La Bonita').first_or_create!
lumbaqui = City.where(province: province5, name: 'Lumbaqui').first_or_create!


Neighbourhood.where(name: 'Chillogallo', city: quito).first_or_create!
Neighbourhood.where(name:'Itchimbia', city: quito).first_or_create!
Neighbourhood.where(name: 'El Inca', city: quito).first_or_create!
Neighbourhood.where(name: 'El salvador', city: machachi).first_or_create!
Neighbourhood.where(name:'La loma', city: machachi).first_or_create!
Neighbourhood.where(name: 'Biloxi', city: chillos).first_or_create!
Neighbourhood.where(name:'Paseosan', city: chillos).first_or_create!
Neighbourhood.where(name:'Sanbron', city: cumbaya).first_or_create!
Neighbourhood.where(name:'Localida', city: cumbaya).first_or_create!

Neighbourhood.where(name: 'La salle', city: atacames).first_or_create!
Neighbourhood.where(name: 'Ayutiquu', city: atacames).first_or_create!
Neighbourhood.where(name: 'La long', city: rioverde).first_or_create!
Neighbourhood.where(name: 'El salva', city: rioverde).first_or_create!
Neighbourhood.where(name: 'La lora', city: rioverde).first_or_create!
Neighbourhood.where(name: 'Eternos', city: valdez).first_or_create!
Neighbourhood.where(name: 'Eternidad', city: valdez).first_or_create!
Neighbourhood.where(name: 'El viento', city: valdez).first_or_create

Neighbourhood.where(name: 'Away', city: ibarra).first_or_create!
Neighbourhood.where(name: 'Saltru', city: ibarra).first_or_create!
Neighbourhood.where(name: 'El Camino', city: otavalo).first_or_create!
Neighbourhood.where(name: 'Care', city: otavalo).first_or_create!
Neighbourhood.where(name: 'Azul', city: cotacachi).first_or_create!
Neighbourhood.where(name: 'Escondido', city: cotacachi).first_or_create!
Neighbourhood.where(name: 'Cielo', city: atuntaqui).first_or_create!
Neighbourhood.where(name: 'La Lento', city: atuntaqui).first_or_create

Neighbourhood.where(name: 'De Frente', city: cascales).first_or_create!
Neighbourhood.where(name: 'Cosa', city: cascales).first_or_create!
Neighbourhood.where(name: 'Vigorosa', city: labonita).first_or_create!
Neighbourhood.where(name: 'Dejame', city: labonita).first_or_create!
Neighbourhood.where(name: 'Quererte', city: lumbaqui).first_or_create!
Neighbourhood.where(name: 'Fallo', city: lumbaqui).first_or_create!
