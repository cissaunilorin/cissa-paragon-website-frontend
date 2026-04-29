import apiClient from "./api";

export type LevelType = "100" | "200" | "300" | "400";
export type SemesterType = "harmattan" | "rain";
export type DepartmentType = "CSC" | "IFT" | "LIS" | "TCS" | "MAC";
export type MaterialFormatType = "lecture_notes" | "past_questions" | "textbook";

export interface Material {
    id: string;
    title: string;
    description: string | null;
    course_code: string;
    course_title: string;
    level: LevelType;
    semester: SemesterType;
    material_type: MaterialFormatType;
    drive_url: string;
    session: string | null;
    departments: DepartmentType[];
    created_at: string;
    updated_at: string;
}

export interface MaterialsListResponse {
    items: Material[];
    total_items: number;
    total_pages: number;
    current_page: number;
    page_size: number;
}

export interface MaterialsFilters {
    title?: string;
    level?: LevelType;
    semester?: SemesterType;
    department?: DepartmentType;
    course_code?: string;
    material_type?: MaterialFormatType;
    session?: string;
}

export const getMaterials = async (
    page: number,
    pageSize: number,
    filters?: MaterialsFilters
): Promise<MaterialsListResponse> => {
    const params: {
        page: number;
        page_size: number;
        title?: string;
        level?: LevelType;
        semester?: SemesterType;
        department?: DepartmentType;
        course_code?: string;
        material_type?: MaterialFormatType;
        session?: string;
    } = {
        page,
        page_size: pageSize,
    };

    if (filters?.title !== undefined) params.title = filters.title;
    if (filters?.level !== undefined) params.level = filters.level;
    if (filters?.semester !== undefined) params.semester = filters.semester;
    if (filters?.department !== undefined)
        params.department = filters.department;
    if (filters?.course_code !== undefined)
        params.course_code = filters.course_code;
    if (filters?.material_type !== undefined)
        params.material_type = filters.material_type;
    if (filters?.session !== undefined) params.session = filters.session;

    const response = await apiClient.get("/materials", {
        params,
    });
    return response.data.data;
};

export const getMaterialById = async (id: string): Promise<Material> => {
    const response = await apiClient.get(`/materials/${id}`);
    return response.data.data;
};

export const createMaterial = async (material: Omit<Material, "id" | "created_at" | "updated_at">): Promise<Material> => {
    const response = await apiClient.post("/materials", material);
    return response.data.data;
};

export const updateMaterial = async (id: string, material: Omit<Material, "id" | "created_at" | "updated_at">): Promise<Material> => {
    const response = await apiClient.put(`/materials/${id}`, material);
    return response.data.data;
};

export const deleteMaterial = async (id: string): Promise<void> => {
    await apiClient.delete(`/materials/${id}`);
};