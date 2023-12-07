package ports

import (
	"359/domain"

	"github.com/gofiber/fiber/v2"
)

type Service interface {
	InitFunction() error

	Register(user *domain.User) *domain.User
	GetUsers() ([]domain.User, error)
	UpdateUser(user *domain.User) *domain.User
	GetUser(user *domain.User) *domain.User
	DeleteUser(user *domain.User) *domain.Response
	GetUserPerType(group string) ([]domain.UserPerType, *domain.Response)

	Login(login *domain.LoginResp) *domain.User
}

type Db interface {
	SaveUser(user *domain.User) error
	GetUsers() ([]domain.User, error)
	UpdateUser(user *domain.User) error
	GetUser(user *domain.User) error
	DeleteUser(user *domain.User) error
	GetUserPerUserType(groupField string) ([]domain.UserPerType, error)

	Login(login *domain.LoginResp) (*domain.User, error)
}

type Handler interface {
	Register(c *fiber.Ctx) error
	UpdateUser(c *fiber.Ctx) error
	GetUser(c *fiber.Ctx) error
	GetUsers(c *fiber.Ctx) error
	DeleteUser(c *fiber.Ctx) error
	GetUsersPerType(c *fiber.Ctx) error

	Login(c *fiber.Ctx) error
}
