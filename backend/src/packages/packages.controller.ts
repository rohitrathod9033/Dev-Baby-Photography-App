import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) { }

    @Get()
    findAll() {
        return this.packagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.packagesService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createPackageDto: any) {
        return this.packagesService.create(createPackageDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePackageDto: any) {
        return this.packagesService.update(id, updatePackageDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.packagesService.remove(id);
    }
}
