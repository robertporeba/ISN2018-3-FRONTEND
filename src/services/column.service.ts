import { IColumn } from '../interfaces/column';
import axiosInstance from '../utils/axios';
class ColumnService {
	addcolumn(columnData: IColumn) {
		return axiosInstance
			.post('/column/add', {
				name: columnData.name,
				projectId: columnData.projectId,
			})
			.then((response) => {
				return response.data;
			});
	}
	getallcolumns(id: number) {
		return axiosInstance.get('/column/getall?id=' + id).then((response) => {
			return response.data;
		});
	}
	deletecolumn(id: number) {
		return axiosInstance.post('/column/delete?id=' + id).then((response) => {
			return response.data;
		});
	}
}

export default new ColumnService();
