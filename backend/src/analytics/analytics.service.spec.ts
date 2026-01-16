import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { UsersService } from '../users/users.service';
import { BookingsService } from '../bookings/bookings.service';
import { PackagesService } from '../packages/packages.service';

describe('AnalyticsService', () => {
    let service: AnalyticsService;
    let usersService: Partial<UsersService>;
    let bookingsService: Partial<BookingsService>;
    let packagesService: Partial<PackagesService>;

    beforeEach(async () => {
        usersService = { findAll: jest.fn().mockResolvedValue([{}, {}]) }; // 2 users
        bookingsService = { findAll: jest.fn().mockResolvedValue([{}]) }; // 1 booking
        packagesService = { findAll: jest.fn().mockResolvedValue([{}, {}, {}]) }; // 3 packages

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnalyticsService,
                { provide: UsersService, useValue: usersService },
                { provide: BookingsService, useValue: bookingsService },
                { provide: PackagesService, useValue: packagesService },
            ],
        }).compile();

        service = module.get<AnalyticsService>(AnalyticsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return correct dashboard stats', async () => {
        const stats = await service.getDashboardStats();
        expect(stats).toEqual({
            totalUsers: 2,
            totalBookings: 1,
            totalPackages: 3,
            pendingBookings: 0,
        });
        expect(usersService.findAll).toHaveBeenCalled();
        expect(bookingsService.findAll).toHaveBeenCalled();
        expect(packagesService.findAll).toHaveBeenCalled();
    });
});
