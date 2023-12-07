package domain

import (
	"time"
)

type User struct {
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
	Response
}

type UserPerType struct {
	Group      string `json:"group"`
	TotalUsers uint   `json:"total_users"`
}

type LoginResp struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
