export class CreateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly isAvailable?: boolean;
    readonly photos?: string[];  
    readonly videos?: string[];
  }