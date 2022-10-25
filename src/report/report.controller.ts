import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetReportByNameDto,
  GetReportByProfessorDto,
  ReportDto,
} from './report.dto';
import { ReportService } from './report.service';
import { UpdateReportDto } from './updateReportDto.dto';

@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post()
  async createReport(@Res() response, @Body() reportDto: ReportDto) {
    try {
      const newReport = await this.reportService.createReport(reportDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Report has been created successfully',
        data: newReport,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/:id')
  async updateReport(
    @Res() response,
    @Body() updateReportDto: UpdateReportDto,
    @Param('id') reportId: string,
  ) {
    try {
      const existingReport = await this.reportService.updateReport(
        updateReportDto,
        reportId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Report has been updated successfully',
        data: existingReport,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteReport(@Res() response, @Param('id') reportId: string) {
    try {
      const deletedReport = await this.reportService.deleteReport(reportId);
      return response.status(HttpStatus.OK).json({
        message: 'Report deleted successfully',
        data: deletedReport,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/name')
  async getReportByName(@Res() response, @Query() query: GetReportByNameDto) {
    try {
      const report = await this.reportService.getReportByName(
        query.firstName,
        query.lastName,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Get report successfully',
        data: report,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/professor')
  async getReportByProfessor(
    @Res() response,
    @Query(new ValidationPipe({ transform: true }))
    professor: GetReportByProfessorDto,
  ) {
    try {
      const report = await this.reportService.getReportByProfessor(professor);
      return response.status(HttpStatus.OK).json({
        message: 'Get report successfully',
        data: report,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
