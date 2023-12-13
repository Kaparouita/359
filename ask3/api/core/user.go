package core

import (
	"359/domain"
	"fmt"
)

func (srv *Service) RegisterOwner(user *domain.Owner) *domain.Owner {
	err := srv.db.SaveOwner(user)
	if err != nil {
		user.StatusCode = 403
		user.Message = fmt.Sprintf("Couldnt register USER : %v", err)
		return user
	}
	user.StatusCode = 200
	return user
}

func (srv *Service) UpdateOwner(user *domain.Owner) *domain.Owner {
	err := srv.db.UpdateOwner(user)
	if err != nil {
		user.StatusCode = 400
		user.Message = fmt.Sprintf("Couldnt update USER : %v", err)
		return user
	}
	user.StatusCode = 201
	return user
}

func (srv *Service) GetOwner(user *domain.Owner) *domain.Owner {
	err := srv.db.GetOwner(user)
	if err != nil {
		user.StatusCode = 400
		user.Message = fmt.Sprintf("Couldnt get USER : %v", err)
		return user
	}
	user.StatusCode = 200
	return user
}

func (srv *Service) DeleteOwner(user *domain.Owner) *domain.Response {
	resp := &domain.Response{}
	err := srv.db.DeleteOwner(user)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldnt delete USER : %v", err)
		return resp
	}
	resp.StatusCode = 200
	resp.Message = "Deleted user successfully"
	return resp
}

func (srv *Service) GetOwners() ([]domain.Owner, error) {
	users, err := srv.db.GetOwners()
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (srv *Service) RegisterKeeper(user *domain.Keeper) *domain.Keeper {
	err := srv.db.SaveKeeper(user)
	if err != nil {
		user.StatusCode = 400
		user.Message = fmt.Sprintf("Couldnt register USER : %v", err)
		return user
	}
	user.StatusCode = 200
	return user
}

func (srv *Service) UpdateKeeper(user *domain.Keeper) *domain.Keeper {
	err := srv.db.UpdateKeeper(user)
	if err != nil {
		user.StatusCode = 400
		user.Message = fmt.Sprintf("Couldnt update USER : %v", err)
		return user
	}
	user.StatusCode = 201
	return user
}

func (srv *Service) GetKeeper(user *domain.Keeper) *domain.Keeper {
	err := srv.db.GetKeeper(user)
	if err != nil {
		user.StatusCode = 400
		user.Message = fmt.Sprintf("Couldnt get USER : %v", err)
		return user
	}
	user.StatusCode = 200
	return user
}

func (srv *Service) DeleteKeeper(user *domain.Keeper) *domain.Response {
	resp := &domain.Response{}
	err := srv.db.DeleteKeeper(user)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldnt delete USER : %v", err)
		return resp
	}
	resp.StatusCode = 200
	resp.Message = "Deleted user successfully"
	return resp
}

func (srv *Service) GetKeepers() ([]domain.Keeper, error) {
	users, err := srv.db.GetKeepers()
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (srv *Service) Login(cred *domain.LoginResp) *domain.LoginResp {
	err := srv.db.Login(cred)
	if err != nil {
		cred.StatusCode = 400
		cred.Message = fmt.Sprintf("Couldnt login USER : %v", err)
		return cred
	}
	cred.StatusCode = 200
	fmt.Println("CORE", cred)
	return cred
}
