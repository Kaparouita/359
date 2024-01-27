export class Booking{
    id: number = 0;
    owner_id: number;
    keeper_id: number;
    pet_id: number;
    start_date: string;
    end_date: string;
    price: number;
    status: string;
    message: string = '';

    constructor(
        ownerid: number = 0,
        keeperid: number = 0,
        petid: number = 0,
        start_date: string = '',
        end_date: string = '',
        price: number = 0,
        status: string = ''
    ) {
        this.owner_id = ownerid;
        this.keeper_id = keeperid;
        this.pet_id = petid;
        this.start_date = start_date;
        this.end_date = end_date;
        this.price = price;
        this.status = status;
    }
    
}