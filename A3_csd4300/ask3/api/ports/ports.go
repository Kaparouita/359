package ports

import (
	"359/domain"

	"github.com/gofiber/fiber/v2"
)

type Service interface {
	InitFunction() error

	RegisterOwner(user *domain.Owner) *domain.Owner
	GetOwners() ([]domain.Owner, error)
	UpdateOwner(owner *domain.Owner) *domain.Owner
	GetOwner(owner *domain.Owner) *domain.Owner
	DeleteOwner(owner *domain.Owner) *domain.Response

	RegisterKeeper(user *domain.Keeper) *domain.Keeper
	GetKeepers() ([]domain.Keeper, error)
	UpdateKeeper(keeper *domain.Keeper) *domain.Keeper
	GetKeeper(keeper *domain.Keeper) *domain.Keeper
	DeleteKeeper(keeper *domain.Keeper) *domain.Response

<<<<<<< HEAD
	SavePet(pet *domain.Pet) *domain.Pet
	GetPets() ([]domain.Pet, error)
	UpdatePet(pet *domain.Pet) *domain.Pet
	GetPet(pet *domain.Pet) *domain.Pet
	DeletePet(pet *domain.Pet) *domain.Response
	GetPetsByTypeAndBreed(pagin *domain.PetTypeBreedPagination) ([]domain.Pet, error)
	UpdatePetWeight(pet *domain.Pet) *domain.Pet

=======
>>>>>>> main
	Login(cred *domain.LoginResp) *domain.LoginResp
}

type Db interface {
	SaveOwner(owner *domain.Owner) error
	GetOwners() ([]domain.Owner, error)
	UpdateOwner(owner *domain.Owner) error
	GetOwner(owner *domain.Owner) error
	DeleteOwner(owner *domain.Owner) error

	SaveKeeper(keeper *domain.Keeper) error
	GetKeepers() ([]domain.Keeper, error)
	UpdateKeeper(keeper *domain.Keeper) error
	GetKeeper(keeper *domain.Keeper) error
	DeleteKeeper(keeper *domain.Keeper) error

<<<<<<< HEAD
	SavePet(pet *domain.Pet) error
	GetPets() ([]domain.Pet, error)
	UpdatePet(pet *domain.Pet) error
	GetPet(pet *domain.Pet) error
	DeletePet(pet *domain.Pet) error
	GetPetsByTypeAndBreed(pagin *domain.PetTypeBreedPagination) ([]domain.Pet, error)
	UpdatePetWeight(pet *domain.Pet) error

=======
>>>>>>> main
	Login(cred *domain.LoginResp) error
}

type Handler interface {
	RegisterOwner(c *fiber.Ctx) error
	UpdateOwner(c *fiber.Ctx) error
	GetOwner(c *fiber.Ctx) error
	GetOwners(c *fiber.Ctx) error
	DeleteOwner(c *fiber.Ctx) error

	RegisterKeeper(c *fiber.Ctx) error
	UpdateKeeper(c *fiber.Ctx) error
	GetKeeper(c *fiber.Ctx) error
	GetKeepers(c *fiber.Ctx) error
	DeleteKeeper(c *fiber.Ctx) error
<<<<<<< HEAD

	RegisterPet(c *fiber.Ctx) error
	UpdatePet(c *fiber.Ctx) error
	GetPet(c *fiber.Ctx) error
	GetPets(c *fiber.Ctx) error
	DeletePet(c *fiber.Ctx) error
	GetPetsByTypeAndBreed(c *fiber.Ctx) error
	UpdatePetWeight(c *fiber.Ctx) error
=======
>>>>>>> main

	Login(c *fiber.Ctx) error
}
