import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Report {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  subject: string;

  @Prop()
  year: number;

  @Prop()
  semester: number;

  @Prop([String])
  professor: string[];

  @Prop()
  grade: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
