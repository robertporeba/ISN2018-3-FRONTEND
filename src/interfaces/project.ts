export interface IProject {
	name: string;
	author: string | undefined;
}

export interface IGetProject {
	name: string;
	author: string | undefined;
	createDate: string;
	id: number;
}
export interface IDeleteProject {
	id: number;
}

export type ProjectActionType = 'ADDPROJECT_SUCCESS' | 'ADDPROJECT_FAIL';

export const ADDPROJECT_SUCCESS: ProjectActionType = 'ADDPROJECT_SUCCESS';
export const ADDPROJECT_FAIL: ProjectActionType = 'ADDPROJECT_FAIL';

export interface IUserProjects {
	projectId: number;
	userName: string | undefined;
}
