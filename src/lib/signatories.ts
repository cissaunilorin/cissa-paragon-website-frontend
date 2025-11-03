import apiClient from "./api";

export interface Signatory {
    id: string;
    name: string; // e.g. "SANNI, Nurudeen Akorede"
    alias?: string; // e.g. "D'LIGHT"
    role: string; // e.g. "Executive President"
    contact?: string; // e.g. WhatsApp link
}

export const getSignatories = async (): Promise<Signatory[]> => {
    const response = await apiClient.get("/signatories");
    return response.data.data;
};

export const createSignatory = async (signatory: {
    name: string;
    alias?: string;
    role: string;
    contact?: string;
}): Promise<Signatory> => {
    const response = await apiClient.post("/signatories", signatory);
    return response.data.data;
};

export const updateSignatory = async (
    id: string,
    signatory: {
        name?: string;
        alias?: string;
        role?: string;
        contact?: string;
    }
): Promise<Signatory> => {
    const response = await apiClient.put(`/signatories/${id}`, signatory);
    return response.data.data;
};

export const deleteSignatory = async (id: string): Promise<void> => {
    await apiClient.delete(`/signatories/${id}`);
};