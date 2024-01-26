package repositories

import (
	"359/domain"
	"fmt"
)

func (db *Db) GetBooking(booking *domain.Booking) error {
	return db.DB.First(&booking, booking.Id).Error
}

func (db *Db) SaveBooking(booking *domain.Booking) error {
	fmt.Println(booking)
	return db.DB.Create(&booking).Error
}

func (db *Db) UpdateBooking(booking *domain.Booking) error {
	return db.DB.Save(&booking).Error
}

func (db *Db) GetBookings() ([]domain.Booking, error) {
	var bookings []domain.Booking
	err := db.DB.Find(&bookings).Error
	return bookings, err
}

func (db *Db) DeleteBooking(booking *domain.Booking) error {
	return db.DB.Delete(&booking).Error
}
