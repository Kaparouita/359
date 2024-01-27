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
	AvailableKeepers(id int) ([]domain.Keeper, error)
	OrderClosestKeepers(owner *domain.Owner, orderBy string) ([]domain.Keeper, error)

	RegisterKeeper(user *domain.Keeper) *domain.Keeper
	GetKeepers() ([]domain.Keeper, error)
	UpdateKeeper(keeper *domain.Keeper) *domain.Keeper
	GetKeeper(keeper *domain.Keeper) *domain.Keeper
	DeleteKeeper(keeper *domain.Keeper) *domain.Response

	SavePet(pet *domain.Pet) *domain.Pet
	GetPets() ([]domain.Pet, error)
	UpdatePet(pet *domain.Pet) *domain.Pet
	GetPet(pet *domain.Pet) *domain.Pet
	DeletePet(pet *domain.Pet) *domain.Response
	GetPetsByTypeAndBreed(pagin *domain.PetTypeBreedPagination) ([]domain.Pet, error)
	UpdatePetWeight(pet *domain.Pet) *domain.Pet
	GetNumberOfCats() (int, error)
	GetNumberOfDogs() (int, error)

	GetBooking(booking *domain.Booking) *domain.Booking
	CreateBooking(booking *domain.Booking) *domain.Booking
	UpdateBooking(booking *domain.Booking) *domain.Booking
	GetBookings() ([]domain.Booking, error)
	DeleteBooking(booking *domain.Booking) *domain.Response
	GetBookingsByOwner(owner *domain.Owner) ([]domain.Booking, error)

	GetAdmin(admin *domain.Admin) *domain.Admin
	GetMoney() ([]int, error)

	Login(cred *domain.LoginResp) *domain.LoginResp
	LoginAdmin(cred *domain.LoginResp) *domain.LoginResp
}

type Db interface {
	SaveOwner(owner *domain.Owner) error
	GetOwners() ([]domain.Owner, error)
	UpdateOwner(owner *domain.Owner) error
	GetOwner(owner *domain.Owner) error
	DeleteOwner(owner *domain.Owner) error
	AvailableKeepers(petsType []string) ([]domain.Keeper, error)

	SaveKeeper(keeper *domain.Keeper) error
	GetKeepers() ([]domain.Keeper, error)
	UpdateKeeper(keeper *domain.Keeper) error
	GetKeeper(keeper *domain.Keeper) error
	DeleteKeeper(keeper *domain.Keeper) error

	SavePet(pet *domain.Pet) error
	GetPets() ([]domain.Pet, error)
	UpdatePet(pet *domain.Pet) error
	GetPet(pet *domain.Pet) error
	DeletePet(pet *domain.Pet) error
	GetPetsByTypeAndBreed(pagin *domain.PetTypeBreedPagination) ([]domain.Pet, error)
	UpdatePetWeight(pet *domain.Pet) error
	GetNumberOfCats() (int, error)
	GetNumberOfDogs() (int, error)

	SaveBooking(booking *domain.Booking) error
	GetBooking(booking *domain.Booking) error
	UpdateBooking(booking *domain.Booking) error
	GetBookings() ([]domain.Booking, error)
	DeleteBooking(booking *domain.Booking) error
	GetBookingsByOwner(owner *domain.Owner) ([]domain.Booking, error)

	Login(cred *domain.LoginResp) error
	LoginAdmin(cred *domain.LoginResp) error

	GetAdmin(admin *domain.Admin) error
	SaveAdmin(admin *domain.Admin) error
}

type Handler interface {
	RegisterOwner(c *fiber.Ctx) error
	UpdateOwner(c *fiber.Ctx) error
	GetOwner(c *fiber.Ctx) error
	GetOwners(c *fiber.Ctx) error
	DeleteOwner(c *fiber.Ctx) error
	AvailableKeepers(c *fiber.Ctx) error
	OrderClosestKeepers(c *fiber.Ctx) error

	RegisterKeeper(c *fiber.Ctx) error
	UpdateKeeper(c *fiber.Ctx) error
	GetKeeper(c *fiber.Ctx) error
	GetKeepers(c *fiber.Ctx) error
	DeleteKeeper(c *fiber.Ctx) error

	RegisterPet(c *fiber.Ctx) error
	UpdatePet(c *fiber.Ctx) error
	GetPet(c *fiber.Ctx) error
	GetPets(c *fiber.Ctx) error
	DeletePet(c *fiber.Ctx) error
	GetPetsByTypeAndBreed(c *fiber.Ctx) error
	UpdatePetWeight(c *fiber.Ctx) error
	GetNumberOfCats(c *fiber.Ctx) error
	GetNumberOfDogs(c *fiber.Ctx) error

	CreateBooking(c *fiber.Ctx) error
	UpdateBooking(c *fiber.Ctx) error
	GetBooking(c *fiber.Ctx) error
	GetBookings(c *fiber.Ctx) error
	DeleteBooking(c *fiber.Ctx) error
	GetBookingsByOwner(c *fiber.Ctx) error

	GetAdmin(c *fiber.Ctx) error
	GetNumberOfCatsAndDogs(c *fiber.Ctx) error
	GetMoney(c *fiber.Ctx) error
	GetNumberOfUsers(c *fiber.Ctx) error

	Login(c *fiber.Ctx) error
	LoginAdmin(c *fiber.Ctx) error
}
