package server

import (
	"359/ports"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Server struct {
	handler ports.Handler
}

func NewService(handler ports.Handler) *Server {
	return &Server{handler: handler}
}

func (server *Server) Initialize() {
	app := fiber.New()
	app.Use(cors.New())

	login := app.Group("/login")
	login.Post("/", server.handler.Login)

	login.Post("/admin", server.handler.LoginAdmin)

	users := app.Group("/users")

	admin := users.Group("/admin")
	admin.Get("/", server.handler.GetAdmin)



	owners := users.Group("/owners")
	owners.Get("/", server.handler.GetOwners)
	owners.Post("/", server.handler.RegisterOwner)
	owners.Put("/:id", server.handler.UpdateOwner)
	owners.Get("/:id", server.handler.GetOwner)
	owners.Delete("/:id", server.handler.DeleteOwner)

	keepers := users.Group("/keepers")
	keepers.Get("/", server.handler.GetKeepers)
	keepers.Post("/", server.handler.RegisterKeeper)
	keepers.Put("/:id", server.handler.UpdateKeeper)
	keepers.Get("/:id", server.handler.GetKeeper)
	keepers.Delete("/:id", server.handler.DeleteKeeper)

	pets := app.Group("/pets")
	pets.Get("/", server.handler.GetPets)
	pets.Post("/", server.handler.RegisterPet)
	pets.Put("/:id", server.handler.UpdatePet)
	pets.Get("/:id", server.handler.GetPet)
	pets.Get("/:type/:breed", server.handler.GetPetsByTypeAndBreed)
	pets.Get("/:type/", server.handler.GetNumberOfCats)
	pets.Get("/:type/", server.handler.GetNumberOfDogs)




	app.Delete("petDeletion/:pet_id", server.handler.DeletePet)
	app.Put("petWeight/:pet_id/:weight", server.handler.UpdatePetWeight)

	

	log.Fatal(app.Listen(":3000"))
}

