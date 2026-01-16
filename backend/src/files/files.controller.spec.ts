import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';

describe('FilesController', () => {
    let controller: FilesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FilesController],
        }).compile();

        controller = module.get<FilesController>(FilesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return file url and filename on upload', () => {
        const mockFile = {
            filename: 'test-file.jpg',
            originalname: 'test.jpg',
        } as any;

        const result = controller.uploadFile(mockFile);
        expect(result).toEqual({
            url: expect.stringContaining('/uploads/test-file.jpg'),
            filename: 'test-file.jpg',
        });
    });
});
