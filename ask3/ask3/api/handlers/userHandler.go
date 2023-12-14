package handlers

import (
	"359/domain"
	"359/ports"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

type Handler struct {
	Srv ports.Service
}

func NewHandler(srv ports.Service) *Handler {
	return &Handler{
		Srv: srv,
	}
}

func (handler *Handler) RegisterOwner(c *fiber.Ctx) error {
	user := &domain.Owner{}
	err := json.Unmarshal(c.Body(), &user)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON("Unable to register user")
	}

	resp := handler.Srv.RegisterOwner(user)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.SendStatus(resp.StatusCode)
}

func (handler *Handler) UpdateOwner(c *fiber.Ctx) error {
	user := &domain.Owner{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err = json.Unmarshal(c.Body(), &user)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.UpdateOwner(user)
	if resp.StatusCode != 201 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) GetOwner(c *fiber.Ctx) error {
	user := &domain.Owner{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.GetOwner(user)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) GetOwners(c *fiber.Ctx) error {
	users, err := handler.Srv.GetOwners()
	if err != nil {
		return c.Status(404).JSON("Unable to retrieve Users")
	}

	return c.Status(200).JSON(users)
}

func (handler *Handler) DeleteOwner(c *fiber.Ctx) error {
	user := &domain.Owner{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.DeleteOwner(user)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp.Message)
}

func (handler *Handler) RegisterKeeper(c *fiber.Ctx) error {
	user := &domain.Keeper{}
	err := json.Unmarshal(c.Body(), &user)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	resp := handler.Srv.RegisterKeeper(user)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.SendStatus(resp.StatusCode)
}

func (handler *Handler) UpdateKeeper(c *fiber.Ctx) error {
	user := &domain.Keeper{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err = json.Unmarshal(c.Body(), &user)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.UpdateKeeper(user)
	if resp.StatusCode != 201 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) GetKeeper(c *fiber.Ctx) error {
	user := &domain.Keeper{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.GetKeeper(user)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) GetKeepers(c *fiber.Ctx) error {
	users, err := handler.Srv.GetKeepers()
	if err != nil {
		return c.Status(404).JSON("Unable to retrieve Users")
	}

	return c.Status(200).JSON(users)
}

func (handler *Handler) DeleteKeeper(c *fiber.Ctx) error {
	user := &domain.Keeper{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.DeleteKeeper(user)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp.Message)
}

func (handler *Handler) Login(c *fiber.Ctx) error {
	cred := &domain.LoginResp{}
	err := json.Unmarshal(c.Body(), &cred)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	resp := handler.Srv.Login(cred)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}
