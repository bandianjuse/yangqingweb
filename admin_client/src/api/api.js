import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const requestLogout = params => { return axios.get(`${base}/logout`, { params: params }); };

export const requestloginValid = params => { return axios.get(`${base}/loginValid`, { params: params }); };

export const getNewsList = params => { return axios.get(`${base}/news/list`, { params: params }); };

export const addNews = params => { return axios.post(`${base}/news/add`, params).then(res => res.data); };

export const editNews = params => { return axios.post(`${base}/news/edit`, params).then(res => res.data); };

export const removeNews = params => { return axios.get(`${base}/news/remove`, { params: params }); };

export const batchRemoveNews = params => { return axios.get(`${base}/news/batchremove`, { params: params }); };



export const getWorksList = params => { return axios.get(`${base}/works/list`, { params: params }); };

export const addWorks = params => { return axios.post(`${base}/works/add`, params).then(res => res.data); };

export const editWorks = params => { return axios.post(`${base}/works/edit`, params).then(res => res.data); };

export const removeWorks = params => { return axios.get(`${base}/works/remove`, { params: params }); };

export const batchRemoveWorks = params => { return axios.get(`${base}/works/batchremove`, { params: params }); };


export const getCategoryList = params => { return axios.get(`${base}/category/list`, { params: params }); };

export const addCategory = params => { return axios.post(`${base}/category/add`, params).then(res => res.data); };

export const removeCategory = params => { return axios.get(`${base}/category/remove`, { params: params }); };

export const editCategory = params => { return axios.post(`${base}/category/edit`, params).then(res => res.data); };


export const getServiceList = params => { return axios.get(`${base}/service/list`, { params: params }); };

export const addService = params => { return axios.post(`${base}/service/add`, params).then(res => res.data); };

export const editService = params => { return axios.post(`${base}/service/edit`, params).then(res => res.data); };

export const removeService = params => { return axios.get(`${base}/service/remove`, { params: params }); };

export const batchRemoveService = params => { return axios.get(`${base}/service/batchremove`, { params: params }); };



export const getJobList = params => { return axios.get(`${base}/job/list`, { params: params }); };

export const addJob = params => { return axios.post(`${base}/job/add`, params).then(res => res.data); };

export const editJob = params => { return axios.post(`${base}/job/edit`, params).then(res => res.data); };

export const removeJob = params => { return axios.get(`${base}/job/remove`, { params: params }); };

export const batchRemoveJob = params => { return axios.get(`${base}/job/batchremove`, { params: params }); };


export const getTeamList = params => { return axios.get(`${base}/team/list`, { params: params }); };

export const addTeam = params => { return axios.post(`${base}/team/add`, params).then(res => res.data); };

export const editTeam = params => { return axios.post(`${base}/team/edit`, params).then(res => res.data); };

export const removeTeam = params => { return axios.get(`${base}/team/remove`, { params: params }); };

export const batchRemoveTeam = params => { return axios.get(`${base}/team/batchremove`, { params: params }); };


export const editConfing = params => { return axios.post(`${base}/confing/edit`, params).then(res => res.data); };

export const getConfingList = params => { return axios.get(`${base}/confing/list`, { params: params }); };
