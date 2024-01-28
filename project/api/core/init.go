package core

import (
	"359/domain"
	"359/ports"
	"fmt"
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

	// Initialize 5 keepers
	for i := 1; i <= 5; i++ {
		keeper := &domain.Keeper{
			Username: fmt.Sprintf("keeper%d", i),
			Email:    fmt.Sprintf("KeeperEmail%d", i),
			Password: "123456",
		}
		owner := &domain.Owner{
			Username: fmt.Sprintf("owner%d", i),
			Email:    fmt.Sprintf("OwnerEmail%d", i),
			Password: "123456",
		}
		srv.db.SaveOwner(owner)
		srv.db.SaveKeeper(keeper)
	}

	user3 := &domain.Admin{
		Id:       1,
		Username: "admin",
		Password: "admin",
		UserType: "admin",
	}
	srv.db.SaveAdmin(user3)
	return nil
}
