const ps = require('pg-promise').PreparedStatement;
const querys = {
    loginUser: new ps('add-user', 'SELECT users_username, users_password,  FROM public.users WHERE users_username = $1 AND users_password = $2'),
    findUser: new ps('find-user', 'SELECT * FROM public.users WHERE users_username = $1'),
    createProject: new ps('create-project', 'INSERT INTO public.projects (users_id, project_name, project_description, status_id) VALUES ($1, $2, $3, $4) RETURNING project_id'),
    deleteProject: new ps('delete-project', 'DELETE FROM public.projects WHERE users_id = $1 AND project_name = $2'),
    adminDelete: new ps('admin-delete', 'DELETE FROM public.projects WHERE project_name = $1'),
    get_myProjects: new ps('get-MyProjects', 'SELECT project_id, project_name, project_description, status_description, users_name FROM public.projects p INNER JOIN public.users u ON p.users_id = u.users_id INNER JOIN public.status s ON p.status_id = s.status_id WHERE p.users_id = $1'),
    get_Project: new ps('get-project', 'SELECT project_name, project_description, status_description, users_name FROM public.projects p INNER JOIN public.users u ON p.users_id = u.users_id INNER JOIN public.status s ON p.status_id = s.status_id WHERE p.project_id = $1'),
    get_itemsProject: new ps('get_itemsProject', 'SELECT project_item_name, project_item_description, status_description FROM public.project_item pi INNER JOIN public.status s ON pi.status_id = s.status_id WHERE pi.project_id = $1'),
    updateProject: new ps('update-project', 'UPDATE public.projects SET project_name = $1, project_description = $2, status_id = $3 WHERE project_id = $4'),
    searchProject: new ps('search-project', 'SELECT project_id, project_name, project_description, status_description, users_name FROM public.projects p INNER JOIN public.users u ON p.users_id = u.users_id INNER JOIN public.status s ON p.status_id = s.status_id WHERE p.project_name ILIKE $1')
}

module.exports = querys;