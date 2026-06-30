import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
const GITHUB_API_TOKEN = "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";

const apiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await apiClient.get("/user/repos", {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
        t: Date.now(),
      },
    });

    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

export const createRepositories = async (
  repository: RepositoryPayload
): Promise<Repository | null> => {
  try {
    const response = await apiClient.post(
      "/user/repos",
      repository
    );

    if (response.status !== 201) {
      throw new Error(`${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 422) {
      throw new Error("El repositorio ya existe");
    }
    if (error.response?.status === 404) {
      throw new Error("No se encontró la ruta de GitHub");
    }
    throw new Error(error.message);
  }
};

export const fetchUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await apiClient.get("/user");

    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

export const deleteRepository = async (repoName: string): Promise<void> => {
  try {
    const response = await apiClient.delete(`/repos/${repoName}`);

    if (response.status !== 204) {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRepository = async (
  repoName: string, 
  updatedData: { name?: string; description?: string } 
): Promise<Repository | null> => {
  try {
    const response = await apiClient.patch(
      `/repos/${repoName}`,
      updatedData
    );

    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error al actualizar: ${error.message}`);
  }
};