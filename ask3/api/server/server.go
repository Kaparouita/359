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

	//TODO:
	//admin := app.Group("/admin")
	//libraryAdmin := app.Group("/libraryAdmin")

	login := app.Group("/login")
	login.Post("/", server.handler.Login)

	users := app.Group("/users")
	users.Get("/", server.handler.GetUsers)
	users.Get("/perType", server.handler.GetUsersPerType)
	users.Post("/", server.handler.Register)
	users.Put("/:id", server.handler.UpdateUser)
	users.Get("/:id", server.handler.GetUser)
	users.Delete("/:id", server.handler.DeleteUser)

	log.Fatal(app.Listen(":3000"))
}
