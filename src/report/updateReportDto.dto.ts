import { PartialType } from '@nestjs/swagger';
import { ReportDto } from './report.dto';

export class UpdateReportDto extends PartialType(ReportDto) {}
