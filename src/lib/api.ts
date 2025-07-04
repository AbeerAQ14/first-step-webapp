import axios from "axios";

const API_BASE_URL = "https://back.firststep-app.com/api";

export interface Enrollment {
  id: number;
  center_id: number;
  user_id: number;
  center_branch_id: number;
  reservation_number: string;
  parent_phone: string;
  price_amount: string;
  enrollment_type: string;
  hours_per_day: string | null;
  response_speed: string;
  enrollment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  children: Array<{
    id: number;
    child_name: string;
    branch: {
      name: string;
      nursery_name: string;
    };
  }>;
}

export interface EnrollmentsResponse {
  data: Enrollment[];
}

export const getEnrollments = async (): Promise<EnrollmentsResponse> => {
  const response = await axios.get(
    `${API_BASE_URL}/parent/enrollments-get-all`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
