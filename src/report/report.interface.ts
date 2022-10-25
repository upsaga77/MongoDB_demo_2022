import { Document } from 'mongoose';

export interface Report extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly subject: string;
  readonly semester: number;
  readonly year: number;
  readonly professor: string[];
  readonly grade: number;
}
