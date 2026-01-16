import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '@nestjs/passport';
// Ideally add RolesGuard to ensure only admin can access

@Controller('analytics')
export class AnalyticsController {
    constructor(
        private analyticsService: AnalyticsService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('dashboard')
    getDashboardStats() {
        return this.analyticsService.getDashboardStats();
    }
}
