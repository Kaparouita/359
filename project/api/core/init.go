package core

import (
	"359/domain"
	"359/ports"
)

type Service struct {
	db ports.Db
}

func NewService(db ports.Db) *Service {
	return &Service{db: db}
}

func (srv *Service) InitFunction() error {

	if err := srv.InitUsers(); err != nil {
		return err
	}
	return nil
}

func (srv *Service) InitUsers() error {
	user1 := &domain.Owner{
		Id:       1,
		Username: "user1",
		Email:    "user1@example.com",
	}

	user2 := &domain.Keeper{
		Id:       2,
		Username: "user2",
		Email:    "user2@example.com",
	}
	
	user3 := &domain.Admin{
		Id:       3,
		Username: "user3",
	}
	

	// Save user1 and user2 to the database using srv.db
	err := srv.db.SaveOwner(user1)
	if err != nil {
		return err
	}
	srv.db.SaveKeeper(user2)
	srv.db.SaveAdmin(user3)
	return nil
}
