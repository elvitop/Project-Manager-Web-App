const ps = require('pg-promise').PreparedStatement;
const querys = {
    loginUser: new ps('add-user', 'SELECT users_username, users_password,  FROM public.users WHERE users_username = $1 AND users_password = $2'),
    findUser: new ps('find-user', 'SELECT * FROM public.users WHERE users_username = $1'),
    createProject: new ps('create-project', 'INSERT INTO public.projects (users_id, project_name, project_description, status_id) VALUES ($1, $2, $3, $4) RETURNING project_id'),
    deleteProject: new ps('delete-project', 'DELETE FROM public.projects WHERE users_id = $1 AND project_name = $2'),
    adminDelete: new ps('admin-delete', 'DELETE FROM public.projects WHERE project_name = $1'),
    get_myProjects: new ps('get-MyProjects', 'SELECT project_name, project_description, status_id, users_name FROM public.projects p INNER JOIN public.users u ON p.users_id = u.users_id WHERE p.users_id = $1')
}

module.exports = querys;