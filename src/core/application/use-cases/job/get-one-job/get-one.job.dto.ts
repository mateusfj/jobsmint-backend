export interface inputGetOneJobDTO {
  id: string;
}

export interface outputGetOneJobDTO {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: string;
  employmentType: string;
  status: string;
}
