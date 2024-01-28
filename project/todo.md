## ADMIN

1. na diagrafonte kai ta bookings otan diagrafete user
2. logout ston admin


## OWNER

1. na xwrisoume keepers home / owners home  (done)
2. (isws) na ftiaksoume to UI sto keepers home (done)
3. petid
4. onomata sta tables

## KEEPER
1. bookings accept/reject (done)
2. see bookings (done)
4. messages
5. reviews
6. messages

front owner booking 2 keeper

login := app.Group("/login")
	login.Post("/", server.handler.Login)

	login.Post("/admin", server.handler.LoginAdmin)

	users := app.Group("/users")

	admin := users.Group("/admin")
	admin.Get("/", server.handler.GetAdmin)
	admin.Get("/petsNumber", server.handler.GetNumberOfCatsAndDogs)
	admin.Get("/money", server.handler.GetMoney)
	admin.Get("/usersNumber", server.handler.GetNumberOfUsers)

	owners := users.Group("/owners")
	owners.Get("/", server.handler.GetOwners)
	owners.Post("/", server.handler.RegisterOwner)
	owners.Put("/:id", server.handler.UpdateOwner)
	owners.Get("/:id", server.handler.GetOwner)
	owners.Delete("/:id", server.handler.DeleteOwner)
	owners.Get("/:id/findKeepers", server.handler.AvailableKeepers)
	owners.Get("/:id/orderKeepers", server.handler.OrderClosestKeepers)
	owners.Get("/:id/bookings", server.handler.GetBookingsByOwner)

	keepers := users.Group("/keepers")
	keepers.Get("/", server.handler.GetKeepers)
	keepers.Post("/", server.handler.RegisterKeeper)
	keepers.Put("/:id", server.handler.UpdateKeeper)
	keepers.Get("/:id", server.handler.GetKeeper)
	keepers.Delete("/:id", server.handler.DeleteKeeper)
	keepers.Get("/:id/bookings", server.handler.GetBookingsByKeeperId)

	pets := app.Group("/pets")
	pets.Get("/", server.handler.GetPets)
	pets.Post("/", server.handler.RegisterPet)
	pets.Put("/:id", server.handler.UpdatePet)
	pets.Get("/:id", server.handler.GetPet)
	pets.Get("/:type/:breed", server.handler.GetPetsByTypeAndBreed)
	pets.Get("/:type/", server.handler.GetNumberOfCats)
	pets.Get("/:type/", server.handler.GetNumberOfDogs)

	bookings := app.Group("/bookings")
	bookings.Get("/", server.handler.GetBookings)

	bookings.Post("/", server.handler.CreateBooking)
    endpoint used for creating bookings


	bookings.Put("/:id", server.handler.UpdateBooking)
    endpoint used for updating bookings


	bookings.Get("/:id", server.handler.GetBooking)
    endpoint used for getting bookings

	bookings.Delete("/:id", server.handler.DeleteBooking)
    endpoint used for deleting bookings

	reviews := app.Group("/reviews")


	reviews.Post("/", server.handler.CreateReview)
    endpoint used for creating reviews

	reviews.Get("/:id", server.handler.GetReviewsByKeeper)
    endpoint used for getting reviews
