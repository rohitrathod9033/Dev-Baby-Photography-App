import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BookingsService } from '../bookings/bookings.service';
import { PackagesService } from '../packages/packages.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private usersService: UsersService,
        private bookingsService: BookingsService,
        private packagesService: PackagesService,
    ) { }

    async getDashboardStats() {
        const totalUsers = (await this.usersService.findAll()).length;
        const totalBookings = (await this.bookingsService.findAll()).length;
        const totalPackages = (await this.packagesService.findAll()).length;
        // Mocking pending for now or filter by status if added
        const pendingBookings = 0;

        return {
            totalUsers,
            totalBookings,
            totalPackages,
            pendingBookings,
        };
    }
}
