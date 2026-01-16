import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() createBookingDto: any) {
        return this.bookingsService.create(createBookingDto, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my')
    findMyBookings(@Request() req) {
        return this.bookingsService.findByUser(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.bookingsService.findAll();
    }
}
