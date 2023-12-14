package domain

import (
	"time"
)

type Owner struct {
	Id        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at"`
	Username  string    `json:"username" gorm:"uniqueIndex"`
	Email     string    `json:"email" gorm:"uniqueIndex"`
	Password  string    `json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	BirthDate time.Time `json:"birth_date"`
	Gender    string    `json:"gender"`
	UserType  string    `json:"user_type"`
	Country   string    `json:"country"`
	City      string    `json:"city"`
	Address   string    `json:"address"`
	URL       string    `json:"url"`
	Job       string    `json:"job"`
	Phone     string    `json:"phone"`
	Lat       float64   `json:"lat"`
	Lon       float64   `json:"lon"`
	Response
}

type Keeper struct {
	Id        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at"`
	Username  string    `json:"username" gorm:"uniqueIndex"`
	Email     string    `json:"email" gorm:"uniqueIndex"`
	Password  string    `json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	BirthDate time.Time `json:"birth_date"`
	Gender    string    `json:"gender"`
	UserType  string    `json:"user_type"`
	Country   string    `json:"country"`
	City      string    `json:"city"`
	Address   string    `json:"address"`
	URL       string    `json:"url"`
	Job       string    `json:"job"`
	Phone     string    `json:"phone"`
	SpaceType string    `json:"space_type"`
	CatKeep   bool      `json:"cat_keep"`
	DogKeep   bool      `json:"dog_keep"`
	CatPrice  int       `json:"cat_price"`
	DogPrice  int       `json:"dog_price"`
	SpaceDesc string    `json:"space_desc"`
	Lat       float64   `json:"lat"`
	Lon       float64   `json:"lon"`
	Response
}

type UserPerType struct {
	Group      string `json:"group"`
	TotalUsers uint   `json:"total_users"`
}

type LoginResp struct {
	Username string `json:"username"`
	Password string `json:"password"`
	UserId   uint   `json:"user_id"`
	UserType string `json:"user_type"`
	Response
}
