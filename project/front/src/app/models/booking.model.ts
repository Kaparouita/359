export class Booking{
    id: number = 0;
    ownerid: number;
    keeperid: number;
    petid: number;
    start_date: string;
    end_date: string;
    price: number;
    status: string;

    constructor(
        ownerid: number = 0,
        keeperid: number = 0,
        petid: number = 0,
        start_date: string = '',
        end_date: string = '',
        price: number = 0,
        status: string = ''
    ) {
        this.ownerid = ownerid;
        this.keeperid = keeperid;
        this.petid = petid;
        this.start_date = start_date;
        this.end_date = end_date;
        this.price = price;
        this.status = status;
    }
    
}