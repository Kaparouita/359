package repositories

import (
	"359/domain"
	"errors"
)

func (db *Db) SaveOwner(user *domain.Owner) error {
	var keeperCount int64
	db.Model(&domain.Keeper{}).Where("username = ? OR email = ?", user.Username, user.Email).Count(&keeperCount)
	if keeperCount > 0 {
		return errors.New("owner has the same username or email as a keeper")
	}
	err := db.Model(user).Create(user).Error
	if err != nil {
		return err
	}
	return nil
}

func (db *Db) UpdateOwner(user *domain.Owner) error {
	return db.Model(user).Updates(user).Error
}

func (db *Db) GetOwners() ([]domain.Owner, error) {
	var users []domain.Owner
	err := db.Find(&users).Error
	return users, err
}

func (db *Db) GetOwner(user *domain.Owner) error {
	return db.Model(user).Find(user).Error
}

func (db *Db) DeleteOwner(user *domain.Owner) error {
	return db.Delete(&domain.Owner{Id: user.Id}).Error
}

func (db *Db) SaveKeeper(user *domain.Keeper) error {
	var keeperCount int64
	db.Model(&domain.Owner{}).Where("username = ? OR email = ?", user.Username, user.Email).Count(&keeperCount)
	if keeperCount > 0 {
		return errors.New("keeper has the same username or email as an owner")
	}
	err := db.Model(user).Create(user).Error
	if err != nil {
		return err
	}
	return nil
}

func (db *Db) UpdateKeeper(user *domain.Keeper) error {
	return db.Model(user).Updates(user).Error
}

func (db *Db) GetKeepers() ([]domain.Keeper, error) {
	var users []domain.Keeper
	err := db.Find(&users).Error
	return users, err
}

func (db *Db) GetKeeper(user *domain.Keeper) error {
	return db.Model(user).Find(user).Error
}

func (db *Db) DeleteKeeper(user *domain.Keeper) error {
	return db.Delete(&domain.Keeper{Id: user.Id}).Error
}

func (db *Db) Login(cred *domain.LoginResp) error {
	var owner domain.Owner
	var keeper domain.Keeper
	err := db.Model(&owner).Where("username = ?", cred.Username).Where("password = ?", cred.Password).First(&owner).Error
	if err != nil {
		err = db.Model(&keeper).Where("username = ?", cred.Username).Where("password = ?", cred.Password).First(&keeper).Error
		if err != nil {
			return errors.New("invalid username or password")
		}
		cred.UserId = keeper.Id
		cred.UserType = keeper.UserType
		return nil
	}
	cred.UserId = owner.Id
	cred.UserType = owner.UserType
	return nil
}
