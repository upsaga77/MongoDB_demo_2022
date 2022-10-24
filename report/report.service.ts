import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetReportByProfessorDto, ReportDto } from './report.dto';
import { Report } from './report.schema';
import { UpdateReportDto } from './updateReportDto.dto';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Report.name) private reportModel: Model<Report>) {}
  async createReport(reportDto: ReportDto): Promise<Report> {
    const newReport = await new this.reportModel(reportDto);
    return newReport.save();
  }

  async updateReport(
    updateReportDto: UpdateReportDto,
    reportId: string,
  ): Promise<Report> {
    const existingReport = await this.reportModel.findByIdAndUpdate(
      reportId,
      updateReportDto,
      { new: true },
    );
    if (!existingReport) {
      throw new NotFoundException(`Report #${reportId} not found`);
    }
    return existingReport;
  }

  async deleteReport(reportId: string): Promise<Report> {
    const deletedReport = await this.reportModel.findByIdAndDelete(reportId);
    if (!deletedReport) {
      throw new NotFoundException(`Report #${reportId} not found`);
    }
    return deletedReport;
  }

  async getReportByName(
    firstName: string,
    lastName: string,
  ): Promise<Report[]> {
    const report = await this.reportModel.find(
      {
        firstName: firstName,
        lastName: lastName,
      },
      { __v: false },
    );
    return report;
  }

  async getReportByProfessor(
    professor: GetReportByProfessorDto,
  ): Promise<Report[]> {
    const report = await this.reportModel.find(
      { professor: { $all: professor.professor } },
      { __v: false },
    );
    return report;
  }
}
