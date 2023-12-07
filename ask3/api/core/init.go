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
	users := GetStartingUsers()
	for _, user := range users {
		err := srv.db.SaveUser(&user)
		if err != nil {
			continue
		}
	}
	return nil
}

func GetStartingUsers() []domain.User {
	return []domain.User{}
}
