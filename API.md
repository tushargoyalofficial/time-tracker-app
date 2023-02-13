# API

## Signup
### URL: /api/user/register
### Method: POST
```json
{
  name: string
  email: string
  password: string
}
```
#
## Login
### URL: /api/user/login
### Method: POST
```json
{
  email: string
  password: string
}
```
#
## Add Project against user
### URL: /api/project/add
### Method: POST
### headers: { Authorization: Bearer <token>}
```json 
{
  name: string
  description: string
  language: string
}
```
#
## Get all projects for user
### URL: /api/userProject/all
### Method: GET
### headers: { Authorization: Bearer <token>}
#
## Add task against project 
### URL: /api/task/add
### Method: POST
### headers: { Authorization: Bearer <token>}
```json
{
  title: string
  description: string
  projectId: string
}
```
#
## Get all task for a project belongs to user
### URL: /api/task/all/{projectId}
### Method: GET
### headers: { Authorization: Bearer <token>}
#
## Add Time against task 
### URL: /api/timeSlot/add
### Method: POST
### headers: { Authorization: Bearer <token>}
```json
{
  date: Date
  hours: number
  taskId: string
  projectId: string
}
```
#
## Get all recorded work time against task
### URL: /api/timeSlot/all/{taskId}
### Method: GET
### headers: { Authorization: Bearer <token>}
#
## Edit recorded time against task 
### URL: /api/timeSlot/edit
### Method: POST
### headers: { Authorization: Bearer <token>}
```json
{
  id: ObjectId
  date: Date
  hours: number
  taskId: string
  projectId: string
}
```